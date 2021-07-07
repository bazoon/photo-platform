const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');
const compose = require('crocks/helpers/compose');
const Async = require('crocks/Async');
const toPromise = require('crocks/Async/asyncToPromise');
const map = require('crocks/pointfree/map')
const chain = require('crocks/pointfree/chain');
const identity = require('crocks/combinators/identity');
const get = require('lodash/fp/get');

const fields = [
  'organizerId',
  'userId',
  'admType'
];

router.get('/', async ctx => {
  const query = `select first_name, last_name, admins.user_id, adm_type, organizers.name, organizers.id as organizer_id, adm_type
    from users, organizers, admins where admins.user_id=users.id and admins.organizer_id=organizers.id
  `;


  const [admins] = await models.sequelize.query(query);

  ctx.body = admins.map(admin => {
    return {
      userId: admin.user_id,
      organizerId: admin.organizer_id,
      user: admin.first_name + ' ' + admin.last_name,
      organizer: admin.name,
      admType: admin.adm_type
    };
  });
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const adminValues = R.pick(fields, ctx.request.body);

  const admin = await models.Admin.findOne({
    where: {
      userId: id
    }
  });

  await admin.update(adminValues);
  ctx.body = await getAdmin(admin);
});

router.post('/', async ctx => {
  const adminValues = R.pick(fields, ctx.request.body);
  let admin = await models.Admin.create(adminValues);
  ctx.body = await getAdmin(admin);
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;

  await models.Admin.destroy({
    where: {
      userId: id
    }
  });

  ctx.body = {};
});

async function getAdmin(adminRecord) {
  const query = `select first_name, last_name, admins.user_id, adm_type, organizers.name, organizers.id as organizer_id, adm_type
    from users, organizers, admins where admins.user_id=users.id and admins.organizer_id=organizers.id and user_id=:id
  `;
  const [[admin]] = await models.sequelize.query(query, {
    replacements: {
      id: adminRecord.userId
    }
  });



  return {
    userId: admin.user_id,
    organizerId: admin.organizer_id,
    user: admin.first_name + ' ' + admin.last_name,
    organizer: admin.name,
    admType: admin.adm_type
  }
}

module.exports =  [
  {
    method: 'GET',
    path: '/api/admin/admins',
    handler: async function (request, h) {
      const q = h.sql`select CONCAT(first_name, ' ', last_name) as user, admins.user_id, adm_type, organizers.name as organizer,
        organizers.id as organizer_id, adm_type from users, organizers, admins where admins.user_id=users.id
        and admins.organizer_id=organizers.id`
      const {rows} = await h.pool.query(q);
      return rows;
    },
    options: {
      auth: {
        mode: 'required'
      },
    }
  },
  {
    method: 'GET',
    path: '/api/admin/admins/{id}',
    handler: async function (request) {
      const { id } = request.params;
      const query = `select first_name, last_name, admins.user_id, adm_type, organizers.name, organizers.id as organizer_id, adm_type
    from users, organizers, admins where admins.user_id=users.id and admins.organizer_id=organizers.id and admins.user_id=:id
  `;

      console.log(139139)
      const run = () => models.sequelize.query(query, {
        replacements: {
          id  
        }
      });

      const m = admin => ({
        id: admin.user_id,
        organizerId: admin.organizer_id,
        user: admin.first_name + ' ' + admin.last_name,
        organizer: admin.name,
        admType: admin.adm_type
      });

      const r = compose(
        toPromise,
        map(m),
        map(get('[0][0]')),
        e => e(),
        Async.fromPromise
      )(run)

      return r;
    },
    options: {
      auth: {
        mode: 'required'
      },
    }
  },
  {
    method: 'POST',
    path: '/api/admin/admins',
    handler: async function (request, h) {
      const adminValues = R.pick(fields, request.payload);
      let admin = await h.models.Admin.create(adminValues);
      return await getAdmin(admin);
    },
    options: {
      auth: {
        mode: 'required'
      },
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/admins/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const values = R.pick(fields, request.payload);

      const admin = await h.models.Phrase.findOne({
        where: { id }
      });

      await admin.update(values);
      return await getAdmin(admin);
    },
    options: {
      auth: {
        mode: 'required'
      },
    }
  }
];

