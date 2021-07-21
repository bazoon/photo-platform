const  { lens, findLens, over } = require('lodash-lens');

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/phrases/meta',
    handler: async function (request, h) {
      const languages = await h.models.Language.findAll();

      const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 100
        },
        {
          title: 'language',
          dataIndex: 'language',
          key: 'language',
          width: 100
        }
      ];
      
      const fields = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'language',
          dataIndex: 'languageId',
          key: 'languageId',
          options: languages.map(({nameDialect, id}) => ({key: id, dataIndex: id, label: nameDialect }))
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
