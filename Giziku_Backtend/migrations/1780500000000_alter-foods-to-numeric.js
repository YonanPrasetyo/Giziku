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
  pgm.alterColumn('foods', 'calories', { type: 'numeric' });
  pgm.alterColumn('foods', 'protein', { type: 'numeric' });
  pgm.alterColumn('foods', 'sugar', { type: 'numeric' });
  pgm.alterColumn('foods', 'carbohydrates', { type: 'numeric' });
  pgm.alterColumn('foods', 'fat', { type: 'numeric' });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.alterColumn('foods', 'calories', { type: 'integer' });
  pgm.alterColumn('foods', 'protein', { type: 'integer' });
  pgm.alterColumn('foods', 'sugar', { type: 'integer' });
  pgm.alterColumn('foods', 'carbohydrates', { type: 'integer' });
  pgm.alterColumn('foods', 'fat', { type: 'integer' });
};
