const Router = require('koa-router');
const router = new Router();
const permissions = require('../services/permissions');
const bcrypt = require('bcryptjs');
const {get, pick} = require('lodash/fp');
const uploadFiles = require('../utils/uploadFiles');
const getUploadPath = require('../utils/getUploadPath');

module.exports = [
  {
    method: 'GET',
    path: '/api/profile',
    handler: async function (request, h) {
      const { host } = request.info;
      const user = get('auth.credentials', request);

      const query = `
      SELECT
        id,
        first_name,
        last_name,
        avatar,
        email,
        phone,
        avatar
      FROM
        users
      WHERE
        users.id = :userId
    `;

      const info = await h.query(query, {replacements: {userId: user.id}})
      return {...info[0], avatar: getUploadPath(get('[0].avatar', info))};
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

        console.info(customerPayload);

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
        


        return customer;
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

