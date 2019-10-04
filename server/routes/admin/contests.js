const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");

const fields = [
  'id',
  'saloneId',
  'subname',
  'years',
  'dateStart',
  'dateStop',
  'dateJuriEnd',
  'dateRateShow',
  'showType',
  'showRateState',
  'democraty',
  'payType',
  'sectionCount',
  'maxrate',
  'maxsize',
  'maxWeight'
];

router.get("/", async ctx => {
  const query = `
    select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
    show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight from
    contests, salones
    where contests.salone_id=salones.id
  `;
  const [contests] = await models.sequelize.query(query);

  ctx.body = contests.map(contest => {
    return {
      id: contest.id,
      saloneId: contest.salone_id,
      salone: contest.salone,
      subname: contest.subname,
      years: contest.years,
      dateStart: contest.date_start,
      dateStop: contest.date_stop,
      dateJuriEnd: contest.date_juri_end,
      dateRateShow: contest.date_rate_show,
      showType: contest.show_type,
      showRateState: contest.show_rate_state,
      democraty: contest.democraty,
      payType: contest.pay_type,
      sectionCount: contest.section_count,
      maxrate: contest.maxrate,
      maxsize: contest.maxsize,
      maxWeight: contest.max_weight
    };
  });
});

router.post("/", async ctx => {
  const contestValues = R.pick(fields, ctx.request.body);
  delete contestValues.id;
  console.log(contestValues)
  let contest = await models.Contest.create(contestValues);
  ctx.body = await getContest(contest);
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;
  const contestValues = R.pick(fields, ctx.request.body);
  const contest = await models.Contest.findOne({
    where: {
      id
    }
  });

  await contest.update(contestValues);
  ctx.body = await getContest(contest);
});


router.delete("/:id", async ctx => {
  const { id } = ctx.params;

  await models.Salone.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

async function getContest(record) {
  const query = `
  select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
  show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight from
  contests, salones
  where contests.salone_id=salones.id and contests.id=:id
  `;
  const [[contest]] = await models.sequelize.query(query, {
    replacements: {
      id: record.id
    }
  });

  return {
    id: contest.id,
    saloneId: contest.salone_id,
    salone: contest.salone,
    subname: contest.subname,
    years: contest.years,
    dateStart: contest.date_start,
    dateStop: contest.date_stop,
    dateJuriEnd: contest.date_juri_end,
    dateRateShow: contest.date_rate_show,
    showType: contest.show_type,
    showRateState: contest.show_rate_state,
    democraty: contest.democraty,
    payType: contest.pay_type,
    sectionCount: contest.section_count,
    maxrate: contest.maxrate,
    maxsize: contest.maxsize,
    maxWeight: contest.max_weight
  }
}



module.exports = router;
