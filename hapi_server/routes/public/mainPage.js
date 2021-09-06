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
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);
      const lang = request.params.lang || 'ru';

      if (!domain) {
        return {};
      }

      const query = `
        select contest_abouts."name", date_start, date_stop, salones.name as salone, phone_tech, email_pub from contests, salones, contest_abouts, languages, organizers
        where contests.salone_id = salones.id and salones."domain" = :domain and
        contests.id = contest_abouts.contest_id and contest_abouts.language_id=languages.id and languages.short = :lang and
        organizers.language_id = languages.id and salones.organizer_id = organizers.id
        order by date_start desc
        limit 1
     `;

      const info = await h.query(query, {
        replacements: {
          lang,
          domain
        }
      });

      return get('[0]', info);
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
];

