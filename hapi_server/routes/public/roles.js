const Router = require('koa-router');
const router = new Router();
const permissions = require('../services/permissions');

const {get} = require('lodash/fp');

module.exports =  {
  method: 'GET',
  path: '/api/roles',
  handler: async function (request, h) {
    // const { host } = request.info;
    const user = get('auth.credentials', request);

    console.log(request.auth)

    return {role: user && user.role};
  },
  options: {
    auth: {
      mode: 'optional'
    },
  }
};

