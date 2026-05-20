import { Pool } from 'pg';

class UserMissionRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createUserMission({ profileId, missionId, assignedDate, mealType }) {
    const query = {
      text: `
        INSERT INTO user_missions (profile_id, mission_id, assigned_date, meal_type)
        VALUES($1, $2, $3, $4)
        RETURNING *
      `,
      values: [profileId, missionId, assignedDate || null, mealType || null],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getAllUserMissions() {
    const query = { text: 'SELECT * FROM user_missions ORDER BY id ASC' };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getUserMissionById(id) {
    const query = { text: 'SELECT * FROM user_missions WHERE id = $1', values: [id] };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateUserMissionById(id, { profileId, missionId, assignedDate, mealType, isCompleted }) {
    const completedAt = isCompleted ? new Date().toISOString() : null;

    const query = {
      text: `
        UPDATE user_missions
        SET
          profile_id = $1,
          mission_id = $2,
          assigned_date = $3,
          meal_type = $4,
          is_completed = $5,
          completed_at = $6
        WHERE id = $7
        RETURNING *
      `,
      values: [profileId, missionId, assignedDate || null, mealType || null, isCompleted ?? false, completedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) return null;
    return result.rows[0];
  }

  async deleteUserMissionById(id) {
    const query = { text: 'DELETE FROM user_missions WHERE id = $1 RETURNING *', values: [id] };
    const result = await this._pool.query(query);

    if (!result.rows.length) return null;
    return result.rows[0];
  }
}

export default new UserMissionRepositories();
