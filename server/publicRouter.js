const Router = require('koa-router');
const router = new Router();

const translation = require('./routes/translation');
const organizers = require('./routes/organizers');
const staticMenu = require('./routes/staticMenu');
const about = require('./routes/about');
const thesis = require('./routes/thesis');
const rules = require('./routes/rules');

router.use('/api/translation', translation.routes());
router.use('/api/organizers', organizers.routes());
router.use('/api/staticMenu', staticMenu.routes());
router.use('/api/about', about.routes());
router.use('/api/thesis', thesis.routes());
router.use('/api/rules', rules.routes());

module.exports = router;
