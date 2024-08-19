const express = require("express");
const routes = express.Router();

routes.get("/erro500", async (req, res) => {
  res.render("erro500");
});

module.exports = routes;
