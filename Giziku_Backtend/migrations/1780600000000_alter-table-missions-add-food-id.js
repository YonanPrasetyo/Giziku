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
  pgm.addColumn('missions', {
    food_id: {
      type: 'integer',
      references: 'foods(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.dropColumn('missions', 'title');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.addColumn('missions', {
    title: {
      type: 'varchar',
      notNull: true,
      default: '',
    },
  });

  pgm.sql("UPDATE missions SET title = '' WHERE title IS NULL;");
  pgm.alterColumn('missions', 'title', { notNull: true, default: null });
  pgm.dropColumn('missions', 'food_id');
};
