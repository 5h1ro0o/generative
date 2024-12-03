// src/pages/Checkout.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../hooks/useCart';

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // Implémenter l'intégration du paiement et la création de la commande
    // Simuler le passage de la commande
    alert('Commande passée avec succès !');
    clearCart(); // Vider le panier après avoir validé la commande
    navigate('/');
  };

  return (
    <div className="checkout-page">
      <h2>Récapitulatif de la commande</h2>
      <div className="order-summary">
        {cart.map((item) => (
          <div key={item._id} className="order-item">
            <p>{item.product.name}</p>
            <p>Quantité: {item.quantity}</p>
            <p>Prix: {item.product.price}€</p>
          </div>
        ))}
      </div>
      <p>Total: {total.toFixed(2)}€</p>

      <h3>Choisissez votre moyen de paiement</h3>
      <div className="payment-methods">
        <label>
          <input
            type="radio"
            value="creditCard"
            checked={paymentMethod === 'creditCard'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Carte de crédit
        </label>
        <label>
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          PayPal
        </label>
        <label>
          <input
            type="radio"
            value="bankTransfer"
            checked={paymentMethod === 'bankTransfer'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Virement bancaire
        </label>
      </div>

      <button onClick={handleCheckout} disabled={!paymentMethod}>
        Passer la commande
      </button>
    </div>
  );
};

export default Checkout;