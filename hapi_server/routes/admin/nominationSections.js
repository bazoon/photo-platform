const R = require('ramda');

module.exports = [
  {
    method: 'POST',
    path: '/api/admin/nominationSections/{id}',
    handler: async function (request, h) {
      const {id} = request.params;
      const {
        languageId,
        name
      } = request.payload;


      const sectionName = await h.models.SectionName.create({
        languageId,
        name,
        sectionId: id
      });

      return sectionName.toJSON();
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
    path: '/api/admin/nominationSections/{id}',
    handler: async function (request, h) {
      const {id} = request.params;
      const query = `
          select section_names.id, name_dialect as language, section_names.name, languages.id as language_id 
          from section_names, languages where section_names.language_id=languages.id and section_names.section_id=:id
      `;


      const nominationSections = await h.query(query, {
        replacements: {
          id
        }
      });

      console.info(nominationSections);
      return nominationSections;
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
    path: '/api/admin/nominationSections/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const {
        languageId,
        name
      } = request.payload;

      let sectionName = await h.models.SectionName.findOne({
        where: {
          id
        }
      });

      await sectionName.update({languageId, name});

      const query = `
          select section_names.id, name_dialect as language, section_names.name, languages.id as language_id 
          from section_names, languages where section_names.language_id=languages.id and section_names.id=:id
      `;

      [sectionName] = await h.query(query, {
        replacements: {
          id
        }
      });



      return sectionName;
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
    path: '/api/admin/nominationSections/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      await h.models.SectionName.destroy({
        where: {
          id
        }
      });

      return {};
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },

];

