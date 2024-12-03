// src/utils/api.js
const BASE_URL = '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Erreur HTTP ${response.status}`);
  }
  return response.json();
};

const fetchWithConfig = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const fullUrl = endpoint.startsWith('/api') 
    ? endpoint 
    : `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  console.log(`🔍 URL finale: ${fullUrl}`);
  
  try {
    console.log(`📤 Envoi requête vers: ${fullUrl}`);
    const response = await fetch(fullUrl, config);
    console.log(`📥 Réponse reçue: ${response.status}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`❌ Erreur API (${fullUrl}):`, error);
    throw error;
  }
};

const api = {
  getUsers: async () => {
    return fetchWithConfig('/admin/users', {
      method: 'GET'
    });
  },
  deleteUser: async (userId) => {
    return fetchWithConfig(`/admin/users/${userId}`, {
      method: 'DELETE'
    });
  },
  login: async (email, password) => {
    return fetchWithConfig('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },
  register: async (userData) => {
    return fetchWithConfig('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  getProducts: async () => {
    console.log('📦 Récupération des produits...');
    try {
      const data = await fetchWithConfig('/products', {
        method: 'GET'
      });
      console.log('✅ Produits reçus:', data);
      return data;
    } catch (error) {
      console.error('❌ Erreur products:', error);
      throw error;
    }
  },
  addToCart: async (productId, quantity) => {
    return fetchWithConfig('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity })
    });
  },

  getProductById: async (id) => {
    try {
      return await fetchWithConfig(`/products/${id}`, {
        method: 'GET'
      });
    } catch (error) {
      console.error(`❌ Erreur récupération produit ${id}:`, error);
      throw error;
    }
  },
  getCart: async (userId) => {
    try {
      return await fetchWithConfig(`/cart/user/${userId}`, {
        method: 'GET'
      });
    } catch (error) {
      console.error('❌ Erreur récupération panier:', error);
      throw error;
    }
  },
  removeFromCart: async (itemId) => {
    try {
      const response = await fetchWithConfig(`/cart/${itemId}`, {
        method: 'DELETE'
      });
      console.log('✅ Produit supprimé du panier');
      return response;
    } catch (error) {
      console.error('❌ Erreur API removeFromCart:', error);
      throw error;
    }
  },
  getUsers: async () => {
    return fetchWithConfig('/admin/users', {
      method: 'GET'
    });
  },
  deleteUser: async (userId) => {
    return fetchWithConfig(`/admin/users/${userId}`, {
      method: 'DELETE'
    });
  },
  checkConnection: async () => {
    try {
      console.log('🔌 Test de connexion API...');
      const response = await fetchWithConfig('/products', {
        method: 'GET'
      });
      console.log('✅ Test de connexion réussi');
      return true;
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      return false;
    }
  }
};

export default api;