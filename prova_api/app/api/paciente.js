const { PacienteDao } = require("../infra");
const api = {};

api.list = async (req, res) => {
  console.log("####################################");
  const { page } = req.query;
  const pacientes = await new PacienteDao(req.db).list(page);

  Promise.all(pacientes).then(completo => {
    res.json(completo);
  });
};

api.add = async (req, res) => {
    console.log("####################################");
    console.log("Received JSON data", req.body);
    const paciente = req.body;
    const id = await new PacienteDao(req.db).add(paciente);
    res.json(id);
};

api.update = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    console.log("####################################");
    const paciente = await new PacienteDao(req.db).update(id, dados);
    if (paciente) {
      res.json(paciente);
    } else {
      res.status(404).json({ message: "paciente não existe!" });
    }
};

api.findById = async (req, res) => {
  const { id } = req.params;
  const paciente = await new PacienteDao(req.db).findById(id);
  if (paciente) {
    res.json(paciente);
  } else {
    res.status(404).json({ message: "paciente não encontrado!" });
  }
};  

api.remove = async (req, res) => {
    const { id } = req.params;
    const paciente = await new PacienteDao(req.db).remove(id);
    if (paciente) {
      res.json(paciente);
    } else {
      res.status(404).json({ message: "paciente não existe mais!" });
    }
};  




module.exports = api;
