import express from "express";
const processRoute = express.Router();

const bancoDados = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
  ,
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

// CRUD - CREATE READ UPDATE DELETE - OK
//R - READ
processRoute.get("/all-process", (req, res) => {
  const dados = bancoDados;
  return res.status(200).json({ dados });
});

//C - CREATE - OK
processRoute.post("/new-process", (req, res) => {
  const form = req.body;
  bancoDados.push(form);

  console.log("Processo adicionado: " + form);
  console.log(form);

  return res.status(201).json(bancoDados);
});

//D - DELETE - OK
processRoute.delete("/del-process/:id", (req, res) => {
  const { id } = req.params;

  //BUSCA
  const deleteById = bancoDados.find((user) => user.id === id);
  if (!deleteById) {
    return res.status(400).json({ msg: "Processo nao existe" });
  }
  //ACHA O INDEX
  const index = bancoDados.indexOf(deleteById);
  // REMOVE
  bancoDados.splice(index, 1);

  console.log("Processo deletado: " + req.params.id);

  return res.status(200).json({ msg: "Processo deletado: " + req.params.id });
});

//U - UPDATE - PUT - OK
processRoute.put("/edit-process/:id", (req, res) => {
  const { id } = req.params;

  //BUSCA
  const editUser = bancoDados.find((user) => user.id === id);
  if (!editUser) {
    return res.status(400).json({ msg: "Processo nao existe" });
  }
  //ACHA O INDEX
  const index = bancoDados.indexOf(editUser);

  bancoDados[index] = {
    ...editUser,
    ...req.body,
  };

  console.log("Processo Editado: " + req.params.id);

  return res.status(200).json({ msg: "Processo editado: " + req.params.id });
});

export default processRoute;
