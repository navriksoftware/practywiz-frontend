import React, { useState } from "react";

const ServiceModals = () => {
  const [activeModal, setActiveModal] = useState(null);

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
    caseSim: {
      title: "AI Case Simulator",
      features: [
        "Real-world business scenarios",
        "Interactive problem-solving",
        "Industry-specific cases",
        "Performance analytics",
        "Feedback and recommendations",
      ],
      description:
        "Practice with AI-driven case studies that simulate real business challenges. Learn how to approach complex problems and develop practical solutions.",
    },
    internship: {
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
    training: {
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

  return (
    <div className="practy_journey_container">
      <style>
        {`
          .practy_journey_container {
            padding: 20px;
            font-family: Arial, sans-serif;
          }

          .practy_journey_button_grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
          }

          .practy_journey_learn_button {
            background-color: #2563eb;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          .practy_journey_learn_button:hover {
            background-color: #1d4ed8;
          }

          .practy_journey_modal_overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            z-index: 1000;
          }

          .practy_journey_modal {
            background-color: white;
            border-radius: 8px;
            padding: 24px;
            width: 100%;
            max-width: 600px;
            position: relative;
            max-height: 90vh;
            overflow-y: auto;
          }

          .practy_journey_close_button {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
          }

          .practy_journey_modal_title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 16px;
            color: #111;
          }

          .practy_journey_modal_description {
            color: #444;
            margin-bottom: 24px;
            line-height: 1.6;
          }

          .practy_journey_features_section {
            border-top: 1px solid #eee;
            padding-top: 20px;
          }

          .practy_journey_features_title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            color: #333;
          }

          .practy_journey_features_list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .practy_journey_feature_item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }

          .practy_journey_feature_bullet {
            width: 8px;
            height: 8px;
            background-color: #2563eb;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
          }

          .practy_journey_modal_footer {
            margin-top: 24px;
            display: flex;
            justify-content: flex-end;
          }

          .practy_journey_close_modal_button {
            background-color: #e5e7eb;
            color: #374151;
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s ease;
          }

          .practy_journey_close_modal_button:hover {
            background-color: #d1d5db;
          }

          @media (max-width: 640px) {
            .practy_journey_modal {
              padding: 16px;
              margin: 16px;
            }

            .practy_journey_modal_title {
              font-size: 20px;
            }
          }
        `}
      </style>

      <div className="practy_journey_button_grid">
        {Object.keys(services).map((key) => (
          <button
            key={key}
            onClick={() => setActiveModal(key)}
            className="practy_journey_learn_button"
          >
            Learn More about {services[key].title}
          </button>
        ))}
      </div>

      {activeModal && (
        <div className="practy_journey_modal_overlay">
          <div className="practy_journey_modal">
            <button
              className="practy_journey_close_button"
              onClick={() => setActiveModal(null)}
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
                onClick={() => setActiveModal(null)}
                className="practy_journey_close_modal_button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceModals;
