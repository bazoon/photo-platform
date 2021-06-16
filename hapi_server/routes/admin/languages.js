module.exports = [
  {
    method: 'GET',
    path: '/api/admin/languages',
    handler: async function (request, h) {
      return await h.models.Language.findAll();
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/admin/languages',
    handler: async function (request, h) {
      const {
        name,
        nameDialect,
        short,
      } = request.payload;

      const language = await h.models.Language.create({
        name,
        nameDialect,
        short,
      });

      return {
        id: language.id,
        name: language.name,
        nameDialect: language.nameDialect,
        short: language.short,
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },

  {
    method: 'DELETE',
    path: '/api/admin/languages/{id}',
    handler: async function (request, h) {
      const { id } = request.params;

      await h.models.Language.destroy({
        where: {
          id
        }
      });

      return {
        id
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/languages/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const {
        name,
        nameDialect,
        short,
      } = request.payload;

      const language = await h.models.Language.findOne({
        where: {
          id
        }
      });

      await language.update({
        name,
        nameDialect,
        short,
      });

      return {
        id: language.id,
        name: language.name,
        nameDialect: language.nameDialect,
        short: language.short,
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/admin/languages/{id}',
    handler: async function (request, h) {
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },


];

