const R = require('ramda');
const { QueryTypes } = require('sequelize');
const camelizeObject = require('../utils/camelizeObject');
const {map} = require('lodash/fp');

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
    path: '/api/admin/applications',
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
    path: '/api/admin/applications/{id}',
    handler: async function (request, h) {
      const { id } = request.params;

      const query = `
        select
          registration_contests.id,
          users.first_name || ' ' || users.last_name as user_name,
          date_reg,
          section_count,
          reg_state,
          rejection_reason,
          payment,
          max_count_img
        from
          users,
          registration_contests
        where
          registration_contests.user_id = users.id and registration_contests.contest_id = :contestId
      `;

      try {
        const [applications] = await h.models.sequelize.query(query, {
          replacements: {
            contestId: id
          }
        });

        return map(camelizeObject)(applications);
      } catch(e) {
        return e;
      }

      // const applications = await h.models.Lexicon.findAll();
      // return R.map(R.pick(fields), applications);
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/applications/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const lexiconValues = R.pick(fields, request.payload);
      const lexicon = await h.models.Lexicon.findAll({
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
    path: '/api/admin/applications/{id}',
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

