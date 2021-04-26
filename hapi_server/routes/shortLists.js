const Router = require('koa-router');
const router = new Router();
const models = require('../../models');
const getUploadFilePath = require('../utils/getUploadPath');

const limit = 50;

router.get('/:sectionId', async ctx => {
  const { sectionId } = ctx.params;

  const query = `
    select photoworks.id, filename, average, awards_stack_id
    from photoworks
    left join awards on awards.photowork_id=photoworks.id
    where section_id=:sectionId
    order by average desc limit ${limit}
  `;

  const [files] = await models.sequelize.query(query, {
    replacements: {
      sectionId
    }
  });

  ctx.body = files.map(f => {
    return {
      id: f.id,
      name: f.name,
      filename: getUploadFilePath(f.filename),
      average: f.average,
      awardsStackId: f.awards_stack_id
    };
  });
});

module.exports = router;
