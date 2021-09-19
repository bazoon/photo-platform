const {compose, nth, split, get, map, pick, mapKeys, isEmpty} = require('lodash/fp');
const camelizeObject = require('../utils/camelizeObject');
const getUploadPath = require('../utils/getUploadPath');


const imageFields = [
  'name',
  // 'filename',
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
          tcontent as description
        from
          photoworks,
          registration_contests
        where
          registration_contests.user_id = :userId
          and section_id = :id
          and registration_contests.id = photoworks.registration_contest_id
      `
      return map(compose(p => ({...p, filename: getUploadPath(p.filename)}), camelizeObject), await h.query(query, {
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
      const {payload} = request;
      const {id} = payload

      if (isEmpty(payload) || !payload.description || !payload.year || !payload.name || !payload.place) return {};

      
      if (id) {
        await h.models.Photowork.update(
          mapKeys(imageAlias, pick(imageFields, payload)), {
          where: {
            id: payload.id
          }
        });

        return {} 
      } else {
        const section = await h.models.Section.findOne({where: {id: sectionId}});
        const application = await h.models.RegistrationContest.findOne({where: { userId, contestId: section.contestId }})
        
        console.assert(section.id > 0, 'Section id !!!!', section);
        console.assert(application.id > 0, 'Application!!!', application)

        const p = mapKeys(imageAlias, pick(imageFields, payload).concat({sectionId, registrationContestId: application.id, filename: payload.filename}));
        const photowork = await h.models.Photowork.create(p);
        return { id: photowork.id } 
      }

  
    }, 
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];

