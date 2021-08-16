const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');

router.post('/approves/:id', async ctx => {
  const { id } = ctx.params;
  const application = await models.RegistrationContest.findOne({
    where: {
      id
    }
  });

  application.update({
    regState: 1
  });

  ctx.body = {
    id,
    regState: application.regState
  };
});

router.post('/declines/:id', async ctx => {
  const { id } = ctx.params;
  const application = await models.RegistrationContest.findOne({
    where: {
      id
    }
  });

  application.update({
    regState: 3
  });

  ctx.body = {
    id,
    regState: application.regState
  };
});


router.get('/:contestId', async ctx => {
  const { contestId } = ctx.params;

  const [applications] = await models.sequelize.query(`
    select registration_contests.id, salones.name, contests.subname as contest, contest_id, date_reg, 
    contests.section_count, reg_state, rejection_reason, payment, contests.pay_type, users.first_name, users.last_name, users.email 
    from registration_contests, contests, salones, users
    where registration_contests.contest_id=contests.id and registration_contests.contest_id=:contestId and
    contests.salone_id=salones.id and registration_contests.user_id=users.id

    `, {
    replacements: {
      contestId
    }
  }
  );

  ctx.body = applications.map(a => {
    return {
      id: a.id,
      salone: a.name,
      subname: a.subname,
      dateReg: a.date_reg,
      sectionCount: a.section_count,
      rejectionReason: a.rejection_reason,
      payment: a.payment,
      regState: a.reg_state,
      payType: a.pay_type,
      name: a.first_name + ' ' + a.last_name,
      email: a.email
    };
  });
});



router.post('/', async ctx => {
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
