const pool = require("../config/db.js");
const createUserDb = async ({
  first_name,
  last_name,
  email,
  hashedPassword,
  phone,
  dob,
  gender,
  address,
}) => {
  const { rows: user } = await pool.query(
    `
        INSERT INTO "user" 
          (first_name, last_name, email, password, phone, dob, gender, address, created_at, updated_at)
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING id, first_name, last_name, email;
      `,
    [
      first_name,
      last_name,
      email,
      hashedPassword,
      phone,
      dob || null,
      gender || "o",
      address,
    ]
  );
  return user[0];
};
const getUserByEmailDb = async (email) => {
  const { rows: user } = await pool.query(
    `SELECT id, first_name, last_name, email, password FROM "user" WHERE email = LOWER($1)`,
    [email]
  );
  return user[0];
};

module.exports = {
  createUserDb,
  getUserByEmailDb,
};
