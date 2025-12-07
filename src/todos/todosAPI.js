import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export default {
  // Todos
  getTodos: () => api.get('/todos'),
  getTodo: (id) => api.get(`/todos/${id}`),
  createTodo: (todo) => api.post('/todos', todo),
  updateTodo: (id, updates) => api.put(`/todos/${id}`, updates),
  deleteTodo: (id) => api.delete(`/todos/${id}`),
  getUsersLimit3: () => api.get('/users', { params: { _limit: 3 } })
};
