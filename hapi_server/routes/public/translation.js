const expiresIn = 24 * 60 * 60 * 30;


function insertValueAtKey(obj, keys, value) {
  const key = keys.shift();
  if (keys.length === 0) {
    obj[key] = value;
    return;
  }

  obj[key] = obj[key] || {};

  insertValueAtKey(obj[key], keys, value);
}


const translations = {
  method: 'GET',
  path: '/api/translation/{locale}',
  handler: async function (request, h) {
    const { locale } = request.params;
    const q = `
    select code, phrases.name from lexicons, languages, phrases
    where 
    phrases.language_id=languages.id and
    phrases.lexicon_id=lexicons.id and
    languages.short=:locale
  `;
    let dict = {};
    const translations = await h.query(q, {replacements: { locale }});

    translations.forEach(t => {
      let keys = t.code.split('.');
      insertValueAtKey(dict, keys, t.name)
    });

    return dict;
  },
  options: {
    tags: ['api'],
    auth: {
      mode: 'optional'
    }
  }
};


module.exports = [translations];


