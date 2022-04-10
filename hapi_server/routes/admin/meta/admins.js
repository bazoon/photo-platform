const {getCurrentDomain} = require('../../utils/getCurrentDomain');

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/admins/meta',
    handler: async function (request, h) {
      const { permissions } = h.request.auth.credentials;
      console.log('PERMISSIONS', permissions);
      const domain = getCurrentDomain(request);

      const users = await h.query('select CONCAT("first_name", \' \', "last_name") as label, id as value from users');
      
      let organizersQuery = '';

      if (permissions.includes('all')) {
        organizersQuery = `
          select distinct organizers.name as label, organizers.id as value
          from organizers
        `
      } else {
        organizersQuery = `
          select distinct organizers.name as label, organizers.id as value 
          from organizers, salones
          where salones.domain=:domain and organizers.id=salones.organizer_id
        `
      }

      const organizers = await h.query(organizersQuery, {
        replacements: {
          domain
        }
      });

      const adminTypes = [];
      
      if (permissions.includes('admins.update') || permissions.includes('all')) {
        adminTypes.push({label: 'admin', value: 0});
      }


      if (permissions.includes('moders.update')  || permissions.includes('all')) {
        adminTypes.push({label: 'moder', value: 1});
      }

      if (permissions.includes('domain.moders.update') || permissions.includes('all')) {
        adminTypes.push({label: 'domainModer', value: 1010});
      }

      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633965852.json', 
        'title': 'Root', 
        'type': 'object',
        'required': [
          'organizer_id',
          'user_id',
          'adm_type',
          'id'
        ],
        'properties': {
          'organizerId': {
            '$id': '#root/organizer_id', 
            'title': 'organizer', 
            'type': 'integer',
            'default': 0
          },
          'userId': {
            '$id': '#root/user_id', 
            'title': 'userId', 
            'type': 'integer',
            'default': 0
          },
          'admType': {
            '$id': '#root/adm_type', 
            'title': 'admType', 
            'default': 0,
            'type': 'array',
            items: {
              type: 'object',
              enum: [{label: 'admin', value: 0}, {label: 'moder', value: 1}]
            }
          },
          'id': {
            '$id': '#root/id', 
            'title': 'Id', 
            'type': 'integer',
            'default': 0
          }
        }
      }


      const fieldsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633965852.json', 
        'title': 'Root', 
        'type': 'object',
        'required': [
          'organizerId',
          'userId',
          'admType',
          'id'
        ],
        'properties': {
          'organizerId': {
            '$id': '#root/organizer_id', 
            'title': 'organizer', 
            'type': 'array',
            'default': 0,
            items: {
              type: 'object',
              enum: organizers
            },
          },
          'userId': {
            '$id': '#root/user_id', 
            'title': 'Userid', 
            'type': 'array',
            'default': 0,
            items: {
              type: 'object',
              enum: users
            }
          },
          'admType': {
            '$id': '#root/adm_type', 
            'title': 'admType', 
            'default': 0,
            'type': 'array',
            items: {
              type: 'object',
              enum: adminTypes
            }
          },
          'id': {
            '$id': '#root/id', 
            'title': 'Id', 
            'type': 'integer',
            'default': 0
          }
        }
      }

      return {
        fieldsSchema,
        columnsSchema
      };
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
