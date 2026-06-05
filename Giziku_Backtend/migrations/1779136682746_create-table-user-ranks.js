/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

/* eslint-disable camelcase */
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
