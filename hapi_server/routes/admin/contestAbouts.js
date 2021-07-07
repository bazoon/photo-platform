const Router = require("koa-router");
const router = new Router();
const models = require("../../../models");
const R = require("ramda");

const fields = [
  'id',
  'language',
  'contestId',
  'name',
  'thesis',
  'rules'
];

const fullFields = fields.concat(['language']);

router.post("/:id", async ctx => {
  const {
    languageId,
    name,
    content,
  } = ctx.request.body;

  const { id } = ctx.params;
  const values = { ...R.pick(fields, ctx.request.body), contestId: id };
  const contestAbout = await models.ContestAbout.create(values);


  const language = await models.Language.findOne({
    where: {
      id: contestAbout.languageId
    }
  });


  ctx.body = {
    ...R.pick(fullFields, contestAbout),
    language: language.name
  };
});

router.put("/:id", async ctx => {
  const { id } = ctx.params;

  let contestAbout = await models.ContestAbout.findOne({
    where: {
      id
    }
  });

  await contestAbout.update(R.pick(fields, ctx.request.body));
  const language = await models.Language.findOne({
    where: {
      id: contestAbout.languageId
    }
  });


  ctx.body = {
    ...R.pick(fields, contestAbout),
    language: language.name
  }
});

router.get("/all/:id", async ctx => {
  const {
    id
  } = ctx.params;

  const query = `select contest_abouts.id, language_id, contestsAbout.name as language, contest_abouts.name, thesis, rules from
    contest_abouts, contestsAbout where contest_abouts.language_id=contestsAbout.id and contest_abouts.contest_id=:id
  `;

  const [contestAbouts] = await models.sequelize.query(query, {
    replacements: {
      id
    }
  });

  ctx.body = R.map(R.pick(fullFields), contestAbouts);
});

router.get("/:id", async ctx => {
  const {
    id
  } = ctx.params;


  const query = `select contest_abouts.id, language_id, contestsAbout.name, contest_abouts.name, thesis, rules from
    contest_abouts, languages where contest_abouts.language_id=languages.id and contest_abouts.contest_id=8
  `;

  let contestAbout = await models.ContestAbout.findOne({
    where: {
      id
    }
  });

  ctx.body = contestAbout || {};
});

router.delete("/:id", async ctx => {
  const { id } = ctx.params;

  await models.ContestAbout.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

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
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/admin/contestsAbout',
    handler: async function (request, h) {
      const {
        name,
        nameDialect,
        short,
      } = request.payload;

      const language = await h.models.Language.create({
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

      await h.models.Language.destroy({
        where: {
          id
        }
      });

      return {
        id
      }
    },
    options: {
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
      auth: {
        mode: 'required'
      }
    }
  },
];

