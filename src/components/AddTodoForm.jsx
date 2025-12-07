import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice';

export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await dispatch(addTodo({ title, completed: false, userId: 1 }));
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Add new todo" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
