const {compose, nth, split, get, map, pick, mapKeys, isEmpty, omit} = require('lodash/fp');
const camelizeObject = require('../utils/camelizeObject');
const getUploadPath = require('../utils/getUploadPath');
const uploadFiles = require('../utils/uploadFiles');
const {getCurrentContestId} = require('../utils/getCurrentSalone');
const {getCurrentDomain} = require('../utils/getCurrentDomain');
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
    path: '/api/sections/{contestId}',
    handler: async function (request, h) {
      const domain = getCurrentDomain(request);
      const { contestId } = request.params;

      if (!domain) {
        return {};
      }
      
      const query = `
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
        ORDER BY 
          sections.name
       `;

      const info = await h.query(query, {
        replacements: {
          domain,
          contestId
        }
      });
      
      return info.map(i => ({...i, images: []}));
    },
    options: {
      tags: ['api'],
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
          and users.id=:userId
      `;
 

      const getFilename = async p => await getUploadPath(p.filename, request);

      const r = await h.query(query, {
        replacements: {
          id,
          userId
        }
      });

      const f = async p => ({...p, reason: p.reason || '', filename: await getFilename(p, request)});
      return Promise.all(r.map(f));
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
    path: '/api/sections/{sectionId}/images',
    handler: async function (request, h) {
      const {sectionId} = request.params;
      const userId = h.request.auth.credentials.id;
      const payload = request.payload;
      const {id, file} = payload

      if (file) {
        await uploadFiles([file], request);
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
      tags: ['api'],
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

