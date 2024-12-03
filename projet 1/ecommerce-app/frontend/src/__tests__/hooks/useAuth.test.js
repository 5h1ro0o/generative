// src/__tests__/hooks/useAuth.test.js
import { renderHook, act } from '@testing-library/react';
import { useAuth, AuthProvider } from '../../hooks/useAuth';
import api from '../../utils/api';

jest.mock('../../utils/api');

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('login modifie l\'état utilisateur', async () => {
    api.login.mockResolvedValue({ 
      user: { email: 'test@test.com' },
      token: 'fake-token' 
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(async () => {
      await result.current.login('test@test.com', 'password');
    });

    expect(result.current.user).toBeTruthy();
    expect(localStorage.getItem('token')).toBe('fake-token');
  });
  
  test('logout réinitialise l\'état utilisateur', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});