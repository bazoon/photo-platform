const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');
const koaBody = require('koa-body');
const uploadFiles = require('../../utils/uploadFiles');
const getUploadFilePath = require('../../utils/getUploadPath');

const fields = [
  'id',
  'languageId',
  'contestId',
  'name',
  'thesis',
  'rules'
];

const fullFields = fields.concat(['language']);

router.post('/', koaBody({ multipart: true }), async ctx => {
  const {
    name
  } = ctx.request.body;
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

router.put('/:id', async ctx => {
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

router.get('/', async ctx => {
  const awards = await models.AwardType.findAll();
  ctx.body = awards.map(awardType => {
    return {
      name: awardType.name,
      img: getUploadFilePath(awardType.img)
    }  
  });
});

router.get('/:id', async ctx => {
  const {
    id
  } = ctx.params;

  let contestAbout = await models.ContestAbout.findOne({
    where: {
      id
    }
  });

  ctx.body = contestAbout;
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;

  await models.ContestAbout.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});



module.exports = router;
