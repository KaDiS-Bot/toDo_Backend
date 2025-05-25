import axios from 'axios';

const API_URL = 'https://to-do-backend-delta.vercel.app/api';

export const getTodos = () => axios.get(`${API_URL}/todos`);
export const addTodo = (title) => axios.post(`${API_URL}/todos`, { title });
export const deleteTodo = (id) => axios.delete(`${API_URL}/todos?id=${id}`);
export const summarizeTodos = () => axios.post(`${API_URL}/summarize`);
