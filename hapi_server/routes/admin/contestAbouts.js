const fields = [
  'id',
  'language',
  'contestId',
  'name',
  'thesis',
  'rules'
];

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/contestsAbout/{id}',
    handler: async function (request, h) {
      const {
        id
      } = request.params;

      const abouts = await h.query(`
        select thesis, rules, contest_abouts.id, contest_abouts.name as name, name_dialect as language, languages.id as language_id
        from contest_abouts, languages
        where contest_abouts.language_id=languages.id and contest_abouts.contest_id=:id
    `, {
        replacements: {
          id
        }
      });

      return abouts;
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/admin/contestsAbout/{id}',
    handler: async function (request, h) {
      const {
        id
      } = request.params;
      const {
        name,
        languageId,
        rules,
        thesis,
      } = request.payload;

      const language = await h.models.Language.findOne({
        where: {
          id: languageId
        }
      });

      const {dataValues} = await h.models.ContestAbout.create({
        contestId: id,
        name,
        languageId,
        rules,
        thesis,
      });

      return {...dataValues, language: language.name};
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
    path: '/api/admin/contestsAbout/{id}',
    handler: async function (request, h) {
      const { id } = request.params;

      await h.models.ContestAbout.destroy({
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
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/contestsAbout/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const {
        languageId,
        name,
        rules,
        thesis
      } = request.payload;

      let about = await h.models.ContestAbout.findOne({
        where: {
          id
        }
      });

      await about.update({
        languageId,
        name,
        rules,
        thesis
      });

      [about] = await h.query(`
        select thesis, rules, contest_abouts.id, contest_abouts.name as name, name_dialect as language, languages.id as language_id
        from contest_abouts, languages
        where contest_abouts.language_id=languages.id and contest_abouts.id=:id
    `, {
        replacements: {
          id
        }
      });


      return about;
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
];

