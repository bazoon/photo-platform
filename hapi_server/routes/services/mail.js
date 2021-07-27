const nodemailer = require('nodemailer');
const models = require('../../../models');

const m = {
  send: async function ({ host, user, pass, from, to, subject, text }) {

    let transporter = nodemailer.createTransport({
      host,
      port: 587,
      secure: false,
      auth: {
        user,
        pass //rmqjwyamgwwohlbn
      }
    });

    let info = await transporter.sendMail({
      from,
      to,
      subject,
      html: text
    });
  },
  sendFromCurrentOrganizer: async function ({ domain, to, subject, text }) {
    const query = `
      select organizers.smtp, organizers.smtp_psw, organizers.name
      from organizers, salones where salones.organizer_id=organizers.id and salones.domain=:domain
    `;

    const [[organizer]] = await models.sequelize.query(query, {
      replacements: {
        domain
      }
    });
    return 0

    const { smtp, smtp_psw, name } = organizer;
    return m.send({ host: smtp, user: 'domfoto72', pass: smtp_psw, from: name, to, subject, text });
  }
}

module.exports = m;
