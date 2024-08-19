import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    senha: { type: String, require: true },
    telefone: { type: String, require: true },
    cep: { type: String, require: true },
    endereco: { type: String, require: true },
    foto_url: { type: String },
    complemento: { type: String },
  },
  { versionKey: false },
  { timestamps: true }
);

const usuario = mongoose.model("usuarios", usuarioSchema);

export { usuario, usuarioSchema };
