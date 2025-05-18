import React, { useState, useEffect } from 'react';
import '../styles/main.css';
import b1Image from '../assets/b1.jpg'; // Ensure correct import path here

// Log the imported image path to the console for debugging
console.log(b1Image);  // This should print the correct path of the image in the console

const slides = [
  {
    image: 'https://static.insurancedekho.com/pwa/img/nfo/lic-desktop-banner.png',
    alt: 'LIC Banner',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMDBSUso6jTmqf7kryUGu203LzTRia8EaFXg&s', // Use the imported local image here
    alt: 'Slide 2',
  },
  // Optional test slide with a placeholder image for troubleshooting
  // {
  //   image: 'https://via.placeholder.com/755x117.png?text=Slide+2',
  //   alt: 'Placeholder Image',
  // },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
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
            }}
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
