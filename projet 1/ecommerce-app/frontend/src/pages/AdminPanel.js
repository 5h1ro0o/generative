// src/pages/AdminPanel.js
import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Gestion des utilisateurs</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <span>{user.email} - {user.role}</span>
            <button onClick={() => deleteUser(user._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;