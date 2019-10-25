const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const models = require("../../models");


router.get("/", async ctx => {
  const { host } = ctx.request.header;
  const [domain] = host.split(":");

  const query = `
    select organizers.name, organizers.email_pub, organizers.www, organizers.phone, organizers.address_line1 
    from organizers, salones where salones.organizer_id=organizers.id and salones.domain=:domain
  `;

  const [[organizer]] = await models.sequelize.query(query, {
    replacements: {
      domain
    }
  });

  ctx.body = {
    name: organizer.name,
    emailPub: organizer.email_pub,
    www: organizer.www,
    phone: organizer.phone,
    address: organizer.address_line1
  };
});

module.exports = router;
