import axios from 'axios';
const API_URL = 'http://localhost:5000';

export const getTodos = () => axios.get(`${API_URL}/todos`);
export const addTodo = (title) => axios.post(`${API_URL}/todos`, { title });
export const deleteTodo = (id) => axios.delete(`${API_URL}/todos/${id}`);
export const summarizeTodos = () => axios.post(`${API_URL}/summarize`);
