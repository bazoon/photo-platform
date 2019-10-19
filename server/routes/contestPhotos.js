const Router = require("koa-router");
const router = new Router();
const models = require("../../models");
const R = require("ramda");
const getUploadFilePath = require("../utils/getUploadPath");


router.get("/sections", async ctx => {
  const { host } = ctx.request.header;
  const [domain, port] = host.split(":");
  const query = `
    select sections.id,(select photoworks.filename from photoworks where photoworks.section_id=sections.id limit 1), sections.name from sections, contests, salones where
    sections.contest_id=contests.id and contests.salone_id=salones.id and
    salones.domain=:domain
  `;

  const [sections] = await models.sequelize.query(query, {
    replacements: {
      domain
    }
  });

  ctx.body = sections.map(s => {
    return {
      id: s.id,
      name: s.name,
      imageUrl: getUploadFilePath(s.filename)
    }
  });
});


router.get("/photos/:sectionId", async ctx => {
  const { sectionId } = ctx.params;
  const query = `
    select photoworks.id, photoworks.name, photoworks.filename, photoworks.average 
    from photoworks where section_id=:sectionId
    order by average desc
  `;

  const [photos] = await models.sequelize.query(query, {
    replacements: {
      sectionId
    }
  });

  ctx.body = photos.map(p => {
    return {
      id: p.id,
      name: p.name,
      imageUrl: getUploadFilePath(p.filename),
      average: p.average
    }
  });
});


router.get("/", async ctx => {
  const [photos] = await models.sequelize.query(`
    select photoworks.id, photoworks.name, photoworks.filename, 
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


module.exports = router;
