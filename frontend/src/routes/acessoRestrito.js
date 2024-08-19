const express = require("express");
const routes = express.Router();

routes.get("/acessoRestrito", async (req, res) => {
  res.render("acessoRestrito");
});

module.exports = routes;
