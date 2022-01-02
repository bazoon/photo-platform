const models = require('../../../models');

async function getCurrentSalone(domain) {
  const query = `
    select * from salones
    where contests.salone_id=salones.id and salones.domain=:domain
  `;
 
  const [[salone]] = await models.sequelize.query(query, {
    replacements: {
      domain
    }
  });
  return salone;
}

async function getCurrentContests(domain) {
  const query = `
    select *from
    from salones, contests 
    where contests.salone_id=salones.id and salones.domain=:domain
  `;

  const [contests] = await models.sequelize.query(query, {
    replacements: {
      domain
    }
  });
  return contests;
}

async function canCreateContestFor(domain, {dateStart, dateStop, dateJuriEnd, dateRateShow}) {
  const contests = getCurrentContests(domain);

  

}


module.exports = {
  getCurrentSalone,

}
