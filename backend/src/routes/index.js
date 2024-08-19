import produtos from "./produtosRoutes.js";
import usuarios from "./usuariosRouters.js";
import login from "./loginRouter.js";
import favoritos from "./favoritosRouter.js";
import carrinho from "./carrinhoRouter.js";
import compras from "./comprasRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../swagger-output.json" assert { type: "json" };
import bodyParser from "body-parser";
import cors from "cors";

const routes = (app) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.get("/", (req, res) => {
    return res.status(200).json({
      message: "Seja bem vinde na FloraCharme - api",
      doc: "Acesse /docs para ver as rotas possiveis",
    });
  });

  app.use(produtos, login, usuarios, favoritos, carrinho, compras);
};

export default routes;
