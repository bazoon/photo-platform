const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');

const fields = [
  'id',
  'contestMenuId',
  'dateCreate',
  'dateShow',
  'visible',
  'pubtype',
  'archive'
];

router.get('/:contestMenuId', async ctx => {
  const { contestMenuId } = ctx.params;

  const pubs = await models.Publication.findAll({
    where: {
      contestMenuId: contestMenuId
    }
  });

  ctx.body = R.map(R.pick(fields), pubs);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const pubValues = R.pick(fields, ctx.request.body);
  const pub = await models.Publication.findOne({
    where: {
      id
    }
  });
  await pub.update(pubValues);
  ctx.body = R.pick(fields, pub);
});

router.post('/:contestMenuId', async ctx => {
  const { contestMenuId } = ctx.params;
  const pubValues = R.pick(fields, ctx.request.body);
  delete pubValues.id;
  pubValues.contestMenuId = contestMenuId;
  let pub = await models.Publication.create(pubValues);
  ctx.body = await R.pick(fields, pub);
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;

  await models.Publication.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

module.exports = router;
