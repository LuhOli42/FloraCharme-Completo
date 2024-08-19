const express = require("express");
const router = express.Router();
const axios = require("axios");

const serverUrl = `${process.env.BACKEND_SERVER_URL}`;

router.get("/compra/:id", async (req, res) => {
  try {
    const token = "Bearer " + req.query.tkn.replace(/['"]+/g, "");
    const rawResponse = await fetch(`${serverUrl}/compras/${req.params.id}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const carrinhoDb = await rawResponse.json();

    const carrinho = [];
    const contadorDeQuantidade = {};
    carrinhoDb.produtos_id.forEach((produto) => {
      contadorDeQuantidade[produto._id] =
        (contadorDeQuantidade[produto._id] || 0) + 1;
    });

    carrinhoDb.produtos_id.forEach((produto) => {
      if (
        carrinho.findIndex((e) => {
          return e._id === produto._id;
        }) === -1
      ) {
        carrinho.push({
          ...produto,
          quantidade: contadorDeQuantidade[produto._id],
        });
      }
    });
    let valorTotal = 0;
    carrinho.forEach((produto) => {
      valorTotal += produto.valor * produto.quantidade;
    });

    return res.render("compra", { produtos: carrinho, valorTotal });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ message: "Problema no servidor", error: error.message });
  }
});

module.exports = router;
