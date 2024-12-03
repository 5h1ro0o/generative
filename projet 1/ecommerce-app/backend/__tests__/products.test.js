const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const Product = require('../models/Product');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Product Routes', () => {
    beforeEach(async () => {
      await Product.deleteMany({});
    });
  
    test('devrait récupérer la liste des produits', async () => {
      await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        image: 'test-image.jpg' // Ajout du champ image requis
      });
  
      const response = await request(app).get('/api/products');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });
  
    test('devrait récupérer un produit par son ID', async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        image: 'test-image.jpg' // Ajout du champ image requis
      });
  
      const response = await request(app).get(`/api/products/${product._id}`);
      
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Test Product');
    });
  });