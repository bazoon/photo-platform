const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');

const fields = [
  'id',
  'saloneId',
  'subname',
  'years',
  'dateStart',
  'dateStop',
  'dateJuriEnd',
  'dateRateShow',
  'showType',
  'showRateState',
  'democraty',
  'payType',
  'sectionCount',
  'maxrate',
  'maxsize',
  'maxWeight'
];

router.get('/', async ctx => {
  const { host } = ctx.request.header;
  const [domain] = host.split(':');

  const user = await models.User.findOne({
    where: {
      id: ctx.user.id
    }
  });

  const isAdmin = user.userType == 0;
  const isModer = user.userType === 2;
  let query;

  if (isAdmin) {
    query = `
      select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
      show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight from
      contests, salones
      where contests.salone_id=salones.id
    `;
  } else if (isModer) {
    console.log('isModer');
    query = `
      select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
      show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight from
      contests, salones
      where contests.salone_id=salones.id and salones.domain=:domain
    `;
  } else {
    console.log('may be admin or moder for domain');
    query = `
      select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
      show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight 
      from contests, salones, admins, organizers
      where contests.salone_id=salones.id and salones.domain=:domain and salones.organizer_id=organizers.id and
      admins.organizer_id=organizers.id and admins.user_id=:userId
    `;
  }

  const [contests] = await models.sequelize.query(query, {
    replacements: {
      domain,
      userId: user.id
    }
  });

  ctx.body = contests.map(contest => {
    return {
      id: contest.id,
      saloneId: contest.salone_id,
      salone: contest.salone,
      subname: contest.subname,
      years: contest.years,
      dateStart: contest.date_start,
      dateStop: contest.date_stop,
      dateJuriEnd: contest.date_juri_end,
      dateRateShow: contest.date_rate_show,
      showType: contest.show_type,
      showRateState: contest.show_rate_state,
      democraty: contest.democraty,
      payType: contest.pay_type,
      sectionCount: contest.section_count,
      maxrate: contest.maxrate,
      maxsize: contest.maxsize,
      maxWeight: contest.max_weight
    };
  });
});

router.post('/', async ctx => {
  const contestValues = R.pick(fields, ctx.request.body);
  delete contestValues.id;
  let contest = await models.Contest.create(contestValues);
  ctx.body = await getContest(contest);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const contestValues = R.pick(fields, ctx.request.body);
  const contest = await models.Contest.findOne({
    where: {
      id
    }
  });

  await contest.update(contestValues);
  ctx.body = await getContest(contest);
});


router.delete('/:id', async ctx => {
  const { id } = ctx.params;

  await models.Salone.destroy({
    where: {
      id
    }
  });

  ctx.body = {};
});

async function getContest(record) {
  const query = `
  select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
  show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight from
  contests, salones
  where contests.salone_id=salones.id and contests.id=:id
  `;
  const [[contest]] = await models.sequelize.query(query, {
    replacements: {
      id: record.id
    }
  });

  return {
    id: contest.id,
    saloneId: contest.salone_id,
    salone: contest.salone,
    subname: contest.subname,
    years: contest.years,
    dateStart: contest.date_start,
    dateStop: contest.date_stop,
    dateJuriEnd: contest.date_juri_end,
    dateRateShow: contest.date_rate_show,
    showType: contest.show_type,
    showRateState: contest.show_rate_state,
    democraty: contest.democraty,
    payType: contest.pay_type,
    sectionCount: contest.section_count,
    maxrate: contest.maxrate,
    maxsize: contest.maxsize,
    maxWeight: contest.max_weight
  }
}


module.exports = [
  {
    method: 'POST',
    path: '/api/admin/contests',
    handler: async function (request, h) {
      const contest = await h.models.Contest.create(request.payload);
      return contest.toJSON();
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
    path: '/api/admin/contests',
    handler: async function (request, h) {
      const {referer: host } = request.headers;
      const [domain] = host.split(':');

      const {id} = h.request.auth.credentials;

      const user = await models.User.findOne({
        where: {
          id
        }
      });

      const isAdmin = user.userType == 0;
      const isModer = user.userType === 2;
      let query;

      if (isAdmin) {
        query = `
        select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
          show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight from
        contests, salones
        where contests.salone_id=salones.id
        `;
      } else if (isModer) {
        query = `
        select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
          show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight from
        contests, salones
        where contests.salone_id=salones.id and salones.domain=:domain
        `;
      } else {
        query = `
        select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
          show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight 
        from contests, salones, admins, organizers
        where contests.salone_id=salones.id and salones.domain=:domain and salones.organizer_id=organizers.id and
        admins.organizer_id=organizers.id and admins.user_id=:userId
        `;
      }

      const [contests] = await models.sequelize.query(query, {
        replacements: {
          domain,
          userId: user.id
        }
      });

      return contests.map(contest => {
        return {
          id: contest.id,
          saloneId: contest.salone_id,
          salone: contest.salone,
          subname: contest.subname,
          years: contest.years,
          dateStart: contest.date_start,
          dateStop: contest.date_stop,
          dateJuriEnd: contest.date_juri_end,
          dateRateShow: contest.date_rate_show,
          showType: contest.show_type,
          showRateState: contest.show_rate_state,
          democraty: contest.democraty,
          payType: contest.pay_type,
          sectionCount: contest.section_count,
          maxrate: contest.maxrate,
          maxsize: contest.maxsize,
          maxWeight: contest.max_weight
        };
      });
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
    path: '/api/admin/contests/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const lexiconValues = R.pick(fields, request.payload);
      const lexicon = await h.models.Lexicon.findOne({
        where: {
          id
        }
      });

      await lexicon.update(lexiconValues);
      return R.pick(fields, lexicon);
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
    path: '/api/admin/contests/{id}',
    handler: async function (request, h) {
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
    path: '/api/admin/contests/{id}',
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
      auth: {
        mode: 'required'
      }
    }
  },

];

