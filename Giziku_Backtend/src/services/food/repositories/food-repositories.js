import { Pool } from 'pg';

class FoodRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async getAllFoods() {
    const query = { text: 'SELECT * FROM foods ORDER BY id ASC' };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getFoodById(id) {
    const query = { text: 'SELECT * FROM foods WHERE id = $1', values: [id] };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getFoodByName(name) {
    const query = { text: 'SELECT * FROM foods WHERE name ILIKE $1', values: [`%${name}%`] };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async createFoodsBulk(rows) {
    if (!rows.length) return [];

    const values = [];
    const placeholders = rows.map((row, idx) => {
      const baseIndex = idx * 8;
      values.push(
        row.name,
        row.category,
        row.portionSize,
        row.calories,
        row.protein,
        row.sugar,
        row.carbohydrates,
        row.fat,
      );
      return `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5}, $${baseIndex + 6}, $${baseIndex + 7}, $${baseIndex + 8})`;
    }).join(', ');

    const query = {
      text: `
        INSERT INTO foods (name, category, portion_size, calories, protein, sugar, carbohydrates, fat)
        VALUES ${placeholders}
        RETURNING *
      `,
      values,
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async createFood({ name, category, portionSize, calories, protein, sugar, carbohydrates, fat }) {
    const query = {
      text: `
        INSERT INTO foods (name, category, portion_size, calories, protein, sugar, carbohydrates, fat)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `,
      values: [name, category, portionSize, calories, protein, sugar, carbohydrates, fat],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateFoodById(id, { name, category, portionSize, calories, protein, sugar, carbohydrates, fat }) {
    const query = {
      text: `
        UPDATE foods
        SET
          name = $1,
          category = $2,
          portion_size = $3,
          calories = $4,
          protein = $5,
          sugar = $6,
          carbohydrates = $7,
          fat = $8
        WHERE id = $9
        RETURNING *
      `,
      values: [name, category, portionSize, calories, protein, sugar, carbohydrates, fat, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) return null;
    return result.rows[0];
  }

  async deleteFoodById(id) {
    const query = { text: 'DELETE FROM foods WHERE id = $1 RETURNING *', values: [id] };
    const result = await this._pool.query(query);

    if (!result.rows.length) return null;
    return result.rows[0];
  }
}

export default new FoodRepositories();