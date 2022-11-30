import express from "express";
const processRoute = express.Router();

// Acesso ao DB
import ProcessModel from "../model/process.model.js";

// CREATE PROCESS - MONGODB
processRoute.post("/create-process", async (req, res) => {
  try {
    const form = req.body;

    //quer criar um documento dentro da sua collection -> .create()
    const newProcess = await ProcessModel.create(form);

    return res.status(201).json(newProcess);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error);
  }
});

//R - READ - MONGODB
processRoute.get("/all-process", async (req, res) => {
  try {
    // find vazio -> todas as ocorrencias
    // projections -> defini os campos que vão ser retornados
    // sort() -> ordenada o retorno dos dados
    // limit() -> define quantas ocorrencias serão retornadas
    const process = await ProcessModel.find({}, { __v: 0, updatedAt: 0 })
      .sort({
        age: 1,
      })
      .limit(100);

    return res.status(200).json(process);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//R - READ - MONGODB
processRoute.get("/oneProcess/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const process = await ProcessModel.findById(id);

    if (!process) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    return res.status(200).json(process);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//D - Delete - MONGODB
processRoute.delete("/del-process/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProcess = await ProcessModel.findByIdAndDelete(id);

    if (!deleteProcess) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    return res.status(200).json(deleteProcess);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//U - UPDATE - PUT - MONGODB
processRoute.put("/edit-process/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProcess = await ProcessModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(deleteProcess);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default processRoute;
