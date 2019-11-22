const Router = require('koa-router');
const router = new Router();

const translation = require('./routes/public/translation');
const organizers = require('./routes/public/organizers');
const staticMenu = require('./routes/public/staticMenu');
const about = require('./routes/public/about');
const thesis = require('./routes/public/thesis');
const rules = require('./routes/public/rules');
const contests = require('./routes/public/contests');
const roles = require('./routes/public/roles');
const contestPhotos = require('./routes/public/contestPhotos');
const contestSections = require('./routes/public/contestSections');

router.use('/api/translation', translation.routes());
router.use('/api/organizers', organizers.routes());
router.use('/api/staticMenu', staticMenu.routes());
router.use('/api/about', about.routes());
router.use('/api/thesis', thesis.routes());
router.use('/api/rules', rules.routes());
router.use('/api/contests', contests.routes());
router.use('/api/roles', roles.routes());
router.use('/api/contestPhotos', contestPhotos.routes());
router.use('/api/contestSections', contestSections.routes());

module.exports = router;
