import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // for internal navigation
import '../styles/main.css';
import b2Image from '../assets/b2.jpeg';


const slides = [
  {
    image: 'https://static.insurancedekho.com/pwa/img/nfo/lic-desktop-banner.png',
    alt: 'LIC Banner',
    link: '/insurance/health', // redirect target
  },
  {
    image:b2Image , 
    alt: 'Slide 2',
    link: '/insurance/health',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleClick = (link) => {
    navigate(link); // programmatically navigate using React Router
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              transition: 'transform 0.5s ease-in-out',
              width: '100%',
              display: 'flex',
              cursor: 'pointer',
            }}
            onClick={() => handleClick(slide.link)} // Clickable slide
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="carousel-image"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
