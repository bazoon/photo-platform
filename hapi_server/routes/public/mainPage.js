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
    path: '/api/mainPage',
    handler: async function (request, h) {
      const domain = get(compose(nth(2), split('/')), request.info.referrer);

      if (!domain) {
        return {};
      }

      const query = `
        select contests.subname, date_start, date_stop, salones.name from contests, salones where 
        contests.salone_id = salones.id and salones."domain" = '${domain}'
        order by date_start desc
        limit 1
     `;

      const info = await h.query(query);
      return info[0];
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
];

