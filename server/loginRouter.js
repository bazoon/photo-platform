const Router = require("koa-router");
const router = new Router();
const login = require("./routes/login");

// Admin
router.use("/api", login.routes());

module.exports = router;
