module.exports = [
  {
    method: 'gET',
    path: '/api/admin/nominations/meta',
    handler: async function (request, h) {
      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1634048080.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'contestId',
          'maxCountImg',
          'name',
          'yearBirth'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'examples': [
              8
            ],
            'default': 0
          },
          'maxCountImg': {
            '$id': '#root/maxCountImg', 
            'title': 'maxCountImg', 
            'type': 'integer',
            'examples': [
              4
            ],
            'default': 0
          },
          'name': {
            '$id': '#root/name', 
            'title': 'name', 
            'type': 'string',
            'default': '',
            'examples': [
              'листы'
            ],
            'pattern': '^.*$'
          },
          'yearBirth': {
            '$id': '#root/yearBirth', 
            'title': 'yearBirth', 
            'type': 'integer',
            'examples': [
              2016
            ],
            'default': 0
          }
        }
      };

      return {
        fieldsSchema: columnsSchema,
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
