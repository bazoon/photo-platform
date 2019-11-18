const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router();
const uploadFiles = require('../../utils/uploadFiles');
const getUploadFilePath = require('../../utils/getUploadPath');
const models = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const R = require('ramda');

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

router.get('/', async ctx => {
  const users = await models.User.findAll();

  ctx.body = users.map(user => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      nickName: user.nickName,
      avatar: user.avatar,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
      emailState: user.emailState,
      emailCode: user.emailCode,
      biography: user.biography,
      awards: user.awards,
      createdAt: user.createdAt,
      rowState: user.rowState
    };
  });
});

router.put('/:id', async ctx => {
  const { email, firstName, lastName, nickName, phone, psw } = ctx.request.body;

  const { id } = ctx.params;

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

  ctx.body = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    nickName: user.nickName,
    phone: user.phone
  };
});

router.post('/', async ctx => {
  const userValues = R.pick(postFields, ctx.request.body);
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

  ctx.body = R.pick(publicFields, salonType);
});

module.exports = router;
