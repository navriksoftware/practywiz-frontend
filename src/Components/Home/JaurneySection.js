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
      description: "Empower & Be Empowered",
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
      title: "Guided",
      subtitle: "Internship",
      description: "Top Interns & Internships",
      isBlue: false,
    },
    {
      id: "curatedtraining",
      title: "Curated",
      subtitle: "Training",
      description: "100% In-house Training",
      isBlue: true,
    },
  ];

  const services = {
    mentor: {
      title: "Mentor Connect",
      features: [
        "1-on-1 mentorship with industry experts",
        "Alumni mentorship for Institutes",
        "Mentorship platform for Corporates",
        "Branding opportunity for Institutions",
      ],

      benifits: [
        "For Institutes: Institutions can sign up to provide their students with access to experienced mentors, including both alumni and non-alumni corporate professionals.",
        "For Professionals: Individuals seeking guidance and career support can connect with relevant mentors.",
        "For Corporates: Organizations can leverage the platform to run structured internal mentorship programs.",
      ],

      description:
        "Mentor Connect is a dynamic platform designed to bridge the gap between experienced corporate professionals and individuals seeking guidance. Whether you are a student looking for career advice, a professional seeking industry insights, or an institution aiming to provide quality mentorship to students, Mentor Connect offers a structured and impactful solution.",
    },

    aicasesimulator: {
      title: "Āvega-AI Case Simulator",
      features: [
        "Real-world business scenarios",
        "Interactive problem-solving",
        "Mentor-Driven & Industry-specific cases",
        "Performance analytics",
      ],

      benifits: [
        "For Business Schools: Seamlessly integrate Āvega into existing case study methodologies to provide students with hands-on learning experiences.",
        "For Corporate Organizations: Upskill employees through AI-powered case studies that simulate real-world business challenges.",
        "For Industry Professionals: Contribute as a MENTOR by publishing case studies and earning royalties as institutions and corporates purchase your content.",
      ],
      description:
        "Experience the future of business education with Āvega, an innovative platform designed to boost learning through interactive AI-driven case studies. Derived from the Sanskrit word meaning 'boost'. By combining advanced artificial intelligence with real-world scenarios, Āvega creates immersive simulations that enhance decision-making, critical thinking, and problem-solving skills.",
    },
    guidedinternship: {
      title: "Guided Internship",
      features: [
        "Institutes can register their students for internship opportunities.",
        "Corporates can plan their annual internship calendar.",
        "Select candidates from specific institutes.",
        "Seamless Management, Handle certificates, stipends, and progress tracking.",
      ],
      benifits: [
        "For Students: Gain structured guidance, hands-on experience, and industry exposure to enhance career readiness.",
        "Institutions: Provide students with verified internships, track their progress, and strengthen corporate partnerships.",
        "Corporates: Streamline internship planning, find the right talent, and ensure interns contribute meaningfully.",
      ],

      description:
        "The mission of Guided Internship is to transform the internship experience into a truly value-adding opportunity for students, educational institutions, and corporates. Currently, many internships fail to provide real value due to a disconnect between corporate expectations and intern capabilities. Guided Internship ensures that Corporates find the right candidates who align with their needs. Students gain meaningful experience and contribute effectively to organizations.",
    },
    curatedtraining: {
      title: "Curated Training Program",
      features: [
        "Custom learning paths",
        "Industry-specific modules",
        "Progress tracking",
        "Certification preparation",
      ],
      benifits: [
        "For Students: Access our comprehensive in-house training modules designed to build your skills from ground up. Learn at your own pace with structured content and practical exercises.",
        "For Institutions: Enhance your curriculum with industry-specific training programs that cater to your students' unique needs.",
        "For Corporates: Upskill your workforce with industry-specific training programs that cater to your organization's unique needs.",
      ],
      description:
        "The mission of Curated Trainings is to provide experiential learning for students and professionals, designed by experts at Navrik Software. We believe in preaching what we practice, creating content based on real-world experience in Software Development, AI, Project Management, Business Analysis, and Business Development. We have trained students from leading colleges in IT Business Analysis, Digital Consulting, AI & Robotic Process Automation, ensuring they are job-ready and industry-aligned.",
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

              <h3 className="practy_journey_features_title">Benefits:</h3>
              <ul className="practy_journey_features_lis">
                {services[activeModal].benifits.map((benefit, index) => (
                  <li key={index} className="">
                    {benefit}
                  </li>
                ))}
              </ul>

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
