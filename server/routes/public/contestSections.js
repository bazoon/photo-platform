const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');
const getUploadFilePath = require('../../utils/getUploadPath');
const camelizeObject = require('../../utils/camelizeObject');

router.get('/all/:id/:lang', async ctx => {
  const { id, lang } = ctx.params;

  const query = `select section_names.name, sections.id, max_count_img
                from section_names, languages, sections
                where section_names.language_id=languages.id and sections.contest_id=:id and section_names.section_id=sections.id and languages.short=:lang
  `;

  const [translations] = await models.sequelize.query(query, {
    replacements: { id, lang }
  });

  ctx.body = R.map(camelizeObject, translations);
});

router.get('/:sectionId/files', async ctx => {
  const { sectionId } = ctx.params;
  const files = await models.Photowork.findAll({
    where: {
      sectionId
    }
  });

  ctx.body = files.map(f => {
    return {
      id: f.id,
      name: f.name,
      filename: getUploadFilePath(f.filename),
      moder: f.moder
    };
  });
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

module.exports = router;
