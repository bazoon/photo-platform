const uploadFiles = require('../utils/uploadFiles');
const {get, split, nth, compose} = require('lodash/fp');

module.exports = [
  {
    method: 'POST',
    path: '/api/apply',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h);
      if (!userId) return [];

      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const {sections} = request.payload;

      const contestsQuery = `
        SELECT
          contests.id
        FROM
          contests,
          salones
        WHERE
          contests.salone_id = salones.id
          AND salones. "domain" = :domain
        ORDER by contests.date_start desc
        limit 1
      `;
      const contestId = get('[0].id', await h.query(contestsQuery, {
        replacements: {
          domain
        }
      }));

      const registrationContest = await h.models.RegistrationContest.create({userId, contestId, sectionCount: sections.length, regState: 0 })

      return registrationContest;
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
];

