const {compose, nth, split, get, map} = require('lodash/fp');
const camelizeObject = require('../utils/camelizeObject');
const getUploadPath = require('../utils/getUploadPath');

module.exports = [
  {
    method: 'GET',
    path: '/api/sections',
    handler: async function (request, h) {
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }


      let query = `
        select contests.id from contests, salones
        where contests.salone_id = salones.id and salones."domain" = :domain
        order by date_start desc
        limit 1
     `;

      const contest = await h.query(query, {
        replacements: {
          domain
        }
      });
    
      query = `
        SELECT
          sections.id,
          sections.max_count_img,
          sections.name
        FROM
          contests,
          salones,
          sections
        WHERE
          contests.salone_id = salones.id and
          salones. "domain" = :domain and
          sections.contest_id = contests.id and
          sections.contest_id = :contestId
       `;

      const info = await h.query(query, {
        replacements: {
          domain,
          contestId: get('[0].id', contest)
        }
      });

      return info;
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/sections/{id}/images',
    handler: async function (request, h) {
      const {id} = request.params;
      const userId = h.request.auth.credentials.id;

      const query = `
        select
          photoworks.id,
          name,
          filename,
          year_shot as year,
          locate_shot as place
        from
          photoworks,
          registration_contests
        where
          registration_contests.user_id = :userId
          and section_id = :id
          and registration_contests.id = photoworks.registration_contest_id
      `
      return map(compose(p => ({...p, filename: getUploadPath(p.filename)}), camelizeObject), await h.query(query, {
        replacements: {
          id,
          userId
        }
      }));


    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];

