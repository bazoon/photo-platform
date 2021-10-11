module.exports = [
  {
    method: 'GET',
    path: '/api/admin/settings/meta',
    handler: async function (_, h) {
      const fieldsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633789276.json', 
        'title': 'Root', 
        'type': 'array',
        'default': [],
        'properties': {
          'id': {
            '$id': '#root/items/id', 
            'title': 'Id', 
            'type': 'integer',
            'examples': [
              7
            ],
            'default': 0,
          },
          'code': {
            '$id': '#root/items/code', 
            'title': 'Code', 
            'type': 'string',
            'default': '',
            'examples': [
              'backGroundImages'
            ],
            'pattern': '^.*$'
          },
          'levelable': {
            '$id': '#root/items/levelable', 
            'title': 'Levelable', 
            'type': 'integer',
            'examples': [
              2
            ],
            'default': 0
          },
          'enable': {
            '$id': '#root/items/enable', 
            'title': 'Enable', 
            'type': 'boolean',
            'examples': [
              true
            ],
            'default': true
          },
          'typeSet': {
            '$id': '#root/items/type_set', 
            'title': 'typeSet', 
            'type': 'array',
            'default': '',
            'examples': [
              'fileNameList'
            ],
            'pattern': '^.*$',
            items: {
              type: 'string',
              enum: ['string', 'check', 'list', 'json', 'file', 'fileName', 'fileNameList'].map(c =>({value: c, label: c}))
            }
          }
        }
      };

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

