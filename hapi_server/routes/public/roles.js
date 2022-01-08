const {get} = require('lodash/fp');

module.exports =  {
  method: 'GET',
  path: '/api/roles',
  handler: async function (request, h) {
    // const { host } = request.info;
    const user = get('auth.credentials', request);
    return {role: user && user.role};
  },
  options: {
    tags: ['api'],
    auth: {
      mode: 'optional'
    },
  }
};

