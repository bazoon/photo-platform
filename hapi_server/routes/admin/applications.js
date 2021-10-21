const camelizeObject = require('../utils/camelizeObject');
const {map, compose} = require('lodash/fp');
const chalk = require('chalk');
const joi = require('joi');




const regStates = [ 
  'Подана',
  'Принята',
  'Ожидает оплаты',
  'Отклонена по неуплате',
  'Отклонена по другой причине',
  'Регистрация приостановлена',
  'Бан'
];
const addRegState = application => ({...application, regStateString: regStates[application.regState]});


module.exports = [
  {
    method: 'POST',
    path: '/api/admin/applications/approve',
    handler: async function (request, h) {
      const {
        ids
      } = request.payload;

      const regContest = await h.models.RegistrationContest.findOne({where: {id: ids[0]}});
      const contest = await h.models.Contest.findOne({where: {id: regContest.contestId}});
      
      if (contest.payType === 0) {
        return await h.models.RegistrationContest.update({
          regState: 1, 
          sectionCount: contest.sectionCount, 
          maxImgCount: contest.maxCountImg 
        }, {
            where: {
              id: ids
            }
        });
      }

      return {};
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/admin/applications/{id}',
    handler: async function (request, h) {
      const { id } = request.params;

      const query = `
        select
          registration_contests.id,
          users.first_name || ' ' || users.last_name as user_name,
          date_reg,
          section_count,
          reg_state,
          rejection_reason,
          payment,
          max_count_img
        from
          users,
          registration_contests
        where
          registration_contests.user_id = users.id and registration_contests.contest_id = :contestId
      `;

      try {
        const [applications] = await h.models.sequelize.query(query, {
          replacements: {
            contestId: id
          }
        });

        return map(compose(addRegState, camelizeObject))(applications)
      } catch(e) {
        return e;
      }

      // const applications = await h.models.Lexicon.findAll();
      // return R.map(R.pick(fields), applications);
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/applications/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const {payload} = request;
      const application = await h.models.RegistrationContest.findOne({
        where: {
          id
        }
      });

      await application.update(payload);

      // const query = `
      //   select
      //     registration_contests.id,
      //     users.first_name || ' ' || users.last_name as user_name,
      //     date_reg,
      //     section_count,
      //     reg_state,
      //     rejection_reason,
      //     payment,
      //     max_count_img
      //   from
      //     users,
      //     registration_contests
      //   where
      //     registration_contests.user_id = users.id and registration_contests.contest_id = :contestId
      // `;


      //   const [applications] = await h.models.sequelize.query(query, {
      //     replacements: {
      //       contestId: id
      //     }
      //   });


      return addRegState(application.dataValues);
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/admin/applications/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      await h.models.Lexicon.destroy({
        where: {
          id
        }
      });

      return {};
    },
    options: {
      tags: ['api'],
      validate: {
        params: joi.object({
          id : joi.number()
          .required()
          .description('the id for the user application'),
        })
        },
      auth: {
        mode: 'required'
      }
    }
  },
];

