const Router = require("koa-router");
const koaBody = require("koa-body");
const router = new Router();
const uploadFiles = require("../utils/uploadFiles");
const getUploadFilePath = require("../utils/getUploadPath");
const models = require("../../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const expiresIn = 24 * 60 * 60 * 30;


router.get("/", async ctx => {
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

router.put("/:id", async ctx => {
  const {
    email,
    firstName,
    lastName,
    nickName,
    phone,
  } = ctx.request.body;

  const { id } = ctx.params;

  const user = await models.User.findOne({
    where: {
      id
    }
  })

  await user.update({
    email,
    firstName,
    lastName,
    nickName,
    phone,
  });


  ctx.body = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    nickName: user.nickName,
    phone: user.phone,
  }
});


module.exports = router;
