const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");


const fields = [
  'id',
  'languageId',
  'code',
  'name',
  'category'
];

const fullFields = ['language'].concat(fields);


router.get("/", async ctx => {
  const query = `select languages.name as language, language_id, lexicons.id, code, lexicons.name, category from
    lexicons, languages where lexicons.language_id=languages.id
  `;
  const [lexicons] = await models.sequelize.query(query);
  ctx.body = lexicons.map(l => {
    return {
      id: l.id,
      language: l.language,
      languageId: l.language_id,
      code: l.code,
      category: l.category,
      name: l.name
    };
  });
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;
  const lexiconValues = R.pick(fields, ctx.request.body);
  const lexicon = await models.Lexicon.findOne({
    where: {
      id
    }
  });

  await lexicon.update(lexiconValues);

  ctx.body = R.pick(fields, lexicon);
});

router.post("/", async ctx => {
  const lexiconValues = R.pick(fields, ctx.request.body);
  delete lexiconValues.id;
  const lexicon = await models.Lexicon.create(lexiconValues);
  ctx.body = R.pick(fields, lexicon);
});

router.delete("/:id", async ctx => {
  const { id } = ctx.params;
  await models.Lexicon.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});


module.exports = router;
