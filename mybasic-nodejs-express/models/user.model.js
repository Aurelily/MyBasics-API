const bcrypt = require('bcrypt');
const dbUtils = require('../utils/dbUtils');

class User {
  static getAllUsers() {
    const sql = 'SELECT * FROM users';
    return dbUtils.queryPromise(sql);
  }

  static getUserById(userId) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return dbUtils.queryPromise(sql, [userId]);
  }

  static getUserByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return dbUtils.queryPromise(sql, [email])
      .then(results => results[0]); // Retourne le premier utilisateur trouvé ou undefined
  }

  static async createUser(user) {
    const { pseudo, email, password } = user;

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // 10 : tours pour le salage

    const sql = 'INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)';
    return dbUtils.queryPromise(sql, [pseudo, email, hashedPassword]);
  }

  

  static async updateUser(userId, updatedUser) {
    const { pseudo, email, password } = updatedUser;

    // Si un nouveau mot de passe est fourni, le hacher
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const sql = 'UPDATE users SET pseudo = ?, email = ?, password = ? WHERE id = ?';
    return dbUtils.queryPromise(sql, [pseudo, email, hashedPassword, userId]);
  }

  static deleteUser(userId) {
    const sql = 'DELETE FROM users WHERE id = ?';
    return dbUtils.queryPromise(sql, [userId]);
  }
}

module.exports = User;
