const {get, split, nth, compose} = require('lodash/fp');

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
    path: '/api/mainPage/{lang}',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h) || -1;
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);
      const lang = request.params.lang || 'ru';

      if (!domain) {
        return {};
      }

      const query = `
        SELECT
        contests.id AS contest_id,
        contest_abouts.name,
        date_start,
        date_stop,
        salones.name salone,
        sa.name AS saloneName,
        contest_abouts. "name",
        phone_tech,
        email_pub,
        sa.name AS salone_name,
        rc.id as reg_id
      FROM
        contest_abouts
        JOIN languages l ON contest_abouts.language_id = l.id and l.short=:lang
        LEFT JOIN contests ON contests.id = contest_abouts.contest_id
        LEFT JOIN salones ON contests.salone_id = salones.id and salones."domain"=:domain
        LEFT JOIN salone_abouts AS sa ON sa.salone_id = salones.id AND sa.language_id = l.id
        LEFT JOIN organizers AS o on salones.organizer_id=o.id
        LEFT JOIN registration_contests as rc on rc.user_id=1 and rc.contest_id=contests.id and rc.user_id=:userId
        ORDER BY
          date_start DESC
      `;




      const info = await h.query(query, {
        replacements: {
          lang,
          domain,
          userId
        }
      });

      return get('[0]', info);
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
];

