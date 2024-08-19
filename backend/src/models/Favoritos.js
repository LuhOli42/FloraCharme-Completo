import mongoose, { Schema } from "mongoose";

const favoritosSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  user_id: { type: Schema.Types.ObjectId, ref: "usuarios", require: true },
  produtos_id: [{ type: Schema.Types.ObjectId, ref: "produtos" }],
});

const favoritos = mongoose.model("favoritos", favoritosSchema);

export { favoritos, favoritosSchema };
