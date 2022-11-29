import express from "express";
const userRoute = express.Router();

const bancoDados = [
  {
    id: "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000",
    name: "Karen Okasaki",
    age: 29,
    role: "professora",
    active: true,
    tasks: ["preparar aula do mongoCompass", "Crud no mongoDB"],
  },
];

//Page HOME
userRoute.get("/", (req, res) => {
  const bemVindo =
    "Você tem as seguintes opções /all-users, /new-users, /del-user, /edit-user";
  return res.status(200).json({ msg: bemVindo, turma: "Bem vindo" });
});

// CRUD - CREATE READ UPDATE DELETE
//R - READ
userRoute.get("/all-users", (req, res) => {
  const dados = bancoDados;
  return res.status(200).json({ dados });
});

//C - CREATE
userRoute.post("/new-user", (req, res) => {
  const form = req.body;
  bancoDados.push(form);

  console.log("Usuario adicionado: " + form);
  console.log(form);

  return res.status(201).json(bancoDados);
});

//D - DELETE
userRoute.delete("/del-user/:id", (req, res) => {
  const { id } = req.params;

  //BUSCA
  const deleteById = bancoDados.find((user) => user.id === id);
  if (!deleteById) {
    return res.status(400).json({ msg: "Usuario nao existe" });
  }
  //ACHA O INDEX
  const index = bancoDados.indexOf(deleteById);
  // REMOVE
  bancoDados.splice(index, 1);

  console.log("Usuario deletado: " + req.params.id);

  return res.status(200).json(req.params.id);
});

//U - UPDATE - PUT
userRoute.put("/edit-user/:id", (req, res) => {
  const { id } = req.params;

  //BUSCA
  const editUser = bancoDados.find((user) => user.id === id);
  if (!editUser) {
    return res.status(400).json({ msg: "Usuario nao existe" });
  }
  //ACHA O INDEX
  const index = bancoDados.indexOf(editUser);

  bancoDados[index] = {
    ...editUser,
    ...req.body,
  };

  console.log("Usuario Editado: " + req.params.id);

  return res.status(200).json(req.params.id);
});

export default userRoute;
