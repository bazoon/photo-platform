const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const models = require("../../models");
const R = require("ramda");
const uploadFiles = require("../utils/uploadFiles");
const getUploadFilePath = require("../utils/getUploadPath");

const fields = [
  'id',
  'contestId',
  'maxCountImg',
  'name'
];


router.get("/all/:id", async ctx => {
  const {
    id
  } = ctx.params;

  const sections = await models.Section.findAll({
    where: {
      contestId: id
    }
  });

  ctx.body = R.map(R.pick(fields), sections);
});

router.get("/:id", async ctx => {
  const {
    id
  } = ctx.params;

  let section = await models.Section.findOne({
    where: {
      id
    }
  });

  ctx.body = section || {};
});

router.post("/:id/uploads", koaBody({ multipart: true }), async ctx => {
  const { id } = ctx.params;
  const userId = ctx.user.id;
  const { file } = ctx.request.files;
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

  await models.Photowork.bulkCreate(files.map(f => {
    return {
      registrationContestId: registration.id,
      sectionId: id,
      name: 'Foo',
      filename: f.name,
      moder: 0,
    }
  }));

  // const section = await models.Section.create(values);
  ctx.body = [];
});


module.exports = router;
