module.exports = [
  {
    method: 'gET',
    path: '/api/admin/contestsAbout/meta',
    handler: async function (request, h) {
      const languages = await h.query('select name_dialect as label, id as value from languages');

      const fieldsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1634044432.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'languageId',
          'contestId',
          'name',
          'thesis',
          'rules',
          'miniRules'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'examples': [
              11
            ],
            'default': 0
          },
          'languageId': {
            '$id': '#root/languageId', 
            'title': 'languageId', 
            'type': 'array',
            'examples': [
              1
            ],
            'default': 0,
            items: {
              type: 'object',
              enum: languages
             }
          },
          'contestId': {
            '$id': '#root/contestId', 
            'title': 'contestId', 
            'type': 'integer',
            'examples': [
              30
            ],
            'default': 0
          },
          'name': {
            '$id': '#root/name', 
            'title': 'name', 
            'type': 'string',
            'default': '',
            'examples': [
              'cool'
            ],
            'pattern': '^.*$'
          },
          'thesis': {
            '$id': '#root/thesis', 
            'title': 'thesis', 
            'type': 'text',
            'default': '',
            'examples': [
              'local'
            ],
            'pattern': '^.*$'
          },
          'rules': {
            '$id': '#root/rules', 
            'title': 'rules', 
            'type': 'text',
            'default': '',
            'examples': [
              'roo\n'
            ],
            'pattern': '^.*$'
          },
          'miniRules': {
            '$id': '#root/miniRules', 
            'title': 'miniRules', 
            'type': 'string',
            'default': '',
            'examples': [
              ''
            ],
            'pattern': '^.*$'
          }
        }
      };

      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1634044432.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'languageId',
          'contestId',
          'name',
          'thesis',
          'rules',
          'miniRules'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'examples': [
              11
            ],
            'default': 0
          },
          'languageId': {
            '$id': '#root/languageId', 
            'title': 'languageId', 
            'type': 'array',
            'examples': [
              1
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
              'cool'
            ],
            'pattern': '^.*$'
          },
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
