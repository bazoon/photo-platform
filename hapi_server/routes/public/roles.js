const Router = require('koa-router');
const router = new Router();
const permissions = require('../services/permissions');

router.get('/', async ctx => {
});

const models = require('../../../models');

module.exports =  {
  method: 'GET',
  path: '/api/roles',
  handler: async function (request, h) {
    const { host } = request.info;
    const {user} = request.auth.credentials;

    const [domain] = host.split(':');
    return { role: await permissions.getRole(user, domain) };
  },
  options: {
    auth: {
      mode: 'required'
    },
  }
};

