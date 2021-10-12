module.exports = [
  {
    method: 'gET',
    path: '/api/admin/juries/meta',
    handler: async function (request, h) {
      const users = await h.query('select CONCAT("first_name", \' \', "last_name") as label, id as value from users');
 
      const fieldsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633965852.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'organizerId',
          'userId',
          'admType',
          'id'
        ],
        'properties': {
          'userId': {
            '$id': '#root/userId', 
            'title': '', 
            'type': 'array',
            'default': 0,
            items: {
              type: 'object',
              enum: users
            }
          },
          'rank': {
            '$id': '#root/admType', 
            'title': 'rank', 
            'type': 'integer',
            'default': 0
          },
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'default': 0
          }
        }
      }

      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633965852.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'organizerId',
          'userId',
          'admType',
          'id'
        ],
        'properties': {
          'name': {
            '$id': '#root/userId', 
            'title': 'name', 
            'type': 'string',
            'default': 0,
          },
          'rank': {
            '$id': '#root/admType', 
            'title': 'rank', 
            'type': 'integer',
            'default': 0
          },
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
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
