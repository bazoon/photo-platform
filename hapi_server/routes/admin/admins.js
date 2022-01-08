const models = require('../../../models');
const R = require('ramda');
const compose = require('crocks/helpers/compose');
const Async = require('crocks/Async');
const toPromise = require('crocks/Async/asyncToPromise');
const map = require('crocks/pointfree/map')
const get = require('lodash/fp/get');

const fields = [
  'organizerId',
  'userId',
  'admType'
];

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
      tags: ['api'],
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
      tags: ['api'],
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
      tags: ['api'],
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
      tags: ['api'],
      auth: {
        mode: 'required'
      },
    }
  }
];

