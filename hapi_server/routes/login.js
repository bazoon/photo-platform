// const Router = require('koa-router');
// const koaBody = require('koa-body');
// const router = new Router();
// const uploadFiles = require('../utils/uploadFiles');
// const getUploadFilePath = require('../utils/getUploadPath');
const models = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const compose = require('crocks/helpers/compose');
const tryCatch = require('crocks/Result/tryCatch');
const Async = require('crocks/Async');
const Reader = require('crocks/Reader');
const Maybe = require('crocks/Maybe');
const toPromise = require('crocks/Async/asyncToPromise');
const Pair = require('crocks/Pair');
const fst = require('crocks/Pair/fst');
const snd = require('crocks/Pair/snd');
const map = require('crocks/pointfree/map')
const resultToMaybe = require('crocks/Maybe/resultToMaybe');
const { pathLens, lens, view } = require('lodash-lens');
const resultToAsync = require('crocks/Async/resultToAsync');
const chain = require('crocks/pointfree/chain');
const identity = require('crocks/combinators/identity');
const joinM = chain(identity);
const ifElse = require('crocks/logic/ifElse');

const mail = require('./services/mail.js');
const {isEmpty} = require('lodash/fp');


const expiresIn = 24 * 60 * 60 * 30;



// router.post('/login', async ctx => {
//   const { nickName, password, remember } = typeof ctx.request.body === 'string' ? JSON.parse(ctx.request.body) : ctx.request.body;

//   const query = `
//       select id, first_name, last_name, nick_name, phone, avatar, user_type, email_state, row_state, psw from users
//       where nick_name=:nickName or email=:nickName
//   `;

//   const [users] = await models.sequelize.query(query, {
//     replacements: {
//       nickName
//     }
//   });
  
//   const user = users[0];
//   console.log(users);

//   const isValidUser = await bcrypt.compare(password, user.psw);

//   if (!isValidUser) {
//     ctx.status = 401;
//     ctx.body = {};
//     return;
//   }

//   const token = jwt.sign(
//     {
//       firstName: user.first_name,
//       lastName: user.last_name,
//       id: user.id,
//       userType: user.type
//     },
//     process.env.API_TOKEN,
//     {
//       expiresIn: expiresIn
//     }
//   );

//   ctx.cookies.set('token', token, {
//     httpOnly: false,
//     maxAge: remember && expiresIn * 1000
//   });

//   ctx.body = {
//     email: user.email,
//     firstName: user.first_name,
//     lastName: user.last_name,
//     nickName: user.nick_name,
//     phone: user.phone,
//     avatar: getUploadFilePath(user.avatar),
//     userType: user.user_type,
//     emailState: user.email_state,
//     rowState: user.row_state,
//     token
//   };
// });

// router.post('/login-fb', async ctx => {
//   const { access_token } = ctx.request.body;

//   const { data } = await axios.get(
//     `https://graph.facebook.com/me?access_token=${access_token}&fields=first_name,last_name,email,id`
//   );

//   const { email, first_name, last_name } = data;

//   var salt = bcrypt.genSaltSync(10);
//   var hashedPassword = bcrypt.hashSync(Math.round() + '', salt);

//   let user = await models.User.findOne({
//     where: {
//       email
//     }
//   });

//   if (!user) {
//     user = await models.User.create({
//       email,
//       firstName: first_name,
//       lastName: last_name,
//       nickName: first_name,
//       avatar: 'none',
//       salt,
//       psw: hashedPassword,
//       userType: 1,
//       emailState: 0,
//       rowState: 0
//     });
//   }

//   const token = jwt.sign(
//     {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       id: user.id,
//       userType: user.type
//     },
//     process.env.API_TOKEN,
//     {
//       expiresIn: expiresIn
//     }
//   );

//   ctx.cookies.set('token', token, { httpOnly: false });
//   ctx.body = {
//     email: user.email,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     nickName: user.nickName,
//     phone: user.phone,
//     avatar: getUploadFilePath(user.avatar),
//     userType: user.userType,
//     emailState: user.emailState,
//     rowState: user.rowState,
//     token
//   };
// });

// router.post('/login-vk', async ctx => {
//   const { access_token, user_id, email } = ctx.request.body;

//   var salt = bcrypt.genSaltSync(10);
//   var hashedPassword = bcrypt.hashSync(Math.random() + '', salt);
//   // const { data } = await axios.get(
//   //   `https://api.vk.com/method/users.get?user_ids=${user_id}&access_token=${access_token}&v=5.102`
//   // );
//   // const { first_name, last_name } = data.response[0];

//   let user = await models.User.findOne({
//     where: {
//       email
//     }
//   });

//   if (!user) {
//     user = await models.User.create({
//       email,
//       firstName: email,
//       lastName: '',
//       nickName: email,
//       avatar: 'none',
//       salt,
//       psw: hashedPassword,
//       userType: 1,
//       emailState: 0,
//       rowState: 0
//     });
//   }

//   const token = jwt.sign(
//     {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       id: user.id,
//       userType: user.type
//     },
//     process.env.API_TOKEN,
//     {
//       expiresIn: expiresIn
//     }
//   );

//   ctx.cookies.set('token', token, { httpOnly: false });

//   ctx.body = {
//     email: user.email,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     nickName: user.nickName,
//     phone: user.phone,
//     avatar: getUploadFilePath(user.avatar),
//     userType: user.userType,
//     emailState: user.emailState,
//     rowState: user.rowState,
//     token
//   };
// });

// router.post('/login-google', async ctx => {
//   const { access_token } = ctx.request.body;

//   var salt = bcrypt.genSaltSync(10);
//   var hashedPassword = bcrypt.hashSync(Math.random() + '', salt);
//   const { data } = await axios.get(
//     'https://www.googleapis.com/oauth2/v3/userinfo',
//     {
//       headers: {
//         Authorization: `Bearer ${access_token}`
//       }
//     }
//   );

//   const { email, given_name, family_name } = data;

//   let nickName;

//   let user = await models.User.findOne({
//     where: {
//       email
//     }
//   });

//   if (!user) {
//     user = await models.User.create({
//       email,
//       firstName: given_name,
//       lastName: family_name,
//       nickName: given_name,
//       avatar: 'none',
//       salt,
//       psw: hashedPassword,
//       userType: 1,
//       emailState: 0,
//       rowState: 0
//     });
//   }

//   const token = jwt.sign(
//     {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       id: user.id,
//       userType: user.type
//     },
//     process.env.API_TOKEN,
//     {
//       expiresIn: expiresIn
//     }
//   );

//   ctx.cookies.set('token', token, { httpOnly: false });

//   ctx.body = {
//     email: user.email,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     nickName: user.nickName,
//     phone: user.phone,
//     avatar: getUploadFilePath(user.avatar),
//     userType: user.userType,
//     emailState: user.emailState,
//     rowState: user.rowState,
//     token
//   };
// });

// router.post('/logout', async ctx => {
//   ctx.cookies.set('token', null, { httpOnly: false });
//   ctx.body = {};
// });

// router.post('/restorePassword', async ctx => {
//   const { email } = ctx.request.body;
//   const { host } = ctx.request.header;
//   const [domain] = host.split(':');
 
//   const user = await models.User.findOne({
//     where: {
//       email
//     }
//   });

//   const token = jwt.sign(
//     {
//       id: user.id,
//     },
//     process.env.API_TOKEN,
//     {
//       expiresIn: expiresIn
//     }
//   );

//   const link = `https://${domain}/change-password/${token}`;

//   const config = {
//     host: process.env.MAIL_HOST,
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//     from: 'admin@fotoregion.site',
//     to: email,
//     subject: 'Ссылка для смены пароля',
//     html: `
//       <!doctype html>
//       <html lang="en">
//         <head>
//           <meta charset="utf-8">
//           <title>Fotoregion</title>
//         </head>
//         <body>
//           для смены пароля нажмите на <a href="${link}">ссылку</a>
//         </body>
//       </html>
//     `,
//     text:`
//       <!doctype html>
//       <html lang="en">
//         <head>
//           <meta charset="utf-8">
//           <title>Fotoregion</title>
//         </head>
//         <body>
//           для смены пароля нажмите на <a href="${link}">ссылку</a>
//           ${link}
//         </body>
//       </html>
//     `,
//   };

//   mail.send(config);



//   ctx.body = {
//   };
// });

// router.post('/changePassword', async ctx => {
//   const { password, token } = ctx.request.body;

//   try {
//     const {id} = jwt.verify(token, process.env.API_TOKEN);

//     const user = await models.User.findOne({
//       where: {
//         id
//       }
//     });

//     var salt = bcrypt.genSaltSync(10);
//     var hashedPassword = bcrypt.hashSync(password, salt);

//     user.psw = hashedPassword;
//     user.salt = salt;
//     await user.save();

//     ctx.body = {
//       ok: true
//     };

//   } catch(e) {
//     ctx.body = {
//       ok: false,
//       message: e.message
//     };
//   }

// });



function signToken(user) {
  return jwt.sign(
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
}

const login2 = {
  method: 'GET',
  path: '/api/login2',
  handler: async function(request, h) {
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync('111', salt);

    const user = await models.User.findOne({
      where: {
        id: 1
      }
    });

    user.psw = hashedPassword;
    user.salt = salt;
    console.log(user);

    await user.save();
    return user;
  },
  options: {
    auth: {
      mode: 'optional'
    },
    plugins: {
      role: 'ADMIN'
    }
  }
}

const log = (a) => {
  console.log(a.inspect && a.inspect());
  return a;
}

const login = {
  method: 'POST',
  path: '/api/login',
  handler: async function (request, h) {
    const runn = Async.fromPromise(nickName => h.query('select * from users where nick_name=:nickName', {replacements: {nickName}}));
    const r = compose(
      joinM,
      map(map(user => ({user, token: signToken(user) }))),
      map(({user, r}) => r ? Async.Resolved(user) : Async.Rejected(401)),
      chain(({user, p}) => Async((_, res) => bcrypt.compare(p.password, user.psw).then(r => res({user, r})))),
      joinM,
      map(p => runn(p.nickName).chain(o => o[0] ? Async.Resolved({user: o[0], p}) : Async.Rejected('Неправильный логин или пароль!'))),
      Async.Resolved 
    )(request.payload)

    return new Promise((res) => {
      r.fork((e) => {
        res(h.response({error: e}).code(401));
      }, ({user, token}) => {
        request.cookieAuth.set({ tok: token });
        res(user);
      })
    });
  },
  options: {
    auth: {
      mode: 'optional'
    },
    plugins: {'hapiAuthorization': false},
  }
};


const signup = {
  method: 'POST',
  path: '/api/signup',
  handler: async function (request, h) {
    const {
      email,
      firstName,
      lastName,
      password,
      nickName,
      phone
    } = request.payload;

  
    // const [domain] = request.info.hostname.split(':');

    const domain = 'foto.ru:3000'

    // const { avatar } = ctx.request.files;
    // const files = avatar ? (Array.isArray(avatar) ? avatar : [avatar]) : [];
    // await uploadFiles(files);

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    const user = await models.User.create({
      email,
      firstName,
      lastName,
      nickName,
      phone,
      // avatar: avatar && avatar.name,
      salt,
      psw: hashedPassword,
      userType: 1,
      emailState: 0,
      rowState: 0
    });

    const token = signToken(user);
    const link = `https://${domain}/confirm-email/${token}`;

    const config = {
      host: process.env.MAIL_HOST,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
      from: 'admin@fotoregion.site',
      to: email,
      subject: 'Ссылка для регистрации',
      html: `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Fotoregion</title>
        </head>
        <body>
          для подтверждения регистрации нажмите на <a href="${link}">ссылку</a>
        </body>
      </html>
    `,
      text:`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Fotoregion</title>
        </head>
        <body>
          для подтверждения регистрации нажмите на <a href="${link}">ссылку</a>
          ${link}
        </body>
      </html>
    `,
    };
    

    // select *from users order by id desc;

    // delete from users where id=2;
    
    mail.send(config);
    
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      nickName: user.nickName,
      phone: user.phone,
      // avatar: user.avatar && getUploadFilePath(user.avatar),
      // userType: user.userType,
      emailState: user.emailState,
      rowState: user.rowState,
      token
    };
  

  },
  options: {
    auth: {
      mode: 'optional'
    },
    plugins: {'hapiAuthorization': false},
  }
};

const confirm = {
  method: 'POST',
  path: '/api/confirm-email',
  handler: async function (request, h) {
    const {
      token
    } = request.payload;

    try {
      const {id} = jwt.verify(token, process.env.API_TOKEN);

      if (!id) {
        return {
          ok: false,
          message: 'user not found'
        };
      }

      request.cookieAuth.set({ tok: token });

      const user = await models.User.findOne({
        where: {
          id
        }
      });
      
      user.emailState = 1;
      await user.save();

      request.cookieAuth.set({ tok: token });
      return {
        ok: true,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        nickName: user.nickName,
        phone: user.phone,
        emailState: user.emailState,
        rowState: user.rowState,
      };
    } catch(e) {
      return {
        ok: false,
        message: e.message
      };
    }
  },
  options: {
    auth: {
      mode: 'optional'
    },
    plugins: {'hapiAuthorization': false},
  }
};


const logout = {
  method: 'POST',
  path: '/api/logout',
  handler: async function (request) {
    request.cookieAuth.clear();
    return {ok: true};
  },
  options: {
    auth: {
      mode: 'optional'
    },
    plugins: {'hapiAuthorization': false},
  }
};



module.exports = [login, login2, signup, confirm, logout];
