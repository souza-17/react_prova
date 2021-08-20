const { prontuarioAPI } = require("../api"),
  { wrapAsync } = require("../infra");

module.exports = app => {
  app.route("/prontuario_list/:id").get(wrapAsync(prontuarioAPI.list));

  app.route("/prontuarios")
  .post(wrapAsync(prontuarioAPI.add));

  app.route("/prontuarios/:id")
  .put(wrapAsync(prontuarioAPI.update))
  .get(wrapAsync(prontuarioAPI.findById))
  .delete(wrapAsync(prontuarioAPI.remove));
};
