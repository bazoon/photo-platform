require('dotenv').config();
const jwt = require('jsonwebtoken');
const flatten = require('ramda/src/flatten');
const Hapi = require('@hapi/hapi');
const roles = ['SUPERADMIN', 'ADMIN', 'MODER', 'USER', 'ANON'];
const models = require('./models');
const get = require('lodash/fp/get');

const can = (userRole, routeRole) => !routeRole || roles.indexOf(userRole) < roles.indexOf(routeRole);

const routes = flatten([
  require('./hapi_server/routes/public/translation'),
  require('./hapi_server/routes/login'),
  require('./hapi_server/routes/public/staticMenu'),
  require('./hapi_server/routes/public/thesis'),
  require('./hapi_server/routes/admin/users'),
  require('./hapi_server/routes/public/roles'),
  require('./hapi_server/routes/admin/admins'),
  require('./hapi_server/routes/admin/organizers'),
]);

const init = async () => {

  const server = Hapi.server({
    port: 7000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // an array of origins or 'ignore'    
        credentials: true // boolean - 'Access-Control-Allow-Credentials'
      }
    }
  });

  await server.register(require('@hapi/cookie'));
  
  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'tok',
      password: process.env.API_TOKEN,
      isSecure: true
    },
    validateFunc: async (request, {tok}) => {
      let routeRole = '';
      if (tok) {
        const user = jwt.verify(tok, process.env.API_TOKEN);
        const u = await models.User.findOne({
          where: {
            id: user.id
          }});

        const userRole = ['SUPERADMIN', 'ADMIN', 'MODER', 'USER'][u.userType] || 'ANON';
        routeRole = get('route.settings.plugins.role', request) || 'ANON';
        
        console.log(userRole, routeRole);

        return { valid: can(userRole, routeRole), credentials: { user }, role: userRole };
      }
      return { valid: routeRole === '' };
    }
  });

  server.auth.default('session');

  server.state('token', {
    ttl: null,
    isSecure: false,
    isHttpOnly: false,
    encoding: 'base64json',
    clearInvalid: true,
    strictHeader: false,
    isSameSite: false
  });

  server.route(routes);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err,2);
  process.exit(1);
});

init();
