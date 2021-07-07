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
    method: 'GET',
    path: '/api/admin/salones/meta',
    handler: async function (request, h) {
      const organizers = await h.models.Organizer.findAll();
      const salonTypes = await h.models.SaloneType.findAll();

      const columns = [   
        {
          title: 'saloneType',
          dataIndex: 'saloneType',
          key: 'saloneType',
          width: 200
        },
        {
          title: 'organizer',
          dataIndex: 'organizer',
          key: 'organizer',
          width: 200
        },
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 200
        },
        {
          title: 'regular',
          dataIndex: 'regular',
          key: 'regular',
          width: 200
        },
        {
          title: 'private',
          dataIndex: 'private',
          key: 'private',
          width: 200
        },
        {
          title: 'domain',
          dataIndex: 'domain',
          key: 'domain',
          width: 200
        },
        {
          title: 'design_code',
          dataIndex: 'design_code',
          key: 'design_code',
          width: 200
        },
        {
          title: 'row_state',
          dataIndex: 'row_state',
          key: 'row_state',
          width: 200
        }
      ]

      const fields = [
        {
          title: 'sprSaloneTypeId',
          dataIndex: 'sprSaloneTypeId',
          key: 'sprSaloneTypeId',
          options: salonTypes.map(({name, id}) => ({key: id, dataIndex: id, label: name }))
        },
        {
          title: 'organizerId',
          dataIndex: 'organizerId',
          key: 'organizerId',
          options: organizers.map(({name, id}) => ({key: id, dataIndex: id, label: name }))
        },
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'regular',
          dataIndex: 'regular',
          key: 'regular',
        },
        {
          title: 'private',
          dataIndex: 'private',
          key: 'private',
        },
        {
          title: 'domain',
          dataIndex: 'domain',
          key: 'domain',
        },
        {
          title: 'designCode',
          dataIndex: 'designCode',
          key: 'designCode',
        },
        {
          title: 'rowState',
          dataIndex: 'rowState',
          key: 'rowState' 
        }
      ];


      return {
        columns,
        fields: fields
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
