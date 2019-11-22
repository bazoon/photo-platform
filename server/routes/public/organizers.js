const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const getUploadPath = require('../../utils/getUploadPath');

router.get('/', async ctx => {
  const { host } = ctx.request.header;
  const [domain] = host.split(':');

  const query = `
    select organizers.name, email_pub, www, phone, address_line1,
    address_line2, officer, logo
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
    addressLine1: organizer.address_line1,
    officer: organizer.officer,
    logo: getUploadPath(organizer.logo)
  };
});

module.exports = router;
