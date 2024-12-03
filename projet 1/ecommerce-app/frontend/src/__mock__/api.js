// src/__mocks__/api.js
const api = {
    getProducts: jest.fn(),
    getProductById: jest.fn(),
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    getCart: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
    checkConnection: jest.fn(),
    getUsers: jest.fn(),
    deleteUser: jest.fn()
  };
  
  export default api;