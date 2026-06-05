import { Pool } from 'pg';

class ResultRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createResult({ profileId, imageUrl, date, name, calories, protein, sugar, carbohydrates, fat }) {
    const query = {
      text: `
        INSERT INTO results (profile_id, image_url, date, name, calories, protein, sugar, carbohydrates, fat, created_at)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
        RETURNING *
      `,
      values: [profileId, imageUrl, date, name, calories, protein, sugar, carbohydrates, fat],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getResultsByProfileId(profileId) {
    const query = { text: 'SELECT * FROM results WHERE profile_id = $1 ORDER BY date DESC', values: [profileId] };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getResultById(id) {
    const query = { text: `
      SELECT r.*, p.name AS profile_name, p.date_of_birth, p.weight, p.height, p.gender, p.relation
      FROM results r
      JOIN profiles p ON r.profile_id = p.id
      WHERE r.id = $1
      `, values: [id] };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getThreeLatestResultsByProfileId(profileId) {
    const query = {
      text: 'SELECT * FROM results WHERE profile_id = $1 ORDER BY created_at DESC LIMIT 3',
      values: [profileId]
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getAllResults(profileId) {
    const query = {
      text: 'SELECT * FROM results WHERE profile_id = $1 ORDER BY created_at DESC',
      values: [profileId]
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getTotalNutritionTodayByProfileId(profileId) {
    const query = {
      text: `
        SELECT 
          COALESCE(SUM(calories), 0) AS total_calories, 
          COALESCE(SUM(protein), 0) AS total_protein,
          COALESCE(SUM(sugar), 0) AS total_sugar,
          COALESCE(SUM(carbohydrates), 0) AS total_carbohydrates,
          COALESCE(SUM(fat), 0) AS total_fat
        FROM results
        WHERE profile_id = $1 AND DATE(date) = CURRENT_DATE
      `,
      values: [profileId]
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default new ResultRepositories();