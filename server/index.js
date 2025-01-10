import express from "express";
import dotenv from "dotenv";
import pkg from "pg";
const { Client } = pkg;


import api from './routes/index';


dotenv.config();

const app = express();

app.use(express.json());


app.use('/api', api);

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js backend!");
});

// const { Pool } = require('pg');
console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});

// testConnection();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
