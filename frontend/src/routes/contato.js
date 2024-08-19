const express = require("express");
const router = express.Router();

router.get("/contato", async (req, res) => {
  res.render("contato");
});

module.exports = router;
