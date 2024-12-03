import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  test('affiche le titre du site', () => {
    renderWithProviders(<Navbar />);
    const siteTitle = screen.getByText('E-Shop');
    expect(siteTitle).toBeInTheDocument();
  });

  test('affiche le bouton de connexion quand non connecté', () => {
    renderWithProviders(<Navbar />, {
      cartValue: { itemCount: 0 },
      authValue: {
        user: null,
        loading: false,
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn()
      }
    });
    const loginButton = screen.getByLabelText('login-button');
    expect(loginButton).toBeInTheDocument();
  });

  test('affiche le lien du panier et déconnexion quand connecté', () => {
    renderWithProviders(<Navbar />, {
      cartValue: { itemCount: 2 },
      authValue: {
        user: { role: 'user' },
        logout: jest.fn()
      }
    });
    expect(screen.getByText('(2)')).toBeInTheDocument();
    expect(screen.getByText('Déconnexion')).toBeInTheDocument();
  });
});