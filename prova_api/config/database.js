// TODO - adicionar funcionalidade de limpar o BD de tempos em tempos
// para colocar a API online e não explodir o cabeçote!

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data.db");

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_password VARCAHR(255) NOT NULL,
    user_profile_photo_url TEXT DEFAULT (''), 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const PACIENTES_SCHEMA = `
CREATE TABLE IF NOT EXISTS paciente (
    paciente_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    paciente_nome VARCHAR(255) NOT NULL, 
    paciente_cpf VARCHAR(255) NOT NULL,
    paciente_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_PACIENTE_1 = `
INSERT INTO paciente (
    paciente_nome,
    paciente_cpf
) 

SELECT 'paciente 1', '090.600.000-00'
WHERE NOT EXISTS (SELECT * FROM paciente WHERE paciente_nome = 'paciente 1')
`;


const PRONTUARIOS_SCHEMA = `

CREATE TABLE IF NOT EXISTS prontuarios (
    prontuario_id INTEGER PRIMARY KEY AUTOINCREMENT,
    prontuario_titulo VARCHAR(255) NOT NULL,
    prontuario_descricao VARCHAR(255) NOT NULL,
    user_id INTEGER,
    paciente_id INTEGER, 
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY(paciente_id) REFERENCES paciente(paciente_id) ON DELETE CASCADE
)
`;

const INSERT_DEFAULT_PRONTUARIO_1 = `
INSERT INTO prontuarios pr (
    pr.prontuario_titulo,
    pr.prontuario_descricao,
    pr.user_id,
    pr.paciente_id
) 

SELECT 'prontuario 1', 'atendimento realizado', 1, 1
WHERE NOT EXISTS (SELECT * FROM prontuarios WHERE prontuario_titulo = 'prontuario 1')
`;


const INSERT_DEFAULT_USER_1 = `
INSERT INTO user (
    user_name, 
    user_password,
    user_profile_photo_url
) 

SELECT 'Alura', '123456', "https://raw.githubusercontent.com/bugan/instalura-api/master/uploads/logo.jpg"
WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'Alura')
`;



db.serialize(() => {
  db.run("PRAGMA foreign_keys=ON");
  db.run(USER_SCHEMA);
  db.run(PACIENTES_SCHEMA);
  db.run(PRONTUARIOS_SCHEMA);
  db.run(INSERT_DEFAULT_USER_1);
  db.run(INSERT_DEFAULT_PACIENTE_1);    

 
  db.run(PACIENTES_SCHEMA, err =>
    err ? console.log(err) : console.log("Tabela paciente criada!")
  );
  
  db.each("SELECT * FROM user", (err, user) => {
    console.log("Users");
    console.log(user);
  });

  db.each("SELECT * FROM paciente", (err, paciente) => {
    console.log("Pacientes");
    console.log(paciente);
  });

});

process.on("SIGINT", () =>
  db.close(() => {
    console.log("Database closed");
    process.exit(0);
  })
);

module.exports = db;
