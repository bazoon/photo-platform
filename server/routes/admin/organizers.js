const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");

const expiresIn = 24 * 60 * 60 * 30;

router.get("/", async ctx => {
  const query = `select organizers.id,languages.id as language_id, languages.name as language, organizers.name, email_sys, email_pub,
    address_line1, address_line2, www, phone, phone_tech,officer,logo,virtual,
    smtp,smtp_use_pub,date_status from organizers, languages where organizers.language_id=languages.id
  `;

  const [organizers] = await models.sequelize.query(query);

  ctx.body = organizers.map(o => {
    return {
      id: o.id,
      languageId: o.language_id,
      language: o.language,
      name: o.name,
      emailSys: o.email_sys,
      emailPub: o.emaul_pub,
      addressLine1: o.address_line1,
      addressLine2: o.address_line2,
      www: o.www,
      phone: o.phone,
      phoneTech: o.phone_tech,
      officer: o.officer,
      logo: o.logo,
      virtual: o.virtual,
      smtp: o.smtp,
      smtpPassword: '',
      smtpUsePub: o.smtp_use_pub,
      createdAt: o.date_create,
      rowState: o.row_state,
      dateStatus: o.date_status
    };
  });
});

router.put("/:id", async ctx => {
  const {
    languageId,
    name,
    emailSys,
    emailPub,
    addressLine1,
    addressLine2,
    www,
    phone,
    phoneTech,
    officer,
    logo,
    virtual,
    smtp,
    smtpPassword,
    smtpUsePub,
    createdA,
    rowState,
    dateStatus
  } = ctx.request.body;

  console.log(ctx.request.body)

  const { id } = ctx.params;
  const organizer = await models.Organizer.findOne({
    where: {
      id
    }
  });

  await organizer.update({
    languageId,
    name,
    emailSys,
    emailPub,
    addressLine1,
    addressLine2,
    www,
    phone,
    phoneTech,
    officer,
    logo,
    virtual,
    smtp,
    smtp_psw: smtpPassword,
    smtpUsePub,
    rowState,
    dateStatus: dateStatus || new Date()
  });

  const language = await models.Language.findOne({
    where: {
      id: organizer.languageId
    }
  });

  ctx.body = {
    id: organizer.id,
    language: language.name,
    languageId: organizer.languageId,
    name: organizer.name,
    emailSys: organizer.emailSys,
    emailPub: organizer.emailPub,
    addressLine1: organizer.addressLine1,
    addressLine2: organizer.addressLine2,
    www: organizer.www,
    phone: organizer.phone,
    phoneTech: organizer.phoneTech,
    officer: organizer.officer,
    logo: organizer.logo,
    virtual: organizer.virtual,
    smtp: organizer.smtp,
    smtp_psw: organizer.smtpPassword,
    smtpUsePub: organizer.smtpUsePub,
    rowState: organizer.rowState,
    dateStatus: dateStatus || new Date()
  };
});

router.post("/", async ctx => {
  const {
    name,
    nameDialect,
    short,
  } = ctx.request.body;

  const language = await models.Language.create({
    name,
    nameDialect,
    short,
  });

  ctx.body = {
    id: language.id,
    name: language.name,
    nameDialect: language.nameDialect,
    short: language.short,
  }
});


module.exports = router;
