const flatten = require('ramda/src/flatten');


const imgRoute = {
  method: 'GET',
  path: '/uploads/{param*}',
  handler: {
    directory: {
      path: './uploads'
    }
  },
  options: {
    auth: {
      mode: 'optional'
    }
  }
};

module.exports = flatten([
  imgRoute,
  require('./hapi_server/routes/public/translation'),
  require('./hapi_server/routes/login'),
  require('./hapi_server/routes/public/staticMenu'),
  require('./hapi_server/routes/public/thesis'),
  require('./hapi_server/routes/admin/users'),
  require('./hapi_server/routes/admin/userTypes'),
  require('./hapi_server/routes/public/roles'),
  require('./hapi_server/routes/admin/admins'),
  require('./hapi_server/routes/admin/organizers'),
  require('./hapi_server/routes/admin/meta/languages'),
  require('./hapi_server/routes/admin/meta/admins'),
  require('./hapi_server/routes/admin/meta/users'),
  require('./hapi_server/routes/admin/languages'),
  require('./hapi_server/routes/admin/lexicons'),
  require('./hapi_server/routes/admin/meta/lexicons'),
  require('./hapi_server/routes/admin/meta/awardTypes'),
  require('./hapi_server/routes/admin/awardTypes'),
  require('./hapi_server/routes/admin/phrases'),
  require('./hapi_server/routes/admin/meta/phrases'),
]);
