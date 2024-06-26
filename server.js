const express = require('express');
const { Pool } = require('pg');
const app = express();
const cors = require('cors'); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'recipeBook',
  password: 'seq@123',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

app.get('/api/items', (req, res) => {
    pool.query('SELECT * FROM items', (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result.rows);
      }
    });
  });
  
  app.post('/api/items', (req, res) => {
    const { name, description } = req.body;
  
    pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description],
      (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(result.rows[0]);
        }
      }
    );
  });