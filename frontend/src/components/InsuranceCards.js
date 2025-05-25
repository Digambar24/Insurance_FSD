// src/components/InsuranceCards.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const insuranceItems = [
  {
    title: "Car Insurance",
    img: "https://www.insurancedekho.com/pwa/img/v2_icon_car.svg",
    link: "/insurance/car",
  },
  {
    title: "Bike Insurance",
    img: "https://www.insurancedekho.com/pwa/img/v2_icon_bike.svg",
    link: "/insurance/bike",
  },
  {
    title: "Health Insurance",
    img: "https://static.insurancedekho.com/pwa/img/v2_icon_health.svg",
    link: "/insurance/health",
    badge: "25% Off*",
    badgeColor: "greenchip",
  },
  {
    title: "Term Insurance",
    img: "https://static.insurancedekho.com/pwa/img/v2_icon_life.svg",
    link: "/insurance/term",
    badge: "Save On Tax*",
    badgeColor: "greenchip",
  },
  {
    title: "Investment Plans",
    img: "https://www.insurancedekho.com/pwa/img/v2_icon_investment.svg",
    link: "/insurance/investment",
  },
  {
    title: "Business Insurance",
    img: "https://www.insurancedekho.com/pwa/img/business_insurance.svg",
    link: "",
    badge: "New",
    badgeColor: "redchip",
  },
  {
    title: "Family Floater",
    img: "https://www.insurancedekho.com/pwa/img/v2_icon_family.svg",
    link: "",
  },
  {
    title: "Guaranteed Plans",
    img: "https://www.insurancedekho.com/pwa/img/v2_icon_guaranteeReturn.svg",
    link: "",
  },
  {
    title: "View More",
    img: "https://static.insurancedekho.com/pwa/img/v2_icon_viewmore.svg",
    link: "/",
  },
];

const InsuranceCards = () => {
  const placeholdersCount = (5 - (insuranceItems.length % 5)) % 5;

  return (
    <div className="insurance-wrapper">
      <ul className="tabgrp">
        {insuranceItems.map((item, index) => (
          <li key={index}>
            <Link to={item.link}> {/* ✅ Use Link instead of <a> */}
              <div className="image-container">
                {item.badge && (
                  <span className={`badgechip ${item.badgeColor || 'redchip'}`}>
                    {item.badge}
                  </span>
                )}
                <img src={item.img} alt={item.title} height="50" />
              </div>
              <div className="title">{item.title}</div>
            </Link>
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
