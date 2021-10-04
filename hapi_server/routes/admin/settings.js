module.exports = [
  {
    method: 'GET',
    path: '/api/admin/settings',
    handler: async function (request, h) {
      const query = `
        select * from settings
      `;
      return await h.query(query);
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/settings/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const rec = request.payload;
        
      const setting = await h.models.Setting.findOne({
        where: {
          id
        }
      });

      await setting.update(rec);
      return setting;
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },

];

