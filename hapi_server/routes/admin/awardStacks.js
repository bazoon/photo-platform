const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');

const fields = ['id', 'awardTypeId', 'position', 'countAwards'];

router.post('/:contestId', async ctx => {
  const { contestId } = ctx.params;
  const values = { ...R.pick(fields, ctx.request.body), contestId };
  console.log(values);
  const awardStack = await models.AwardStack.create(values);
  ctx.body = R.pick(fields, awardStack);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const awardStack = await models.AwardStack.findOne({
    where: {
      id
    }
  });

  await awardStack.update(R.pick(fields, ctx.request.body));
  ctx.body = R.pick(fields, awardStack);
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const query = `
    select award_types.name, awards_stacks.id, position, count_awards, issued, award_type_id from
    awards_stacks, award_types where award_types.id=awards_stacks.award_type_id and contest_id=:id
  `;
  const [stacks] = await models.sequelize.query(query, {
    replacements: {
      id
    }
  });
  ctx.body = stacks.map(stack => {
    return {
      id: stack.id,
      name: stack.name,
      position: stack.position,
      countAwards: stack.count_awards,
      awardTypeId: stack.award_type_id,
      issued: stack.issued
    };
  });
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;

  await models.AwardStack.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

module.exports = router;
