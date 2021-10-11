const {get, split, nth, compose} = require('lodash/fp');
const permissions = require('../services/permissions');

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/saloneSettings',
    handler: async function (request, h) {
      const { host } = request.info;
      const user = get('auth.credentials', request);
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);
      const r = { role: await permissions.getRole(user, domain) };
      
      console.info(r);

      const query = `
        select salon_settings.id, setting_id, salone_id, name as salone, code as setting, content, keycheck 
        from salon_settings, salones, settings
        where salon_settings.salone_id=salones.id and salon_settings.setting_id=settings.id and salones.domain=:domain
      `;
      const saloneSettings = await h.query(query, { replacements: { domain: domain } });
      return saloneSettings;
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/admin/saloneSettings',
    handler: async function (request, h) {
      const { settingId, saloneId, content, keycheck } = request.payload;
      const saloneSetting = await h.models.SaloneSetting.create({
         settingId, saloneId, content, keycheck 
      });

      return saloneSetting;
    },
    options: {
      auth: {
        mode: 'required'
      },
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/saloneSettings/{id}',
    handler: async function (request, h) {
      console.info(request.payload, 212);
      const { id } = request.params;
      const {  settingId, saloneId, content, keycheck  } = request.payload;
      
      const saloneSetting = await h.models.SaloneSetting.findOne({
        where: {
          id
        }
      });


      await saloneSetting.update({
          settingId, saloneId, content, keycheck  
      });
  
      const query = `
        select salon_settings.id, name as salone, code as setting, keycheck, content from
        salones, settings, salon_settings where
        salones.id=salon_settings.salone_id and settings.id=salon_settings.setting_id
      `;

      const [r] = await h.query(query)
      return r;
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/admin/saloneSettings/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      await h.models.SaloneSetting.destroy({where: {id}});
      return {};
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
