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
  // {
  //   method: 'POST',
  //   path: '/api/admin/juries/{id}',
  //   handler: async function (request, h) {
  //     const { id } = request.params;
  //     const {
  //       rank,
  //       userId
  //     } = request.payload;

  //     const jury = await h.models.Jury.create({
  //       rank,
  //       userId,
  //       contestId: id
  //     });

  //     const query = `
  //       select first_name || ' ' || last_name as name, rank, juries.id from users, juries where users.id=juries.user_id and juries.id=:id
  //     `;

  //     const [j] = await h.models.sequelize.query(query, {
  //       replacements: {
  //         id: jury.id
  //       }
  //     });

  //     return j[0];
  //   },
  //   options: {
  //     auth: {
  //       mode: 'required'
  //     }
  //   }
  // },
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

