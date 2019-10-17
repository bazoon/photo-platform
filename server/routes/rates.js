const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const models = require("../../models");
const R = require("ramda");
const uploadFiles = require("../utils/uploadFiles");
const getUploadFilePath = require("../utils/getUploadPath");


router.get("/:sectionId", async ctx => {
  const {
    sectionId
  } = ctx.params;

  const userId = ctx.user.id;

  const contestSection = await models.Section.findOne({
    where: {
      id: sectionId
    }
  });

  const jury = await models.Jury.findOne({
    where: {
      contestId: contestSection.contestId,
      userId
    }
  })

  const query = `
    select photoworks.id, name, filename, 
    (select rate_value from rates where jury_id=:juryId and photowork_id=photoworks.id) from photoworks
    where section_id=:sectionId
  `;

  const [files] = await models.sequelize.query(query, {
    replacements: {
      sectionId,
      juryId: jury.id
    }
  });

  ctx.body = files.map(f => {
    return {
      id: f.id,
      name: f.name,
      filename: getUploadFilePath(f.filename),
      rate: f.rate_value
    }
  });
});

router.post("/:photoWorkId", async ctx => {
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

  const query = `
    update photoworks 
    set median=(
      select percentile_cont(0.5) within group (order by rates.rate_value)
      from rates
      where rates.photowork_id=:photoWorkId
    ), average=(
      select avg(rate_value)
      from rates
      where rates.photowork_id=:photoWorkId
    )
    where id=:photoWorkId
  `;

  await models.sequelize.query(query, {
    replacements: {
      photoWorkId
    }
  });

  ctx.body = rateRecord;
});

module.exports = router;
