import express from "express";
import routes from "./routes/index.js";
import conectaNaDatabase from "./config/dbConnect.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});
conexao.once("open", () => {
  console.log("conexão feita com sucesso");
});

const app = express();

routes(app);

export default app;
