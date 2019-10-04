const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");

const fields = [
  'id',
  'languageId',
  'name',
  'content',
  'saloneId'
];

const fullFields = fields.concat(['language']);


router.post("/:id", async ctx => {
  const {
    languageId,
    name,
    content,
  } = ctx.request.body;

  const { id } = ctx.params;

  let saloneAbout = await models.SaloneAbout.create({
    languageId,
    saloneId: id,
    name,
    content
  });


  const language = await models.Language.findOne({
    where: {
      id: saloneAbout.languageId
    }
  });


  ctx.body = {
    ...R.pick(fields, saloneAbout),
    language: language.name
  };
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;

  let saloneAbout = await models.SaloneAbout.findOne({
    where: {
      id
    }
  });

  await saloneAbout.update(R.pick(fields, ctx.request.body));
  const language = await models.Language.findOne({
    where: {
      id: saloneAbout.languageId
    }
  });


  ctx.body = {
    ...R.pick(fields, saloneAbout),
    language: language.name
  }
});

router.get("/all/:id", async ctx => {
  const {
    id
  } = ctx.params;

  const query = `select salone_abouts.id, language_id, salone_id, salone_abouts.name, languages.name as language, content from
    salone_abouts, languages where
    salone_abouts.language_id = languages.id and salone_id=:id
  `;

  const [saloneAbouts] = await models.sequelize.query(query, {
    replacements: {
      id
    }
  });

  ctx.body = R.map(R.pick(fullFields), saloneAbouts);
});

router.get("/:id", async ctx => {
  const {
    id
  } = ctx.params;

  let saloneAbout = await models.SaloneAbout.findOne({
    where: {
      id
    }
  });

  ctx.body = saloneAbout || {};
});

router.delete("/:id", async ctx => {
  const { id } = ctx.params;

  await models.SaloneAbout.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});



module.exports = router;
