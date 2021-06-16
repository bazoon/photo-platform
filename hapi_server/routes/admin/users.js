// const uploadFiles = require('../../utils/uploadFiles');
// const getUploadFilePath = require('../../utils/getUploadPath');
const models = require('../../../models');
const bcrypt = require('bcryptjs');
const R = require('ramda');
const L = require('lodash/fp');

const publicFields = [
  'id',
  'email',
  'firstName',
  'lastName',
  'nickName',
  'phone'
];

const postFields = [
  'id',
  'email',
  'firstName',
  'lastName',
  'nickName',
  'phone',
  'psw'
];

const users = [
  {
    method: 'GET',
    path: '/api/admin/users',
    handler: async function (request, h) {
      const u = await h.query('select * from users order by id');
      return R.map(R.omit(['psw', 'salt']), u);
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/users/{id}',
    handler: async function (request, h) {
      const { email, firstName, lastName, nickName, phone, psw } = request.payload;
      const { id } = request.params;

      const user = await models.User.findOne({
        where: {
          id
        }
      });

      await user.update({
        email,
        firstName,
        lastName,
        nickName,
        phone
      });

      if (psw) {
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(psw, salt);
        await user.update({
          psw: hashedPassword,
          salt
        });
      }

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        nickName: user.nickName,
        phone: user.phone
      };
    },
    options: {
      payload: {
        parse: true,
        output: 'data',
        allow: ['application/*+json', 'application/json']
      }, 
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/admin/users',
    handler: async function (request, h) {
      const userValues = R.pick(postFields, request.payload);
      delete userValues.id;
      var salt = bcrypt.genSaltSync(10);
      userValues.psw = bcrypt.hashSync(userValues.psw, salt);
      const salonType = await models.User.create({
        ...userValues,
        userType: 1,
        emailState: 1,
        rowState: 1,
        salt,
        avatar: ''
      });

      return R.pick(publicFields, salonType);

    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  }
];

module.exports = [users];
