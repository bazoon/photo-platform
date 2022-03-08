const models = require('../../../models');
const R = require('ramda');
const {pick} = require('lodash/fp');
const fs = require('fs');

const fields = [
  'id',
  'sprSaloneTypeId',
  'saloneType',
  'organizerId',
  'organizer',
  'name',
  'regular',
  'domain',
  'designCode',
  'rowState',
  'private'
];

async function getSalone(record) {
  const query = `
    select organizers.name as organizer, spr_salone_types.name as saloneType, spr_salone_type_id, organizer_id,
    salones.name, regular, private, domain, design_code, salones.row_state, salones.id, slug
    from salones, organizers, spr_salone_types
    where
    salones.spr_salone_type_id=spr_salone_types.id and salones.organizer_id=organizers.id and salones.id=:id
  `;
  const [[salone]] = await models.sequelize.query(query, {
    replacements: {
      id: record.id
    }
  });

  return {
    id: salone.id,
    organizer: salone.organizer,
    saloneType: salone.salonetype,
    sprSaloneTypeId: salone.spr_salone_type_id,
    organizerId: salone.organizer_id,
    name: salone.name,
    regular: salone.regular,
    private: salone.private,
    domain: salone.domain,
    slug: salone.slug,
    designCode: salone.design_code,
    rowState: salone.row_state
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/salones',
    handler: async function (request, h) {
      const query = `
      select organizers.name as organizer, spr_salone_types.name as salone_type, spr_salone_type_id, organizer_id, 
        salones.name, regular, private, domain, design_code, salones.row_state, salones.id, slug
      from salones, organizers, spr_salone_types
      where
      salones.spr_salone_type_id=spr_salone_types.id and salones.organizer_id=organizers.id
      `;
      return await h.query(query);
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      },
      plugins: {
        hacli: {
          permissions: ['superAdmin', 'domainAdmin', 'superModer', 'domainModer']
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/admin/salones',
    handler: async function (request, h) {
      const saloneValues = R.pick(fields, request.payload);
      delete saloneValues.id;
      saloneValues.slug = saloneValues.domain;
 
      let salone = await h.models.Salone.create(saloneValues);
      const uploadFolder = process.env.UPLOAD_PATH + '/' + saloneValues.slug;

      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder)
      }

      return await getSalone(salone);
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      },
      plugins: {
        hacli: {
          permissions: ['superAdmin', 'domainAdmin', 'superModer', 'domainModer']
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/salones/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const rec = pick(fields, request.payload);
        
      const salone = await h.models.Salone.findOne({
        where: {
          id
        }
      });

      await salone.update(rec);
      return salone;
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      },
      plugins: {
        hacli: {
          permissions: ['superAdmin', 'domainAdmin', 'superModer', 'domainModer']
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/admin/salones/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      await h.models.Salone.destroy({
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
      },
      plugins: {
        hacli: {
          permissions: ['superAdmin', 'domainAdmin', 'superModer', 'domainModer']
        }
      }
    }
  }
];


