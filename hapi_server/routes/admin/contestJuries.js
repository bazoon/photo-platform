const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");

const fields = [
  'id',
  'contestId',
  'userId',
  'rank'
];


router.get("/:contestId", async ctx => {
  const { contestId } = ctx.params;
  const query = `
    select first_name, last_name,rank, user_id, juries.id from users, juries where users.id=juries.user_id and contest_id=:contestId
  `;
  const [juries] = await models.sequelize.query(query, {
    replacements: {
      contestId
    }
  });


  ctx.body = juries.map(j => {
    return {
      id: j.id,
      user: `${j.first_name} ${j.last_name}`,
      userId: j.user_id,
      rank: j.rank
    }
  });
});

router.post("/:contestId", async ctx => {
  const { contestId } = ctx.params;
  const { userId, rank } = ctx.request.body;

  const jury = await models.Jury.create({
    contestId,
    userId,
    rank
  });

  const user = await models.User.findOne({
    where: {
      id: userId
    }
  });

  ctx.body = {
    id: jury.id,
    userId: jury.userId,
    user: `${user.firstName} ${user.lastName}`,
    rank
  }
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;
  const juryValues = R.pick(fields, ctx.request.body);
  const jury = await models.Jury.findOne({
    where: {
      id
    }
  });

  await jury.update(juryValues);

  const user = await models.User.findOne({
    where: {
      id: jury.userId
    }
  });

  ctx.body = { ...R.pick(fields, jury), user: `${user.firstName} ${user.lastName}` };
});

router.post("/", async ctx => {
  const salonTypeValues = R.pick(fields, ctx.request.body);
  delete salonTypeValues.id;

  const salonType = await models.SaloneType.create(salonTypeValues);

  ctx.body = R.pick(fields, salonType);

});

router.delete("/:id", async ctx => {
  const { id } = ctx.params;

  await models.Jury.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});


module.exports = router;
