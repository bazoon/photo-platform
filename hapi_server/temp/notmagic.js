const fs = require('fs');
const path = require('path');


module.exports = [
  {
    method: 'GET',
    path: '/api/about-notmagic',
    handler: async function (request, h) {
      

      const source = fs.readFileSync(path.resolve(__dirname, './about.html'), 'utf-8')
      return {text: source};
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },

];


