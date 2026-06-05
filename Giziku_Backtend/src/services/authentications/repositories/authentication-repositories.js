import { Pool } from 'pg';
import bcrypt from 'bcrypt';

class AuthenticationRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async addRefreshToken(token, userId) {
    const query = {
      text: 'INSERT INTO authentications (user_id, token, created_at) VALUES($1, $2, $3)',
      values: [userId, token, new Date()],
    };

    await this._pool.query(query);
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };
    await this._pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      return false;
    }

    return result.rows[0];
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password, role FROM users WHERE email = $1',
      values: [email],
    };

    const user = await this._pool.query(query);
    if (!user || !user.rows.length) {
      return null;
    }

    const { id, password: hashedPassword, role } = user.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      return null;
    }
    return {
      id,
      role
    };
  }
}

export default new AuthenticationRepositories();