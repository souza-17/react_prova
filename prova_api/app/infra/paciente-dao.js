const pacienteConverter = row => ({
    id: row.paciente_id,
    nome: row.paciente_nome,
    cpf: row.paciente_cpf
  });
  
  const maxRows = 10;
  
  class PacienteDao {


    constructor(db) {
      this._db = db;
    }
  
    list() {
      return new Promise((resolve, reject) => {
        this._db.all(
          `SELECT * FROM paciente`,
          (err, rows) => {
            if (err) {
              console.log(err);
              return reject("Can`t list pacientes");
            }
  
            const pacientes = rows.map(pacienteConverter);
            console.log("pacientes retornadas: ");
            resolve(pacientes);
          }
        );
      });
    }

    update(id, dados) {

        console.log(id);
        return new Promise((resolve, reject) => {
          this._db.run(
            `UPDATE paciente SET paciente_nome=?, paciente_cpf=? WHERE paciente_id=? `,
            [
                dados.nome,
                dados.cpf,
                id
            ],
            function(err) {
              if (err) {
                console.log(err);
                return reject("Erro na edição");
              }
              resolve(id);
            }
          );
        });
    }


    add(paciente) {
        return new Promise((resolve, reject) => {
          this._db.run(
            `
                    INSERT INTO paciente (
                        paciente_nome, 
                        paciente_cpf
                    ) values (?,?)
                `,
            [
              paciente.nome,
              paciente.cpf
            ],
            function(err) {
              if (err) {
                console.log(err);
                return reject("Can`t add photo");
              }
              resolve(this.lastID);
            }
          );
        });
    }

    findById(id) {
      return new Promise((resolve, reject) =>
        this._db.get(
          `
              SELECT * FROM paciente p
              WHERE p.paciente_id = ?
              `,
          [id],
          (err, row) => {
            if (err) {
              console.log(err);
              return reject("Não encontrou paciente");
            }
            if (row) {
              resolve(pacienteConverter(row));
            } else {
              resolve(null);
            }
          }
        )
      );
    }

    remove(id) {

        console.log(id);
        return new Promise((resolve, reject) => {
          this._db.run(
            `DELETE FROM paciente WHERE paciente_id=? `,
            [
                id
            ],
            function(err) {
              if (err) {
                console.log(err);
                return reject("Erro na remoção");
              }
              resolve(id);
            }
          );
        });
    }

}
  
module.exports = PacienteDao;
  