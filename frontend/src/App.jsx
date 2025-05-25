import React, { useEffect, useState } from 'react';

const API_BASE = 'https://to-do-backend-delta.vercel.app/api/todos';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all todos
  async function fetchTodos() {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch todos');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Add new todo
  async function addTodo() {
    if (!title.trim()) return alert('Please enter a todo title');
    try {
      setLoading(true);
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to add todo');
      const newTodo = await res.json();
      setTodos([newTodo, ...todos]);
      setTitle('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Delete todo by ID (using query parameter)
  async function deleteTodo(id) {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}?id=${id}`, {
        method: 'DELETE',
      });
      if (res.status !== 204) throw new Error('Failed to delete todo');
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '80%', padding: 8 }}
      />
      <button onClick={addTodo} style={{ padding: 8, marginLeft: 8 }}>
        Add
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 8,
              borderBottom: '1px solid #ccc',
            }}
          >
            <span>{todo.title}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
