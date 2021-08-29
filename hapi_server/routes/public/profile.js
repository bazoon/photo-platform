const Router = require('koa-router');
const router = new Router();
const permissions = require('../services/permissions');
const bcrypt = require('bcryptjs');
const {get} = require('lodash/fp');

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
        phone
      FROM
        users
      WHERE
        users.id = :userId
    `;

      const info = await h.query(query, {replacements: {userId: user.id}})
      return info[0];
    },
    options: {
      auth: {
        mode: 'optional'
      },
    }
  },
  {
    method: 'POST',
    path: '/api/profile',
    handler: async function (request, h) {
      const credentials = get('auth.credentials', request);
      const {payload} = request;
      const {password, newPassword} = payload;
      delete payload.password;

      const user = await h.models.User.findOne({where: {id: credentials.id}});
      try {
        if (password && newPassword) {
          bcrypt.compare(password, user.psw)
          var salt = bcrypt.genSaltSync(10);
          user.psw = bcrypt.hashSync(newPassword, salt);
        }
        await h.models.User.update(payload, {where: {id: credentials.id}})

        return user;
      } catch (e) {
        return {ok: false, e}
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
        mode: 'optional'
      }
    }
  },
]
;

