const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router();
const uploadFiles = require('../utils/uploadFiles');
const getUploadFilePath = require('../utils/getUploadPath');
const models = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const mail = require('../services/mail');


const expiresIn = 24 * 60 * 60 * 30;

router.post('/register', koaBody({ multipart: true }), async ctx => {
  const {
    email,
    firstName,
    lastName,
    password,
    nickName,
    phone
  } = ctx.request.body;

  const { avatar } = ctx.request.files;
  const files = avatar ? (Array.isArray(avatar) ? avatar : [avatar]) : [];
  await uploadFiles(files);

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt);

  const user = await models.User.create({
    email,
    firstName,
    lastName,
    nickName,
    phone,
    avatar: avatar && avatar.name,
    salt,
    psw: hashedPassword,
    userType: 1,
    emailState: 0,
    rowState: 0
  });

  const token = jwt.sign(
    { firstName, lastName, id: user.id, userType: user.type },
    process.env.API_TOKEN,
    {
      expiresIn: expiresIn
    }
  );

  ctx.cookies.set('token', token, {
    httpOnly: false,
    maxAge: expiresIn * 1000
  });

  ctx.body = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    nickName: user.nickName,
    phone: user.phone,
    avatar: getUploadFilePath(user.avatar),
    userType: user.userType,
    emailState: user.emailState,
    rowState: user.rowState,
    token
  };
});

router.post('/login', async ctx => {
  const { nickName, password, remember } = ctx.request.body;

  const query = `
      select id, first_name, last_name, nick_name, phone, avatar, user_type, email_state, row_state, psw from users
      where nick_name=:nickName or email=:nickName
  `;

  const [users] = await models.sequelize.query(query, {
    replacements: {
      nickName
    }
  });
  
  const user = users[0];
  console.log(users);

  const isValidUser = await bcrypt.compare(password, user.psw);

  if (!isValidUser) {
    ctx.status = 401;
    ctx.body = {};
    return;
  }

  const token = jwt.sign(
    {
      firstName: user.first_name,
      lastName: user.last_name,
      id: user.id,
      userType: user.type
    },
    process.env.API_TOKEN,
    {
      expiresIn: expiresIn
    }
  );

  ctx.cookies.set('token', token, {
    httpOnly: false,
    maxAge: remember && expiresIn * 1000
  });

  ctx.body = {
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    nickName: user.nick_name,
    phone: user.phone,
    avatar: getUploadFilePath(user.avatar),
    userType: user.user_type,
    emailState: user.email_state,
    rowState: user.row_state,
    token
  };
});

router.post('/login-fb', async ctx => {
  const { access_token } = ctx.request.body;

  const { data } = await axios.get(
    `https://graph.facebook.com/me?access_token=${access_token}&fields=first_name,last_name,email,id`
  );

  const { email, first_name, last_name } = data;

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(Math.round() + '', salt);

  let user = await models.User.findOne({
    where: {
      email
    }
  });

  if (!user) {
    user = await models.User.create({
      email,
      firstName: first_name,
      lastName: last_name,
      nickName: first_name,
      avatar: 'none',
      salt,
      psw: hashedPassword,
      userType: 1,
      emailState: 0,
      rowState: 0
    });
  }

  const token = jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      userType: user.type
    },
    process.env.API_TOKEN,
    {
      expiresIn: expiresIn
    }
  );

  ctx.cookies.set('token', token, { httpOnly: false });
  ctx.body = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    nickName: user.nickName,
    phone: user.phone,
    avatar: getUploadFilePath(user.avatar),
    userType: user.userType,
    emailState: user.emailState,
    rowState: user.rowState,
    token
  };
});

router.post('/login-vk', async ctx => {
  const { access_token, user_id, email } = ctx.request.body;

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(Math.random() + '', salt);
  // const { data } = await axios.get(
  //   `https://api.vk.com/method/users.get?user_ids=${user_id}&access_token=${access_token}&v=5.102`
  // );
  // const { first_name, last_name } = data.response[0];

  let user = await models.User.findOne({
    where: {
      email
    }
  });

  if (!user) {
    user = await models.User.create({
      email,
      firstName: email,
      lastName: '',
      nickName: email,
      avatar: 'none',
      salt,
      psw: hashedPassword,
      userType: 1,
      emailState: 0,
      rowState: 0
    });
  }

  const token = jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      userType: user.type
    },
    process.env.API_TOKEN,
    {
      expiresIn: expiresIn
    }
  );

  ctx.cookies.set('token', token, { httpOnly: false });

  ctx.body = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    nickName: user.nickName,
    phone: user.phone,
    avatar: getUploadFilePath(user.avatar),
    userType: user.userType,
    emailState: user.emailState,
    rowState: user.rowState,
    token
  };
});

router.post('/login-google', async ctx => {
  const { access_token } = ctx.request.body;

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(Math.random() + '', salt);
  const { data } = await axios.get(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }
  );

  const { email, given_name, family_name } = data;

  let nickName;

  let user = await models.User.findOne({
    where: {
      email
    }
  });

  if (!user) {
    user = await models.User.create({
      email,
      firstName: given_name,
      lastName: family_name,
      nickName: given_name,
      avatar: 'none',
      salt,
      psw: hashedPassword,
      userType: 1,
      emailState: 0,
      rowState: 0
    });
  }

  const token = jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      userType: user.type
    },
    process.env.API_TOKEN,
    {
      expiresIn: expiresIn
    }
  );

  ctx.cookies.set('token', token, { httpOnly: false });

  ctx.body = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    nickName: user.nickName,
    phone: user.phone,
    avatar: getUploadFilePath(user.avatar),
    userType: user.userType,
    emailState: user.emailState,
    rowState: user.rowState,
    token
  };
});

router.post('/logout', async ctx => {
  ctx.cookies.set('token', null, { httpOnly: false });
  ctx.body = {};
});

router.post('/restorePassword', async ctx => {
  const { email } = ctx.request.body;
  const { host } = ctx.request.header;
  const [domain] = host.split(':');
 
  const user = await models.User.findOne({
    where: {
      email
    }
  });

  const link = `${host}/change-password/${user.id}/${user.salt}`;

  const config = {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: 'admin@fotoregion.site',
    to: email,
    subject: 'Ссылка для смены пароля',
    html: `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Fotoregion</title>
        </head>
        <body>
          для смены пароля нажмите на <a href="${link}}">ссылку</a>
        </body>
      </html>
    `
    text: `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Fotoregion</title>
        </head>
        <body>
          для смены пароля нажмите на <a href="${link}}">ссылку</a>
          ${link}
        </body>
      </html>
    `,
  };

  mail.send(config);



  ctx.body = {
  };
});




module.exports = router;
