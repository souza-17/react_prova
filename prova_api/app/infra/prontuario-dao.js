const prontuarioConverter = row => ({
    id: row.prontuario_id,
    titulo: row.prontuario_titulo,
    descricao: row.prontuario_descricao,
    usuario_id : row.user_id,
    paciente_id : row.paciente_id,
    usuario : row.usuario,
    paciente : row.paciente
});
  
class ProntuarioDao {
    constructor(db) {
      this._db = db;
    }
  
    list(id) {
    
      return new Promise((resolve, reject) => {
        this._db.all(
          `
            SELECT p.*, 
            (SELECT u.user_name 
              FROM user as u 
              WHERE u.user_id = p.user_id
              ) as usuario,
              (SELECT pa.paciente_nome 
                FROM paciente as pa 
                WHERE pa.paciente_id = p.paciente_id
                ) as paciente
            FROM prontuarios as p
            WHERE p.user_id = ?
          `,
          [id],
          (err, rows) => {
            if (err) {
              console.log(err);
              return reject("Can`t list prontuarios");
            }
            console.log(rows);
            const prontuarios = rows.map(prontuarioConverter);
            console.log();
            resolve(prontuarios);
          }
        );
      });
    }

    update(id, dados) {

        console.log(id);
        return new Promise((resolve, reject) => {
          this._db.run(
            `UPDATE prontuarios SET prontuario_titulo=?, prontuario_descricao=?, paciente_id=? WHERE prontuario_id=? `,
            [
                dados.titulo,
                dados.descricao,
                dados.paciente_id,
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

    add(prontuario) {
        return new Promise((resolve, reject) => {
          this._db.run(
            `
                    INSERT INTO Prontuarios (
                        prontuario_titulo,
                        prontuario_descricao,
                        user_id,
                        paciente_id
                    ) values (?,?,?,?)
                `,
            [
                prontuario.titulo,
                prontuario.descricao,
                prontuario.user_id,
                prontuario.paciente_id
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
                SELECT * FROM prontuarios p
                WHERE p.prontuario_id = ?
                `,
            [id],
            (err, row) => {
              if (err) {
                console.log(err);
                return reject("Não encontrou prontuario");
              }
              if (row) {
                resolve(prontuarioConverter(row));
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
            `DELETE FROM prontuarios WHERE prontuario_id=? `,
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
  
module.exports = ProntuarioDao;
  