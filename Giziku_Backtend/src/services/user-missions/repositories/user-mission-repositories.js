import { Pool } from 'pg';

class UserMissionRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async getUserMissionById(id) {
    const query = {
      text: `
        SELECT 
          um.id,
          um.profile_id,
          um.mission_id,
          um.assigned_date,
          um.meal_type,
          um.is_completed,
          f.name AS title,
          m.description,
          m.xp
        FROM user_missions um
        JOIN missions m ON m.id = um.mission_id
        JOIN foods f ON f.id = m.food_id
        WHERE um.id = $1
      `,
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getUserMissionsToday(profileId, mealType) {
    const query = {
      text: `
        SELECT 
          um.id,
          f.name AS title,
          m.description,
          m.xp,
          um.is_completed
        FROM user_missions um
        JOIN missions m ON m.id = um.mission_id
        JOIN foods f ON f.id = m.food_id
        WHERE um.profile_id = $1
          AND um.assigned_date = CURRENT_DATE
          AND um.meal_type = $2
      `,
      values: [profileId, mealType],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getRandomMissions(limit = 3) {
    const query = {
      text: `
        SELECT m.id, f.name AS title, m.description, m.xp
        FROM missions m
        JOIN foods f ON f.id = m.food_id
        ORDER BY RANDOM()
        LIMIT $1
      `,
      values: [limit],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getPendingMissionsByProfileIdAndFoodId(profileId, foodId) {
    const query = {
      text: `
        SELECT um.id, m.xp, m.description
        FROM user_missions um
        JOIN missions m ON m.id = um.mission_id
        WHERE um.profile_id = $1
          AND m.food_id = $2
          AND um.assigned_date = CURRENT_DATE
          AND um.is_completed = false
      `,
      values: [profileId, foodId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async insertUserMissions(profileId, missions, mealType) {
    const assignedDate = new Date().toLocaleDateString('en-CA');

    const values = missions.map((m) => [
      profileId,
      m.id,
      assignedDate,
      mealType,
      false,
      null,
    ]);

    const placeholders = values
      .map(
        (_, i) =>
          `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`
      )
      .join(', ');

    const query = {
      text: `
        INSERT INTO user_missions
        (profile_id, mission_id, assigned_date, meal_type, is_completed, completed_at)
        VALUES ${placeholders}
        RETURNING *
      `,
      values: values.flat(),
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async completeMission(missionId) {
    const completedAt = new Date().toISOString();

    const query = {
      text: `
        UPDATE user_missions
        SET is_completed = true, completed_at = $1
        WHERE id = $2
        RETURNING *
      `,
      values: [completedAt, missionId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async submitMissionProof(userMissionId, imageUrl, status) {
    const submittedAt = new Date().toISOString();

    const query = {
      text: `
        INSERT INTO mission_proofs
        (user_mission_id, image_url, status, submitted_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      values: [userMissionId, imageUrl, status, submittedAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async awardXp(profileId, xp) {
    const query = {
      text: `
        UPDATE users
        SET xp = xp + $1
        WHERE id = $2
        RETURNING xp
      `,
      values: [xp, profileId],
    };

    const result = await this._pool.query(query);
    return result.rows[0].xp;
  }
}

export default new UserMissionRepositories();