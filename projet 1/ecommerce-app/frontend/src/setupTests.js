import '@testing-library/jest-dom';

// Configuration pour window.matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock de react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>
}));

// Nettoyage après chaque test
afterEach(() => {
  jest.clearAllMocks();
});