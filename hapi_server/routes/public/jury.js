const {get, split, nth, compose} = require('lodash/fp');
const getUploadFilePath = require('../utils/getUploadPath');
const MODER_ACCEPTED = 1;
const {groupBy} = require('lodash/fp')

module.exports = [
  {
    method: 'GET',
    path: '/api/jury/sections',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h) || -1;
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const contestQuery = `
        SELECT
          contests.id
        FROM
          contests
          LEFT JOIN salones ON contests.salone_id = salones.id and salones."domain"=:domain
          LEFT JOIN organizers AS o on salones.organizer_id=o.id
          ORDER BY
            date_start DESC
          limit 1
      `;

      const [contest] = await h.query(contestQuery, { replacements: { domain: domain} })
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
          contestId: contest.id,
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
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const contestQuery = `
        SELECT
          contests.id
        FROM
          contests
          LEFT JOIN salones ON contests.salone_id = salones.id and salones."domain"=:domain
          LEFT JOIN organizers AS o on salones.organizer_id=o.id
          ORDER BY
            date_start DESC
          limit 1
      `;

      const [contest] = await h.query(contestQuery, { replacements: { domain: domain} })

      const query = `
        select  p.id, p.filename, tcontent as description, rate_value as rate
        from  photoworks p
        left join rates r on r.photowork_id  = p.id and r.jury_id=(select juries.id from juries where juries.user_id = :userId and juries.contest_id=:contestId)
        left join juries j on r.jury_id=j.id
        WHERE p.section_id = :sectionId and p.moder=:moder
      `;

      console.log('userId', userId);
      console.log('contestId', contest.id);
      console.log('sectionId', sectionId);



      let photoworks = await h.query(query, {
        replacements: {
          sectionId,
          moder: MODER_ACCEPTED,
          userId,
          contestId: contest.id
        }
      });

      // const dup = (arr, n) => {
      //   const a = []
      //   for(let i=0;i<n;i++)
      //   a.push(arr.map(e =>({...e, id: Math.random()})))
      //   return a.flat()
      // }
      return photoworks.map(p => ({...p, filename: getUploadFilePath(p.filename)}));
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
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }


      const contestQuery = `
        SELECT
          contests.id
        FROM
          contests
          LEFT JOIN salones ON contests.salone_id = salones.id and salones."domain"=:domain
          LEFT JOIN organizers AS o on salones.organizer_id=o.id
          ORDER BY
            date_start DESC
          limit 1
      `;

      const [contest] = await h.query(contestQuery, { replacements: { domain: domain} })
      console.log(contest)

      const query = `
        select 
          juries.id 
        from 
          juries
        where
          juries.contest_id = :contestId and juries.user_id = :userId
      `;


      const [jury] = await h.query(query, {
        replacements: {
          userId,
          contestId: contest.id
        }
      });

      let rateRecord = await h.models.Rate.findOne({
        where: { photoworkId: id, juryId: jury.id }
      });

      if (!rateRecord) {
        rateRecord = await h.models.Rate.create({ photoworkId: id, juryId: jury.id, rateValue: rate })
      }



      rateRecord.rateValue = rate;

      await rateRecord.save();
      console.log(rateRecord)
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
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const contestQuery = `
        SELECT
          contests.id
        FROM
          contests
          LEFT JOIN salones ON contests.salone_id = salones.id and salones."domain"=:domain
          LEFT JOIN organizers AS o on salones.organizer_id=o.id
          ORDER BY
            date_start DESC
          limit 1
      `;

      const [contest] = await h.query(contestQuery, { replacements: { domain: domain} })

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
      const { sectionId } = request.params;
      const userId = get('request.auth.credentials.id', h) || -1;
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const contestQuery = `
        SELECT
          contests.id
        FROM
          contests
          LEFT JOIN salones ON contests.salone_id = salones.id and salones."domain"=:domain
          LEFT JOIN organizers AS o on salones.organizer_id=o.id
          ORDER BY
            date_start DESC
          limit 1
      `;

      const [contest] = await h.query(contestQuery, { replacements: { domain: domain} })

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
          contestId: contest.id,
          moder: MODER_ACCEPTED
        }
      });

      const total = await h.query(totalQuery, {
        replacements: {
          contestId: contest.id,
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
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const contestQuery = `
        SELECT
          contests.date_stop
        FROM
          contests
          LEFT JOIN salones ON contests.salone_id = salones.id and salones."domain"=:domain
          LEFT JOIN organizers AS o on salones.organizer_id=o.id
          ORDER BY
            date_start DESC
          limit 1
      `;

      const [contest] = await h.query(contestQuery, { replacements: { domain: domain} })

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
      const userId = get('request.auth.credentials.id', h) || -1;
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const contestQuery = `
        SELECT
          contests.id, contests.short_best_count
        FROM
          contests
          LEFT JOIN salones ON contests.salone_id = salones.id and salones."domain"=:domain
          LEFT JOIN organizers AS o on salones.organizer_id=o.id
          ORDER BY
            date_start DESC
          limit 1
      `;

      const [contest] = await h.query(contestQuery, { replacements: { domain: domain} })
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
          limit: contest.shortBestCount
        }
      });

      return rates.map(p => ({...p, filename: getUploadFilePath(p.filename)}));
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
];


