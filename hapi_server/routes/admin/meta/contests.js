const {over, findLens} = require('lodash-lens');
const {compose, map, filter} = require('lodash/fp');
const camelize = require('../../utils/camelize');

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/contests/meta',
    handler: async function (request, h) {
      const salonesData = await h.query('select name, id from salones');
      
      const cols = await h.models.InformationSchema.findAll({
        where: {
          tableName: 'contests'
        }
      });

      console.log(cols.map(c=>c.dataValues))

      const salones = salonesData.map(({id, name}) => ({key: id, dataIndex: id, label: name, id}))

      const fields = compose(
        over(findLens({dataIndex: 'saloneId'}), col => ({...col, options: salones})),
        map(({columnName, isNullable, dataType}) => ({title: columnName, dataIndex: columnName, type: dataType, key: columnName, width: 200, required: isNullable === 'YES' })),
        filter(({columnName}) => columnName !== 'id'),
        map(({dataValues}) => ({...dataValues, dataType: camelize(dataValues.DataType), columnName: camelize(dataValues.columnName)}))
      )(cols)

      const columns = [
        {
          title: 'salone',
          dataIndex: 'saloneId',
          key: 'saloneId',
          width: 200,
          options: salones
        },
        {
          title: 'subname',
          dataIndex: 'subname',
          key: 'subname',
          width: 200,
        },
        {
          title: 'years',
          dataIndex: 'years',
          key: 'years',
          width: 200,
        },
        {
          title: 'dateStart', 
          dataIndex: 'dateStart',
          type: 'date',
          key: 'dateStart',
          width: 200,
        },
        {
          title: 'dateStop',
          dataIndex: 'dateStop',
          type: 'date',
          key: 'dateStop',  
          width: 200,  
        }, 
        {
          title: 'dateJuriEnd',
          dataIndex: 'dateJuriEnd',
          type: 'date',
          key: 'dateJuryEnd',  
          width: 200,  
        }, 
        {
          title: 'dateRateShow', 
          dataIndex: 'dateRateShow',
          type: 'date',
          key: 'dateRateShow',  
          width: 200,
        }, 
        {
          title: 'showType', 
          dataIndex: 'showType',
          key: 'showType',  
          width: 200,
        }, 
        {
          title: 'showRateState', 
          dataIndex: 'showRateState',
          key: 'showRateState',  
          width: 200,
        }, 
      ];

      return {
        columns,
        fields,
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
