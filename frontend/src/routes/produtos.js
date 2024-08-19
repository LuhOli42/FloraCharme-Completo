const express = require("express");
const routes = express.Router();
const axios = require("axios");

const serverUrl = `${process.env.BACKEND_SERVER_URL}`;

routes.get("/produtos", async (req, res) => {
  try {
    const listaDeProdutos = await axios.get(`${serverUrl}/produtos`);

    return res.render("produtos", { produtos: listaDeProdutos.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Problema no servidor", error: error.message });
  }
});

module.exports = routes;
