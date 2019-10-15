const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");

const fields = [
  'contestMenuId',
  'lexiconId'
];

router.get("/", async ctx => {
  const query = `
    select organizers.name as organizer, spr_salone_types.name as saloneType, spr_salone_type_id, organizer_id,
    salones.name, regular, private, domain, design_code, salones.row_state, salones.id
    from salones, organizers, spr_salone_types
    where
    salones.spr_salone_type_id=spr_salone_types.id and salones.organizer_id=organizers.id
  `;
  const [salones] = await models.sequelize.query(query);

  ctx.body = salones.map(salone => {
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
    };
  });
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;
  const pubValues = R.pick(fields, ctx.request.body);
  let pubMenu = await models.PubMenu.findOne({
    where: {
      contestMenuId: id
    },
  });

  if (!pubMenu) {
    pubMenu = await models.PubMenu.create(pubValues);
  } else {
    await models.sequelize.query(`
      update pub_menus set lexicon_id=:newLexiconId 
      where lexicon_id=:lexiconId and contest_menu_id=:contestMenuId
    `, {
        replacements: {
          newLexiconId: pubValues.lexiconId,
          lexiconId: pubMenu.lexiconId,
          contestMenuId: pubMenu.contestMenuId
        }
      });
    // await pubMenu.update({
    //   lexiconId: pubValues.lexiconId
    // }, {
    //     raw: true
    //   });
  }

  ctx.body = {};
});

router.post("/", async ctx => {
  const {
    contestMenuId,
    data
  } = ctx.request.body;

  console.log(contestMenuId, data);
  ctx.body = {};
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
