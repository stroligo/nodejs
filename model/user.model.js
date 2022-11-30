import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Obrigatorio
      trim: true, // Apaga os espaços do começou ou do fim da string
      minlength: 2, // minimo tamanho
      maxlength: 20, // maior tamanho
      lowercase: true, // coloca caixa baixa.
    },
    email: {
      type: String,
      unique: true, // somente um cadastro com o mesmo email
      trim: true,
      //https://ihateregex.io/ gerador de regex
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      lowercase: true, // coloca caixa baixa.
    },
    role: {
      type: String,
      enum: ["professora", "aluno", "ta"], //so recebe esses dados, para um select no front
      default: "aluno",
    },
    age: { type: Number, min: 0, max: 99 },
    active: { type: Boolean, default: true },
    tasks: [{ type: String }],
    birth: [{ type: Date, default: new Date() }],
    address: {
      cidade: { type: String, trim: true },
      estado: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema); // Adiciona o model - Schema

export default UserModel;
