const Router = require("koa-router");
const router = new Router();
const users = require("./routes/admin/users");
const admins = require("./routes/admin/admins");
const translation = require("./routes/translation");
const languages = require("./routes/admin/languages");
const organizers = require("./routes/admin/organizers");
const saloneTypes = require("./routes/admin/saloneTypes");
const salones = require("./routes/admin/salones");
const saloneAbout = require("./routes/admin/saloneAbout");
const contests = require("./routes/admin/contests");
const contestAbouts = require("./routes/admin/contestAbouts");
const contestMenus = require("./routes/admin/contestMenus");
const lexicons = require("./routes/admin/lexicons");
const phrases = require("./routes/admin/phrases");
const publications = require("./routes/admin/publications");
const publicationTexts = require("./routes/admin/publicationTexts");
const upload = require("./routes/upload");

const pubs = require("./routes/publications");

router.use("/api/upload", upload.routes());
router.use("/api/admin/users", users.routes());
router.use("/api/admin/admins", admins.routes());
router.use("/api/translation", translation.routes());
router.use("/api/admin/languages", languages.routes());
router.use("/api/admin/organizers", organizers.routes());
router.use("/api/admin/saloneTypes", saloneTypes.routes());
router.use("/api/admin/salonesAbout", saloneAbout.routes());
router.use("/api/admin/salones", salones.routes());
router.use("/api/admin/contests", contests.routes());
router.use("/api/admin/contestsAbout", contestAbouts.routes());
router.use("/api/admin/contestMenus", contestMenus.routes());
router.use("/api/admin/lexicons", lexicons.routes());
router.use("/api/admin/phrases", phrases.routes());
router.use("/api/admin/publications", publications.routes());
router.use("/api/admin/publicationTexts", publicationTexts.routes());


router.use("/api/publications", pubs.routes());
module.exports = router;
