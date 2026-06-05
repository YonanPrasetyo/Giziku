import { Pool } from 'pg';

class MissionRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createMission({ foodId, description, xp }) {
    const createdAt = new Date().toISOString();

    const query = {
      text: `
        INSERT INTO missions (food_id, description, xp, created_at)
        VALUES($1, $2, $3, $4)
        RETURNING *
      `,
      values: [foodId, description, xp, createdAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getAllMissions() {
    const query = {
      text: `
        SELECT
          m.id,
          m.food_id,
          f.name AS title,
          m.description,
          m.xp,
          m.created_at
        FROM missions m
        JOIN foods f ON f.id = m.food_id
        ORDER BY m.id ASC
      `,
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getMissionById(id) {
    const query = {
      text: `
        SELECT
          m.id,
          m.food_id,
          f.name AS title,
          m.description,
          m.xp,
          m.created_at
        FROM missions m
        JOIN foods f ON f.id = m.food_id
        WHERE m.id = $1
      `,
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateMissionById(id, { foodId, description, xp }) {
    const query = {
      text: `
        UPDATE missions
        SET
          food_id = $1,
          description = $2,
          xp = $3
        WHERE id = $4
        RETURNING *
      `,
      values: [foodId, description, xp, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) return null;
    return result.rows[0];
  }

  async deleteMissionById(id) {
    const query = { text: 'DELETE FROM missions WHERE id = $1 RETURNING *', values: [id] };
    const result = await this._pool.query(query);

    if (!result.rows.length) return null;
    return result.rows[0];
  }
}

export default new MissionRepositories();
