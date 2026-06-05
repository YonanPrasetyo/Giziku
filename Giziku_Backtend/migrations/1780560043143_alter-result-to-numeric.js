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
  pgm.alterColumn('results', 'calories', { type: 'numeric' });
  pgm.alterColumn('results', 'protein', { type: 'numeric' });
  pgm.alterColumn('results', 'sugar', { type: 'numeric' });
  pgm.alterColumn('results', 'carbohydrates', { type: 'numeric' });
  pgm.alterColumn('results', 'fat', { type: 'numeric' });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.alterColumn('results', 'calories', { type: 'integer' });
  pgm.alterColumn('results', 'protein', { type: 'integer' });
  pgm.alterColumn('results', 'sugar', { type: 'integer' });
  pgm.alterColumn('results', 'carbohydrates', { type: 'integer' });
  pgm.alterColumn('results', 'fat', { type: 'integer' });
};
