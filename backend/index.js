// require('dotenv').config();
// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const pool = require('./routes/db');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/todos', require('./routes/todos'));



// app.post('/summarize', async (req, res) => {
//   try {
//     const { rows } = await pool.query('SELECT title FROM todos WHERE is_complete = false');
//     if (!rows.length) return res.status(200).json({ message: 'No pending todos.', summary: '' });

//     // Join tasks as paragraph
//     const tasksParagraph = rows.map(t => t.title.trim()).join('. ') + '.';

//     const prompt = `You will be given a list of tasks below. Summarize them into a detailed, clear paragraph of about 150 words. Use abbreviations such as AI for artificial intelligence and ML for machine learning where applicable. Group related tasks and highlight key goals without listing each task verbatim. Ensure factual accuracy with zero hallucination and no added information.

// Tasks:
// ${tasksParagraph}

// Summary:
// `;

//     const response = await axios.post(
//       'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
//       {
//         inputs: prompt,
//         parameters: {
//           max_length: 200,
//           min_length: 140,
//           no_repeat_ngram_size: 3,
//           do_sample: false,
//           early_stopping: true
//         }
//       },
//       { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
//     );

//     const summary = response.data?.[0]?.summary_text || response.data?.summary_text || '';

//     if (!summary) throw new Error('No summary generated.');

//     res.json({ message: 'Summary generated.', summary });
//   } catch (err) {
//     console.error('Error summarizing:', err.response?.data || err.message);
//     res.status(500).json({ message: 'Summarization failed.', error: err.message });
//   }
// });


// app.listen(5000, () => console.log('✅ Server running at http://localhost:5000'));
