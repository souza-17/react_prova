const { ProntuarioDao } = require("../infra");
const api = {};

api.list = async (req, res) => {
  const { id } = req.params;
  const prontuarios = await new ProntuarioDao(req.db).list(id);
  Promise.all(prontuarios).then(completo => {
    res.json(completo);
  });
};


api.add = async (req, res) => {
    console.log("####################################");
    console.log("Received JSON data", req.body);
    const prontuario = req.body;
    const id = await new ProntuarioDao(req.db).add(prontuario);
    res.json(id);
};

api.update = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    console.log("####################################");
    console.log(id);
    const prontuario = await new ProntuarioDao(req.db).update(id, dados);
    if (prontuario) {
      res.json(prontuario);
    } else {
      res.status(404).json({ message: "prontuario não existe!" });
    }
};  

api.remove = async (req, res) => {
    const { id } = req.params;
    const prontuario = await new ProntuarioDao(req.db).remove(id);
    if (prontuario) {
      res.json(prontuario);
    } else {
      res.status(404).json({ message: "Prontuario não existe mais!" });
    }
};  


api.findById = async (req, res) => {
    const { id } = req.params;
    const prontuario = await new ProntuarioDao(req.db).findById(id);
    if (prontuario) {
      res.json(prontuario);
    } else {
      res.status(404).json({ message: "Prontuario não existe mais!" });
    }
};  


module.exports = api;
