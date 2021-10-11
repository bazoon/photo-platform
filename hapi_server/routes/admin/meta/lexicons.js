module.exports = [
  {
    method: 'gET',
    path: '/api/admin/lexicons/meta',
    handler: async function (request, h) {
      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633967524.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'code',
          'category',
          'commentPhrase',
          'categoriesLexicId'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'default': 0
          },
          'code': {
            '$id': '#root/code', 
            'title': 'code', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'category': {
            '$id': '#root/category', 
            'title': 'category', 
            'type': 'integer',
            'default': 0
          },
          'commentPhrase': {
            '$id': '#root/commentPhrase', 
            'title': 'commentPhrase', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'categoriesLexicId': {
            '$id': '#root/categoriesLexicId', 
            'title': 'categoriesLexicId', 
            'type': 'integer',
            'default': 0
          }
        }
      }

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
