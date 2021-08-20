const { pacienteAPI } = require("../api"),
  { wrapAsync } = require("../infra");

module.exports = app => {
  app.route("/pacientes").get(wrapAsync(pacienteAPI.list));

  app.route("/pacientes")
  .post(wrapAsync(pacienteAPI.add));


  app.route("/pacientes")
  .post(wrapAsync(pacienteAPI.add));

  app.route("/pacientes/:id")
  .put(wrapAsync(pacienteAPI.update))
  .get(wrapAsync(pacienteAPI.findById))
  .delete(wrapAsync(pacienteAPI.remove));
};
