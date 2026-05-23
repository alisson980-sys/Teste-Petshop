import { useApp } from '../context/AppContext';
import { appointments, products, services } from '../data/mockData';
import { Package, Calendar, DollarSign, Users, Trash2, CheckCircle, XCircle } from 'lucide-react';
import './Admin.css';

export function Admin() {
  const { isAdmin, logout, appointments: userAppointments, updateAppointmentStatus, cancelAppointment } = useApp();

  if (!isAdmin) {
    return (
      <div className="admin-page">
        <div className="not-authorized">
          <h1>Acesso Negado</h1>
          <p>Você precisa estar logado como administrador para acessar esta página.</p>
        </div>
      </div>
    );
  }

  const totalRevenue = userAppointments.reduce((acc, apt) => {
    const service = services.find(s => s.id === parseInt(apt.service));
    return acc + (service ? service.price : 0);
  }, 0);

  const pendingAppointments = userAppointments.filter(a => a.status === 'pendente').length;
  const confirmedAppointments = userAppointments.filter(a => a.status === 'confirmado').length;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <button onClick={logout} className="btn btn-outline">Sair</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Package size={40} color="#ff6b35" />
          <div>
            <h3>{products.length}</h3>
            <p>Produtos</p>
          </div>
        </div>
        <div className="stat-card">
          <Calendar size={40} color="#2ecc71" />
          <div>
            <h3>{userAppointments.length}</h3>
            <p>Agendamentos</p>
          </div>
        </div>
        <div className="stat-card">
          <DollarSign size={40} color="#ff6b35" />
          <div>
            <h3>R$ {totalRevenue.toFixed(2)}</h3>
            <p>Receita Total</p>
          </div>
        </div>
        <div className="stat-card">
          <Users size={40} color="#2ecc71" />
          <div>
            <h3>{services.length}</h3>
            <p>Serviços</p>
          </div>
        </div>
      </div>

      <section className="admin-section">
        <h2>Agendamentos Recentes</h2>
        {userAppointments.length > 0 ? (
          <div className="appointments-table">
            <table>
              <thead>
                <tr>
                  <th>Pet</th>
                  <th>Serviço</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Cliente</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {userAppointments.map(apt => {
                  const service = services.find(s => s.id === parseInt(apt.service));
                  return (
                    <tr key={apt.id}>
                      <td>{apt.petName} ({apt.petType === 'dog' ? '🐕' : apt.petType === 'cat' ? '🐱' : '🐾'})</td>
                      <td>{service?.name || 'Serviço não encontrado'}</td>
                      <td>{apt.date ? new Date(apt.date + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}</td>
                      <td>{apt.time || '-'}</td>
                      <td>
                        <div>{apt.ownerName}</div>
                        <small>{apt.phone}</small>
                      </td>
                      <td>
                        <span className={`status-badge ${apt.status}`}>
                          {apt.status === 'pendente' && '⏳ Pendente'}
                          {apt.status === 'confirmado' && '✅ Confirmado'}
                          {apt.status === 'cancelado' && '❌ Cancelado'}
                        </span>
                      </td>
                      <td>
                        {apt.status === 'pendente' && (
                          <>
                            <button 
                              className="btn-icon check"
                              onClick={() => updateAppointmentStatus(apt.id, 'confirmado')}
                              title="Confirmar"
                            >
                              <CheckCircle size={20} />
                            </button>
                            <button 
                              className="btn-icon cancel"
                              onClick={() => cancelAppointment(apt.id)}
                              title="Cancelar"
                            >
                              <XCircle size={20} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">Nenhum agendamento encontrado</p>
        )}
      </section>

      <section className="admin-section">
        <h2>Lista de Produtos</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="admin-product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">R$ {product.price.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
