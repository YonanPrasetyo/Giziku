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
  pgm.createTable('mission_proofs', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    user_mission_id: {
      type: 'integer',
      notNull: true,
    },
    image_url: {
      type: 'varchar',
    },
    status: {
      type: 'varchar',
      check: "status IN ('pending', 'approved', 'rejected')",
    },
    feedback: {
      type: 'text',
    },
    submitted_at: {
      type: 'timestamp',
    },
    reviewed_at: {
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
  pgm.dropTable('mission_proofs');
};
