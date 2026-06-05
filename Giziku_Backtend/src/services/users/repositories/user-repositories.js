import { Pool } from 'pg';
import bcrypt from 'bcrypt';

class UserRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createUser({ email, username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO users (username, email, password, created_at) VALUES($1, $2, $3, $4) RETURNING id',
      values: [username, email, hashedPassword, createdAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    return result.rows.length > 0;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    return result.rows.length > 0;
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  } 
}

export default new UserRepositories;