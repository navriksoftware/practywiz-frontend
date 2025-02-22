import React from "react";
import "./HomeCSS/FeaturedCasesSection.css";
import leadershipCrisis from "./images/leadershipCrisis.png";
import technicalManagement from "./images/technicalManagement.png";
import agileTransformation from "./images/agiletransform-img.png";

const FeaturedCasesSection = () => {
  const caseStudies = [
    {
      title: "Leadership in Crisis",
      description:
        "How Memorial Hospital implemented AI to optimize patient scheduling and resource allocation.",
      category: "Risk Management",
      readTime: "25 mins",
      participants: "2,145",
      image: leadershipCrisis,
    },
    {
      title: "Retail Analytics Revolution",
      description:
        "GlobalMart's journey of implementing predictive analytics for inventory management.",
      category: "Retail",
      readTime: "20 mins",
      participants: "1,893",
      image: technicalManagement,
    },
    {
      title: "Agile Transformation",
      description:
        "How NextGen Bank automated credit risk assessment using machine learning.",
      category: "Project Management",
      readTime: "30 mins",
      participants: "3,267",
      image: agileTransformation,
    },
  ];

  return (
    <div className="ai-casestudy-featured-section">
      <div className="ai-casestudy-featured-container">
        <div className="ai-casestudy-featured-header">
          <h2 className="ai-casestudy-featured-title">Featured Case Studies</h2>
          <p className="ai-casestudy-featured-subtitle">
            Explore real-world applications of AI across different industries
          </p>
        </div>

        <div className="ai-casestudy-featured-grid">
          {caseStudies.map((study, index) => (
            <div key={index} className="ai-casestudy-card">
              <img
                src={study.image}
                alt={study.title}
                className="ai-casestudy-card-image"
              />
              <div className="ai-casestudy-card-content">
                <span className="ai-casestudy-card-category">
                  {study.category}
                </span>
                <h3 className="ai-casestudy-card-title">{study.title}</h3>

                <div className="ai-casestudy-card-stats">
                  <div className="ai-casestudy-stat">
                    <i className="fa-solid fa-clock ai-casestudy-stat-icon"></i>
                    {study.readTime}
                  </div>
                  <div className="ai-casestudy-stat">
                    <i className="fa-solid fa-users ai-casestudy-stat-icon"></i>
                    {study.participants}
                  </div>
                  <div className="ai-casestudy-stat">
                    <i className="fa-solid fa-book-open-reader ai-casestudy-stat-icon"></i>
                    Case Study
                  </div>
                </div>

                <button
                  onClick={() => (window.location.href = "/case-studies")}
                  className="ai-casestudy-card-button"
                >
                  View Case Study
                  <i className="fa-solid fa-arrow-right ai-casestudy-stat-icon"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="ai-casestudy-featured-footer">
          <button
            onClick={() => (window.location.href = "/case-studies")}
            className="ai-casestudy-view-all"
          >
            View All Case Studies
            <i className="fa-solid fa-arrow-right ai-casestudy-view-all-icon"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCasesSection;
