const express = require("express");
const app = express();
const index = require("./index");
const cadastro = require("./cadastro");
const carrinho = require("./carrinho");
const contato = require("./contato");
const favoritos = require("./favoritos");
const login = require("./login");
const perfil = require("./perfil");
const produto = require("./produto");
const produtos = require("./produtos");
const sobreNos = require("./sobre-nos");
const acessoRestrito = require("./acessoRestrito");
const erro500 = require("./erro500");
const comprasFinalizadas = require("./comprasFinalizadas");
const compra = require("./compra");

app.set("views", "./src/views");
app.use(
  index,
  cadastro,
  carrinho,
  contato,
  favoritos,
  login,
  perfil,
  produto,
  produtos,
  sobreNos,
  acessoRestrito,
  erro500,
  comprasFinalizadas,
  compra
);

module.exports = app;
