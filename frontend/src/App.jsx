import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post('http://localhost:5000/todos', { title });
    setTitle('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  const summarizeTodos = async () => {
    const res = await axios.post('http://localhost:5000/summarize');
    setSummary(res.data.summary);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono flex items-center justify-center">
      <div className="max-w-3xl w-full bg-[#0a0a0a] rounded-xl shadow-[0_0_30px_#00ff99] p-8 space-y-6 border border-green-600/50">
        <h1 className="text-4xl font-extrabold text-center tracking-wide drop-shadow-[0_0_8px_#00ff99]">
          <span className="text-[#00ff99]"></span> Todo + <span className="text-[#00ff99]">Summarizer</span>
        </h1>

        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Enter new task..."
            className="flex-1 bg-[#111111] border border-green-600 rounded px-4 py-3 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300 shadow-[0_0_8px_#00ff99]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-green-600 hover:bg-green-500 transition-colors rounded px-6 py-3 font-semibold shadow-[0_0_15px_#00ff99] hover:shadow-[0_0_20px_#00ff99]"
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
              <span className="break-words">{todo.title}</span> {/* Wrap long text */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Delete Task"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={summarizeTodos}
          className="w-full bg-transparent border-2 border-green-600 hover:bg-green-700/30 text-green-400 hover:text-white font-semibold py-3 rounded shadow-[0_0_15px_#00ff99] hover:shadow-[0_0_25px_#00ff99] transition-all"
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
