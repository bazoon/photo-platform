const Router = require('koa-router');
const router = new Router();
const permissions = require('../services/permissions');

const {get} = require('lodash/fp');

module.exports =  {
  method: 'GET',
  path: '/api/roles',
  handler: async function (request, h) {
    const { host } = request.info;
    const user = get('auth.credentials', request);

    const [domain] = host.split(':');
    return { role: await permissions.getRole(user, domain) };
  },
  options: {
    auth: {
      mode: 'optional'
    },
  }
};

