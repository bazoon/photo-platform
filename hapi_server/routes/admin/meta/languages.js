module.exports = [
  {
    method: 'GET',
    path: '/api/admin/languages/meta',
    handler: async function (request, h) {

      const fieldsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633967075.json', 
        'title': 'Root', 
        'type': 'object',
        'required': [
          'id',
          'name',
          'nameDialect',
          'short'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'Id', 
            'type': 'integer',
            'default': 0
          },
          'name': {
            '$id': '#root/name', 
            'title': 'Name', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'nameDialect': {
            '$id': '#root/nameDialect', 
            'title': 'nameDialect', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'short': {
            '$id': '#root/short', 
            'title': 'Short', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          }
        }
      }




      return {
        fieldsSchema,
        columnsSchema: fieldsSchema
      };
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
