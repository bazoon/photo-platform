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

  const userId = ctx.user.id;

  const query = `
    select photoworks.id, filename, average
    from photoworks
    where section_id=:sectionId
    order by average desc limit 50
  `;

  const [files] = await models.sequelize.query(query, {
    replacements: {
      sectionId,
    }
  });

  ctx.body = files.map(f => {
    return {
      id: f.id,
      name: f.name,
      filename: getUploadFilePath(f.filename),
      average: f.average
    }
  });
});

module.exports = router;
