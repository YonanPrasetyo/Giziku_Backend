/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const up = (pgm) => {
  pgm.createTable('nutrition_results', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
      autoIncrement: true,
    },
    food_id: {
      type: 'integer',
      notNull: true,
      references: 'foods',
      onDelete: 'cascade',
    },
    name: {
      type: 'varchar',
    },
    energy: {
      type: 'float',
    },
    protein: {
      type: 'float',
    },
    fat: {
      type: 'float',
    },
    carbohydrate: {
      type: 'float',
    },
    sugar: {
      type: 'float',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('nutrition_results');
};
