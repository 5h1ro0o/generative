// backend/createAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config(); // Charger les variables d'environnement

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = 'administrator@gmail.com';
    const password = 'azerty';
    const name = 'Admin';

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('Utilisateur existe déjà:', email);
      return;
    }

    const adminUser = new User({
      email,
      password, // Utiliser le mot de passe en clair
      name,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Compte admin créé avec succès');
    mongoose.connection.close();
  } catch (error) {
    console.error('Erreur lors de la création du compte admin:', error);
    mongoose.connection.close();
  }
};

createAdmin();