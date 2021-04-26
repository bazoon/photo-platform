const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');

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
  console.log(id, adminValues);

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
      const query = `select first_name, last_name, admins.user_id, adm_type, organizers.name, organizers.id as organizer_id, adm_type
    from users, organizers, admins where admins.user_id=users.id and admins.organizer_id=organizers.id
  `;
      const [admins] = await models.sequelize.query(query);

      return admins.map(admin => {
        return {
          id: admin.user_id,
          organizerId: admin.organizer_id,
          user: admin.first_name + ' ' + admin.last_name,
          organizer: admin.name,
          admType: admin.adm_type
        };
      });
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
      const adminValues = R.pick(fields, request.payload);

      const admin = await models.Admin.findOne({
        where: {
          userId: id
        }
      });

      await admin.update(adminValues);
      return await getAdmin(admin);
    },
    options: {
      auth: {
        mode: 'required'
      },
    }
  }
];

