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
  pgm.createTable('profiles', {
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
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    date_of_birth: {
      type: 'DATE',
    },
    weight: {
      type: 'REAL',
    },
    height: {
      type: 'REAL',
    },
    gender: {
      type: 'VARCHAR(1)',
    },
    relation: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
    },
  });

  pgm.addConstraint('profiles', 'profiles_gender_check', {
    check: "gender IN ('M', 'F') OR gender IS NULL",
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('profiles');
};
