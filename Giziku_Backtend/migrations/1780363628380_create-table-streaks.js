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
  pgm.createTable('streaks', {
    user_id: {
      type: 'integer',
      primaryKey: true,
    },
    current_streak: {
      type: 'integer',
      notNull: true,
      default: 0,
    },
    highest_streak: {
      type: 'integer',
      notNull: true,
      default: 0,
    },
    last_activity_date: {
      type: 'date',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('streaks');
};
