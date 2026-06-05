import { Pool } from 'pg';

class ProfileRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createProfile({ userId, name, dateOfBirth, weight, height, gender, relation }) {
    const createdAt = new Date().toISOString();

    const query = {
      text: `
        INSERT INTO profiles 
        (user_id, name, date_of_birth, weight, height, gender, relation, created_at)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `,
      values: [userId, name, dateOfBirth, weight, height, gender, relation, createdAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getAllProfiles(userId) {
    const query = {
      text: 'SELECT * FROM profiles WHERE user_id = $1 ORDER BY id ASC',
      values: [userId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getProfileById(id) {
    const query = {
      text: 'SELECT * FROM profiles WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateProfileById(id, { userId, name, dateOfBirth, weight, height, gender, relation }) {
    const query = {
      text: `
        UPDATE profiles
        SET 
          user_id = $1,
          name = $2,
          date_of_birth = $3,
          weight = $4,
          height = $5,
          gender = $6,
          relation = $7
        WHERE id = $8
        RETURNING *
      `,
      values: [userId, name, dateOfBirth, weight, height, gender, relation, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      return null;
    }

    return result.rows[0];
  }

  async deleteProfileById(id) {
    const query = {
      text: 'DELETE FROM profiles WHERE id = $1 RETURNING *',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      return null;
    }

    return result.rows[0];
  }

  async getByUserId(userId) {
    const query = {
      text: 'SELECT * FROM profiles WHERE user_id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

export default new ProfileRepositories();