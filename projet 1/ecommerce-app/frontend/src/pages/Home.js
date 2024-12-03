// Home.js
import React from 'react';
import ProductList from '../components/ProductList';
import Footer from '../components/footer'; // Modification de la casse pour correspondre au fichier

const Home = () => {
  return (
    <div>
      <div className="banner">
        <h1>Bienvenue sur notre boutique</h1>
        <p>Découvrez nos produits exceptionnels</p>
      </div>
      <ProductList />
      <Footer />
    </div>
  );
};

export default Home;