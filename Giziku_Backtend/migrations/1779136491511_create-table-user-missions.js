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
  pgm.createTable('user_missions', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    profile_id: {
      type: 'integer',
      notNull: true,
    },
    mission_id: {
      type: 'integer',
      notNull: true,
    },
    assigned_date: {
      type: 'date',
    },
    meal_type: {
      type: 'varchar',
      check: "meal_type IN ('breakfast', 'lunch', 'dinner')",
    },
    is_completed: {
      type: 'boolean',
      default: false,
    },
    completed_at: {
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
  pgm.dropTable('user_missions');
};
