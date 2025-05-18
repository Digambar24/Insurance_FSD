// components/Insurance/InsuranceHeroSection.js

import React from 'react';
import '../../styles/Insurance/InsuranceHeroSection.css';

const typeContent = {
  car: {
    title: 'Car Insurance',
    subtitle: 'Compare and Buy Car Insurance from Top Insurers',
    //bgClass: 'car-hero-bg',
  },
  bike: {
    title: 'Bike Insurance',
    subtitle: 'Secure Your Ride with Best Bike Insurance Plans',
    //bgClass: 'bike-hero-bg',
  },
  health: {
    title: 'Health Insurance',
    subtitle: 'Get Health Plans That Suit Your Needs and Budget',
    //bgClass: 'health-hero-bg',
  },
  life: {
    title: 'Life Insurance',
    subtitle: 'Ensure Financial Security for Your Loved Ones',
    //bgClass: 'life-hero-bg',
  },
  term: {
    title: 'Term Insurance',
    subtitle: 'Protect Your Family with Affordable Term Plans',
    //bgClass: 'term-hero-bg',
  },
  investment: {
    title: 'Investment Plans',
    subtitle: 'Plan Your Financial Goals with Smart Investment Options',
    //bgClass: 'investment-hero-bg',
  },
  sme: {
    title: 'SME Insurance',
    subtitle: 'Insurance Solutions Tailored for Small & Medium Businesses',
    //bgClass: 'sme-hero-bg',
  },
};

const InsuranceHeroSection = ({ type }) => {
  const content = typeContent[type?.toLowerCase()] || {
    title: 'Insurance',
    subtitle: 'Compare and Choose the Best Insurance Plans',
    bgClass: 'default-hero-bg',
  };

  return (
    <section className={`insurance-hero ${content.bgClass}`}>
      <div className="hero-content">
        <h1>{content.title}</h1>
        <p>{content.subtitle}</p>
        <button className="cta-button">Get a Quote</button>
      </div>
    </section>
  );
};

export default InsuranceHeroSection;
