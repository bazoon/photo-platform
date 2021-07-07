module.exports = [
  {
    method: 'GET',
    path: '/api/admin/contests/meta',
    handler: async function (request, h) {
      const salones = await h.query('select name, id from salones');

      const columns = [
        {
          title: 'salone',
          dataIndex: 'saloneId',
          key: 'saloneId',
          width: 200,
          options: salones.map(({id, name}) => ({key: id, dataIndex: id, label: name}))
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
          key: 'dateStart',
          width: 200,
        },
        {
          title: 'dateStop',
          dataIndex: 'dateStop',
          key: 'dateStop',  
          width: 200,  
        }, 
        {
          title: 'juryEnd',
          dataIndex: 'juryEnd',
          key: 'juryEnd',  
          width: 200,  
        }, 
        {
          title: 'rateShow', 
          dataIndex: 'rateShow',
          key: 'rateShow',  
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

      const fields = [
      
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
