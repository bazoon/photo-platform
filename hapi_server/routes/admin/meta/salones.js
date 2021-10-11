const  { lens, findLens, over } = require('lodash-lens');



const saloneRegulars = [
  {
    id: 0,
    name: 'regular.unregular'
  },
  {
    id: 1,
    name: 'regular.unnormal'
  },
  {
    id: 2,
    name: 'regular.year'
  },
  {
    id: 3,
    name: 'regular.month'
  }
];


module.exports = [
  {
    method: 'gET',
    path: '/api/admin/salones/meta',
    handler: async function (request, h) {
      const salonTypes = await h.query('select name as label, id as value from spr_salone_types');
      const organizers = await h.query('select name as label, id as value from organizers');


      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633968778.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'sprSaloneTypeId',
          'organizerId',
          'name',
          'regular',
          'private',
          'domain',
          'designCode',
          'rowState'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'default': 0
          },
          'sprSaloneTypeId': {
            '$id': '#root/sprSaloneTypeId', 
            'title': 'sprSaloneTypeId', 
            'type': 'array',
            'default': 0,
            items: {
              type: 'object',
              enum: salonTypes
            }
          },
          'organizerId': {
            '$id': '#root/organizerId', 
            'title': 'organizer', 
            'type': 'array',
            'default': 0,
            items: {
              type: 'object',
              enum: organizers
            }
          },
          'name': {
            '$id': '#root/name', 
            'title': 'name', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'regular': {
            '$id': '#root/regular', 
            'title': 'regular', 
            'type': 'integer',
            'default': 0
          },
          'private': {
            '$id': '#root/private', 
            'title': 'private', 
            'type': 'integer',
            'default': 0
          },
          'domain': {
            '$id': '#root/domain', 
            'title': 'domain', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'designCode': {
            '$id': '#root/designCode', 
            'title': 'designCode', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'rowState': {
            '$id': '#root/rowState', 
            'title': 'rowState', 
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
