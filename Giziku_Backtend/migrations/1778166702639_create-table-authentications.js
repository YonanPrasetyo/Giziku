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
  pgm.createTable('authentications', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    user_id: {
      type: 'INTEGER',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    token: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
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
  pgm.dropTable('authentications');
};
