const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');
const {pick} = require('lodash/fp');
const mapValues = require('lodash/fp/mapValues');
const compose = require('crocks/helpers/compose');

const fields = [
  'id',
  'lexiconId',
  'languageId',
  'name'
];


module.exports = [
  {
    method: 'GET',
    path: '/api/admin/phrases/{lexicon_id}',
    handler: async function (request, h) {
      const { lexicon_id } = request.params;
      const phrases = await h.query(`
          select phrases.id, lexicon_id, language_id, languages.name as language, phrases.name
          from phrases, languages
          where phrases.lexicon_id=:lexiconId and phrases.language_id=languages.id`, {
        replacements: {
          lexiconId: lexicon_id
        }
      }
      );
      
      return R.map((p) => {
        return {
          id: p.id,
          name: p.name,
          languageId: p.languageId,
          language: p.language,
          lexiconId: p.lexicon_id
        }
      }, phrases);
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/admin/phrases/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const values = R.pick(fields, request.payload);
      const phrase = await models.Phrase.create({
        ...values,
        lexiconId: id
      });

      const language = await models.Language.findOne({
        where: {
          id: phrase.languageId
        }
      });

      return {...phrase.toJSON(), language: language.nameDialect};
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
    path: '/api/admin/phrases/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const values = R.pick(fields, request.payload);

      const phrase = await h.models.Phrase.findOne({
        where: { id },
        include: h.models.Language
      });
      
      await phrase.update(values).then();

      await phrase.reload();

      const f = compose(
        ({Language, id, name}) => ({id, name, languageId: Language.id, language: Language.nameDialect}),
        pick(['Language', 'id', 'name'])
      );
      return f(phrase.toJSON());
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      },
    }
  },
  {
    method: 'GET',
    path: '/api/admin/phrases/get/{id}',
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
    path: '/api/admin/phrases/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      await h.models.Phrase.destroy({
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



