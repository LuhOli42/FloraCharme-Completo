import { carrinho } from "../models/Carrinho.js";
import aws from "aws-sdk";

class CarrinhoController {
  static async mostrarCarrinho(req, res) {
    try {
      const carrinhoLocalizado = await carrinho
        .find({
          user_id: req.usuario._id,
          compra_finalizada: false,
        })
        .populate([{ path: "produtos_id", strictPopulate: false }]);

      return res.status(200).json(carrinhoLocalizado[0]);
    } catch (error) {
      res.status(500).json({
        messagem: `${error.message} - falha em nossos servidores`,
      });
    }
  }

  static async adicionarItemAoCarrinho(req, res) {
    try {
      const carrinhoLocalizado = await carrinho.find({
        user_id: req.usuario._id,
        compra_finalizada: false,
      });

      carrinhoLocalizado[0].produtos_id.push(req.params.id);

      const atualizarInformacoes = await carrinho.findByIdAndUpdate(
        carrinhoLocalizado[0]._id,
        carrinhoLocalizado[0]
      );

      return res.sendStatus(201);
    } catch (error) {
      res.status(500).json({
        messagem: `${error.message} - falha em nossos servidores`,
      });
    }
  }

  static async deleterItemAoCarrinho(req, res) {
    try {
      const carrinhoLocalizado = await carrinho
        .find({
          user_id: req.usuario._id,
          compra_finalizada: false,
        })
        .populate();

      const indexOfProduct = carrinhoLocalizado[0].produtos_id.indexOf(
        req.params.id
      );

      carrinhoLocalizado[0].produtos_id.splice(indexOfProduct, 1);

      const atualizarInformacoes = await carrinho.findByIdAndUpdate(
        carrinhoLocalizado[0]._id,
        carrinhoLocalizado[0]
      );

      return res.sendStatus(201);
    } catch (error) {
      res.status(500).json({
        messagem: `${error.message} - falha em nossos servidores`,
      });
    }
  }
}

export default CarrinhoController;
