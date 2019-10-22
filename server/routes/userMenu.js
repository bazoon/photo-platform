const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const models = require("../../models");
const R = require("ramda");
const uploadFiles = require("../utils/uploadFiles");
const getUploadFilePath = require("../utils/getUploadPath");

const fields = [
  'id',
  'contestId',
  'maxCountImg',
  'name'
];


router.get("/", async ctx => {
  console.log(ctx.user);
  const { id } = ctx.user;
  const menu = [];

  const jury = await models.Jury.findOne({
    where: {
      userId: id
    }
  });

  if (jury) {
    menu.push({
      name: 'Жюри',
      url: '/user/jury'
    });
    menu.push({
      name: 'Short list',
      url: '/user/shortList'
    });
  }

  ctx.body = menu;
});

module.exports = router;
