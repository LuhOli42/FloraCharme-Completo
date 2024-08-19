const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());
router.get("/cadastro", async (req, res) => {
  res.render("cadastro");
});

module.exports = router;
