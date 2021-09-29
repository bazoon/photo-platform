const Router = require('koa-router');
const router = new Router();
const permissions = require('../services/permissions');
const bcrypt = require('bcryptjs');
const {get, pick} = require('lodash/fp');
const uploadFiles = require('../utils/uploadFiles');
const getUploadPath = require('../utils/getUploadPath');
const camelizeObject = require('../utils/camelizeObject');

const getUserInfo = async (userId, query) => {
  const sql = `
    SELECT
      users.id,
      first_name,
      last_name,
      avatar,
      email,
      phone,
      avatar,
      countries.id as country_id,
      address,
      post_index,
      birthday,
      biography,
      memo_field,
      awards,
      memo_field
    FROM
      users, customers, countries
    WHERE
      users.id = :userId and
      customers.user_id = :userId and
      countries.id = customers.country_id
  `;

  const info = await query(sql, {replacements: {userId}})
  return camelizeObject({...info[0], avatar: getUploadPath(get('[0].avatar', info))});
}

module.exports = [
  {
    method: 'GET',
    path: '/api/profile',
    handler: async function (request, h) {
      const user = get('auth.credentials', request);
      return await getUserInfo(user.id, h.query);
    },
    options: {
      auth: {
        mode: 'required'
      },
    }
  },
  {
    method: 'POST',
    path: '/api/profile',
    handler: async function (request, h) {
      const credentials = get('auth.credentials', request);
      const userId = credentials.id;
      const {payload} = request;
      const {password, newPassword} = payload;
      const {avatar} = payload;
      if (avatar) {
        await uploadFiles(avatar);
      } else {
        delete payload.avatar;
      }
      
      payload.avatar = avatar && avatar.filename;
      delete payload.password;

      const user = await h.models.User.findOne({where: {id: credentials.id}});
      try {
        if (password && newPassword) {
          bcrypt.compare(password, user.psw)
          var salt = bcrypt.genSaltSync(10);
          user.psw = bcrypt.hashSync(newPassword, salt);
        }

        await h.models.User.update(payload, {where: {id: userId }});

        let customer = await h.models.Customer.findOne({where: { userId }});

        const customerPayload = {userId, ...pick(['countryId', 'userId', 'address', 'postIndex', 'memoField', 'birthday'])(payload)};

        if (customer) {
          console.info('update');
          customer = await h.models.Customer.update(customerPayload, {where: { userId } })
        } else {
          console.info('Create');
          customer = await h.models.Customer.create({...customerPayload, userId}, {where: { userId } })
        }

        if (avatar) {
          user.avatar = getUploadPath(avatar.filename);
        }

        customer = await h.models.Customer.findOne({where: { userId }});

        console.info(customer);

        return {...customer.dataValues, ...user.dataValues};
      } catch (e) {
        return {ok: false, e: e.message}
      } 
    },
    options: {
      payload: {
        parse: true,
        output: 'file',
        allow: 'multipart/form-data',
        multipart: true
      },
      auth: {
        mode: 'required'
      }
    }
  },
]
;

