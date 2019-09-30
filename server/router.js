const Router = require("koa-router");
const router = new Router();
const users = require("./routes/users");
const translation = require("./routes/translation");
const languages = require("./routes/admin/languages");
const organizers = require("./routes/admin/organizers");

router.use("/api/users", users.routes());
router.use("/api/translation", translation.routes());
router.use("/api/admin/languages", languages.routes());
router.use("/api/admin/organizers", organizers.routes());

module.exports = router;
