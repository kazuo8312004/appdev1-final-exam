import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../features/todos/todosSlice';
import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';

export default function Todos() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.todos.status);
  const error = useSelector(state => state.todos.error);

  useEffect(() => { dispatch(fetchTodos()); }, [dispatch]);

  return (
    <main>
      <h1>Todos</h1>
      <AddTodoForm />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <TodoList />
    </main>
  );
}
