const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const koaBody = require('koa-body');
const uploadFiles = require('../../utils/uploadFiles');
const getUploadFilePath = require('../../utils/getUploadPath');

router.post('/', koaBody({ multipart: true }), async ctx => {
  const { name } = ctx.request.body;
  const { img } = ctx.request.files;
  const files = img ? (Array.isArray(img) ? img : [img]) : [];
  await uploadFiles(files);

  const awardType = await models.AwardType.create({
    name,
    img: img.name
  });
  ctx.body = {
    name: awardType.name,
    img: getUploadFilePath(awardType.img)
  };
});

router.put('/:id', koaBody({ multipart: true }), async ctx => {
  const { id } = ctx.params;
  const { name } = ctx.request.body;
  const img = ctx.request.files && ctx.request.files.img;

  if (img) {
    const files = img ? (Array.isArray(img) ? img : [img]) : [];
    await uploadFiles(files);
  }

  const awardType = await models.AwardType.findOne({
    where: {
      id
    }
  });

  await awardType.update({
    name
  });

  if (img) {
    await awardType.update({
      img: img.name
    });
  }

  ctx.body = {
    id: awardType.id,
    name: awardType.name,
    img: getUploadFilePath(awardType.img)
  };
});

router.get('/', async ctx => {
  const awards = await models.AwardType.findAll();
  ctx.body = awards.map(awardType => {
    return {
      id: awardType.id,
      name: awardType.name,
      img: getUploadFilePath(awardType.img)
    };
  });
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;

  const awardType = await models.AwardType.findOne({
    where: {
      id
    }
  });

  ctx.body = {
    id: awardType.id,
    name: awardType.name,
    img: getUploadFilePath(awardType.img)
  };
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;

  await models.AwardType.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

module.exports = router;
