const Router = require('koa-router');
const router = new Router();
const models = require('../../models');
const getUploadFilePath = require('../utils/getUploadPath');


router.get('/:sectionId', async ctx => {
  const { sectionId } = ctx.params;

  console.log(2)

  const [limit] = await models.sequelize.query(`
    select short_best_count from contests, sections
    where sections.contest_id=contests.id and sections.id=:sectionId
  `, {
      replacements: {
        sectionId
      }
  });
  console.log(limit)

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
