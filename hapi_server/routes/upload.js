const Router = require("koa-router");
const koaBody = require("koa-body");
const router = new Router();
const uploadFiles = require("../utils/uploadFiles");
const getUploadFilePath = require("../utils/getUploadPath");

router.post("/", koaBody({ multipart: true }), async ctx => {
  const { file } = ctx.request.files;
  const files = file ? (Array.isArray(file) ? file : [file]) : [];
  await uploadFiles(files);


  // const user = await models.User.create({
  //   email,
  //   firstName,
  //   lastName,
  //   nickName,
  //   phone,
  //   avatar: avatar.name,
  //   salt,
  //   psw: hashedPassword,
  //   userType: 1,
  //   emailState: 0,
  //   rowState: 0,
  // });

  // const token = jwt.sign(
  //   { firstName, lastName, id: user.id, userType: user.type },
  //   process.env.API_TOKEN,
  //   {
  //     expiresIn: expiresIn
  //   }
  // );


  ctx.body = {
    file: getUploadFilePath(file.name),
  }
});


module.exports = router;
