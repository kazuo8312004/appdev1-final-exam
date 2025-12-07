import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todosAPI from '../../todos/todosAPI';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await todosAPI.getTodos();
  return res.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const res = await todosAPI.createTodo(todo);
  return res.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updates }) => {
  const res = await todosAPI.updateTodo(id, updates);
  return res.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await todosAPI.deleteTodo(id);
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchTodos.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload; })
      .addCase(fetchTodos.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; })

      .addCase(addTodo.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(updateTodo.fulfilled, (s, a) => {
        const idx = s.items.findIndex(t => t.id === a.payload.id);
        if (idx !== -1) s.items[idx] = a.payload;
      })
      .addCase(deleteTodo.fulfilled, (s, a) => {
        s.items = s.items.filter(t => t.id !== a.payload);
      });
  },
});

export default todosSlice.reducer;
