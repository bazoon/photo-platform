const  createProxyMiddleware  = require("http-proxy-middleware");

console.log(createProxyMiddleware);

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:7001",
      changeOrigin: true,
    })
  );
};
