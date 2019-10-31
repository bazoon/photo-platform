const Router = require('koa-router');
const router = new Router();
const users = require('./routes/admin/users');
const admins = require('./routes/admin/admins');
const languages = require('./routes/admin/languages');
const adminOrganizers = require('./routes/admin/organizers');
const saloneTypes = require('./routes/admin/saloneTypes');
const salones = require('./routes/admin/salones');
const saloneAbout = require('./routes/admin/saloneAbout');
const adminContests = require('./routes/admin/contests');
const contestAbouts = require('./routes/admin/contestAbouts');
const contestMenus = require('./routes/admin/contestMenus');
const lexicons = require('./routes/admin/lexicons');
const phrases = require('./routes/admin/phrases');
const publications = require('./routes/admin/publications');
const publicationTexts = require('./routes/admin/publicationTexts');
const adminContestSections = require('./routes/admin/contestSections');
const adminContestApplications = require('./routes/admin/contestApplications');
const contestJuries = require('./routes/admin/contestJuries');
const awardTypes = require('./routes/admin/awardTypes');

const upload = require('./routes/upload');
const pubs = require('./routes/publications');
const contestApplications = require('./routes/contestApplications');
const contests = require('./routes/contests');
const contestSections = require('./routes/contestSections');
const userMenu = require('./routes/userMenu');
const rates = require('./routes/rates');
const results = require('./routes/results');
const shortLists = require('./routes/shortLists');
const contestPhotos = require('./routes/contestPhotos');
const roles = require('./routes/roles');

router.use('/api/upload', upload.routes());
router.use('/api/admin/users', users.routes());
router.use('/api/admin/admins', admins.routes());
router.use('/api/admin/languages', languages.routes());
router.use('/api/admin/organizers', adminOrganizers.routes());
router.use('/api/admin/saloneTypes', saloneTypes.routes());
router.use('/api/admin/salonesAbout', saloneAbout.routes());
router.use('/api/admin/salones', salones.routes());
router.use('/api/admin/contests', adminContests.routes());
router.use('/api/admin/contestsAbout', contestAbouts.routes());
router.use('/api/admin/contestMenus', contestMenus.routes());
router.use('/api/admin/lexicons', lexicons.routes());
router.use('/api/admin/phrases', phrases.routes());
router.use('/api/admin/publications', publications.routes());
router.use('/api/admin/publicationTexts', publicationTexts.routes());
router.use('/api/admin/contestSections', adminContestSections.routes());
router.use('/api/admin/contestApplications', adminContestApplications.routes());
router.use('/api/admin/contestJuries', contestJuries.routes());
router.use('/api/admin/awardTypes', awardTypes.routes());

router.use('/api/publications', pubs.routes());
router.use('/api/contestApplications', contestApplications.routes());
router.use('/api/contests', contests.routes());
router.use('/api/contestSections', contestSections.routes());
router.use('/api/userMenu', userMenu.routes());
router.use('/api/rates', rates.routes());
router.use('/api/results', results.routes());
router.use('/api/shortLists', shortLists.routes());
router.use('/api/contestPhotos', contestPhotos.routes());
router.use('/api/roles', roles.routes());
module.exports = router;
