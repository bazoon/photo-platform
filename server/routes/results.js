const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const models = require("../../models");
const R = require("ramda");
const uploadFiles = require("../utils/uploadFiles");
const getUploadFilePath = require("../utils/getUploadPath");


router.get("/:sectionId", async ctx => {
  const {
    sectionId
  } = ctx.params;

  const files = await models.Photowork.findAll({
    where: {
      sectionId
    },
    order: [
      ['average', 'desc']
    ]
  });

  ctx.body = files.map(f => {
    return {
      id: f.id,
      name: f.name,
      filename: getUploadFilePath(f.filename),
      average: f.average,
      median: f.median
    }
  });
});

module.exports = router;
