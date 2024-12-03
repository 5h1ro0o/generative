const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('./db');
require('dotenv').config();

const products = [
  {
    name: "MacBook Pro M2",
    description: "Ordinateur portable Apple avec puce M2, 16GB RAM, 512GB SSD, écran 14 pouces Retina",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "iPhone 15 Pro",
    description: "Smartphone Apple dernière génération, 256GB, écran Super Retina XDR 6.1 pouces",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Sony WH-1000XM5",
    description: "Casque sans fil premium avec réduction de bruit active, autonomie 30h",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    description: "Smartphone Android haut de gamme, 512GB, écran AMOLED 6.8 pouces, S Pen inclus",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "iPad Air",
    description: "Tablette Apple avec puce M1, 256GB, écran Liquid Retina 10.9 pouces",
    price: 749.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "AirPods Pro 2",
    description: "Écouteurs sans fil avec réduction active du bruit, audio spatial",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "PlayStation 5",
    description: "Console de jeu dernière génération, lecteur Blu-ray 4K, SSD haute vitesse",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Dell XPS 15",
    description: "PC portable Windows, Intel i9, 32GB RAM, RTX 4070, écran OLED 15.6 pouces",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    
    // Nettoyer la collection existante
    await Product.deleteMany({});
    console.log('🗑️ Base de données nettoyée');
    
    // Insérer les nouveaux produits
    await Product.insertMany(products);
    console.log('✅ Produits ajoutés avec succès!');
    
    // Fermer la connexion
    await mongoose.connection.close();
    console.log('📦 Base de données mise à jour et connexion fermée');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    process.exit(1);
  }
};

seedDB();