const express = require("express");
const router = express.Router();

router.get("/comprasFinalizadas", async (req, res) => {
  res.render("comprasFinalizadas");
});

module.exports = router;
