module.exports = [
  {
    method: 'GET',
    path: '/api/admin/saloneFiles/meta',
    handler: async function (request, h) {

      const columns = [
        {
          title: 'image',
          dataIndex: 'img',
          key: 'image',
          type: 'file',
          width: 100
        },
      ];
      return {
        columns,
        fields: columns
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];


module.exports = [
  {
    method: 'GET',
    path: '/api/admin/saloneFiles/meta',
    handler: async function (_, h) {
      const fieldsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633789276.json', 
        'title': 'Root', 
        'type': 'array',
        'default': [],
        'required': [],
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
          'file': {
            '$id': '#root/items/file', 
            'title': 'File', 
            'type': 'image',
            'default': '',
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

