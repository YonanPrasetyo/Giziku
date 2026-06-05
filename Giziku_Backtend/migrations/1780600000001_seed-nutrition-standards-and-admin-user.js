/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
import bcrypt from 'bcrypt';

export const shorthands = undefined;

export const up = async (pgm) => {
  const passwordHash = await bcrypt.hash('11111111', 10);
  const createdAt = new Date().toISOString();

  await pgm.sql(`
    INSERT INTO nutrition_standards (id, age_min, age_max, gender, calories, protein, sugar)
    VALUES
      (1, 0, 5, 'M', 1000, 13, 20),
      (2, 6, 6, 'M', 1300, 16, 24),
      (3, 7, 9, 'M', 1600, 24, 28),
      (4, 10, 12, 'M', 1900, 34, 32),
      (5, 13, 1000, 'M', 2500, 60, 36),
      (6, 0, 5, 'F', 1000, 13, 20),
      (7, 6, 6, 'F', 1200, 15, 24),
      (8, 7, 9, 'F', 1400, 20, 28),
      (9, 10, 12, 'F', 1700, 30, 32),
      (10, 13, 1000, 'F', 2000, 50, 36);

    SELECT setval(pg_get_serial_sequence('nutrition_standards', 'id'), (SELECT MAX(id) FROM nutrition_standards));
  `);

  await pgm.sql(`
    INSERT INTO users (username, email, role, password, created_at)
    VALUES ('admin', 'admin@gmail.com', 'admin', '${passwordHash}', '${createdAt}');
  `);
};

export const down = async (pgm) => {
  await pgm.sql(`
    DELETE FROM nutrition_standards WHERE id BETWEEN 1 AND 10;
    DELETE FROM users WHERE email = 'admin@gmail.com';
    SELECT setval(pg_get_serial_sequence('nutrition_standards', 'id'), COALESCE((SELECT MAX(id) FROM nutrition_standards), 0));
    SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE((SELECT MAX(id) FROM users), 0));
  `);
};
