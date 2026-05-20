import { Pool } from 'pg';

class MissionRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createMission({ title, description, xp }) {
    const createdAt = new Date().toISOString();

    const query = {
      text: `
        INSERT INTO missions (title, description, xp, created_at)
        VALUES($1, $2, $3, $4)
        RETURNING *
      `,
      values: [title, description, xp, createdAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getAllMissions() {
    const query = { text: 'SELECT * FROM missions ORDER BY id ASC' };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getMissionById(id) {
    const query = { text: 'SELECT * FROM missions WHERE id = $1', values: [id] };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateMissionById(id, { title, description, xp }) {
    const query = {
      text: `
        UPDATE missions
        SET
          title = $1,
          description = $2,
          xp = $3
        WHERE id = $4
        RETURNING *
      `,
      values: [title, description, xp, id],
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
