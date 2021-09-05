const uploadFiles = require('../utils/uploadFiles');
const {get, split, nth, compose} = require('lodash/fp');

module.exports = [
  {
    method: 'POST',
    path: '/api/apply',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h);
      if (!userId) return [];

      const domain = request.info.referrer.includes('5000') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const contestsQuery = `
        SELECT
          contests.id as contest_id
        FROM
          contests,
          salones
        WHERE
          contests.salone_id = salones.id
          AND salones. "domain" = :domain
        ORDER by contests.date_start desc
        limit 1
      `;
      const contest = await h.query(contestsQuery, {
        replacements: {
          domain
        }
      });

      h.models.RegistrationContest.create({userId,  })

      return contest;
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
];

