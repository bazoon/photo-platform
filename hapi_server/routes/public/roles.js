const {get} = require('lodash/fp');

module.exports =  {
  method: 'GET',
  path: '/api/roles',
  handler: async function (request, h) {
    const user = get('auth.credentials', request);
    return { permissions: user && user.permissions, role: ''};
  },
  options: {
    tags: ['api'],
    auth: {
      mode: 'optional'
    },
  }
};

