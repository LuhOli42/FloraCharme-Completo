const express = require("express");
const routes = express.Router();
const axios = require("axios");

const serverUrl = `${process.env.BACKEND_SERVER_URL}`;

routes.get("/produto/:id", async (req, res) => {
  try {
    const produto = await axios.get(`${serverUrl}/produtos/${req.params.id}`);

    return res.render("produto", { produto: produto.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Problema no servidor", error: error.message });
  }
});

module.exports = routes;
