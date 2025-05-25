const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todosHandler = require('./todos');
const summarizeHandler = require('./summarize');

const app = express();

app.use(cors({
  origin: 'https://todofrontend-tau.vercel.app', // ✅ your frontend domain
  methods: ['GET', 'POST', 'DELETE'],
}));
app.use(express.json());

app.all('/todos', (req, res) => todosHandler(req, res));
app.all('/summarize', (req, res) => summarizeHandler(req, res));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
