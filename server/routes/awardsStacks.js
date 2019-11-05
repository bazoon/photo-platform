const Router = require('koa-router');
const router = new Router();
const models = require('../../models');

router.get('/:contestId', async ctx => {
  const { contestId } = ctx.params;

  const query = `
    select award_types.name, count_awards, issued, awards_stacks.id
    from award_types, awards_stacks 
    where award_types.id = awards_stacks.award_type_id and contest_id=:contestId
  `;

  const [awardsStacks] = await models.sequelize.query(query, {
    replacements: {
      contestId
    }
  });

  ctx.body = awardsStacks.map(as => {
    return {
      id: as.id,
      name: as.name,
      countAwards: as.count_awards,
      issued: as.issued
    };
  });
});

router.put('/', async ctx => {
  const { id, awardsStackId } = ctx.request.body;
  let photowork;

  const awardsStack = await models.AwardStack.findOne({
    where: {
      id: awardsStackId
    }
  });

  photowork = await models.Award.findOne({
    where: {
      photoworkId: id
    }
  });

  if (
    awardsStack.countAwards > 0 &&
    awardsStack.countAwards > awardsStack.issued
  ) {
    if (photowork) {
      const currentAwardsStack = await models.AwardStack.findOne({
        where: {
          id: photowork.awardsStackId
        }
      });

      await currentAwardsStack.update({
        issued: currentAwardsStack.issued - 1
      });

      await photowork.update({
        photoworkId: id,
        awardsStackId
      });
    } else {
      photowork = await models.Award.create({
        photoworkId: id,
        awardsStackId
      });
    }
  }

  await awardsStack.update({
    issued: awardsStack.issued + 1
  });

  ctx.body = photowork;
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;

  const award = await models.Award.findOne({
    where: {
      photoworkId: id
    }
  });

  const awardsStack = await models.AwardStack.findOne({
    where: {
      id: award.awardsStackId
    }
  });

  if (awardsStack) {
    console.log('Remove: ' + awardsStack.id);
    awardsStack.update({
      issued: awardsStack.issued - 1
    });
  }

  await models.Award.destroy({
    where: {
      photoworkId: id
    }
  });

  ctx.body = {};
});

module.exports = router;
