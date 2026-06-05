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
  pgm.createTable('results', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    profile_id: {
      type: 'integer',
      notNull: true,
    },
    image_url: {
      type: 'varchar',
      notNull: true,
    },
    date: {
      type: 'date',
      notNull: true,
    },
    name: {
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
    carbohydrates: {
      type: 'integer',
      notNull: true,
    },
    fat: {
      type: 'integer',
      notNull: true,
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
  pgm.dropTable('results');
};
