//create a table to insert post
export const createPostTable = (db) => {
  const query = `
        CREATE TABLE IF NOT EXISTS launces (
        id text PRIMARY KEY,
        title text
        )`;

  return db.run(query);
};
