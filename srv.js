require('dotenv').config();
const jwt = require('jsonwebtoken');
const Hapi = require('@hapi/hapi');
const models = require('./models');
const fs = require('fs');
const getPath = require('crocks/Maybe/getPath');
const hapiSwagger = require('hapi-swagger');
const pack = require('./package');
const {nth, split, isObject} = require('lodash/fp');
const L = require('lodash/fp');
const routes = require('./routes');
const {getRole} = require('./hapi_server/routes/services/permissions');
const {getCurrentDomain} = require('./hapi_server/routes/utils/getCurrentDomain');
models.initConnection();

const { permissions, checkPermission } = require('./perm/p');


const query = async (sql, options) => {
  const [rows] = await models.sequelize.query(sql, options);
  return L.map(L.mapKeys(toCamel), rows);
}

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

const init = async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], 
        credentials: true 
      }
    }
  });

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: pack.version,
    }
  };
  await server.register([
    require('@hapi/inert'),
    require('@hapi/vision'),
    {
      plugin: hapiSwagger,
      options: swaggerOptions
    }
  ])


  const can = (domain, role, subject, object, action) => {
    if (role === 'superAdmin') return true;

    
    if (role === 'admin') {
      return 1;
    }


  };

  server.decorate('toolkit', 'query', query);
  server.decorate('toolkit', 'models', models);
  server.decorate('toolkit', 'can', can);

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
    validateFunc: async (request, session) => {
      const {tok} = session;
      let routeRole = '';

      if (tok) {
        const user = jwt.verify(tok, process.env.API_TOKEN);
        const u = await models.User.findOne({
          where: {
            id: user.id
          }});

        const domain = getCurrentDomain(request);

        const role = await getRole(u, domain);
        return { valid: u && !!u.id, credentials: {...user, permissions: permissions[role] }};
      }

      return { valid: routeRole === '' };
    }
  });

  server.auth.default('session');

  server.state('token', {
    ttl: null,
    isSecure: false,
    isHttpOnly: false,
    encoding: 'base64',
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
