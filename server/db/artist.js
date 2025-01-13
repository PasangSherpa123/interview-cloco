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
         noOfAlbumsRelease || 0
    ]
  );
  return artist[0];
};
module.exports ={
    createArtistDb
}
