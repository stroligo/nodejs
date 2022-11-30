import express from "express";
const userRoute = express.Router();

// Acesso ao DB
import UserModel from "../model/user.model.js";

// CREATE USER - MONGODB
userRoute.post("/create-user", async (req, res) => {
  try {
    const form = req.body;

    //quer criar um documento dentro da sua collection -> .create()
    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

//R - READ - MONGODB
userRoute.get("/all-users", async (req, res) => {
  try {
    // find vazio -> todas as ocorrencias
    // projections -> defini os campos que vão ser retornados
    // sort() -> ordenada o retorno dos dados
    // limit() -> define quantas ocorrencias serão retornadas
    const users = await UserModel.find({}, { __v: 0, updatedAt: 0 })
      .sort({
        age: 1,
      })
      .limit(100);

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//R - READ - MONGODB
userRoute.get("/oneUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//D - Delete - MONGODB
userRoute.delete("/del-user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//U - UPDATE - PUT - MONGODB
userRoute.put("/edit-user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default userRoute;
