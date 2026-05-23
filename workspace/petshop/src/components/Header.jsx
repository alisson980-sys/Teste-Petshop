import { ShoppingCart, Phone, MapPin, Clock, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Header.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount, isAdmin } = useApp();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="contact-info">
            <span><Phone size={16} /> (11) 99999-9999</span>
            <span><MapPin size={16} /> Rua dos Pets, 123 - São Paulo</span>
            <span><Clock size={16} /> Seg-Sáb: 8h às 18h</span>
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="logo">
              <span className="logo-pet">Pet</span>
              <span className="logo-shop">Shop</span>
            </Link>

            <button 
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/produtos" onClick={() => setMenuOpen(false)}>Produtos</Link></li>
              <li><Link to="/servicos" onClick={() => setMenuOpen(false)}>Serviços</Link></li>
              <li><Link to="/agendamento" onClick={() => setMenuOpen(false)}>Agendamento</Link></li>
              <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
              {isAdmin && (
                <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
              )}
            </ul>

            <div className="nav-actions">
              <Link to="/carrinho" className="cart-btn" onClick={() => setMenuOpen(false)}>
                <ShoppingCart size={24} />
                {getCartCount() > 0 && (
                  <span className="cart-count">{getCartCount()}</span>
                )}
              </Link>
              <Link to="/login" className="btn btn-outline" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
