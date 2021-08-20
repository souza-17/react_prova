const express = require("express"),
app = express(),
bodyParser = require("body-parser"),
path = require("path"),
cors = require("cors"),
db = require("./database"),
fs = require("fs"),
{
  userRoutes,
  pacienteRoutes,
  prontuarioRoutes
} = require("../app/routes");


app.set("secret", "your secret phrase here");

const corsOptions = {
  exposedHeaders: ["x-access-token"]
};

app.use("/static", express.static("uploads"));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.db = db;
  next();
});

// app.use((req, res, next) => {
//   const token = req.headers["x-access-token"];
//   console.log("####################################");
//   if (token) {
//     console.log("A token is send by the application");
//     console.log("Token value is " + token);
//   } else {
//     console.log("No token is send by the the application");
//   }
//   console.log("####################################");
//   next();
// });

userRoutes(app);
pacienteRoutes(app);
prontuarioRoutes(app);

app.use("*", (req, res) => {
  res.status(404).json({ message: `Rota ${req.originalUrl} não existe!` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor!" });
});

module.exports = app;
