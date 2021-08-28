const JSONdb = require('simple-json-db');
const path = require('path');


module.exports = [
  {
    method: 'GET',
    path: '/api/admin/config',
    handler: async function (request, h) {
      var db = new JSONdb(path.resolve(__dirname, '../../../config/site_config.json'));
      const schemeDb = new JSONdb(path.resolve(__dirname, '../../../config/site_config_scheme.json'))
      const options = db.get('options');
      const scheme = schemeDb.get('properties');
      return {scheme, options};
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/config',
    handler: async function (request, h) {
      var db = new JSONdb(path.resolve(__dirname, '../../../config/site_config.json'));

      if (request.payload) {
        db.set('options', request.payload);
      }

      return {}
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  }
];







