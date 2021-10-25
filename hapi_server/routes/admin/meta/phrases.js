const  { lens, findLens, over } = require('lodash-lens');

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/phrases/meta',
    handler: async function (request, h) {
      const languages = await h.query('select name_dialect as label, id as value from languages');
      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633967524.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'name',
          'language'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'default': 0
          },
          'name': {
            '$id': '#root/name', 
            'title': 'name', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'language': {
            '$id': '#root/language', 
            'title': 'language', 
            'type': 'ststring'
          }
        }
      }

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
            'title': 'language', 
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
