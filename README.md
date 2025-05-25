# SUMMASLACK

---

**SUMMASLACK** is a sleek, futuristic Todo application enhanced with AI-powered task summarization. Organize your daily tasks efficiently and generate clear, concise summaries of your pending items using Hugging Face’s BART model. Additionally, get automatic notifications delivered directly to your Slack channel.

## Features

* **Add, view, and delete todos effortlessly**: Manage your tasks with ease.
* **Generate detailed task summaries (~150 words) using AI**: Get clear, concise overviews of your pending items.
* **Modern dark-themed UI with stylish green neon accents**: Enjoy a visually appealing and intuitive interface.
* **Responsive design with smooth, intuitive interactions**: Access and use the app seamlessly across devices.
* **Backend powered by PostgreSQL and Hugging Face’s AI API**: Robust and reliable technology stack.
* **Optional Slack integration**: Receive task summaries in real-time directly to your Slack channel.

## Tech Stack

* **Frontend**: React, Tailwind CSS
* **Backend**: Node.js, Express, PostgreSQL
* **AI Summarization**: Hugging Face Inference API (`facebook/bart-large-cnn`)
* **Notifications**: Slack Webhook (optional)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js** (v16 or higher recommended)
* **PostgreSQL** database
* **Hugging Face API Key**
* **Slack Webhook URL** (optional, for Slack notifications)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/KaDiS-Bot/toDo_Backend.git
    ```

2.  **Install dependencies**:

    ```bash
    # For backend (from the root or backend folder)
    cd backend
    npm install

    # For frontend (if in a separate folder, navigate into it first)
    # cd frontend
    # npm install
    ```

3.  **Configure environment variables**:

    Create a `.env` file in your **backend** directory with the following:

    ```env
    DATABASE_URL=your_postgres_connection_string
    HUGGINGFACE_API_KEY=your_huggingface_api_key
    SLACK_WEBHOOK_URL=your_slack_webhook_url #(optional)
    ```

4.  **Set up the database**:

    Run migrations or create the necessary tables as required. (This step will depend on your specific database setup; you might use `knex migrate:latest` or similar commands if you have a migration tool, or just create tables manually.)

5.  **Start the backend server**:

    ```bash
    npm run dev
    ```

6.  **Start the frontend server**:

    ```bash
    npm run dev
    ```

---

## Usage

1.  Access the app via your browser at `http://localhost:3000` (or your deployed URL).
2.  Add your tasks using the input field and submit them.
3.  Click **Summarize Tasks** to generate a clear AI summary of your pending todos.
4.  If Slack integration is enabled, the summary will automatically be sent to your configured Slack channel.

---

## Project Structure

```
/backend            # Node.js backend API code
/frontend           # React frontend application
```

---

## Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repository and submit pull requests.
