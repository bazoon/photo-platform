const Router = require("koa-router");
const router = new Router();
const R = require("ramda");


router.get("/", async ctx => {
  const {
    id
  } = ctx.params;

  const staticMenu = [
    {
      title: 'photos',
      url: '/photos/sections'
    }
  ];




  ctx.body = staticMenu;
});




module.exports = router;
