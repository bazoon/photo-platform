const flatten = require('ramda/src/flatten');


const imgRoute = {
  method: 'GET',
  path: '/uploads/{param*}',
  handler: {
    directory: {
      path: './uploads',
      listing: true
    }
  },
  options: {
    auth: {
      mode: 'optional'
    }
  }
};


const publicRoute = {
  method: 'GET',
  path: '/images/{param*}',
  handler: {
    directory: {
      path: './react-client/public'
    }
  },
  options: {
    auth: {
      mode: 'optional'
    }
  }
};


module.exports = flatten([
  require('./hapi_server/routes/public/translation'),
  require('./hapi_server/routes/login'),
  require('./hapi_server/routes/public/staticMenu'),
  require('./hapi_server/routes/public/thesis'),
  require('./hapi_server/routes/admin/users'),
  require('./hapi_server/routes/admin/userTypes'),
  require('./hapi_server/routes/public/roles'),
  require('./hapi_server/routes/admin/admins'),
  require('./hapi_server/routes/admin/organizers'),
  require('./hapi_server/routes/admin/meta/organizers'),
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
  require('./hapi_server/routes/admin/meta/salones'),
  require('./hapi_server/routes/admin/salones'),
  require('./hapi_server/routes/admin/meta/contests'),
  require('./hapi_server/routes/admin/contests'),
  require('./hapi_server/routes/admin/meta/contestsAbout'),
  require('./hapi_server/routes/admin/contestAbouts'),
  require('./hapi_server/routes/upload'),
  require('./hapi_server/routes/admin/results'),
  require('./hapi_server/routes/admin/meta/results'),
  require('./hapi_server/routes/admin/contestSections'),
  require('./hapi_server/routes/admin/contestPhotos'),
  require('./hapi_server/routes/admin/meta/contestPhotos'),
  require('./hapi_server/routes/admin/meta/jury'),
  require('./hapi_server/routes/admin/jury'),
  require('./hapi_server/routes/admin/meta/nominations'),
  require('./hapi_server/routes/admin/nominations'),
  require('./hapi_server/routes/admin/meta/nominationSections'),
  require('./hapi_server/routes/admin/nominationSections'),
  require('./hapi_server/routes/public/applications'),
  require('./hapi_server/routes/public/sections'),
  require('./hapi_server/routes/public/photoworks'),
  require('./hapi_server/routes/admin/config'),
  require('./hapi_server/routes/public/mainPage'),
  require('./hapi_server/routes/public/profile'),
  require('./hapi_server/routes/public/meta/profile'),
  require('./hapi_server/routes/public/apply'),
  imgRoute,
  publicRoute,
]);
