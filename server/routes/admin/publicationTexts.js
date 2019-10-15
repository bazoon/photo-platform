const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");

const fields = [
  'id',
  'languageId',
  'name',
  'content',
  'digest'
];

router.get("/:publicationId", async ctx => {
  const { publicationId } = ctx.params;

  const pubs = await models.PublicationText.findAll({
    where: {
      publicationId: publicationId
    }
  });

  ctx.body = R.map(R.pick(fields), pubs);
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;
  const pubTextValues = R.pick(fields, ctx.request.body);
  const pubText = await models.PublicationText.findOne({
    where: {
      id
    }
  });

  await pubText.update(pubTextValues);
  ctx.body = R.pick(fields, pubText);
});

router.post("/:publicationId", async ctx => {
  const { publicationId } = ctx.params;
  const pubTextValues = R.pick(fields, ctx.request.body);
  delete pubTextValues.id;
  pubTextValues.publicationId = publicationId;
  let pub = await models.PublicationText.create(pubTextValues);
  ctx.body = await R.pick(fields, pub);
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

async function getSalone(record) {
  const query = `
    select organizers.name as organizer, spr_salone_types.name as saloneType, spr_salone_type_id, organizer_id,
    salones.name, regular, private, domain, design_code, salones.row_state, salones.id
    from salones, organizers, spr_salone_types
    where
    salones.spr_salone_type_id=spr_salone_types.id and salones.organizer_id=organizers.id and salones.id=:id
  `;
  const [[salone]] = await models.sequelize.query(query, {
    replacements: {
      id: record.id
    }
  });

  return {
    id: salone.id,
    organizer: salone.organizer,
    saloneType: salone.salonetype,
    sprSaloneTypeId: salone.spr_salone_type_id,
    organizerId: salone.organizer_id,
    name: salone.name,
    regular: salone.regular,
    private: salone.private,
    domain: salone.domain,
    designCode: salone.design_code,
    rowState: salone.row_state
  }
}



module.exports = router;
