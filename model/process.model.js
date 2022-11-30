import { Schema, model } from "mongoose";

const processSchema = new Schema(
  {
    documentName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["Aberto", "Finalizado", "Em andamento"],
      default: "Aberto",
    },
    details: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 30,
      trim: true,
    },
    dateInit: {
      type: Date,
    },
    comments: [{ type: String }],
    dateEnd: {
      type: Date,
    },
    setor: {
      type: String,
      enum: ["TRE", "TRJ", "ENAP"],
      default: "ENAP",
    },
  },
  {
    timestamps: true,
  }
);

const processModel = model("Process", processSchema); // Adiciona o model - Schema

export default processModel;
