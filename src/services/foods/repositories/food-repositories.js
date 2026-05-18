import { Pool } from 'pg';

class FoodRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createFood({ profileId, imageUrl }) {
    const analyzedAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO foods (profile_id, image_url, analyzed_at) VALUES($1, $2, $3) RETURNING *',
      values: [profileId, imageUrl, analyzedAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getAllFoods() {
    const query = {
      text: 'SELECT * FROM foods ORDER BY id ASC',
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getFoodById(id) {
    const query = {
      text: 'SELECT f.*, nr.name AS nutrition_name, nr.energy, nr.protein, nr.fat, nr.carbohydrate, nr.sugar FROM foods f LEFT JOIN nutrition_results nr ON f.id = nr.food_id WHERE f.id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deleteFoodById(id) {
    const query = {
      text: 'DELETE FROM foods WHERE id = $1 RETURNING *',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      return null;
    }

    return result.rows[0];
  }
}

export default new FoodRepositories();