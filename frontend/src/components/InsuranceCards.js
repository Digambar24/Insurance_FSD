// src/components/InsuranceCards.js
import React from 'react';
import '../styles/main.css'; // Custom CSS for this component

const insuranceItems = [
  {
    title: "Car Insurance",
    img: "https://www.insurancedekho.com/pwa/img/v2_icon_car.svg",
    link: "http://localhost:3000/insurance/car",
  },
  {
    title: "Bike Insurance",
    img: "https://www.insurancedekho.com/pwa/img/v2_icon_bike.svg",
    link: "http://localhost:3000/insurance/bike",
  },
  {
    title: "Health Insurance",
    img: "https://static.insurancedekho.com/pwa/img/v2_icon_health.svg",
    link: "http://localhost:3000/insurance/health",
    badge: "25% Off*",
    badgeColor: "greenchip",
  },
  {
    title: "Term Insurance",
    img: "https://static.insurancedekho.com/pwa/img/v2_icon_life.svg",
    link: "http://localhost:3000/life-insurance/term-insurance",
    badge: "Save On Tax*",
    badgeColor: "greenchip",
  },
  {
    title: "Investment Plans",
    img: "https://www.insurancedekho.com/pwa/img/v2_icon_investment.svg",
    link: "http://localhost:3000/investment-plans",
  },
  {
    title: "Business Insurance",
    img: "https://www.insurancedekho.com/pwa/img/business_insurance.svg",
    link: "http://localhost:3000/business-insurance",
    badge: "New",
    badgeColor: "redchip",
  },
  {
    title: "Family Floater",
    img: "https://www.insurancedekho.com/pwa/img/v2_icon_family.svg",
    link: "http://localhost:3000/health-insurance/family-floater",
  },
  {
    title: "Guaranteed Plans",
    img: "https://www.insurancedekho.com/pwa/img/v2_icon_guaranteeReturn.svg",
    link: "http://localhost:3000/life-insurance/guaranteed-return-plans",
  },
  {
    title: "View More",
    img: "https://static.insurancedekho.com/pwa/img/v2_icon_viewmore.svg",
    link: "http://localhost:3000/",
  },
];

const InsuranceCards = () => {
  const placeholdersCount = (5 - (insuranceItems.length % 5)) % 5;

  return (
    <div className="insurance-wrapper">
      <ul className="tabgrp">
        {insuranceItems.map((item, index) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <div className="image-container">
                {item.badge && (
                  <span className={`badgechip ${item.badgeColor || 'redchip'}`}>
                    {item.badge}
                  </span>
                )}
                <img src={item.img} alt={item.title} height="50" />
              </div>
              <div className="title">{item.title}</div>
            </a>
          </li>
        ))}
        {Array.from({ length: placeholdersCount }).map((_, idx) => (
          <li key={`placeholder-${idx}`} className="placeholder"></li>
        ))}
      </ul>
    </div>
  );
};

export default InsuranceCards;
