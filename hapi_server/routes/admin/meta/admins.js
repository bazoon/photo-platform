module.exports = [
  {
    method: 'GET',
    path: '/api/admin/admins/meta',
    handler: async function (request, h) {
      const users = await h.query('select CONCAT("first_name", \' \', "last_name") as label, id as value from users');
      const organizers = await h.query('select name as label, id as value from organizers');

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
            'type': 'integer',
            'default': 0
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
            }
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
            'type': 'integer',
            'default': 0
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
