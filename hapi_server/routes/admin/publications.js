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
  pubValues.visible = +pubValues.visible;
  pubValues.archive = +pubValues.archive;
  pubValues.pubtype = +pubValues.pubtype;
  await pub.update(pubValues);
  ctx.body = R.pick(fields, pub);
});

router.post('/:contestMenuId', async ctx => {
  const { contestMenuId } = ctx.params;
  const pubValues = R.pick(fields, ctx.request.body);
  
  pubValues.visible = +pubValues.visible;
  pubValues.archive = +pubValues.archive;
  pubValues.pubtype = +pubValues.pubtype;
  pubValues.dateShow = pubValues.dateShow || new Date();
  pubValues.contestMenuId = contestMenuId;
  delete pubValues.id;

  const isSameType = await checkPubType(contestMenuId, pubValues.pubtype);
  if (!isSameType) {
    ctx.response.status = 409;
    ctx.body = {};
    return;
  }

  let pub = await models.Publication.create(pubValues);
  ctx.body = R.pick(fields, pub);
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

async function checkPubType(contestMenuId, pubType) {
  const pub = await models.Publication.findOne({
    where: {
      contestMenuId
    }
  });

  return !pub || pub.pubtype === pubType;
}

module.exports = router;
