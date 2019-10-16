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

router.get("/:id/files", async ctx => {
  const {
    id
  } = ctx.params;
  const userId = ctx.user.id;

  const query = `
    select photoworks.id, name, filename, rate_value, moder,juries.user_id from photoworks
    left join rates on photoworks.id=rates.photowork_id
    left join juries on rates.jury_id=juries.id
    where user_id=:userId or user_id is null
  `;

  const [files] = await models.sequelize.query(query, {
    replacements: {
      userId: id
    }
  });

  ctx.body = files.map(f => {
    return {
      id: f.id,
      name: f.name,
      filename: getUploadFilePath(f.filename),
      moder: f.moder,
      rate: f.rate_value
    }
  });
});

router.post("/rates/:photoWorkId", async ctx => {
  const { photoWorkId } = ctx.params;
  const { rate, contestId } = ctx.request.body;
  const userId = ctx.user.id;

  const jury = await models.Jury.findOne({
    where: {
      userId,
      contestId
    }
  });

  let rateRecord = await models.Rate.findOne({
    where: {
      juryId: jury.id,
      photoworkId: photoWorkId,
    }
  });

  if (!rateRecord) {
    rateRecord = await models.Rate.create({
      juryId: jury.id,
      photoworkId: photoWorkId,
      rateValue: rate
    });
  } else {
    rateRecord.update({
      rateValue: rate
    });
  }

  ctx.body = rateRecord;
});

router.delete("/files/:id", async ctx => {
  const {
    id
  } = ctx.params;

  await models.Photowork.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
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

  await models.Photowork.bulkCreate(files.map(f => {
    return {
      registrationContestId: registration.id,
      sectionId: id,
      name: names[f.name],
      filename: f.name,
      moder: 0,
    }
  }));


  ctx.body = [];
});


module.exports = router;
