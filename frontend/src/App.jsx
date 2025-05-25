import { useEffect, useState } from 'react';
import { getTodos, addTodo, deleteTodo, summarizeTodos } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    try {
      setError('');
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    }
  };

  const addNewTodo = async () => {
    if (!title.trim()) return;
    try {
      setError('');
      setLoading(true);
      await addTodo(title);
      setTitle('');
      await fetchTodos();
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingTodo = async (id) => {
    try {
      setError('');
      await deleteTodo(id);
      await fetchTodos();
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const generateSummary = async () => {
    try {
      setError('');
      setLoading(true);
      const res = await summarizeTodos();
      setSummary(res.data.summary);
    } catch (err) {
      setError('Failed to generate summary');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono flex items-center justify-center">
      <div className="max-w-3xl w-full bg-[#0a0a0a] rounded-xl shadow-[0_0_30px_#00ff99] p-8 space-y-6 border border-green-600/50">
        <h1 className="text-4xl font-extrabold text-center tracking-wide drop-shadow-[0_0_8px_#00ff99]">
          Todo + <span className="text-[#00ff99]">Summarizer</span>
        </h1>

        {error && (
          <div className="text-red-500 text-center mb-4 font-semibold">{error}</div>
        )}

        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Enter new task..."
            className="flex-1 bg-[#111111] border border-green-600 rounded px-4 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 shadow-[0_0_8px_#00ff99]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNewTodo()}
            disabled={loading}
          />
          <button
            onClick={addNewTodo}
            className="bg-green-600 hover:bg-green-500 transition-colors rounded px-6 py-3 font-semibold shadow-[0_0_15px_#00ff99] hover:shadow-[0_0_20px_#00ff99]"
            disabled={loading}
          >
            Add
          </button>
        </div>

        <ul className="divide-y divide-green-700 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-transparent">
          {todos.length === 0 && (
            <li className="py-4 text-center text-green-700 italic select-none">
              No tasks yet. Add something futuristic!
            </li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center py-3 hover:bg-green-900/20 rounded transition-colors cursor-default select-text"
            >
              <span className="break-words">{todo.title}</span>
              <button
                onClick={() => deleteExistingTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Delete Task"
                disabled={loading}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={generateSummary}
          className="w-full bg-transparent border-2 border-green-600 hover:bg-green-700/30 text-green-400 hover:text-white font-semibold py-3 rounded shadow-[0_0_15px_#00ff99] hover:shadow-[0_0_25px_#00ff99] transition-all"
          disabled={loading}
        >
          Summarize Tasks
        </button>

        {summary && (
          <div className="bg-[#111111] border border-green-600 rounded p-5 mt-6 shadow-[0_0_20px_#00ff99]">
            <h2 className="font-bold text-lg mb-2 tracking-wide text-green-300 drop-shadow-[0_0_6px_#00ff99]">
              📋 Summary
            </h2>
            <p className="whitespace-pre-wrap text-green-400">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
