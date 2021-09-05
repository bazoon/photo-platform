const models = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const compose = require('crocks/helpers/compose');
const Async = require('crocks/Async');
const map = require('crocks/pointfree/map')
const chain = require('crocks/pointfree/chain');
const identity = require('crocks/combinators/identity');
const joinM = chain(identity);
const mail = require('./services/mail.js');
const {nth, split} = require('lodash/fp');
const getUploadFilePath = require('./utils/getUploadPath');


const expiresIn = 24 * 60 * 60 * 30;


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
  handler: async function() {
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync('111', salt);

    const user = await models.User.findOne({
      where: {
        id: 1
      }
    });

    user.psw = hashedPassword;
    user.salt = salt;

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
        res({
          ...user,
          avatar: user.avatar && getUploadFilePath(user.avatar),
        });
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
  handler: async function (request) {
    const {
      email,
      firstName,
      lastName,
      password,
      nickName,
      phone
    } = request.payload;

    const domain = request.info.referrer.includes('3000') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);
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
  handler: async function (request) {
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


const checkEmail = {
  method: 'GET',
  path: '/api/checkEmail/{email}',
  handler: async function(request, h) {
    const { email } = request.params;

    const user = await h.models.User.findOne({
      where: {
        email
      }
    });

    return user && {email: 'emailExists'};
  },
  options: {
    auth: {
      mode: 'optional'
    },
    plugins: {
      role: 'ADMIN'
    }
  }
};

module.exports = [login, login2, signup, confirm, logout, checkEmail];
