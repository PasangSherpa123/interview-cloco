require("dotenv").config();
const { Pool } = require("pg");


const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new Pool({
  connectionString,
  /*
    SSL is not supported in development
    */
  ssl: false
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};