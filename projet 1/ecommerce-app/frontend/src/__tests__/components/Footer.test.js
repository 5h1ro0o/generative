// src/__tests__/components/Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/footer';

describe('Footer', () => {
  test('affiche les informations du footer', () => {
    render(<Footer />);
    
    expect(screen.getByText(/À propos/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Contact/i })).toBeInTheDocument();
    expect(screen.getByText(/Suivez-nous/i)).toBeInTheDocument();
  });

  test('affiche les liens de contact', () => {
    render(<Footer />);
    
    expect(screen.getByText(/contact@boutique.com/i)).toBeInTheDocument();
  });

  test('affiche les réseaux sociaux', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Réseaux sociaux/i)).toBeInTheDocument();
  });

  test('vérifie la structure du footer', () => {
    const { container } = render(<Footer />);
    
    expect(container.querySelector('.footer-content')).toBeInTheDocument();
    expect(container.querySelectorAll('.footer-content > div')).toHaveLength(3);
  });
});