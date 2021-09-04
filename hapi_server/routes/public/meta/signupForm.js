/* eslint-disable no-undef */
const JSONdb = require('simple-json-db');
const path = require('path');

module.exports = [
  {
    method: 'GET',
    path: '/api/signupForm/meta',
    handler: async function (_, h) {
      var db = new JSONdb(path.resolve(__dirname, '../../../meta/signup-form-fields.json'));
      const properties = db.get('properties');
      const required = db.get('required');

      return {
        fields: properties,
        required,
      };
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  }
];







