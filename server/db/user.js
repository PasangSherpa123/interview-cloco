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
      hashedPassword || "",
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

const getUserByPhoneDb = async (phone) => {
  const { rows: user } = await pool.query(
    `SELECT id, first_name, last_name, email, password FROM "user" WHERE phone = LOWER($1)`,
    [phone]
  );
  return user[0];
};

const getUsersDb = async ({ limit, offset }) => {
  const { rows: users } = await pool.query(
    `SELECT id, first_name, last_name, email, phone, dob, gender, address FROM "user" LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  const { rows: totalCountResult } = await pool.query(
    `SELECT COUNT(*) AS total FROM "user"`
  );
  const totalCount = parseInt(totalCountResult[0].total, 10);
  return {users, totalCount};
};

const updateUserDb = async ({
  first_name,
  last_name,
  dob,
  gender,
  address,
  id,
}) => {
  const { rows: user } = await pool.query(
    `
        UPDATE "user"
        SET 
            first_name = $1,
            last_name = $2,
            dob = $3,
            gender = $4,
            address = $5,
            updated_at = NOW()
        WHERE id = $6 RETURNING *;
    `,
    [first_name, last_name, dob, gender, address, id]
  );
  return user[0];
};

const deleteUserDb = async ({ id }) => {
  const { rows: user } = await pool.query(
    `DELETE FROM "user" where id = $1 returning *`,
    [id]
  );
  return user[0];
};

module.exports = {
  createUserDb,
  getUserByEmailDb,
  getUserByPhoneDb,
  getUsersDb,
  updateUserDb,
  deleteUserDb,
};
