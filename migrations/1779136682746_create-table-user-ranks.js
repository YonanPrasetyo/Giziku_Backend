/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

// Table ranks {
//   id integer [primary key]
//   name varchar
//   min_xp integer
//   max_xp integer
//   icon_url varchar
//   created_at timestamp
// }

export const up = (pgm) => {
  pgm.createTable('ranks', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    name: {
      type: 'varchar',
      notNull: true,
    },
    min_xp: {
      type: 'integer',
      notNull: true,
    },
    max_xp: {
      type: 'integer',
      notNull: true,
    },
    icon_url: {
      type: 'varchar',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('ranks');
};
