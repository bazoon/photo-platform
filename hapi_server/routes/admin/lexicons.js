const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");


const fields = [
  'id',
  'code',
  'category',
  'commentPhrase'
];

const fullFields = ['language'].concat(fields);


router.get("/", async ctx => {
  const lexicons = await models.Lexicon.findAll();
  ctx.body = R.map(R.pick(fields), lexicons);
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
