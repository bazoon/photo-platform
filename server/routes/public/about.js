const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');

router.get('/', async ctx => {
  const { host } = ctx.request.header;
  const [domain] = host.split(':');

  const query = `select salones.name, content, domain from
    salones, salone_abouts where
    salones.id=salone_abouts.salone_id and domain=:domain
  `;

  const [about] = await models.sequelize.query(query, {
    replacements: {
      domain
    }
  });

  ctx.body = about[0];
});

module.exports = router;
