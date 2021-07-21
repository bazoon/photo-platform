const R = require('ramda');

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
      console.log(id)

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
      auth: {
        mode: 'required'
      }
    }
  },

];

