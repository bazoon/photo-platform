require('dotenv').config();
const jwt = require('jsonwebtoken');
const Hapi = require('@hapi/hapi');
const roles = ['SUPERADMIN', 'ADMIN', 'MODER', 'USER', 'ANON'];
const models = require('./models');
const fs = require('fs');

models.initConnection();

const {get, curry} = require('lodash/fp');
const {compose, tryCatch, Async} = require('crocks');
const R = require('ramda');
const L = require('lodash/fp');
const routes = require('./routes');
const { newEnforcer, StringAdapter } = require('casbin')


const pool = require('./models_objection');
const {sql} = require('slonik');
const query = async (sql, options) => {
  const [rows] = await models.sequelize.query(sql, options);
  return L.map(L.mapKeys(toCamel), rows);
}

async function getEnforcer() {
  const q = `
    select nick_name, adm_type, domain, salones.name as salone
    from users, admins, salones
    where users.id=admins.user_id and salones.organizer_id=admins.organizer_id and adm_type=:admType
  `;

  const actions = ['create', 'view', 'update', 'delete'];

  const admins = await query(q, {replacements: {admType: 0}});
  const moders = await query(q, {replacements: {admType: 1}});
  const saloneAdmins = await query(q, {replacements: {admType: 1000}});
  const saloneModers = await query(q, {replacements: {admType: 1010}});


  const adminObjects = ['settings', 'moders', 'jury', 'contests', 'content', 'applications', 'review', 'stats'];
  const moderObjects = ['settings', 'jury', 'content', 'applications', 'review', 'stats'];
 

  const adminPolicies = actions.map(a => ['p', 'admin', '*', '*', a]);

  const moderPolicies = moderObjects.map(o => {
    return actions.map(a => [ 'p', 'moder', '*', o, a]);
  }).flat();

  const saloneModerPolicies = saloneModers.map(({domain}) => {
    return moderObjects.map(o => {
      return actions.map(a => [ 'p', 'moder', domain, o, a]);
    });
  }).flat(2);

  const saloneAdminPolicies = saloneAdmins.map(({domain}) => {
    return adminObjects.map(o => {
      return actions.map(a => [ 'p', 'admin', domain, o, a]);
    });
  }).flat(2);

  const adminGroups = admins.map(({nickName}) => {
    return ['g', nickName, 'admin', '*',];
  });

  const moderGroups = moders.map(({nickName}) => {
    return ['g', nickName, 'moder', '*',];
  });

  const saloneModerGroups = saloneModers.map(({nickName, domain}) => {
    return ['g', nickName, 'moder', domain,];
  });

  const saloneAdminGroups = saloneAdmins.map(({nickName, domain}) => {
    return ['g', nickName, 'admin', domain,];
  });

  const policy = (
    adminPolicies
      .concat(moderPolicies)
      // .concat(saloneAdminPolicies)
      // .concat(saloneModerPolicies)
      // .concat(adminGroups)
      // .concat(moderGroups)
      // .concat(saloneAdminGroups)
      // .concat(saloneModerGroups)
  ).map(p => p.join(', ')).join('\n')
  console.info(Math.random());
  console.info(policy);
  console.info(Math.random());
  // fs.writeFileSync('f.txt', policy);

  return await newEnforcer('./perm/model.conf', new StringAdapter(policy));
}

const can = (userRole, routeRole) => !routeRole || roles.indexOf(userRole) < roles.indexOf(routeRole);

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

  getEnforcer().then(async e => {
    const a = await e.enforce('vith2', 'foto.ru', 'settings', 'view');
    console.info(a);
    server.decorate('toolkit', 'enforcer', e);
  });

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
        // console.log(routeRole, userRole, request.path)
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
