import mongoose, { Schema } from "mongoose";

const carrinhoSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  user_id: { type: Schema.Types.ObjectId, ref: "usuarios", require: true },
  produtos_id: [{ type: Schema.Types.ObjectId, ref: "produtos" }],
  compra_finalizada: { type: Boolean, require: true },
});

const carrinho = mongoose.model("carrinho", carrinhoSchema);

export { carrinho, carrinhoSchema };
