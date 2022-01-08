const permissions = require('../services/permissions');
const bcrypt = require('bcryptjs');
const {get, pick} = require('lodash/fp');
const uploadFiles = require('../utils/uploadFiles');
const getUploadPath = require('../utils/getUploadPath');
const camelizeObject = require('../utils/camelizeObject');

const getUserInfo = async (userId, query, request) => {
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
      users
      left join customers on users.id = customers.user_id
      left join countries on countries.id = customers.country_id
    WHERE
      users.id=:userId
  `;

  const info = await query(sql, {replacements: {userId}})
  return camelizeObject({...info[0], avatar: await getUploadPath(get('[0].avatar', info), request)});
}

module.exports = [
  {
    method: 'GET',
    path: '/api/profile',
    handler: async function (request, h) {
      const user = get('auth.credentials', request);
      return await getUserInfo(user.id, h.query, request);
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
    path: '/api/profile',
    handler: async function (request, h) {
      const credentials = get('auth.credentials', request);
      const userId = credentials.id;
      const {payload} = request;
      const {password, newPassword} = payload;
      const {avatar} = payload;
      if (avatar) {
        await uploadFiles(avatar, request);
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
          customer = await h.models.Customer.update(customerPayload, {where: { userId } })
        } else {
          customer = await h.models.Customer.create({...customerPayload, userId}, {where: { userId } })
        }

        if (avatar) {
          user.avatar = getUploadPath(avatar.filename, request);
        }

        customer = await h.models.Customer.findOne({where: { userId }});

        return await getUserInfo(user.id, h.query, request);
      } catch (e) {
        return {ok: false, e: e.message}
      } 
    },
    options: {
      tags: ['api'],
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

