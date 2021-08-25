const JSONdb = require('simple-json-db');
const db = new JSONdb('/path/to/your/database.json');
const path = require('path');


module.exports = [
  {
    method: 'GET',
    path: '/api/admin/config',
    handler: async function (request, h) {
      var db = new JSONdb(path.resolve(__dirname, '../../../config/site_config.json'));
      const foo = db.get('options');
      return foo;
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
      console.log(request.payload, 222)

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







