const {get, split, nth, compose} = require('lodash/fp');

module.exports = [
  {
    method: 'GET',
    path: '/api/salones/about',
    handler: async function (request, h) {
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);
      const lang = request.params.lang || 'ru';

      if (!domain) {
        return {};
      }

      const query = `
        select content from salone_abouts, salones
        where salone_abouts.salone_id=salones.id and salones.domain='foto.ru'
      `;
      const info = await h.query(query, {
        replacements: {
          domain,
        }
      });

      return get('[0]', info) || '';
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
];

