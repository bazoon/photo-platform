require('dotenv').config();
const jwt = require('jsonwebtoken');
const Hapi = require('@hapi/hapi');
const roles = ['SUPERADMIN', 'ADMIN', 'MODER', 'USER', 'ANON'];
const models = require('./models');
const {get, curry} = require('lodash/fp');
const {compose, tryCatch, Async} = require('crocks');
const R = require('ramda');
const L = require('lodash/fp');
const routes = require('./routes');

const can = (userRole, routeRole) => !routeRole || roles.indexOf(userRole) < roles.indexOf(routeRole);

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

const pool = require('./models_objection');
const {sql} = require('slonik');
const query = async (sql, options) => {
  const [rows] = await models.sequelize.query(sql, options);
  return L.map(L.mapKeys(toCamel), rows);
}

const init = async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], // an array of origins or 'ignore'    
        credentials: true // boolean - 'Access-Control-Allow-Credentials'
      }
    }
  });


  await server.register(require('@hapi/inert'));

  server.decorate('toolkit', 'pool', pool);
  server.decorate('toolkit', 'sql', sql);
  server.decorate('toolkit', 'query', query);
  server.decorate('toolkit', 'models', models);

  await server.register(require('@hapi/cookie'));

  const preResponse = function (request, h) {
    const {response} = request;
    if (!response.isBoom) {
      return h.continue;
    }

    response.output.payload.message = response.errors || response.message;
    return h.continue
  };

  server.ext('onPreResponse', preResponse);


  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'tok',
      password: process.env.API_TOKEN,
      isSecure: true,
      ttl: 1000 * 434200
    },
    validateFunc: async (request, {tok}) => {
      let routeRole = '';
      if (tok) {
        const user = jwt.verify(tok, process.env.API_TOKEN);
        const u = await models.User.findOne({
          where: {
            id: user.id
          }});
        const userRole = ['SUPERADMIN', 'ADMIN', 'MODER', 'USER'][u && u.userType] || 'ANON';
        routeRole = get('route.settings.plugins.role', request) || 'ANON';
        return { valid: can(userRole, routeRole), credentials: user, role: userRole };
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
  console.log(err, 'unhandledRejection')
  process.exit(1);
});

init();
