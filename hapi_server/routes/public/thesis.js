const models = require('../../../models');

const thesis = {
  method: 'GET',
  path: '/api/thesis/{lang}',
  handler: async function (request, h) {
    const { host } = request.info;
    const { lang } = request.params;
    const [domain] = host.split(':');

    const query = `
    select thesis from salones, contests, contest_abouts, languages 
    where
      contests.salone_id = salones.id and 
      contest_abouts.contest_id = contests.id and
      contest_abouts.language_id = languages.id and 
      salones.domain = :domain and 
      languages.short = :lang and
      contests.date_start = (select max(c1.date_start) from contests c1 where c1.salone_id=salones.id)
  `;

    const [thesis] = await models.sequelize.query(query, {
      replacements: {
        domain,
        lang,
      }
    });

    return thesis[0];
  },
  options: {
    tags: ['api'],
    auth: {
      mode: 'optional'
    }
  }
};


module.exports = [thesis];


