const {get, split, nth, compose} = require('lodash/fp');

module.exports = [
  {
    method: 'GET',
    path: '/api/salones/about/{lang}',
    handler: async function (request, h) {
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);
      const lang = request.params.lang || 'ru';

      if (!domain) {
        return {};
      }

      const query = `
        select content from salone_abouts, salones, languages
        where salone_abouts.salone_id=salones.id and salones.domain=:domain
        and short = :lang and salone_abouts.language_id = languages.id
      `;

      const info = await h.query(query, {
        replacements: {
          domain,
          lang
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

