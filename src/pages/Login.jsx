import React, { useEffect, useState } from 'react';
import todosAPI from '../todos/todosAPI';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await todosAPI.getUsersLimit3();
        setUsers(res.data);
        if (res.data[0]) setSelectedUserId(res.data[0].id);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const secret = import.meta.env.VITE_APP_SECRET_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === secret) {
      localStorage.setItem('userId', selectedUserId);
      navigate('/todos');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User:
          <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
            {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
          </select>
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
