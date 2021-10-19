const {compose, nth, split, get, map, pick, mapKeys, isEmpty, omit} = require('lodash/fp');
const camelizeObject = require('../utils/camelizeObject');
const getUploadPath = require('../utils/getUploadPath');
const uploadFiles = require('../utils/uploadFiles');
const chalk = require('chalk');


const imageFields = [
  'name',
  'year',
  'place',
  'description',
];


const createImageFields = [
  'name',
  'filename',
  'year',
  'place',
  'description',
];

const imageAlias = fieldName => {
  const alias = {
    year: 'yearShot',
    place: 'locateShot',
    description: 'tcontent'
  };

  return alias[fieldName] || fieldName;
}

module.exports = [
  {
    method: 'GET',
    path: '/api/sections',
    handler: async function (request, h) {
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);


      if (!domain) {
        return {};
      }


      let query = `
        select contests.id from contests, salones
        where contests.salone_id = salones.id and salones."domain" = :domain
        order by date_start desc
        limit 1
     `;

      const contest = await h.query(query, {
        replacements: {
          domain
        }
      });
    
      query = `
        SELECT
          sections.id,
          sections.max_count_img,
          sections.name
        FROM
          contests,
          salones,
          sections
        WHERE
          contests.salone_id = salones.id and
          salones. "domain" = :domain and
          sections.contest_id = contests.id and
          sections.contest_id = :contestId
       `;

      const info = await h.query(query, {
        replacements: {
          domain,
          contestId: get('[0].id', contest)
        }
      });
      
      return info.map(i => ({...i, images: []}));
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/sections/{id}/images',
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
      
      const e = await h.query(query, {
        replacements: {
          id,
          userId
        }
      });

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
  {
    method: 'PUT',
    path: '/api/sections/{sectionId}/images',
    handler: async function (request, h) {
      const {sectionId} = request.params;
      const userId = h.request.auth.credentials.id;
      const payload = request.payload;
      const {id, file} = payload

      if (file) {
        await uploadFiles([file]);
      }

      const filename = file ? file.filename : payload.filename;

      const createPhotowork = async () => {
        const section = await h.models.Section.findOne({where: {id: sectionId}});
        const application = await h.models.RegistrationContest.findOne({where: { userId, contestId: section.contestId }})

        console.assert(section.id > 0, 'Section id !!!!', section);
        console.assert(application.id > 0, 'Application!!!', application)
        
        const p = {
          ...pick(createImageFields, payload),
          ...({sectionId, registrationContestId: application.id, filename, dateAdd: new Date().toISOString().slice(0, 10)})};
        const pp = omit(['id]'], mapKeys(imageAlias, p));
        const photowork = await h.models.Photowork.create(pp);
        return { id: photowork.id } 
      }

      const updatePhotowork = async () => {
        await h.models.Photowork.update(
          mapKeys(imageAlias, pick(imageFields, payload)), {
          where: {
            id: payload.id
          }
        });
        return {id};
      };

      return (+id && Number.isInteger(+id) ? updatePhotowork() : createPhotowork());
    }, 
    options: {
      auth: {
        mode: 'required'
      },
      payload: {
        parse: true,
        output: 'file',
        multipart: true
      }
    }
  },
];

