module.exports = [
  {
    method: 'GET',
    path: '/api/admin/contestsAbout/meta',
    handler: async function (request, h) {

      const languages = await h.models.Language.findAll();

      const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 100,
        },
        {
          title: 'language',
          dataIndex: 'language',
          key: 'language',
          width: 100,
        },
      ];

      const fields = [
        {  
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 100,
        },
        {
          title: 'languageId',
          dataIndex: 'languageId',
          key: 'languageId',
          options: languages.map(({nameDialect, id}) => ({key: id, dataIndex: id, label: nameDialect })),
        },
        {
          title: 'thesis',
          dataIndex: 'thesis',
          key: 'thesis',
          type: 'editor'
        },
        {
          title: 'rules',
          dataIndex: 'rules',
          key: 'rules',
          type: 'editor'
        },
      ];

      return {
        columns,
        fields
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
