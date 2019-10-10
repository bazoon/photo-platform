const Router = require("koa-router");
const router = new Router();
const models = require("../../models");
const R = require("ramda");


const fields = [
  'id', 'date_create', 'date_show', 'visible', 'digest', 'content', 'name', 'short',
];


router.get("/single/:id", async ctx => {
  const { id } = ctx.params;

  const [pub] = await models.sequelize.query(`
    select publictxts.id, publications.date_create, publications.date_show, visible, publictxts.digest, publictxts.content,
    publictxts.name, languages.short from publications, publictxts, languages
    where publications.id=publictxts.publication_id and 
    publictxts.language_id=languages.id and publictxts.id=:id
    `, {
      replacements: {
        id
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



router.get("/:menuId/:lang", async ctx => {
  const { menuId, lang } = ctx.params;

  const [pubs] = await models.sequelize.query(`
    select publictxts.id, publications.date_create, publications.date_show, visible, publictxts.digest, publictxts.content,
    publictxts.name, languages.short from publications, publictxts, languages, contest_menus
    where contest_menus.id=publications.contest_menu_id and publications.id=publictxts.publication_id and
    publictxts.language_id=languages.id and contest_menus.id=:menuId and
    languages.short = :lang
    `, {
      replacements: {
        menuId,
        lang
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
  }, pubs);
});


module.exports = router;
