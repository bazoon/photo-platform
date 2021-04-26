const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');
const camelizeObject = require('../../utils/camelizeObject');

const fields = ['id', 'contestId', 'maxCountImg', 'name'];

router.post('/:id/approves', async ctx => {
  const { ids } = ctx.request.body;
  const inIds = ids.join(',');
  const query = `
    update photoworks set moder = 1 where id in (${inIds})
  `;
  await models.sequelize.query(query);
  ctx.body = {};
});

router.post('/:id/declines', async ctx => {
  const { ids } = ctx.request.body;
  const inIds = ids.join(',');
  const query = `
    update photoworks set moder = 2 where id in (${inIds})
  `;
  await models.sequelize.query(query);
  ctx.body = {};
});

router.post('/:id', async ctx => {
  const { id } = ctx.params;
  const values = { ...R.pick(fields, ctx.request.body), contestId: id };
  const section = await models.Section.create(values);
  ctx.body = R.pick(fields, section);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;

  let section = await models.Section.findOne({
    where: {
      id
    }
  });

  await section.update(R.pick(fields, ctx.request.body));
  ctx.body = R.pick(fields, section);
});

router.get('/all/:id', async ctx => {
  const { id } = ctx.params;

  const sections = await models.Section.findAll({
    where: {
      contestId: id
    }
  });

  ctx.body = R.map(R.pick(fields), sections);
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;

  let section = await models.Section.findOne({
    where: {
      id
    }
  });

  ctx.body = section || {};
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;

  await models.Section.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

router.get('/:id/translations', async ctx => {
  const { id } = ctx.params;
  const query = `select section_names.name, language_id, languages.name as language, section_names.id
                from section_names, languages
                where section_names.language_id=languages.id and section_names.section_id=:id
  `;

  const [translations] = await models.sequelize.query(query, {
    replacements: { id }
  });
  ctx.body = R.map(camelizeObject, translations);
});

router.post('/:id/translations', async ctx => {
  const { id } = ctx.params;
  const { languageId, name } = ctx.request.body;

  const translation = await models.SectionName.create({
    sectionId: id,
    languageId,
    name
  });
  ctx.body = await getTranslation(translation.id);
});

router.put('/translations/:id', async ctx => {
  const { id } = ctx.params;
  const { languageId, name } = ctx.request.body;
  const translation = await models.SectionName.findOne({
    id
  });

  await translation.update({
    languageId,
    name
  });

  ctx.body = await getTranslation(translation.id);
});

router.delete('/translations/:id', async ctx => {
  const { id } = ctx.params;
  await models.SectionName.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

async function getTranslation(id) {
  const query = `select section_names.name, language_id, languages.name as language, section_names.id
                from section_names, languages
                where section_names.language_id=languages.id and section_names.id=:id
  `;

  const [[translation]] = await models.sequelize.query(query, {
    replacements: { id }
  });

  return translation;
}

module.exports = router;
