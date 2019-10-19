require("dotenv").config();
const path = require("path");
const querystring = require("querystring");
const fs = require("fs");
const Koa = require("koa");
const cors = require("@koa/cors");
const koaJwt = require("koa-jwt");
const jwt = require("jsonwebtoken");
const serve = require("koa-static");
const send = require("koa-send");
const Router = require("koa-router");
const mount = require("koa-mount");
const router = new Router();
const koaBody = require("koa-body");
const models = require("./models");
const app = new Koa();

app.use(cors());

const http = require("http").Server(app.callback());
const apiRouter = require("./server/router");
const loginRouter = require("./server/loginRouter");

const port = process.env.PORT || 7000;

app.use(koaBody());
app.use(serve("client/dist/client"));
app.use(mount("/uploads", serve("uploads")));

app.use(async (ctx, next) => {
  const cookie = ctx.request.header.cookie;
  if (cookie) {
    const parts = cookie.split(";");
    const tokenPart = parts.find(p => p.indexOf("token=") >= 0);
    const token = tokenPart && tokenPart.split("=")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.API_TOKEN);
      ctx.user = decoded;
    }

  }
  await next();
});

// app.use(async (ctx, next) => {
//   await send(ctx, path.resolve("/client/dist", "index.html"));
// });


app.use(loginRouter.routes()).use(loginRouter.allowedMethods());
app.use(koaJwt({ secret: process.env.API_TOKEN, cookie: "token" }));
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

http.listen(port, () => console.log(`Server is running on ${port}`));

