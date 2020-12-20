const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');

router.get('/:lang', async ctx => {
  const { lang } = ctx.params;
  const { host } = ctx.request.header;
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

  console.log(thesis);

  ctx.body = thesis[0];
});

module.exports = router;
