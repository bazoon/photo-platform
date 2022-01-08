const models = require('../../../models');
const R = require('ramda');
// const camelizeObject = require('../../utils/camelizeObject');

const fields = ['id', 'contestId', 'maxCountImg', 'name'];

async function getTranslation(id) {
  const query = `select section_names.name, language_id, languages.name as language, section_names.id
                from section_names, languages
                where section_names.language_id=languages.id and section_names.id=:id
  `;

  const [[translation]] = await models.sequelize.query(query, {
    replacements: { id }
  });

  return translation;
}

module.exports = [
  {
    method: 'POST',
    path: '/api/admin/contests2',
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
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/admin/contestSections/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const sections = await h.models.Section.findAll({
        where: {
          contestId: id
        }
      });
      return R.map(R.pick(fields), sections);
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/contests2/{id}',
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
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/admin/contests3/{id}',
    handler: async function (request, h) {
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/admin/contests4/{id}',
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
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },

];

