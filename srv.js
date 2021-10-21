require('dotenv').config();
const jwt = require('jsonwebtoken');
const Hapi = require('@hapi/hapi');
const roles = ['SUPERADMIN', 'ADMIN', 'MODER', 'USER', 'ANON'];
const models = require('./models');
const fs = require('fs');

const hapiSwagger = require('hapi-swagger');
const pack = require('./package');

models.initConnection();

const {nth, split} = require('lodash/fp');
const {compose} = require('crocks');
const L = require('lodash/fp');
const routes = require('./routes');
const { newEnforcer, StringAdapter } = require('casbin')


const {getRole} = require('./hapi_server/routes/services/permissions');
const query = async (sql, options) => {
  const [rows] = await models.sequelize.query(sql, options);
  return L.map(L.mapKeys(toCamel), rows);
}

async function getEnforcer() {
  const adminsQuery = `
    select nick_name from admins, users where admins.user_id=users.id and adm_type=:admType
  `;

  const salonesQuery = `
    select nick_name, adm_type, domain, salones.name as salone
    from users, admins, salones
    where users.id=admins.user_id and salones.organizer_id=admins.organizer_id and adm_type=:admType
  `;

  const usersQuery = `
    select distinct domain from salones
  `

  const actions = ['create', 'view', 'update', 'delete'];

  const admins = await query(adminsQuery, {replacements: {admType: 0}});
  const moders = await query(adminsQuery, {replacements: {admType: 1}});
  const saloneAdmins = await query(salonesQuery, {replacements: {admType: 1000}});
  const saloneModers = await query(salonesQuery, {replacements: {admType: 1010}});
  const domainUsers = await query(usersQuery);

  const adminObjects = ['settings', 'moders', 'jury', 'contests', 'content', 'applications', 'review', 'stats'];
  const moderObjects = ['settings', 'jury', 'content', 'applications', 'review', 'stats'];
  const userObjects = ['profile', 'meta', 'applications'];
 
  const userPolicies = domainUsers.map(({domain}) => {
    return userObjects.map(o => {
      return actions.map(a => [ 'p', 'user', domain, o, a]);
    });
  }).flat(2);

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
    return ['g', nickName, 'admin',];
  });

  const moderGroups = moders.map(({nickName}) => {
    return ['g', nickName, 'moder'];
  });

  const saloneModerGroups = saloneModers.map(({nickName, domain}) => {
    return ['g', nickName, 'moder', domain,];
  });

  const saloneAdminGroups = saloneAdmins.map(({nickName, domain}) => {
    return ['g', nickName, 'admin', domain,];
  });



  const policy = (
      moderPolicies
      .concat(userPolicies)
      .concat(saloneAdminPolicies)
      .concat(saloneModerPolicies)
      .concat(adminGroups)
      .concat(moderGroups)
      .concat(saloneAdminGroups)
      .concat(saloneModerGroups)
  ).map(p => p.join(', ')).join('\n')
  fs.writeFileSync('f.txt', policy);

  return await newEnforcer('./perm/model.conf', new StringAdapter(policy));
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
        origin: ['*'], // an array of origins or 'ignore'    
        credentials: true // boolean - 'Access-Control-Allow-Credentials'
      }
    }
  });



  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: pack.version,
    }
  };
  console.log(hapiSwagger)
  await server.register([
    require('@hapi/inert'),
    require('@hapi/vision'),
    {
      plugin: hapiSwagger,
      options: swaggerOptions
    }
  ])


  server.decorate('toolkit', 'query', query);
  server.decorate('toolkit', 'models', models);

  getEnforcer().then(async e => {
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
    validateFunc: async (request, session) => {
      const {tok} = session;
      let routeRole = '';
      if (tok) {
        const user = jwt.verify(tok, process.env.API_TOKEN);
        const u = await models.User.findOne({
          where: {
            id: user.id
          }});
        const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

        const role = await getRole(u, domain);
        const {path, method} = request.route;

        const parts = path.split('/');
        const obj = parts[parts.length - 1];
        const action = { post: 'create', put: 'update', delete: 'delete', get: 'view' }[method];

        const enforcer = await getEnforcer();
        const canDo = await enforcer.enforce(role.name, domain, obj, action);
        return { valid: canDo, credentials: {...user, role} };
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
