const Router = require("koa-router");
const router = new Router();
const models = require("../../models");
const R = require("ramda");
const getUploadFilePath = require("../utils/getUploadPath");



router.get("/", async ctx => {
  const [contests] = await models.sequelize.query(`
  select contests.id, subname, date_start, date_stop, salones.name as salone, reg_state, contests.section_count, maxrate from salones, contests
  left join registration_contests on contests.id=registration_contests.contest_id
  where contests.salone_id=salones.id 
  `
  );
  ctx.body = contests.map(c => {
    return {
      id: c.id,
      subname: c.subname,
      salone: c.salone,
      dateStart: c.date_start,
      dateStop: c.date_stop,
      regState: c.reg_state,
      canApply: c.reg_state === null,
      sectionCount: c.section_count,
      maxrate: c.maxrate
    }
  });
});

router.get('/results', async ctx => {
  const { host } = ctx.request.header;
  const [domain, port] = host.split(":");
  const query = `
    select contests.id, salones.name, subname, domain, design_code 
    from salones, contests 
    where contests.salone_id=salones.id and salones.domain=:domain
  `;

  const [[contest]] = await models.sequelize.query(query, {
    replacements: {
      domain
    }
  });

  const worksQuery = `
    select photoworks.id, filename 
    from photoworks, sections, contests
    where photoworks.section_id=sections.id and sections.contest_id=contests.id
    and contests.id=:contestId
  `;

  let [photoworks] = await models.sequelize.query(worksQuery, {
    replacements: {
      contestId: contest.id
    }
  });

  photoworks = photoworks.map(p => {
    return {
      id: p.id,
      filename: getUploadFilePath(p.filename)
    };
  });

  ctx.body = { contest, photoworks };
});


router.get("/:id", async ctx => {
  const { id } = ctx.params;
  const contest = await models.Contest.findOne({
    where: {
      id
    }
  })
  ctx.body = contest;
});

module.exports = router;
