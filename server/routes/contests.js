const Router = require("koa-router");
const router = new Router();
const models = require("../../models");
const R = require("ramda");


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
