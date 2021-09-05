const {compose, nth, split} = require('lodash/fp');

module.exports = [
  {
    method: 'GET',
    path: '/api/sections',
    handler: async function (request, h) {
      const domain = request.info.referrer.includes('5000') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const query = `
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
          sections.contest_id = contests.id
       `;

      const info = await h.query(query, {
        replacements: {
          domain
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
];

