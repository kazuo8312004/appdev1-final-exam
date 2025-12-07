import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todos = useSelector(state => state.todos.items);

  return (
    <ul>
      {todos.slice(0, 50).map(todo => ( 
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
