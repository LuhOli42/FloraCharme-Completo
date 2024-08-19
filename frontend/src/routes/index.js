const express = require("express");
const routes = express.Router();
const axios = require("axios");

const serverUrl = `${process.env.BACKEND_SERVER_URL}`;

routes.get("/", async (req, res) => {
  try {
    const listaDeProdutos = await axios.get(
      `${serverUrl}/produtos?quantidade=6`
    );

    return res.render("index", {
      lancamento: listaDeProdutos.data[0],
      produtos: listaDeProdutos.data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Problema no servidor", error: error.message });
  }
});

module.exports = routes;
