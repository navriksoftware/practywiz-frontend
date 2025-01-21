import React from "react";
import "./HomeCSS/OurpartnersSection.css";
import aotax from "./images/aotax-logo.png";
import kasper from "./images/kasper-logo.png";
import skylabs from "./images/skylabs-logo.png";
import technocit from "./images/technocit-logo.webp";
import milesAfc from "./images/miles-afc-logo.png";

const OurPartnersSection = () => {
  const partners = [
    {
      name: "TechnoCIT",
      logo: technocit,
    },
    {
      name: "Skylabs Solution",
      logo: skylabs,
    },
    {
      name: "Miles Africa",
      logo: milesAfc,
    },
    {
      name: "AOTAX",
      logo: aotax,
    },
  ];

  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="partner_slider-container">
      <h2 className="partner_slider-title">Trusted By Industry Leaders</h2>

      <div className="partner_slider">
        <div className="partner_slider-track">
          {duplicatedPartners.map((partner, index) => (
            <div key={index} className="partner_slider-item">
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="partner_slider-logo"
              />
            </div>
          ))}
          {duplicatedPartners.map((partner, index) => (
            <div key={`${index}-dup`} className="partner_slider-item">
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="partner_slider-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPartnersSection;
