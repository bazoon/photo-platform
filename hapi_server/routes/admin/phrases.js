const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");


const fields = [
  'id',
  'lexiconId',
  'languageId',
  'name'
];

const fullFields = ['language'].concat(fields);


router.get("/:lexiconId", async ctx => {
  const { lexiconId } = ctx.params;
  const lexicons = await models.Lexicon.findAll();

  const [phrases] = await models.sequelize.query(`
    select phrases.id, lexicon_id, language_id, languages.name as language, phrases.name
    from phrases, languages
    where phrases.lexicon_id=:lexiconId and phrases.language_id=languages.id`, {
      replacements: {
        lexiconId
      }
    }
  );

  ctx.body = R.map((p) => {
    return {
      id: p.id,
      name: p.name,
      languageId: p.language_id,
      language: p.language,
      lexiconId: p.lexicon_id
    }
  }, phrases);
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;
  const phraseValues = R.pick(fields, ctx.request.body);
  const phrase = await models.Phrase.findOne({
    where: {
      id
    }
  });

  await phrase.update(phraseValues);

  const language = await models.Language.findOne({
    where: {
      id: phrase.languageId
    }
  });

  ctx.body = { ...R.pick(fullFields, phrase), language: language.name };
});

router.post("/:lexiconId", async ctx => {
  const { lexiconId } = ctx.params;
  const phraseValues = R.pick(fields, ctx.request.body);
  phraseValues.lexiconId = lexiconId;
  delete phraseValues.id;
  let phrase;
  try {
    phrase = await models.Phrase.create(phraseValues);
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      error: e.message
    };
    return;
  }


  const language = await models.Language.findOne({
    where: {
      id: phrase.languageId
    }
  })
  ctx.body = { ...R.pick(fullFields, phrase), language: language.name };
});

router.delete("/:id", async ctx => {
  const { id } = ctx.params;
  await models.Phrase.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});


module.exports = router;
