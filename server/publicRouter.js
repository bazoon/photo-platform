const Router = require("koa-router");
const router = new Router();

const translation = require("./routes/translation");
const organizers = require("./routes/organizers");
const staticMenu = require("./routes/staticMenu");

router.use("/api/translation", translation.routes());
router.use("/api/organizers", organizers.routes());
router.use("/api/staticMenu", staticMenu.routes());

module.exports = router;
