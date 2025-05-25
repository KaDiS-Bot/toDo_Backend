SUMMASLACK

A sleek and futuristic Todo application enhanced with AI-powered task summarization. Organize your daily tasks and get a clear, concise summary of pending items generated using Hugging Face’s BART model.
Features

    Add, view, and delete todos

    Summarize pending tasks into a clear paragraph (~150 words)

    Modern dark-themed UI with green neon accents

    Responsive design with smooth user interactions

    Backend powered by PostgreSQL and AI summarization via Hugging Face API

    Slack notification integration for task summaries (optional)

Tech Stack

    Frontend: React, Tailwind CSS

    Backend: Node.js, Express, PostgreSQL

    AI Summarization: Hugging Face Inference API (facebook/bart-large-cnn)

    Notifications: Slack Webhook (optional)

Getting Started
Prerequisites

    Node.js (v16+ recommended)

    PostgreSQL

    Hugging Face API Key

    Slack Webhook URL (optional)

Installation

    Clone the repository:

git clone https://github.com/yourusername/todo-summarizer.git
cd todo-summarizer

    Install dependencies for frontend and backend:

# In root or backend folder
npm install

# In frontend folder (if separated)
npm install

    Set up environment variables (.env file):

DATABASE_URL=your_postgres_connection_string
HUGGINGFACE_API_KEY=your_huggingface_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url (optional)

    Run database migrations or setup (if applicable)

    Start the backend server:

npm run dev

    Start the frontend:

npm run dev

Usage

    Open the app in your browser.

    Add tasks in the input field and press Add or Enter.

    Click Summarize Tasks to get a summary of your pending tasks.

    (If Slack configured) Summaries will be sent to your Slack channel automatically.

Folder Structure

/backend - Node.js backend API
/frontend - React frontend app
