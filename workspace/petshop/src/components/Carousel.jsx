import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselSlides } from '../data/mockData';
import { Link } from 'react-router-dom';
import './Carousel.css';

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <div className="carousel">
      <div 
        className="carousel-track" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselSlides.map((slide) => (
          <div key={slide.id} className="carousel-slide">
            <div className="carousel-image">
              <img src={slide.image} alt={slide.title} />
              <div className="carousel-overlay"></div>
            </div>
            <div className="carousel-content">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <Link to={slide.link} className="btn btn-primary">
                Saiba Mais
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-btn prev" onClick={prevSlide}>
        <ChevronLeft size={32} />
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        <ChevronRight size={32} />
      </button>

      <div className="carousel-indicators">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
