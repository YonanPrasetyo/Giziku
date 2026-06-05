import { Pool } from 'pg';

class NutritionStandardRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createNutritionStandard({ ageMin, ageMax, gender, calories, protein, sugar }) {
    const query = {
      text: `
        INSERT INTO nutrition_standards (age_min, age_max, gender, calories, protein, sugar)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      values: [ageMin, ageMax, gender, calories, protein, sugar],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getAllNutritionStandards() {
    const query = { text: 'SELECT * FROM nutrition_standards ORDER BY id ASC' };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getNutritionStandardById(id) {
    const query = { text: 'SELECT * FROM nutrition_standards WHERE id = $1', values: [id] };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateNutritionStandardById(id, { ageMin, ageMax, gender, calories, protein, sugar }) {
    const query = {
      text: `
        UPDATE nutrition_standards
        SET
          age_min = $1,
          age_max = $2,
          gender = $3,
          calories = $4,
          protein = $5,
          sugar = $6
        WHERE id = $7
        RETURNING *
      `,
      values: [ageMin, ageMax, gender, calories, protein, sugar, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) return null;
    return result.rows[0];
  }

  async deleteNutritionStandardById(id) {
    const query = { text: 'DELETE FROM nutrition_standards WHERE id = $1 RETURNING *', values: [id] };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getNutritionStandardByAgeAndGender(age, gender) {
    const query = {
      text: `
        SELECT *
        FROM nutrition_standards
        WHERE age_min <= $1 AND age_max >= $1 AND gender = $2
        LIMIT 1
      `,
      values: [age, gender],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default new NutritionStandardRepositories();