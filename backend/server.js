// backend/server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors({
  origin: [
    'http://localhost:5500',         // VS Code Live Server
    'http://127.0.0.1:5500',
    'https://your-github-username.github.io'  // ← Replace with your GitHub Pages URL
  ],
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// ===== DATABASE CONNECTION =====
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Create table if it doesn't exist
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id        SERIAL PRIMARY KEY,
        name      VARCHAR(100) NOT NULL,
        email     VARCHAR(255) NOT NULL,
        message   TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Database table ready');
  } catch (err) {
    console.error('❌ DB init error:', err.message);
  }
}
initDB();

// ===== ROUTES =====

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Server is running!', time: new Date().toISOString() });
});

// POST /api/contact — Save contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 chars).' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id, created_at',
      [name.trim(), email.trim(), message.trim()]
    );
    console.log(`📬 New contact from: ${name} <${email}>`);
    res.status(201).json({
      success: true,
      message: 'Message received!',
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Failed to save message. Try again later.' });
  }
});

// GET /api/contacts — View all messages (protect this in production!)
app.get('/api/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
