import { Pool } from 'pg';

class StreaksRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async getStreakByUserId(userId) {
    const query = { text: 'SELECT s.*, u.username FROM streaks s JOIN users u ON s.user_id = u.id WHERE s.user_id = $1', values: [userId] };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async addStreak(userId) {
    const query = { text: 'UPDATE streaks SET current_streak = current_streak + 1, last_activity_date = CURRENT_DATE WHERE user_id = $1 RETURNING *', values: [userId] };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async resetStreak(userId) {
    const query = { text: 'UPDATE streaks SET current_streak = 0, last_activity_date = CURRENT_DATE WHERE user_id = $1 RETURNING *', values: [userId] };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async createStreak(userId) {
    const query = {
      text: 'INSERT INTO streaks (user_id, current_streak, highest_streak, last_activity_date) VALUES ($1, 0, 0, CURRENT_DATE) RETURNING *',
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async hasActivityToday(userId) {
    const query = {
      text: 'SELECT (last_activity_date = CURRENT_DATE) as is_today FROM streaks WHERE user_id = $1',
      values: [userId]
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) return false;

    return result.rows[0].is_today;
  }
}

export default StreaksRepositories;