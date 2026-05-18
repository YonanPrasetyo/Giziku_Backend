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
  pgm.createTable('foods', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    profile_id: {
      type: 'integer',
      notNull: true,
      references: 'profiles',
      onDelete: 'cascade',
    },
    image_url: {
      type: 'varchar',
    },
    analyzed_at: {
      type: 'timestamp',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('foods');
};
