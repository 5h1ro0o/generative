const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Connexion MongoDB seulement si pas en test
if (process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(() => console.log('✅ MongoDB connecté avec succès'))
    .catch(err => console.error('❌ Erreur MongoDB:', err));
}

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/admin', adminRoutes);

// Ne démarrer le serveur que si on n'est pas en test
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  });
}

module.exports = app;