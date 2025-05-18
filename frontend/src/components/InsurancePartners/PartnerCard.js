import React from 'react';

const PartnerCard = ({ name, logo, link }) => (
  <div className="partner-card">
    <a href={link} className="partner-link">
      <img
        src={logo}
        alt={name}
        className="partner-logo"
        loading="lazy"
        width="150"
        height="80"
      />
      <div className="partner-name">{name}</div>
    </a>
  </div>
);

export default PartnerCard;
