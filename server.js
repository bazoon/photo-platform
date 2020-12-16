require('dotenv').config();
const path = require('path');
const querystring = require('querystring');
const fs = require('fs');
const Koa = require('koa');
const cors = require('@koa/cors');
const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const serve = require('koa-static');
const send = require('koa-send');
const mount = require('koa-mount');
const koaBody = require('koa-body');
const models = require('./models');
const app = new Koa();
const https = require('https');

app.use(cors());

const http = require('http').Server(app.callback());
const apiRouter = require('./server/router');
const loginRouter = require('./server/loginRouter');
const publicRouter = require('./server/publicRouter');
const port = process.env.PORT || 7000;

// app.use(async (ctx, next) => {
//   const requestPath = ctx.request.path;
//   if (requestPath.indexOf("/oauth/vk") > 0) {
//     const { email, accessToken, user_id } = ctx.query;
//     const token = jwt.sign(
//       {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         id: user.id,
//         userType: user.type
//       },
//       process.env.API_TOKEN,
//       {
//         expiresIn: expiresIn
//       }
//     );

//     ctx.cookies.set("token", token, { httpOnly: false });

//     try {
//       jwt.verify(token, process.env.API_TOKEN);
//       console.log("token verified");
//     } catch (e) {
//       console.log("Failed verification", e);
//     }

//     if (groupName) {
//       const group = await models.ProjectGroup.findOne({
//         where: {
//           title: groupName
//         }
//       });
//       if (group) {
//         ctx.redirect(`/groups/${group.id}`);
//       } else {
//         const q = querystring.escape(groupName);
//         ctx.redirect(`/groups/new/${q}`);
//       }
//     } else {
//       const userData = getUserData(token);
//       const user = await createUserIfNotExist(userData);
//       ctx.redirect(`/admin/users/view/${user.id}`);
//     }
//   } else {
//     return await next();
//   }
// });

app.use(koaBody());
app.use(serve('client/dist/client'));
app.use(mount('/uploads', serve('uploads')));

app.use(async (ctx, next) => {
  const cookie = ctx.request.header.cookie;
  if (cookie) {
    const parts = cookie.split(';');
    const tokenPart = parts.find(p => p.indexOf('token=') >= 0);
    const token = tokenPart && tokenPart.split('=')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.API_TOKEN);
      ctx.user = decoded;
    }
  }
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.request.url.indexOf('api') < 0) {
    await send(ctx, path.resolve('/client/dist/client', 'index.html'));
  } else {
    await next();
  }
});

app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
app.use(loginRouter.routes()).use(loginRouter.allowedMethods());
app.use(koaJwt({ secret: process.env.API_TOKEN, cookie: 'token' }));
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

http.listen(port, () => console.log(`Server is running on ${port}`));
