const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');
const camelizeObject = require('../../utils/camelizeObject');

const fields = ['id', 'languageId', 'name', 'content', 'digest'];

router.get('/:publicationId', async ctx => {
  const { publicationId } = ctx.params;
  const query = `select publictxts.id, language_id, publictxts.name, content, digest, languages.name as language
                 from publictxts, languages
                 where publictxts.language_id=languages.id and publication_id=:id`;
  const [texts] = await models.sequelize.query(query, {
    replacements: { id: publicationId }
  });
  ctx.body = R.map(camelizeObject, texts);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const pubTextValues = R.pick(fields, ctx.request.body);
  const pubText = await models.PublicationText.findOne({
    where: {
      id
    }
  });

  await pubText.update(pubTextValues);
  ctx.body = await getText(id);
});

router.post('/:publicationId', async ctx => {
  const { publicationId } = ctx.params;
  const pubTextValues = R.pick(fields, ctx.request.body);
  delete pubTextValues.id;
  pubTextValues.publicationId = publicationId;
  const pub = await models.PublicationText.create(pubTextValues);
  ctx.body = await getText(pub.id);
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;

  await models.PublicationText.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

async function getText(id) {
  const query = `select publictxts.id, language_id, publictxts.name, content, digest, languages.name as language
                 from publictxts, languages
                 where publictxts.language_id=languages.id and publictxts.id=:id`;
  const [[text]] = await models.sequelize.query(query, {
    replacements: {
      id
    }
  });

  return camelizeObject(text);
}

module.exports = router;
