const {get, split, nth, compose} = require('lodash/fp');
const {getCurrentDomain} = require('../utils/getCurrentDomain');
const {getCurrentContestIdFromRequest} = require('../utils/getCurrentSalone');

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
      const contestId = await getCurrentContestIdFromRequest(request);
      const lang = request.params.lang || 'ru';

      if (!contestId) {
        return {};
      }

      const query = `
         SELECT
            c.id AS contest_id,
            ca.name,
            date_start,
            date_stop,
            s.name salone,
            sa.name AS salone,
            ca."name",
            phone_tech,
            email_pub
          FROM
            contests as c, contest_abouts as ca, salones as s, salone_abouts as sa, organizers as o, languages as l
            where ca.contest_id=c.id and c.salone_id=s.id and s.organizer_id=o.id and  sa.salone_id=s.id and 
            ca.language_id=l.id and sa.language_id=l.id and l.short=:lang and inworknow and c.id=:contestId
      `;
      const info = await h.query(query, {
        replacements: {
          lang,
          contestId
        }
      });
      return get('[0]', info) || {};
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
];

