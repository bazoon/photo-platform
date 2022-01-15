const models = require('../../../models');
const {getCurrentDomain} = require('./getCurrentDomain');

async function getCurrentSalone(domain) {
  const query = `
    select salones.id, slug from salones, contests
    where contests.salone_id=salones.id and salones.domain=:domain
  `;
 
  const [[salone]] = await models.sequelize.query(query, {
    replacements: {
      domain
    }
  });

  return salone;
}

async function getCurrentSlug(request) {
  const domain = getCurrentDomain(request);
  const salone = await getCurrentSalone(domain);
  return salone && salone.slug;
}

async function getCurrentSaloneId(domain) {
  const salone = await getCurrentSalone(domain);
  return salone && salone.id;
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

async function getCurrentContest(domain) {
  const query = `
    select contests.id, short_best_count, date_start, date_stop, date_juri_end, date_rate_show
    from contests, salones where contests.salone_id=salones.id and domain=:domain and inworknow
  `;
  const [[contest]] = await models.sequelize.query(query, {
    replacements: {
      domain
    }
  });


  return contest && { 
    id: contest.id,
    shortBestCount: contest.short_best_count,
    dateStop: contest.date_stop,
    dateStart: contest.date_start,
    dateJuryEnd: contest.date_jury_end,
    dateRateShow: contest.date_rate_show
  }
}

async function getCurrentContestId(domain) {
  const contest = await getCurrentContest(domain);
  return contest && contest.id;
}

async function getCurrentContestFromRequest(request) {
  const domain = await getCurrentDomain(request);
  return getCurrentContest(domain);
}

async function getCurrentContestIdFromRequest(request) {
  const domain = await getCurrentDomain(request);
  return getCurrentContestId(domain);
}

async function getContestFromSection(sectionId) {
  const query = `
    select * from contests where id = (select contest_id from sections where id=:sectionId)
  `;

  const [[contest]] = await models.sequelize.query(query, {
    replacements: {
      sectionId
    }
  });

  return contest;
}

module.exports = {
  getCurrentSaloneId,
  getCurrentContestId,
  getCurrentContest,
  getCurrentSalone,
  getCurrentSlug,
  getCurrentContestIdFromRequest,
  getCurrentContestFromRequest,
  getContestFromSection
}
