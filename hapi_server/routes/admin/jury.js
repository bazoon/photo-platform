const {getCurrentDomain} = require('../utils/getCurrentDomain');
const {getSaloneFromContestId} = require('../utils/getCurrentSalone');

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/juries/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const query = `
        select first_name, last_name,rank, user_id, juries.id from users, juries where users.id=juries.user_id and contest_id=:contestId
      `;
      const [juries] = await h.models.sequelize.query(query, {
        replacements: {
          contestId: id
        }
      });

      return juries.map(j => {
        return {
          id: j.id,
          name: `${j.first_name} ${j.last_name}`,
          userId: j.user_id,
          rank: j.rank
        }
      });


    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      },
      plugins: {
        hacli: {
          permissions: ['superAdmin', 'domainAdmin', 'superModer', 'domainModer']
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/admin/juries/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const {
        rank,
        userId
      } = request.payload;

      const {permissions} = h.request.auth.credentials;
      
      const contestDomain = getCurrentDomain(request);
      const salone = await getSaloneFromContestId(id)

      console.log(contestDomain, salone.domain);

       if (contestDomain !== salone.domain) {
          return h.response({error: 'Access denied'}).code(403);
       }

      const jury = await h.models.Jury.create({
        rank,
        userId,
        contestId: id
      });

      const query = `
        select first_name || ' ' || last_name as name, rank, juries.id from users, juries where users.id=juries.user_id and juries.id=:id
      `;

      const [j] = await h.models.sequelize.query(query, {
        replacements: {
          id: jury.id
        }
      });

      return j[0];
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      },
      plugins: {
        hacli: {
          permissions: ['superAdmin', 'domainAdmin', 'superModer', 'domainModer']
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/admin/juries/{id}',
    handler: async function (request, h) {
      const { id } = request.params;

      await h.models.Jury.destroy({
        where: {
          id
        }
      });

      return {
        id
      }
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      },
      plugins: {
        hacli: {
          permissions: ['superAdmin', 'domainAdmin', 'superModer', 'domainModer']
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/juries/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const {
        name,
        nameDialect,
        short,
      } = request.payload;

      const language = await h.models.Language.findOne({
        where: {
          id
        }
      });

      await language.update({
        name,
        nameDialect,
        short,
      });

      return {
        id: language.id,
        name: language.name,
        nameDialect: language.nameDialect,
        short: language.short,
      }
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      },
      plugins: {
        hacli: {
          permissions: ['superAdmin', 'domainAdmin', 'superModer', 'domainModer']
        }
      }
    }
  },
];

