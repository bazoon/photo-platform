const {get, split, nth, compose} = require('lodash/fp');
const getUploadFilePath = require('../utils/getUploadPath');
const {getCurrentContestId, getCurrentContest, getContestFromSection} = require('../utils/getCurrentSalone');
const {getCurrentDomain} = require('../utils/getCurrentDomain');
const MODER_ACCEPTED = 1;

module.exports = [
  {
    method: 'GET',
    path: '/api/jury/sections/{contestId}',
    handler: async function (request, h) {
      const { contestId } = request.params;
      
      if (!contestId) {
        return [];
      }

      const query = `
        SELECT
          sections.name,
          sections.id
        FROM
          contests, sections 
        WHERE
          contests.id=:contestId and sections.contest_id = contests.id
      `;

      const sections = await h.query(query, {
        replacements: {
          contestId
        }
      });

      return sections;
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/jury/images/{sectionId}',
    handler: async function (request, h) {
      const { sectionId } = request.params;
      const userId = get('request.auth.credentials.id', h) || -1;
      const domain = getCurrentDomain(request);

      if (!domain) {
        return {};
      }

      console.log(981)
      const contest = await getCurrentContest(domain);
      console.log(982)
      if (!contest) {
        return {}
      }

      const query = `
        select  p.id, p.filename, tcontent as description, rate_value as rate
        from  photoworks p
        left join rates r on r.photowork_id  = p.id and r.jury_id=(select juries.id from juries where juries.user_id = :userId and juries.contest_id=:contestId)
        left join juries j on r.jury_id=j.id
        WHERE p.section_id = :sectionId and p.moder=:moder
      `;


      let photoworks = await h.query(query, {
        replacements: {
          sectionId,
          moder: MODER_ACCEPTED,
          userId,
          contestId: contest.id
        }
      });

      return Promise.all(photoworks.map(async p => ({...p, filename: await getUploadFilePath(p.filename, request)})));
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/jury/image/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const { rate } = request.payload;
      const userId = get('request.auth.credentials.id', h) || -1;
      const domain = getCurrentDomain(request);

      if (!domain) {
        return {};
      }

      const contest = await getCurrentContest(domain);

      const query = `
        select 
          juries.id 
        from 
          juries
        where
          juries.contest_id = :contestId and juries.user_id = :userId
      `;


      const a = await h.query(query, {
        replacements: {
          userId,
          contestId: contest.id
        }
      });
      
      console.log(a);

      const jury = a[0];

      let rateRecord = await h.models.Rate.findOne({
        where: { photoworkId: id, juryId: jury.id }
      });

      if (!rateRecord) {
        rateRecord = await h.models.Rate.create({ photoworkId: id, juryId: jury.id, rateValue: rate })
      }

      rateRecord.rateValue = rate;

      await rateRecord.save();
      return rateRecord;
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/jury/is',
    handler: async function (request, h) {
      const { sectionId } = request.params;
      const userId = get('request.auth.credentials.id', h) || -1;
      const domain = getCurrentDomain(request);

      if (!domain) {
        return {};
      }

      const contest = await getCurrentContest(domain);

      const query = `
        select
          juries.id 
        from
          juries 
        where
          juries.user_id = :userId and juries.contest_id  = :contestId
      `;


      const [jury] = await h.query(query, {
        replacements: {
          userId,
          contestId: contest.id
        }
      });

      return { isJury: jury.id > 0 }
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/jury/analytics',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h) || -1;
      const domain = getCurrentDomain(request);

      if (!domain) {
        return {};
      }

      const query = `
        select
          juries.id 
        from
          juries 
        where
          juries.user_id = :userId and juries.contest_id  = :contestId
      `;
      
      const contestId = await getCurrentContestId(domain);

      const [jury] = await h.query(query, {
        replacements: {
          userId,
          contestId
        }
      });

      const doneQuery = `
        select
          s."name", count(r.id)
        from
          sections s,
          photoworks p,
          rates r 
        where
          s.contest_id = :contestId
          and p.section_id = s.id
          and r.photowork_id = p.id 
          and r.jury_id = :juryId	
          and p.moder=:moder
        group by s.name
        order by s.name
      `

      const totalQuery = `
          select
            s.name, count(p.id)
          from
            sections s, photoworks p 
          where
            s.contest_id = :contestId
            and p.section_id = s.id
            and p.moder=:moder
          group  by s.name
          order by s.name
      `

      const done = await h.query(doneQuery, {
        replacements: {
          juryId: jury.id,
          contestId,
          moder: MODER_ACCEPTED
        }
      });

      const total = await h.query(totalQuery, {
        replacements: {
          contestId,
          moder: MODER_ACCEPTED
        }
      });

      const all = total.reduce((a, e) => {  
        const d = done.find(t => t.name === e.name);
        if (d) return {...a, [e.name]: { all: +e.count, done: +d.count } };
        return {...a, [e.name]: { all: +e.count, done: 0 }};
      }, {})


      return Object.keys(all).map(name => ({name, all: all[name].all, done: all[name].all - all[name].done})  )
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/jury/canStart',
    handler: async function (request, h) {
      const { sectionId } = request.params;
      const userId = get('request.auth.credentials.id', h) || -1;
      const domain = getCurrentDomain(request);

      if (!domain) {
        return {};
      }


      const contest = await getCurrentContest(domain);
      console.log(contest.dateStop, new Date);
      return (new Date(contest.dateStop)) < (new Date())

    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/jury/shortList/{sectionId}',
    handler: async function (request, h) {
      const { sectionId } = request.params;
      const domain = getCurrentDomain(request);

      if (!domain) {
        return {};
      }

      const contest = await getContestFromSection(sectionId);
      console.log(1231, contest);

      if (!contest) {
        return {};
      }

      const ratesQuery = `
        SELECT CONCAT("first_name", ' ', "last_name") as author,
          rates.photowork_id,
          photoworks.name,
          users.email,
          photoworks.filename,
          avg(rates.rate_value) AS mean,
          percentile_cont(0.5)
          WITHIN GROUP (ORDER BY rates.rate_value) AS median,
          count(rates.id)
        FROM
          rates,
          photoworks,
          contests,
          registration_contests,
          users
        WHERE
          rates.photowork_id = photoworks.id
          AND photoworks.registration_contest_id = registration_contests.id
          AND registration_contests.contest_id = contests.id
          AND contests.id = :contestId and photoworks.section_id=:sectionId
          and registration_contests.user_id=users.id
        GROUP BY
          author,
          email,
          photoworks.name,
          photoworks.filename,
          rates.photowork_id
        order by mean desc
        limit :limit
      `;
      

      const rates = await h.query(ratesQuery, {
        replacements: {
          contestId: contest.id,
          sectionId,
          limit: contest.short_best_count
        }
      });

      return Promise.all(rates.map(async p => ({...p, filename: await getUploadFilePath(p.filename, request)})));
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
];


