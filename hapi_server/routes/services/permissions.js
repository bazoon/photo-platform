const models = require('../../../models');
const {isDefined} = require('crocks/predicates');
const {get} = require('lodash/fp');
const {getCurrentContest} = require('../utils/getCurrentSalone');

const roles = {
  superAdmin: {
    name: 'superAdmin',
    level: 0,
  },
  admin: {
    name: 'domainAdmin',
    level: 1,
  },
  superModer: {
    name: 'domainModer',
    level: 3,
  },
  moder: {
    name: 'superModer',
    level: 4,
  },
  user: {
    name: 'user',
    level: 5
  },
  anon: {
    name: 'anon',
    level: 6
  },
};

const getJuryRole = async (userId, domain) => {
  const contestQuery = `
    SELECT
      contests.id
    FROM
      contests
      LEFT JOIN salones ON contests.salone_id = salones.id and salones."domain"=:domain
      LEFT JOIN organizers AS o on salones.organizer_id=o.id
      ORDER BY
        date_start DESC
      limit 1
  `;
  
  const contest = await getCurrentContest(domain);

  if (!contest) {
    return false;
  }


  const query = `
    select
      juries.id 
    from
      juries 
    where
      juries.user_id = :userId and juries.contest_id  = :contestId
  `;

  const [[jury]] = await models.sequelize.query(query, {
    replacements: {
      userId,
      contestId: contest.id
    }
  });


  return jury && jury.id > 0;
}

module.exports = {
  getRole: async function (user, domain) {
    const query = `
      select distinct(admins.adm_type)
      from admins, organizers, salones 
      where admins.organizer_id=organizers.id and salones.organizer_id=organizers.id and
      admins.user_id=:userId and salones.domain=:domain
    `;

    const [role] = await models.sequelize.query(query, {
      replacements: {
        userId: user.id,
        domain
      }
    });
    
    let isJury;

    try {
      isJury = await getJuryRole(user.id, domain); 
    } catch(e) {
      isJury = e;
    }

    const r = get('[0].adm_type', role);

    const t = {
      0: roles.superAdmin,
      1: roles.superModer,
      1000: roles.admin,
      1010: roles.moder
    }[r];


    const permissions = [];

    if (isDefined(t)) {
      permissions.push(t.name);
    }

    if (isJury) {
      permissions.push('jury');
    }


    // return ['superAdmin']
    // return ['superModer']
    // return ['domainAdmin']
    return ['domainModer']
    // return permissions;
  }
};
