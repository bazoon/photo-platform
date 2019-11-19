const Router = require('koa-router');
const router = new Router();
const models = require('../../models');

router.get('/:lang', async ctx => {
  const { lang } = ctx.params;
  const { host } = ctx.request.header;
  const [domain] = host.split(':');
  const now = new Date();

  const query = `select thesis from
    salones, contests, contest_abouts, languages where
    contests.salone_id=salones.id and contest_abouts.contest_id=contests.id and
    contest_abouts.language_id=languages.id and domain=:domain and languages.short=:lang and
    contests.date_start <=:now and contests.date_stop >=:now
  `;

  const [thesis] = await models.sequelize.query(query, {
    replacements: {
      domain,
      lang,
      now
    }
  });

  ctx.body = thesis[0];
});

module.exports = router;
