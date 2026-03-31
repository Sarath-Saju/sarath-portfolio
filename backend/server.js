require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://sarath-saju.github.io"
  ]
}));

app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ✅ Connect + create table
pool.connect()
  .then(async () => {
    console.log("✅ Connected to PostgreSQL");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        message TEXT
      );
    `);

    console.log("✅ Table ready");
  })
  .catch(err => console.error("❌ DB Error:", err));

// API route
// Save message
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// ✅ ADD THIS (VERY IMPORTANT)
app.get("/messages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ ADD THIS ALSO (for testing)
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});