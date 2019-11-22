const Router = require('koa-router');
const router = new Router();
const permissions = require('../../services/permissions');

router.get('/', async ctx => {
  const user = ctx.user;
  const { host } = ctx.request.header;
  const [domain] = host.split(':');

  ctx.body = { role: await permissions.getRole(user, domain) };
});

module.exports = router;
