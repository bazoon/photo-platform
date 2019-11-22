const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router();
const models = require('../../../models');

const expiresIn = 24 * 60 * 60 * 30;


router.get('/:locale', koaBody({ multipart: true }), async ctx => {
  const { locale } = ctx.params;
  const query = `
    select code, phrases.name from lexicons, languages, phrases
    where 
    phrases.language_id=languages.id and
    phrases.lexicon_id=lexicons.id and
    languages.short=:locale
    
  `;
  let dict = {};

  const [translations] = await models.sequelize.query(query, {
    replacements: { locale }
  });


  translations.forEach(t => {
    let keys = t.code.split('.');
    insertValueAtKey(dict, keys, t.name)
  });

  ctx.body = dict;
});

function insertValueAtKey(obj, keys, value) {
  const key = keys.shift();
  if (keys.length === 0) {
    obj[key] = value;
    return;
  }

  obj[key] = obj[key] || {};

  insertValueAtKey(obj[key], keys, value);
}

module.exports = router;
