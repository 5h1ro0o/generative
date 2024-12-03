// src/__tests__/components/LoginModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginModal from '../../components/LoginModal';
import { AuthContext } from '../../hooks/useAuth';

describe('LoginModal', () => {
  const mockLogin = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <LoginModal onClose={mockOnClose} />
      </AuthContext.Provider>
    );
  });

  test('affiche le formulaire de connexion', () => {
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument();
  });

  test('appelle la fonction login avec les bonnes données', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@test.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Se connecter/i }));

    expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123');
  });
});