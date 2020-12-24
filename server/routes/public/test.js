const Router = require('koa-router');
const router = new Router();
const mail = require('../../services/mail');

router.get('/:test', async ctx => {
  const config = {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: 'admin@fotoregion.site',
    to: 'vith@yandex.ru',
    subject: 'hello it is testing message!',
    text: 'long text here...'
  };

  mail.send(config);
  ctx.body = 'Done';
});

module.exports = router;
