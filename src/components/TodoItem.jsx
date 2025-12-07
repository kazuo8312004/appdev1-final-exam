import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../features/todos/todosSlice';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const toggleCompleted = () => {
    dispatch(updateTodo({ id: todo.id, updates: { ...todo, completed: !todo.completed } }));
  };
  const save = () => {
    dispatch(updateTodo({ id: todo.id, updates: { ...todo, title } }));
    setEditing(false);
  };
  const remove = () => {
    if (confirm('Delete this todo?')) dispatch(deleteTodo(todo.id));
  };

  return (
    <li>
      <input type="checkbox" checked={!!todo.completed} onChange={toggleCompleted} />
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={save}>Save</button>
          <button onClick={() => { setTitle(todo.title); setEditing(false); }}>Cancel</button>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={remove}>Delete</button>
        </>
      )}
    </li>
  );
}
