const pool = require("../config/db.js");
const createMusicDb = async ({ artistId, title, albumName, genre }) => {
  console.log({ artistId, title, albumName, genre });
  const { rows: music } = await pool.query(
    `
            INSERT INTO "music" 
              (artist_id, title, album_name, genre, created_at, updated_at)
            VALUES 
              ($1, $2, $3, $4, NOW(), NOW())
            RETURNING artist_id, title, album_name, genre;
          `,
    [artistId, title, albumName, genre || "rnb"]
  );
  return music[0];
};

const getMusicsDb = async ({ artistId, limit, offset }) => {
  const { rows: musics } = await pool.query(
    `SELECT * FROM "music" WHERE artist_id = $1 LIMIT $2 OFFSET $3 `,
    [artistId, limit, offset]
  );
  return musics;
};

const updateMusicDb = async ({ artistId, title, albumName, genre, id }) => {
  console.log({
    artistId,
    title,
    albumName,
    genre,
    id,
  });
  const { rows: music } = await pool.query(
    `
        UPDATE music
        SET 
            artist_id = $1,
            title = $2,
            album_name = $3,
            genre = $4,

            updated_at = NOW()
        WHERE id = $5 RETURNING *;
    `,
    [artistId, title, albumName, genre, id]
  );
  return music[0];
};

const deleteMusicDb = async ({ id }) => {
  const { rows: artist } = await pool.query(
    "DELETE FROM artist where id = $1 returning *",
    [id]
  );
  return artist[0];
};
module.exports = {
  createMusicDb,
  getMusicsDb,
  updateMusicDb,
};
