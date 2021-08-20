const userConverter = row => ({
    id: row.user_id,
    name: row.user_name,
    password: row.user_password
});

class UserDao {

    constructor(db) {
        this._db = db;
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all(
                `SELECT * FROM user`,
                (err, rows) => {
                if (err) {
                    console.log(err);
                    return reject("Can`t list pacientes");
                }
        
                const usuario = rows.map(userConverter);
                console.log("usuarios retornadas: ");
                resolve(usuario);
                }
            );
        });
    }


    findByNameAndPassword(userName, password) {
        return new Promise((resolve, reject) => this._db.get(
            `SELECT * FROM user WHERE user_name = ? AND user_password = ?`,
            [userName, password],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject(`Erro ao buscar o usuário ${userName}!`);
                }
                 
                if(row) resolve(userConverter(row));
                resolve(null);
            }
        ));
    }

    findByName(userName) {

        return new Promise((resolve, reject) => this._db.get(
            `SELECT * FROM user WHERE user_name = ?`,
            [userName],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find user');
                }
                 
                if(row) resolve(userConverter(row));
                resolve(null);
            }
        ));
        
    }

    remove(userName) {

        return new Promise((resolve, reject) => this._db.run(
            `DELETE FROM user WHERE user_name = ?`,
            [userName],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find user');
                }
                 
                if(row) resolve(userConverter(row));
                resolve(null);
            }
        ));
        
    }

    add(user) {
        return new Promise((resolve, reject) => {
            
            this._db.run(`
                INSERT INTO user (
                    user_name, 
                    user_password, 
                    user_join_date
                ) values (?,?,?)
            `,
                [
                    user.userName,
                    user.password,
                    new Date()
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível registrar o usuário!');
                    }
                    console.log(`User ${user.userName} registered!`)
                    resolve();
                });
        });
    }

}
module.exports = UserDao;