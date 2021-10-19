module.exports = [
  {
    method: 'GET',
    path: '/api/admin/moder/stats/{contestId}',
    handler: async function (request, h) {
      const { contestId } = request.params;
      const query = `
        select
          contests.subname,
          count(registration_contests.id)
        from
          photoworks,
          registration_contests,
          contests
        where
          registration_contests.contest_id=:contestId and contests.id=:contestId
          group by subname
      `;

      const [totalPhotoworks] = await h.models.sequelize.query(query, {
        replacements: {
          contestId
        }
      });

      return { totalPhotoworks: totalPhotoworks[0].count };
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/moder/approve/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const photowork = await h.models.Photowork.findOne({ where: {id} });
      photowork.moder = 1;
      await photowork.save();
      return photowork;     
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/moder/decline/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const {reason} = request.payload;
      const photowork = await h.models.Photowork.findOne({ where: {id} });
      photowork.moder = 2;
      photowork.reasonModeration = reason;
      await photowork.save();
      return photowork;
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  // {
  //   method: 'DELETE',
  //   path: '/api/admin/juries/{id}',
  //   handler: async function (request, h) {
  //     const { id } = request.params;

  //     await h.models.Jury.destroy({
  //       where: {
  //         id
  //       }
  //     });

  //     return {
  //       id
  //     }
  //   },
  //   options: {
  //     auth: {
  //       mode: 'required'
  //     }
  //   }
  // },
  // {
  //   method: 'PUT',
  //   path: '/api/admin/juries/{id}',
  //   handler: async function (request, h) {
  //     const { id } = request.params;
  //     const {
  //       name,
  //       nameDialect,
  //       short,
  //     } = request.payload;

  //     const language = await h.models.Language.findOne({
  //       where: {
  //         id
  //       }
  //     });

  //     await language.update({
  //       name,
  //       nameDialect,
  //       short,
  //     });

  //     return {
  //       id: language.id,
  //       name: language.name,
  //       nameDialect: language.nameDialect,
  //       short: language.short,
  //     }
  //   },
  //   options: {
  //     auth: {
  //       mode: 'required'
  //     }
  //   }
  // },
];

