const R = require('ramda');

const fields = [
    'id',
    'maxCountImg',
    'name'
];

module.exports = [
  {
    method: 'POST',
    path: '/api/admin/nominations/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const {
        maxCountImg,
        name
      } = request.payload;

      const nomination = await h.models.Section.create({
        maxCountImg,
        name,
        contestId: id
      });
      
      return nomination;

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
    path: '/api/admin/nominations/{id}',
    handler: async function (request, h) {
      const {id} = request.params;

      const query = `
          select id, max_count_img, name from sections where contest_id=:id
      `;

      const nominations = await h.query(query, {
        replacements: {
          id
        }
      });

      return nominations;
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
    path: '/api/admin/nominations/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const sectionValues = R.pick(fields, request.payload);
      const section = await h.models.Section.findOne({
        where: {
          id
        }
      });

      await section.update(sectionValues);
      return R.pick(fields, section);
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
    path: '/api/admin/nominations/{id}',
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

