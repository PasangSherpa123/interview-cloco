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

const getMusics = async ({ artistId, limit, offset }) => {
  const { rows: musics } = await pool.query(
    `SELECT * FROM "music" WHERE artist_id = $1 LIMIT $2 OFFSET $3 `,
    [artistId, limit, offset]
  );
  return musics;
};

const updateMusicDb = async ({
  name,
  dob,
  gender,
  address,
  firstReleaseYear,
  noOfAlbumsRelease,
  id,
}) => {
  const { rows: product } = await pool.query(
    `
        UPDATE artist
        SET 
            name = $1,
            dob = $2,
            gender = $3,
            address = $4,
            first_release_year = $5,
            no_of_albums_release = $6,
            updated_at = NOW()
        WHERE id = $7 RETURNING *;
    `,
    [name, dob, gender, address, firstReleaseYear, noOfAlbumsRelease, id]
  );
  return product[0];
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
  getMusics,
};
