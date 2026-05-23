import { Carousel } from '../components/Carousel';
import { Link } from 'react-router-dom';
import { products, services, blogPosts } from '../data/mockData';
import { PawPrint, Scissors, Stethoscope, Home } from 'lucide-react';
import './Home.css';

export function Home() {
  const featuredProducts = products.slice(0, 4);
  const featuredServices = services.slice(0, 3);
  const latestPosts = blogPosts.slice(0, 2);

  return (
    <div className="home">
      <Carousel />

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <PawPrint size={48} color="#ff6b35" />
              <h3>Produtos de Qualidade</h3>
              <p>Os melhores produtos para seu pet</p>
            </div>
            <div className="feature-card">
              <Scissors size={48} color="#2ecc71" />
              <h3>Banho e Tosa</h3>
              <p>Profissionais especializados</p>
            </div>
            <div className="feature-card">
              <Stethoscope size={48} color="#ff6b35" />
              <h3>Veterinário</h3>
              <p>Cuidado completo para saúde</p>
            </div>
            <div className="feature-card">
              <Home size={48} color="#2ecc71" />
              <h3>Hospedagem</h3>
              <p>Conforto enquanto você viaja</p>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section section">
        <div className="container">
          <div className="section-header">
            <h2>Produtos em Destaque</h2>
            <Link to="/produtos" className="btn btn-outline">Ver Todos</Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="price">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                  <Link to={`/produto/${product.id}`} className="btn btn-primary">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Nossos Serviços</h2>
            <Link to="/servicos" className="btn btn-outline">Ver Todos</Link>
          </div>
          <div className="services-grid">
            {featuredServices.map(service => (
              <div key={service.id} className="service-card">
                <img src={service.image} alt={service.name} />
                <div className="service-info">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-footer">
                    <span className="price">R$ {service.price.toFixed(2).replace('.', ',')}</span>
                    <Link to="/agendamento" className="btn btn-primary">Agendar</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-section section">
        <div className="container">
          <div className="section-header">
            <h2>Blog PetShop</h2>
            <Link to="/blog" className="btn btn-outline">Ver Todos</Link>
          </div>
          <div className="blog-grid">
            {latestPosts.map(post => (
              <div key={post.id} className="blog-card">
                <img src={post.image} alt={post.title} />
                <div className="blog-content">
                  <span className="category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className="read-more">Ler Mais →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Pronto para cuidar do seu pet?</h2>
          <p>Agende uma visita ou faça já seu pedido!</p>
          <div className="cta-buttons">
            <Link to="/agendamento" className="btn btn-primary btn-lg">Agendar Agora</Link>
            <Link to="/produtos" className="btn btn-secondary btn-lg">Ver Produtos</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
