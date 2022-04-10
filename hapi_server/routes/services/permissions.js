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
  domainModer: {
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
    if (!user) return '';

    const query = `
      select distinct(admins.adm_type)
      from admins, organizers, salones 
      where admins.organizer_id=organizers.id and salones.organizer_id=organizers.id and
      admins.user_id=:userId
    `;
    
    const domainQuery = `
      select distinct(admins.adm_type)
      from admins, organizers, salones 
      where admins.organizer_id=organizers.id and salones.organizer_id=organizers.id and
      admins.user_id=:userId and salones.domain=:domain
    `;


    let [role] = await models.sequelize.query(query, {
      replacements: {
        userId: user.id,
      }
    });
 
    let r = get('[0].adm_type', role);

    if (!(r === 0 || r === 1)) {
      [role] = await models.sequelize.query(domainQuery, {
        replacements: {
          userId: user.id,
          domain: domain.split(':')[0]
        }
      });
      r = get('[0].adm_type', role);
    }


    let isJury;

    try {
      isJury = await getJuryRole(user && user.id, domain); 
    } catch(e) {
      isJury = e;
    }


    const t = {
      0: 'superAdmin',
      1: 'superModer',
      1000: 'domainAdmin',
      1010: 'domainModer',
    }[r];

    const permissions = [];

    if (isDefined(t)) {
      permissions.push(t.name);
    }

    if (isJury) {
      permissions.push('jury');
    }
  
    console.log(1, r, 3)
    // console.log('ROLE', role, 1, user && user.id, 2, domain, 3);

    return t;
    // return ['superAdmin']
    // return ['superModer']
    // return ['domainModer']
  
  }
};
