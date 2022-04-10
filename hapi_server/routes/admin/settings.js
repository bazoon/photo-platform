module.exports = [
  {
    method: 'GET',
    path: '/api/admin/settings',
    handler: async function (request, h) {
      const { permissions } = h.request.auth.credentials
      
      let query = 'select * from settings';

      if (permissions.includes('domain.settings.update.3')) {
        query = 'select * from settings where levelable >= 3';
      } else if (permissions.includes('domain.settings.update.2')) {
        query = 'select * from settings where levelable >= 2';
      } else if (permissions.includes('domain.settings.update.1')) {
        query = 'select * from settings where levelable >= 1';
      }

      return await h.query(query);
    },
    options: {
      tags: ['api'],
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
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/admin/settings',
    handler: async function (request, h) {
      const {payload} = request;
        
      const setting = await h.models.Setting.create({
        code: payload.code,
        levelable: payload.levelable,
        enable: payload.enable,
        typeSet: payload.typeSet
      });

      return setting;
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
];

