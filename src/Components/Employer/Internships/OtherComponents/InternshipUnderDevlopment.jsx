import React from "react";
import Lottie from "react-lottie";
import personActivity from "../../Internships/Animations/humanAnimation.json";
import "../InternshipCss/InternshipUnderDevlopment.css";

const InternshipUnderDevelopment = ({ title }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: personActivity,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="internship-page">
      <h1 className="internship-heading">
        <span role="img" aria-label="star">
          🌟
        </span>{" "}
        New Careers Ahead!
      </h1>
      <div className="animation-container">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
      <p className="internship-message">
        <span>
          Our team is working on bringing you amazing {title} openings. Stay
          tuned! 🚀{" "}
        </span>
      </p>
    </div>
  );
};

export default InternshipUnderDevelopment;
