const 
  UserDao = require("./user-dao"),
  wrapAsync = require("./async-wrap"),
  auth = require("./auth"),
  ProntuarioDao = require("./prontuario-dao"),
  PacienteDao = require("./paciente-dao")


module.exports = {
  UserDao,
  wrapAsync,
  auth,
  PacienteDao,
  ProntuarioDao
};
