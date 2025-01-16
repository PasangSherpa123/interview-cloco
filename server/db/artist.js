const pool = require("../config/db.js");
const createArtistDb = async ({
  name,
  dob,
  gender,
  address,
  firstReleaseYear,
  noOfAlbumsRelease,
}) => {
  const { rows: artist } = await pool.query(
    `
            INSERT INTO "artist" 
              (name, dob, gender, address, first_release_year, no_of_albums_release,created_at, updated_at)
            VALUES 
              ($1, $2, $3, $4, $5, $6, NOW(), NOW())
            RETURNING id, name, first_release_year, no_of_albums_release;
          `,
    [
      name,
      dob || null,
      gender || "o",
      address,
      firstReleaseYear || null,
      noOfAlbumsRelease || 0,
    ]
  );
  return artist[0];
};

const createArtistsImportDb = async ({
  placeholder,
  values
}) => {
  const { rows: artists } = await pool.query(
   `
    INSERT INTO artist (name, gender, dob, address, first_release_year, no_of_albums_release, created_at, updated_at) 
    VALUES ${placeholder} RETURNING *;
  `,
    values
  );
  return artists;
};

const getArtists = async ({ limit, offset }) => {
  const { rows: artists } = await pool.query(
    `SELECT * FROM "artist" LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  const { rows: totalCountResult } = await pool.query(
    `SELECT COUNT(*) AS total FROM "artist"`
  );
  const totalCount = parseInt(totalCountResult[0].total, 10);
  return { artists, totalCount };
};
const getAllArtistsDb = async () => {
  const { rows: artists } = await pool.query(`SELECT * FROM "artist"`);

  return artists;
};

const updateArtistDb = async ({
  name,
  dob,
  gender,
  address,
  firstReleaseYear,
  noOfAlbumsRelease,
  id,
}) => {
  const { rows: artist } = await pool.query(
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
  return artist[0];
};

const deleteArtistDb = async ({ id }) => {
  const { rows: artist } = await pool.query(
    "DELETE FROM artist where id = $1 returning *",
    [id]
  );
  console.log(artist);
  return artist[0];
};
module.exports = {
  createArtistDb,
  createArtistsImportDb,
  getArtists,
  getAllArtistsDb,
  updateArtistDb,
  deleteArtistDb,
};
