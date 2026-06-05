import { Pool } from 'pg';

class RankRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createRank({ name, minXp, maxXp, iconUrl }) {
    const createdAt = new Date().toISOString();

    const query = {
      text: `
        INSERT INTO ranks (name, min_xp, max_xp, icon_url, created_at)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
      `,
      values: [name, minXp, maxXp, iconUrl || null, createdAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getAllRanks() {
    const query = { text: 'SELECT * FROM ranks ORDER BY id ASC' };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getRankById(id) {
    const query = { text: 'SELECT * FROM ranks WHERE id = $1', values: [id] };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateRankById(id, { name, minXp, maxXp, iconUrl }) {
    const query = {
      text: `
        UPDATE ranks
        SET
          name = $1,
          min_xp = $2,
          max_xp = $3,
          icon_url = $4
        WHERE id = $5
        RETURNING *
      `,
      values: [name, minXp, maxXp, iconUrl || null, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) return null;
    return result.rows[0];
  }

  async deleteRankById(id) {
    const query = { text: 'DELETE FROM ranks WHERE id = $1 RETURNING *', values: [id] };
    const result = await this._pool.query(query);

    if (!result.rows.length) return null;
    return result.rows[0];
  }

  async getRankByXp(xp) {
    const query = {
      text: 'SELECT * FROM ranks WHERE min_xp <= $1 AND max_xp >= $1 LIMIT 1',
      values: [xp],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}


export default new RankRepositories();
