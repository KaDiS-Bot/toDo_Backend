const pool = require('./db');

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { title } = req.body;
      if (!title || !title.trim()) return res.status(400).json({ error: 'Title is required' });

      const { rows } = await pool.query(
        'INSERT INTO todos (title) VALUES ($1) RETURNING *',
        [title.trim()]
      );
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'ID is required' });

      await pool.query('DELETE FROM todos WHERE id = $1', [id]);
      return res.status(204).end();
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (err) {
    console.error('Error in /api/todos:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
