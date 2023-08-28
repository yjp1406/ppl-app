const dbInstance = require('../config/db');
const bcrypt = require('bcryptjs');
const queries = require('../config/queries');


class User {
    
  static async findByUsername(username) {
    const db = await dbInstance.getInstance();
    const rows = await db.query(queries.findByUsername(), [username]);
    return rows.rows[0] || null;
  }

  static async createUser(username, password, role) {
    const db = await dbInstance.getInstance();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      queries.createUser(),
      [username, hashedPassword, role]
    );
    return result;
  }

  static async findById(id) {
    const db = await dbInstance.getInstance();
    const rows = await db.query(queries.findById(), [id]);

    return rows.rows[0] || null;
  }
}

module.exports = User;
