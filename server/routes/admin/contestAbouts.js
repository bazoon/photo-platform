const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");

const fields = [
  'id',
  'languageId',
  'contestId',
  'name',
  'thesis',
  'rules'
];

const fullFields = fields.concat(['language']);

router.post("/:id", async ctx => {
  const {
    languageId,
    name,
    content,
  } = ctx.request.body;

  const { id } = ctx.params;
  const values = { ...R.pick(fields, ctx.request.body), contestId: id };
  const contestAbout = await models.ContestAbout.create(values);


  const language = await models.Language.findOne({
    where: {
      id: contestAbout.languageId
    }
  });


  ctx.body = {
    ...R.pick(fullFields, contestAbout),
    language: language.name
  };
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;

  let contestAbout = await models.ContestAbout.findOne({
    where: {
      id
    }
  });

  await contestAbout.update(R.pick(fields, ctx.request.body));
  const language = await models.Language.findOne({
    where: {
      id: contestAbout.languageId
    }
  });


  ctx.body = {
    ...R.pick(fields, contestAbout),
    language: language.name
  }
});

router.get("/all/:id", async ctx => {
  const {
    id
  } = ctx.params;

  const query = `select contest_abouts.id, language_id, languages.name as language, contest_abouts.name, thesis, rules from
    contest_abouts, languages where contest_abouts.language_id=languages.id and contest_abouts.contest_id=:id
  `;

  const [contestAbouts] = await models.sequelize.query(query, {
    replacements: {
      id
    }
  });

  ctx.body = R.map(R.pick(fullFields), contestAbouts);
});

router.get("/:id", async ctx => {
  const {
    id
  } = ctx.params;

  let contestAbout = await models.ContestAbout.findOne({
    where: {
      id
    }
  });

  ctx.body = contestAbout || {};
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
