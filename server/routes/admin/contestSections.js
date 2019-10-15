const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const models = require("../../../models");
const R = require("ramda");
const uploadFiles = require("../../utils/uploadFiles");
const getUploadFilePath = require("../../utils/getUploadPath");

const fields = [
  'id',
  'contestId',
  'maxCountImg',
  'name'
];

router.post("/:id", async ctx => {
  const { id } = ctx.params;
  const values = { ...R.pick(fields, ctx.request.body), contestId: id };
  const section = await models.Section.create(values);
  ctx.body = R.pick(fields, section);
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;

  let section = await models.Section.findOne({
    where: {
      id
    }
  });

  await section.update(R.pick(fields, ctx.request.body));
  ctx.body = R.pick(fields, section);
});

router.get("/all/:id", async ctx => {
  const {
    id
  } = ctx.params;

  const sections = await models.Section.findAll({
    where: {
      contestId: id
    }
  });

  ctx.body = R.map(R.pick(fields), sections);
});

router.get("/:id", async ctx => {
  const {
    id
  } = ctx.params;

  let section = await models.Section.findOne({
    where: {
      id
    }
  });

  ctx.body = section || {};
});

router.delete("/:id", async ctx => {
  const { id } = ctx.params;

  await models.Section.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});



module.exports = router;
