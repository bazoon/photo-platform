const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");

const fields = [
  'id',
  'contestId',
  'position',
  'parentId',
];

router.post("/:id", async ctx => {
  const { id } = ctx.params;
  const contestMenuValues = {
    ...R.pick(fields, ctx.request.body),
    contestId: id,
  };
  const contestMenu = await models.ContestMenu.create(contestMenuValues);
  ctx.body = R.pick(fields, contestMenu);
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;

  let contestAbout = await models.ContestAbout.findOne({
    where: {
      id
    }
  });

  await contestAbout.update(R.pick(fields, ctx.request.body));
  ctx.body = R.pick(fields, contestAbout);
});

router.get("/all/:id", async ctx => {
  const {
    id
  } = ctx.params;

  const contestMenus = await models.ContestMenu.findAll({
    where: {
      contestId: id
    }
  });

  ctx.body = R.map(R.pick(fields), contestMenus);
});

router.get("/:id", async ctx => {
  const {
    id
  } = ctx.params;

  let contestMenu = await models.ContestMenu.findOne({
    where: {
      id
    }
  });

  ctx.body = contestMenu || {};
});

router.delete("/:id", async ctx => {
  const { id } = ctx.params;

  await models.ContestAbout.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});



module.exports = router;
