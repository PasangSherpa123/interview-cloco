const express = require("express");
const dotenv = require("dotenv");
const apiRouter = require('./routes/index.js');
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js backend!");
});


app.post("/register", async (req, res) => {
  try {
    // const { description } = req.body;
  
    const allTodos = await pool.query('SELECT * FROM "user"');
    console.log(allTodos);


    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



process.on("SIGINT", async () => {
  console.log("Closing database connection...");
  await pool.end();
  console.log("Database connection closed.");
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
