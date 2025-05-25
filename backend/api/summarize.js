const axios = require('axios');
const pool = require('./db');

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://todofrontend-tau.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { rows } = await pool.query('SELECT title FROM todos WHERE is_complete = false');
    if (!rows.length) {
      return res.status(200).json({ message: 'No pending todos.', summary: '' });
    }

    const tasksParagraph = rows.map(t => t.title.trim()).join('. ') + '.';

    const prompt = `You will be given a list of tasks below. Summarize them into a detailed, clear paragraph of about 150 words. Use abbreviations such as AI for artificial intelligence and ML for machine learning where applicable. Group related tasks and highlight key goals without listing each task verbatim. Ensure factual accuracy with zero hallucination and no added information.

Tasks:
${tasksParagraph}

Summary:
`;

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      {
        inputs: prompt,
        parameters: {
          max_length: 200,
          min_length: 140,
          no_repeat_ngram_size: 3,
          do_sample: false,
          early_stopping: true,
        },
      },
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      }
    );

    const summary = response.data?.[0]?.summary_text || response.data?.summary_text || '';
    if (!summary) throw new Error('No summary generated');

    // Slack webhook post
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      try {
        await axios.post(slackWebhookUrl, {
          text: `📝 *Todo Summary:*\n${summary}`
        });
      } catch (slackErr) {
        console.error('Failed to send summary to Slack:', slackErr.message);
        // Optional: You could decide whether to fail here or continue
      }
    }

    res.status(200).json({ message: 'Summary generated and sent to Slack.', summary });
  } catch (err) {
    console.error('Error summarizing:', err.response?.data || err.message);
    res.status(500).json({ message: 'Summarization failed.', error: err.message });
  }
};
