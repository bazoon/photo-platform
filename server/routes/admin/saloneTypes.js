const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");

const expiresIn = 24 * 60 * 60 * 30;
const fields = [
  'id',
  'name',
];


router.get("/", async ctx => {
  const salonTypes = await models.SaloneType.findAll();

  ctx.body = salonTypes.map(st => {
    return {
      id: st.id,
      name: st.name,
    };
  });
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;
  const salonTypeValues = R.pick(fields, ctx.request.body);

  const salonType = await models.SaloneType.findOne({
    where: {
      id
    }
  });

  await salonType.update(salonTypeValues);

  ctx.body = R.pick(fields, salonType);


});

router.post("/", async ctx => {
  const salonTypeValues = R.pick(fields, ctx.request.body);
  delete salonTypeValues.id;

  const salonType = await models.SaloneType.create(salonTypeValues);

  ctx.body = R.pick(fields, salonType);

});

router.delete("/:id", async ctx => {
  const { id } = ctx.params;

  await models.SaloneType.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});


module.exports = router;
