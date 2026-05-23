import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>
              <span className="logo-pet">Pet</span>
              <span className="logo-shop">Shop</span>
            </h3>
            <p>Seu pet merece o melhor cuidado! Oferecemos produtos e serviços de qualidade para seu melhor amigo.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={24} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/produtos">Produtos</Link></li>
              <li><Link to="/servicos">Serviços</Link></li>
              <li><Link to="/agendamento">Agendamento</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Serviços</h4>
            <ul>
              <li>Banho e Tosa</li>
              <li>Consultas Veterinárias</li>
              <li>Vacinação</li>
              <li>Hospedagem</li>
              <li>Spa Pet</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <ul className="contact-list">
              <li><Phone size={18} /> (11) 99999-9999</li>
              <li><Mail size={18} /> contato@petshop.com</li>
              <li><MapPin size={18} /> Rua dos Pets, 123 - São Paulo</li>
            </ul>
            <p className="hours"><strong>Horário:</strong><br />Seg-Sáb: 8h às 18h</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 PetShop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
