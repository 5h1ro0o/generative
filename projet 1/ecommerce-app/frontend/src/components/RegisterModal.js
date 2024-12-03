// src/components/RegisterModal.js
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const RegisterModal = ({ onClose }) => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password, name });
      onClose();
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">S'inscrire</button>
        <button type="button" onClick={onClose}>Fermer</button>
      </form>
    </div>
  );
};

export default RegisterModal;