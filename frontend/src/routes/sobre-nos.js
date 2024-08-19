const express = require("express");
const routes = express.Router();

routes.get("/sobre-nos", async (req, res) => {
  res.render("sobre-nos");
});

module.exports = routes;
