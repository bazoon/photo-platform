const {get, split, nth, compose, keys} = require('lodash/fp');

const fields = [
  'id',
  'saloneId',
  'subname',
  'years',
  'dateStart',
  'dateStop',
  'dateJuriEnd',
  'dateRateShow',
  'showType',
  'showRateState',
  'democraty',
  'payType',
  'sectionCount',
  'maxrate',
  'maxsize',
  'maxWeight'
];

module.exports = [
  {
    method: 'GET',
    path: '/api/applications',
    handler: async function (request, h) {
      const userId = h.request.auth.credentials.id;
      const domain = request.info.referrer.includes('3000') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const applicationQuery = `
        SELECT
          contests.id,
          registration_contests.reg_state,
          registration_contests.id,
          registration_contests.date_reg,
          registration_contests.max_count_img,
          payment
        FROM
          contests,
          salones,
          registration_contests
        WHERE
          contests.salone_id = salones.id
          AND salones. "domain" = 'foto.ru'
          AND registration_contests.contest_id = contests.id
          AND registration_contests.user_id=:userId
      `;

      const applications = await h.query(applicationQuery, {
        replacements: {
          userId,
        }
      });

      return applications;
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/applications',
    handler: async function (request, h) {
      const userId = h.request.auth.credentials.id;
      const domain = request.info.referrer.includes('3000') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      console.log(request.payload)

      const applicationQuery = `
      `;
      return {};
      // const applications = await h.query(applicationQuery, {
      //   replacements: {
      //     userId,
      //   }
      // });

      // return applications;
    },
    options: {
      payload: {
        parse: true,
        output: 'file',
        multipart: true
      },
      auth: {
        mode: 'optional'
      }
    }
  },
];

