const express = require("express");
const router = express.Router();

router.get("/favoritos", async (req, res) => {
  return res.render("favoritos");
});

module.exports = router;
