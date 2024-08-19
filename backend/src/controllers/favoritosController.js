import { favoritos } from "../models/Favoritos.js";

class FavoritosController {
  static async listarFavoritos(req, res) {
    try {
      const favoritosLista = await favoritos
        .findOne({
          user_id: req.usuario._id,
        })
        .populate([{ path: "produtos_id", strictPopulate: false }]);
      return res.status(200).json(favoritosLista);
    } catch (error) {}
  }

  static async adicionarItemFavorito(req, res) {
    try {
      const favoritosLista = await favoritos.findOne({
        user_id: req.usuario._id,
      });

      if (favoritosLista.produtos_id.includes(req.params.id)) {
        return res
          .status(400)
          .json({ message: "Produto ja existente nos favoritos" });
      }

      favoritosLista.produtos_id.push(req.params.id);

      console.log(favoritosLista);
      const atualizarInformacoes = await favoritos.findByIdAndUpdate(
        favoritosLista._id,
        favoritosLista
      );

      return res.sendStatus(201);
    } catch (error) {}
  }

  static async deletarItemFavorito(req, res) {
    try {
      const favoritosLista = await favoritos.findOne({
        user_id: req.usuario._id,
      });

      const indexOfProduct = favoritosLista.produtos_id.indexOf(req.params.id);
      favoritosLista.produtos_id.splice(indexOfProduct, 1);

      const atualizarInformacoes = await favoritos.findByIdAndUpdate(
        favoritosLista._id,
        favoritosLista
      );

      return res.sendStatus(201);
    } catch (error) {}
  }
}

export default FavoritosController;
