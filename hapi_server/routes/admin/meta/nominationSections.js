module.exports = [
  {
    method: 'GET',
    path: '/api/admin/nominationSections/meta',
    handler: async function (_, h) {
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
          width: 100,
        },
      ];

      const fields = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 100
        },
        {
          title: 'language',
          dataIndex: 'languageId',
          key: 'language',
          width: 100,
          options: languages.map(({nameDialect, id}) => ({key: id, dataIndex: id, label: nameDialect }))
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
