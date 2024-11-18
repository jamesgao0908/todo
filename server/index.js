const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2/promise');
const path = require('path');
const config = require('./config');

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: [`${config.host}:8000`, `${config.host}`],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // 替换为你的 MySQL 用户名
  password: 'password',       // 替换为你的 MySQL 密码
  database: 'todo',   // 数据库名称
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the MySQL database.');
    connection.release(); // 释放连接
  } catch (err) {
    console.error('Error connecting to the MySQL database:', err);
  }
})();

app.get('/todos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos'); // 查询数据库
    res.json(rows); // 将结果返回为 JSON 响应
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving todos');
  }
})

app.post('/add', async (req, res) => {
  try {
    const { todo } = req.body;

    if (!todo) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    const [result] = await pool.query('INSERT INTO todos (value) VALUES (?)', [todo]);
    const [todos] = await pool.query('SELECT * FROM todos');

    res.status(201).json({
      message: 'Todo added successfully',
      successfully: true,
      insertedItem: result,
      todos,
    });
  } catch (err) {
    console.error('Error adding todo:', err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

app.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Invalid input, ID is required' });
    }
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    const [todos] = await pool.query('SELECT * FROM todos');
    res.status(200).json({
      message: 'Todo deleted successfully',
      successfully: true,
      todos,
    });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`${config.host} running on port ${config.port}`);
});


