import { useState } from 'react';
import { services } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, User, Phone, Mail, CheckCircle } from 'lucide-react';
import './Appointment.css';

export function Appointment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    petName: '',
    petType: 'dog',
    ownerName: '',
    phone: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { addAppointment } = useApp();

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment(formData);
    setSubmitted(true);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const selectedService = services.find(s => s.id === parseInt(formData.service));

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  if (submitted) {
    return (
      <div className="appointment-page">
        <div className="success-message">
          <CheckCircle size={80} color="#2ecc71" />
          <h1>Agendamento Realizado!</h1>
          <p>Seu agendamento foi recebido com sucesso.</p>
          <p>Entraremos em contato em breve para confirmar.</p>
          <button className="btn btn-primary" onClick={() => {
            setSubmitted(false);
            setStep(1);
            setFormData({
              service: '',
              date: '',
              time: '',
              petName: '',
              petType: 'dog',
              ownerName: '',
              phone: '',
              email: ''
            });
          }}>
            Novo Agendamento
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-page">
      <div className="page-header">
        <h1>Agendamento Online</h1>
        <p>Agende o melhor cuidado para seu pet</p>
      </div>

      <div className="steps-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span>Serviço</span>
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span>Data/Hora</span>
        </div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <span className="step-number">3</span>
          <span>Seus Dados</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="appointment-form">
        {step === 1 && (
          <div className="form-step">
            <h2>Escolha o Serviço</h2>
            <div className="services-grid">
              {services.map(service => (
                <label key={service.id} className={`service-option ${formData.service === service.id.toString() ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="service"
                    value={service.id}
                    checked={formData.service === service.id.toString()}
                    onChange={handleInputChange}
                  />
                  <img src={service.image} alt={service.name} />
                  <h3>{service.name}</h3>
                  <p>R$ {service.price.toFixed(2).replace('.', ',')}</p>
                </label>
              ))}
            </div>
            <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!formData.service}>
              Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h2>Escolha Data e Hora</h2>
            <div className="form-group">
              <label><Calendar size={20} /> Data</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="time-slots">
              {timeSlots.map(time => (
                <label key={time} className={`time-slot ${formData.time === time ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="time"
                    value={time}
                    checked={formData.time === time}
                    onChange={handleInputChange}
                  />
                  <Clock size={16} /> {time}
                </label>
              ))}
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={prevStep}>Voltar</button>
              <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!formData.date || !formData.time}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h2>Seus Dados</h2>
            <div className="form-row">
              <div className="form-group">
                <label><User size={20} /> Nome do Pet</label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleInputChange}
                  placeholder="Nome do seu pet"
                  required
                />
              </div>
              <div className="form-group">
                <label>Tipo de Pet</label>
                <select name="petType" value={formData.petType} onChange={handleInputChange}>
                  <option value="dog">Cachorro</option>
                  <option value="cat">Gato</option>
                  <option value="other">Outro</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label><User size={20} /> Seu Nome</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                placeholder="Seu nome completo"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label><Phone size={20} /> Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
              <div className="form-group">
                <label><Mail size={20} /> E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {selectedService && (
              <div className="summary">
                <h3>Resumo do Agendamento</h3>
                <p><strong>Serviço:</strong> {selectedService.name}</p>
                <p><strong>Data:</strong> {formData.date && new Date(formData.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                <p><strong>Horário:</strong> {formData.time}</p>
                <p><strong>Pet:</strong> {formData.petName}</p>
                <p><strong>Total:</strong> R$ {selectedService.price.toFixed(2).replace('.', ',')}</p>
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={prevStep}>Voltar</button>
              <button type="submit" className="btn btn-primary">Confirmar Agendamento</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
