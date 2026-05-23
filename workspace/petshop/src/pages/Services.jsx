import { services } from '../data/mockData';
import { Link } from 'react-router-dom';
import './Services.css';

export function Services() {
  return (
    <div className="services-page">
      <div className="page-header">
        <h1>Nossos Serviços</h1>
        <p>Cuidado completo para seu melhor amigo</p>
      </div>

      <div className="services-list">
        {services.map(service => (
          <div key={service.id} className="service-detail-card">
            <div className="service-image">
              <img src={service.image} alt={service.name} />
            </div>
            <div className="service-details">
              <h2>{service.name}</h2>
              <p className="description">{service.description}</p>
              <div className="service-meta">
                <span className="duration">
                  ⏱️ {service.duration >= 60 
                    ? `${Math.floor(service.duration / 60)}h ${service.duration % 60}min`
                    : `${service.duration}min`
                  }
                </span>
                <span className="price">R$ {service.price.toFixed(2).replace('.', ',')}</span>
              </div>
              <Link to="/agendamento" className="btn btn-primary">
                Agendar este Serviço
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
