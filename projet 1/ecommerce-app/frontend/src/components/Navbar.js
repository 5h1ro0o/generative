// src/components/Navbar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../hooks/useCart';
import { AuthContext } from '../hooks/useAuth';
import LoginModal from './LoginModal';
import { FaUser, FaShoppingCart, FaStore } from 'react-icons/fa'; // Importer les icônes
// import logo from '../assets/logo.png'; // Importer le logo

const Navbar = () => {
  const { itemCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <nav>
      <ul className="navbar-left">
        <li>
          <Link to="/" className="site-name">
            <FaStore />
              E-Shop
          </Link> 
        </li>
      </ul>
      <ul className="navbar-right">
        {user ? (
          <>
            {user.role === 'admin' && (
              <li>
                <Link to="/admin">Admin Panel</Link>
              </li>
            )}
            <li>
              <Link to="/cart">
                <FaShoppingCart /> ({itemCount})
              </Link>
            </li>
            <li>
              <button onClick={logout}>Déconnexion</button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={() => setShowLoginModal(true)} aria-label="login-button">
              <FaUser />
            </button>
          </li>
        )}
      </ul>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </nav>
  );
};

export default Navbar;