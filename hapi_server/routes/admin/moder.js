const {compose, map} = require('lodash/fp');

const camelizeObject = require('../utils/camelizeObject');
const getUploadPath = require('../utils/getUploadPath');

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
  {
    method: 'GET',
    path: '/api/admin/sections/{id}/images',
    handler: async function (request, h) {
      const {id} = request.params;
      const userId = h.request.auth.credentials.id;

      const query = `
        select
          photoworks.id,
          name,
          filename,
          year_shot as year,
          locate_shot as place,
          tcontent as description,
          CONCAT("first_name", ' ', "last_name") as author,
          date_add,
          moder,
          reason_moderation as reason
        from
          photoworks,
          registration_contests,
          users
        where
          section_id = :id
          and registration_contests.id = photoworks.registration_contest_id
          and registration_contests.user_id = users.id 
      `;

      return map(compose(p => ({...p, reason: p.reason || '', filename: getUploadPath(p.filename)}), camelizeObject), await h.query(query, {
        replacements: {
          id,
          userId
        }
      }));
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];

