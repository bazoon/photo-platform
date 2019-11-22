const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const models = require('../../models');
const uploadFiles = require('../utils/uploadFiles');

router.delete('/files/:id', async ctx => {
  const { id } = ctx.params;

  await models.Photowork.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

router.post('/:id/uploads', koaBody({ multipart: true }), async ctx => {
  const { id } = ctx.params;
  const userId = ctx.user.id;
  const { file } = ctx.request.files;
  const names = JSON.parse(ctx.request.body.names);
  const files = file ? (Array.isArray(file) ? file : [file]) : [];

  await uploadFiles(files);

  const section = await models.Section.findOne({
    where: {
      id
    }
  });

  const registration = await models.RegistrationContest.findOne({
    where: {
      userId,
      contestId: section.contestId
    }
  });

  await models.Photowork.bulkCreate(
    files.map(f => {
      return {
        registrationContestId: registration.id,
        sectionId: id,
        name: names[f.name],
        filename: f.name,
        moder: 0
      };
    })
  );

  ctx.body = [];
});

module.exports = router;
