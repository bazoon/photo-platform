const {get, split, nth, compose} = require('lodash/fp');
const {getCurrentDomain} = require('../utils/getCurrentDomain');

module.exports = [
  {
    method: 'GET',
    path: '/api/salones/about/{lang}',
    handler: async function (request, h) {
      const domain = getCurrentDomain(request);
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
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
];

