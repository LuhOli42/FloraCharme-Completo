const express = require("express");
const routes = express.Router();

routes.get("/perfil", async (req, res) => {
  res.render("perfil");
});

module.exports = routes;
