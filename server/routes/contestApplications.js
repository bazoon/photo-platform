const Router = require("koa-router");
const router = new Router();
const models = require("../../models");
const R = require("ramda");

router.get("/", async ctx => {
  const { id } = ctx.user;
  const [pub] = await models.sequelize.query(`
    select salones.name, contests.subname as contest, contest_id, date_reg, contests.section_count, reg_state, rejection_reason, payment 
    from registration_contests, contests, salones
    where registration_contests.contest_id=contests.id and registration_contests.user_id=:userId and
    contests.salone_id=salones.id
    `, {
      replacements: {
        userId: id
      }
    }
  );

  ctx.body = R.map(p => {
    return {
      id: p.id,
      dateCreate: p.date_create,
      dateShow: p.date_show,
      visible: p.visible,
      digest: p.digest,
      content: p.content,
      name: p.name
    }
  }, pub)[0];
});

router.post("/", async ctx => {
  const { id } = ctx.user;
  const { contestId, sectionCount } = ctx.request.body;

  const application = await models.RegistrationContest.create({
    userId: id,
    contestId,
    regState: 0,
    sectionCount
  });

  ctx.body = {
    contestId,
    canApply: false,
    regState: application.regState
  };

});

module.exports = router;
