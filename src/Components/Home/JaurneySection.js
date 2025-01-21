import React, { useState } from "react";
import "./HomeCSS/JourneySection.css";
import arrow from "./images/arrow-img.png";

const JourneyCard = ({
  id,
  title,
  subtitle,
  description,
  isBlue,
  last,
  onLearnMore,
}) => (
  <div
    className={`practy_journey_card ${
      last ? "" : "practy_journey_card_with_arrow"
    }`}
  >
    <div
      className={`practy_journey_card_content ${
        isBlue ? "practy_journey_blue_bg" : "practy_journey_navy_bg"
      }`}
    >
      <div className="practy_journey_card_text">
        <h3>{title}</h3>
        <p className="practy_journey_subtitle">{subtitle}</p>
        <p className="practy_journey_description">{description}</p>
      </div>
      <button
        onClick={() => onLearnMore(id)}
        className="practy_journey_learn_more"
      >
        Learn More
      </button>
    </div>
    {!last && (
      <div className="practy_journey_arrow">
        <img src={arrow} alt="Next step arrow" />
      </div>
    )}
  </div>
);

const JourneySection = () => {
  const [activeModal, setActiveModal] = useState(null);

  const steps = [
    {
      id: "mentor",
      title: "Mentor",
      subtitle: "Connect",
      description: "To top mentor",
      isBlue: false,
    },
    {
      id: "aicasesimulator",
      title: "Āvega",
      subtitle: "AI Case Simulator",
      description: "AI-driven case studies",
      isBlue: true,
    },
    {
      id: "guidedinternship",
      title: "Guided Internship",
      subtitle: "Explorer",
      description: "Top Interns & Internships",
      isBlue: false,
    },
    {
      id: "curatedtraining",
      title: "Curated Training",
      subtitle: "Get access",
      description: "100% In-house Training",
      isBlue: true,
    },
  ];

  const services = {
    mentor: {
      title: "Top Mentor Program",
      features: [
        "1-on-1 mentorship with industry experts",
        "Personalized career guidance",
        "Weekly mentoring sessions",
        "Resume and interview preparation",
        "Network building opportunities",
      ],
      description:
        "Connect with top industry professionals who will guide you through your career journey. Our mentors are carefully selected based on their expertise and experience.",
    },
    aicasesimulator: {
      title: "Āvega-AI Case Simulator",
      features: [
        "Real-world business scenarios",
        "Interactive problem-solving",
        "Industry-specific cases",
        "Performance analytics",
        "Feedback and recommendations",
      ],
      description:
        "Experience the future of business education with Āvega, an innovative platform designed to boost learning through interactive, AI-driven case studies. Derived from the Sanskrit word meaning 'boost'. By combining advanced artificial intelligence with real-world scenarios, Āvega creates immersive simulations that enhance decision-making, critical thinking, and problem-solving skills.",
    },
    guidedinternship: {
      title: "Guided Internship Explorer",
      features: [
        "Curated internship listings",
        "Application tracking",
        "Interview preparation",
        "Internship reviews",
        "Success stories and tips",
      ],
      description:
        "Access top internship opportunities and get guided support throughout your application process. Connect with successful past interns and learn from their experiences.",
    },
    curatedtraining: {
      title: "Curated Training Program",
      features: [
        "Custom learning paths",
        "Industry-specific modules",
        "Hands-on projects",
        "Progress tracking",
        "Certification preparation",
      ],
      description:
        "Access our comprehensive in-house training modules designed to build your skills from ground up. Learn at your own pace with structured content and practical exercises.",
    },
  };

  const handleLearnMore = (serviceKey) => {
    setActiveModal(serviceKey);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="practy_journey_container">
      <div className="practy_journey_content">
        <h2 className="practy_journey_title">
          Start Your Step-by-Step{" "}
          <span className="practy_journey_highlight">PractyWizard</span> Journey
        </h2>
        <div className="practy_journey_cards_container">
          {steps.map((step, index) => (
            <JourneyCard
              key={index}
              {...step}
              last={index === steps.length - 1}
              onLearnMore={handleLearnMore}
            />
          ))}
        </div>
        {activeModal && services[activeModal] && (
          <div className="practy_journey_modal_overlay">
            <div className="practy_journey_modal">
              <button
                className="practy_journey_close_button"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ×
              </button>

              <h2 className="practy_journey_modal_title">
                {services[activeModal].title}
              </h2>

              <p className="practy_journey_modal_description">
                {services[activeModal].description}
              </p>

              <div className="practy_journey_features_section">
                <h3 className="practy_journey_features_title">Key Features:</h3>
                <ul className="practy_journey_features_list">
                  {services[activeModal].features.map((feature, index) => (
                    <li key={index} className="practy_journey_feature_item">
                      <div className="practy_journey_feature_bullet"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="practy_journey_modal_footer">
                <button
                  onClick={closeModal}
                  className="practy_journey_close_modal_button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneySection;
