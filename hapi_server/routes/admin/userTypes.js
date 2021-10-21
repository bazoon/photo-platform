const R = require('ramda');
const L = require('lodash/fp');

const users = [
  {
    method: 'GET',
    path: '/api/admin/userTypes',
    handler: async function (request, h) {
      return [
        {
          id: 0,
          name: 'admin'
        },
        {
          id: 1,
          name: 'user'
        }
      ];

    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
];

module.exports = [users];
