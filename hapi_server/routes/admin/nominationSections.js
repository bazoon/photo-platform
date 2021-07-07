const R = require('ramda');

module.exports = [
  {
    method: 'POST',
    path: '/api/admin/nominationSections',
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
    path: '/api/admin/nominationSections/{id}',
    handler: async function (request, h) {
      const {id} = request.params;
      const query = `
          select section_names.id, name_dialect as language, section_names.name 
          from section_names, languages where section_names.language_id=languages.id and section_names.section_id=:id
      `;

      const nominationSections = await h.query(query, {
        replacements: {
          id
        }
      });

      return nominationSections;
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/nominationSections/{id}',
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
    method: 'DELETE',
    path: '/api/admin/nominationSections/{id}',
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

