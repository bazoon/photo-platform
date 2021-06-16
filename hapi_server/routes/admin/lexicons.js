const R = require('ramda');


const fields = [
  'id',
  'code',
  'category',
  'commentPhrase'
];

const fullFields = ['language'].concat(fields);

module.exports = [
  {
    method: 'POST',
    path: '/api/admin/lexicons',
    handler: async function (request, h) {
      const {
        category,
        code,
        commentPhrase,
      } = request.payload;

      const lexicon = await h.models.Lexicon.create({
        category,
        code,
        commentPhrase,
      });

      return lexicon.toJSON();
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/admin/lexicons',
    handler: async function (request, h) {
      try {
        const query = `
          select lexicons.id as lexiconId, comment_phrase, phrases.id as phraseId, code,category,
          language_id, phrases.name, name_dialect from lexicons
          left join phrases on lexicons.id=phrases.lexicon_id
          left join languages on languages.id=phrases.language_id
      `;
        const groups = R.groupBy(item => item.lexiconid, await h.query(query));
        return Object.keys(groups).map(key => {
          const value = groups[key];
          return {
            id: value[0].lexiconid,
            code: value[0].code,
            comment: value[0].comment_phrase,
            category: value[0].category, 
            data: value
          }
        });
      } catch(e) {
        return e;
      }

      // const lexicons = await h.models.Lexicon.findAll();
      // return R.map(R.pick(fields), lexicons);
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/lexicons/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const lexiconValues = R.pick(fields, request.payload);
      const lexicon = await h.models.Lexicon.findOne({
        where: {
          id
        }
      });

      await lexicon.update(lexiconValues);
      return R.pick(fields, lexicon);
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/admin/lexicons/{id}',
    handler: async function (request, h) {
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/admin/lexicons/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      await h.models.Lexicon.destroy({
        where: {
          id
        }
      });

      return {};
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },

];

