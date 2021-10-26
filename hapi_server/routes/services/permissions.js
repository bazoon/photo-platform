const models = require('../../../models');
const {isDefined} = require('crocks/predicates');
const {get} = require('lodash/fp');
const Acl = require('virgen-acl').Acl;
const acl = new Acl();


// acl.addRole("superAdmin");
// acl.addRole("superModer");
// acl.addRole("admin");
// acl.addRole("moder");

// acl.deny();
// acl.allow("superAdmin");

// acl.allow("moder", "publication", "create", function (err, role, resource, action, result, next) {


// });

const roles = {
  superAdmin: {
    name: 'admin',
    level: 0,
  },
  admin: {
    name: 'admin',
    level: 1,
  },
  superModer: {
    name: 'moder',
    level: 3,
  },
  moder: {
    name: 'moder',
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

  const [contest] = await models.sequelize.query(contestQuery, { replacements: { domain: domain} })

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
      contestId: get('[0].id', contest) || 1000000000
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
      isJury = e.message;
    }

    const r = get('[0].adm_type', role);

    if (!isDefined(r)) return {...roles.user, isJury}

    const t = {
      0: roles.superAdmin,
      1: roles.superModer,
      1000: roles.admin,
      1010: roles.moder
    }[r];

    return isDefined(t) ? {...t, isJury} : {...roles.user, isJury};
  }
};
