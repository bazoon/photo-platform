module.exports = [
  {
    method: 'gET',
    path: '/api/admin/nominationSections/meta',
    handler: async function (_, h) {
      const languages = await h.query('select name_dialect as label, id as value from languages');
      const sections = await h.query('select name as label, id as value from sections');

      const fieldsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1634048710.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'languageId',
          'sectionId',
          'name'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'examples': [
              12
            ],
            'default': 0
          },
          'languageId': {
            '$id': '#root/languageId', 
            'title': 'languageId', 
            'type': 'array',
            'examples': [
              2
            ],
            'default': 0,
            items: {
              type: 'object',
              enum: languages
            }
          },
          'name': {
            '$id': '#root/name', 
            'title': 'name', 
            'type': 'string',
            'default': '',
            'examples': [
              'grow up!'
            ],
            'pattern': '^.*$'
          }
        }
      };

      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1634048710.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'languageId',
          'sectionId',
          'name'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'examples': [
              12
            ],
            'default': 0
          },
          'language': {
            '$id': '#root/languageId', 
            'title': 'languageId', 
            'type': 'string',
          },
          'name': {
            '$id': '#root/name', 
            'title': 'name', 
            'type': 'string',
            'default': '',
            'examples': [
              'grow up!'
            ],
            'pattern': '^.*$'
          }
        }
      };


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
