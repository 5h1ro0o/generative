// src/pages/Cart.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../hooks/useCart';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, total } = useContext(CartContext);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h2>Mon Panier</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <div>
              <h3>{item.product.name}</h3>
              <p>Quantité: {item.quantity}</p>
              <p>Prix: {item.product.price}€</p>
            </div>
            <button onClick={() => removeFromCart(item._id)}>Supprimer</button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <p>Total: {total.toFixed(2)}€</p>
        {cart.length > 0 && (
          <button className="checkout-button" onClick={handleCheckout}>
            Valider le panier
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;