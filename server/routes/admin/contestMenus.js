const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');

const fields = ['id', 'contestId', 'position', 'parentId', 'lexiconId'];

router.post('/root', async ctx => {
  const { id, lexiconId } = ctx.request.body;
  const contestMenu = await models.ContestMenu.create({
    contestId: id,
    position: 0,
    parentId: -1,
    lexiconId
  });

  ctx.body = R.pick(fields, contestMenu);
});

router.post('/:id', async ctx => {
  const { id } = ctx.params;
  const { contestId, lexiconId } = ctx.request.body;
  const contestMenu = await models.ContestMenu.create({
    contestId,
    parentId: id,
    position: -1,
    lexiconId
  });
  ctx.body = contestMenu;
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;

  let contestMenu = await models.ContestMenu.findOne({
    where: {
      id
    }
  });

  await contestMenu.update(R.pick(fields, ctx.request.body));
  ctx.body = R.pick(fields, contestMenu);
});

router.get('/tree/:id', async ctx => {
  const { id } = ctx.params;

  const query = `select contest_menus.id, position, parent_id, lexicons.code, lexicons.name 
    from contest_menus, lexicons, pub_menus where
    contest_menus.id=pub_menus.contest_menu_id and pub_menus.lexicon_id=lexicons.id
  `;

  const contestMenus = await models.ContestMenu.findAll({
    where: {
      contestId: id
    }
  });

  ctx.body = R.map(R.pick(fields), contestMenus);
});

router.get('/all', async ctx => {
  const { host } = ctx.request.header;
  const [domain] = host.split(':');

  const query = `select contest_menus.id, lexicon_id, position, parent_id, code, domain from
    contests, salones, contest_menus, lexicons where
    contest_menus.lexicon_id=lexicons.id and
    contest_menus.contest_id=contests.id and contests.salone_id=salones.id and
    domain=:domain
  `;

  let [contestMenus] = await models.sequelize.query(query, {
    replacements: {
      domain
    }
  });

  contestMenus = contestMenus.map(m => {
    return {
      id: m.id,
      key: m.id,
      parentId: m.parent_id,
      position: m.position,
      title: m.code,
      lexiconId: m.lexicon_id
    };
  });

  const lookup = {};

  contestMenus.forEach(menu => {
    lookup[menu.id] = menu;
  });

  const r = contestMenus.reduce((acc, menu) => {
    menu.children = menu.children || [];

    if (menu.parentId && menu.parentId !== -1) {
      const parentMenu = lookup[menu.parentId];
      if (parentMenu) {
        parentMenu.children = parentMenu.children || [];
        parentMenu.children.push(menu);
      }
      return acc;
    }
    return acc.concat([menu]);
  }, []);

  ctx.body = r;
});

router.get('/all/:id', async ctx => {
  const { id } = ctx.params;
  const { host } = ctx.request.header;
  const [domain, port] = host.split(':');

  const query = `select contest_menus.id, lexicon_id, position, parent_id, code, domain from
    contests, salones,contest_menus, lexicons where
    contest_menus.contest_id=:id and
    contest_menus.lexicon_id=lexicons.id and
    contest_menus.contest_id=contests.id and contests.salone_id=salones.id
  `;

  let [contestMenus] = await models.sequelize.query(query, {
    replacements: {
      id
    }
  });

  contestMenus = contestMenus.map(m => {
    return {
      id: m.id,
      key: m.id,
      parentId: m.parent_id,
      position: m.position,
      title: m.code,
      lexiconId: m.lexicon_id
    };
  });

  const lookup = {};

  contestMenus.forEach(menu => {
    lookup[menu.id] = menu;
  });

  const r = contestMenus.reduce((acc, menu) => {
    menu.children = menu.children || [];

    if (menu.parentId && menu.parentId !== -1) {
      const parentMenu = lookup[menu.parentId];
      if (parentMenu) {
        parentMenu.children = parentMenu.children || [];
        parentMenu.children.push(menu);
      }
      return acc;
    }
    return acc.concat([menu]);
  }, []);

  ctx.body = r;
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;

  let contestMenu = await models.ContestMenu.findOne({
    where: {
      id
    }
  });

  ctx.body = contestMenu || {};
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;

  await models.ContestMenu.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

module.exports = router;
