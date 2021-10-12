const {over, findLens} = require('lodash-lens');
const {compose, map, filter} = require('lodash/fp');
const camelize = require('../../utils/camelize');

module.exports = [
  {
    method: 'gET',
    path: '/api/admin/contests/meta',
    handler: async function (request, h) {
      const salones = await h.query('select name as label, id as value from salones');
      
      // const cols = await h.models.informationSchema.findAll({
      //   where: {
      //     tableName: 'contests'
      //   }
      // });

      // const salones = salonesData.map(({id, name}) => ({key: id, dataIndex: id, label: name, id}))

      // const fields = compose(
      //   over(findLens({dataIndex: 'saloneId'}), col => ({...col, options: salones})),
      //   map(({columnName, isNullable, dataType}) => ({title: columnName, dataIndex: columnName, type: dataType, key: columnName, width: 200, required: isNullable === 'yES' })),
      //   filter(({columnName}) => columnName !== 'id'),
      //   map(({dataValues}) => ({...dataValues, dataType: camelize(dataValues.dataType), columnName: camelize(dataValues.columnName)}))
      // )(cols)


      const columnsSchema ={
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633969224.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'saloneId',
          'subname',
          'years',
          'dateStart',
          'dateStop',
          'dateJuriEnd',
          'dateRateShow',
          'showType',
          'showRateState',
          'democraty',
          'payType',
          'sectionCount',
          'maxrate',
          'maxsize',
          'maxWeight',
          'maxCountImg'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'default': 0
          },
          'salone': {
            '$id': '#root/saloneId', 
            'title': 'saloneId', 
            'type': 'array',
            'default': 0,
            items: {
              type: 'object',
              enum: salones
            },
            width: 200
          },
          'subname': {
            '$id': '#root/subname', 
            'title': 'subname', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$',
            width: 200
          },
          'years': {
            '$id': '#root/years', 
            'title': 'years', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$',
            width: 200
          },
          'dateStart': {
            '$id': '#root/dateStart', 
            'title': 'dateStart', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$',
            width: 200
          },
          'dateStop': {
            '$id': '#root/dateStop', 
            'title': 'dateStop', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$',
            width: 200
          },
          'dateJuriEnd': {
            '$id': '#root/dateJuriEnd', 
            'title': 'dateJuriEnd', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$',
            width: 200
          },
          'dateRateShow': {
            '$id': '#root/dateRateShow', 
            'title': 'dateRateShow', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$',
            width: 200
          },
          'showType': {
            '$id': '#root/showType', 
            'title': 'showType', 
            'type': 'integer',
            'default': 0,
            width: 200
          },
          'showRateState': {
            '$id': '#root/showRateState', 
            'title': 'showRateState', 
            'type': 'integer',
            'default': 0,
            width: 200
          },
          'democraty': {
            '$id': '#root/democraty', 
            'title': 'democraty', 
            'type': 'integer',
            'default': 0,
            width: 200
          },
          'payType': {
            '$id': '#root/payType', 
            'title': 'payType', 
            'type': 'integer',
            'default': 0,
            width: 200
          },
          'sectionCount': {
            '$id': '#root/sectionCount', 
            'title': 'sectionCount', 
            'type': 'integer',
            'default': 0,
            width: 200
          },
          'maxrate': {
            '$id': '#root/maxrate', 
            'title': 'maxrate', 
            'type': 'integer',
            'default': 0,
            width: 200
          },
          'maxsize': {
            '$id': '#root/maxsize', 
            'title': 'maxsize', 
            'type': 'null',
            'default': null,
            width: 200
          },
          'maxWeight': {
            '$id': '#root/maxWeight', 
            'title': 'maxWeight', 
            'type': 'integer',
            'default': 0,
            width: 200
          },
          'maxCountImg': {
            '$id': '#root/maxCountImg', 
            'title': 'maxCountImg', 
            'type': 'integer',
            'default': 0,
            width: 200
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
