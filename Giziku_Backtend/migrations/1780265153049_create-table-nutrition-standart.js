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
  pgm.createTable('nutrition_standards', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    age_min: {
      type: 'integer',
      notNull: true,
    },
    age_max: {
      type: 'integer',
      notNull: true,
    },
    gender: {
      type: 'varchar',
      notNull: true,
    },
    calories: {
      type: 'integer',
      notNull: true,
    },
    protein: {
      type: 'integer',
      notNull: true,
    },
    sugar: {
      type: 'integer',
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
  pgm.dropTable('nutrition_standards');
};
