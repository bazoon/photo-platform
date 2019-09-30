const Router = require("koa-router");
const koaBody = require("koa-body");
const router = new Router();
const uploadFiles = require("../utils/uploadFiles");
const getUploadFilePath = require("../utils/getUploadPath");
const models = require("../../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const expiresIn = 24 * 60 * 60 * 30;


router.post("/register", koaBody({ multipart: true }), async ctx => {
  const {
    email,
    firstName,
    lastName,
    password,
    nickName,
    phone,
    agree,
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
    avatar: avatar.name,
    salt,
    psw: hashedPassword,
    userType: 1,
    emailState: 0,
    rowState: 0,
  });

  const token = jwt.sign(
    { firstName, lastName, id: user.id, userType: user.type },
    process.env.API_TOKEN,
    {
      expiresIn: expiresIn
    }
  );

  ctx.cookies.set("token", token, { httpOnly: false });

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
  }
});

router.get("/", async (ctx, next) => {
  ctx.body = {
    id: 1,
    firstName: 'John'
  };
});

router.post("/login", async ctx => {
  const {
    nickName,
    password
  } = ctx.request.body;
  console.log(nickName, password)

  const user = await models.User.findOne({
    where: {
      nickName
    }
  });

  const isValidUser = await bcrypt.compare(password, user.psw);

  if (!isValidUser) {
    ctx.status = 401;
    ctx.body = {};
    return;
  }

  const token = jwt.sign(
    { firstName: user.firstName, lastName: user.lastName, id: user.id, userType: user.type },
    process.env.API_TOKEN,
    {
      expiresIn: expiresIn
    }
  );

  ctx.cookies.set("token", token, { httpOnly: false });

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
  }
});

router.post("/logout", async ctx => {
  ctx.cookies.set("token", null, { httpOnly: false });
  ctx.body = {};
});


module.exports = router;
