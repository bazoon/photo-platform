const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");

const expiresIn = 24 * 60 * 60 * 30;


router.get("/", async ctx => {
  const langs = await models.Language.findAll();

  ctx.body = langs.map(lang => {
    return {
      id: lang.id,
      name: lang.name,
      nameDialect: lang.nameDialect,
      short: lang.short,
    };
  });

});

router.put("/:id", async ctx => {
  const {
    name,
    nameDialect,
    short,
  } = ctx.request.body;

  const { id } = ctx.params;
  const language = await models.Language.findOne({
    where: {
      id
    }
  });

  await language.update({
    name,
    nameDialect,
    short,
  });

  ctx.body = {
    id: language.id,
    name: language.name,
    nameDialect: language.nameDialect,
    short: language.short,
  }
});

router.post("/", async ctx => {
  const {
    name,
    nameDialect,
    short,
  } = ctx.request.body;

  const language = await models.Language.create({
    name,
    nameDialect,
    short,
  });

  ctx.body = {
    id: language.id,
    name: language.name,
    nameDialect: language.nameDialect,
    short: language.short,
  }
});


module.exports = router;
