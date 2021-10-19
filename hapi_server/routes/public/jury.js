const {get, split, nth, compose} = require('lodash/fp');
const getUploadFilePath = require('../utils/getUploadPath');
const MODER_ACCEPTED = 2;
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

      const query = `
        select
          photoworks.id,
          name,
          filename,
          tcontent as description,
          rate_value as rate
        from
          photoworks
          left join rates r on r.photowork_id=photoworks.id and photoworks.moder=:moder
        where
          section_id = :sectionId
      `;


      const photoworks = await h.query(query, {
        replacements: {
          sectionId,
          moder: MODER_ACCEPTED
        }
      });

      return photoworks.map(p => ({...p, filename: getUploadFilePath(p.filename)}))
    },
    options: {
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
      return rateRecord;
    },
    options: {
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

`


select
	s."name", count(r.id)
from
	sections s,
	photoworks p,
	rates r 
where
	s.contest_id = 11
	and p.section_id = s.id
	and r.photowork_id = p.id 
	and r.jury_id = 21	
group by s.name;

select
	s.name, count(p.id)
from
	sections s, photoworks p 
where
	s.contest_id = 11
	and p.section_id = s.id
group  by s.name;



`


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
      auth: {
        mode: 'optional'
      }
    }
  },
];


