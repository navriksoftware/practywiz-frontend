import React, { useState, useEffect, useRef } from "react";
import "./HomeCSS/CalltoactionSection.css";

const RoleSelectorCustom = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const roles = [
    {
      type: "MENTOR",
      title: "Share Your Superpower",
      subtitle: "Become a Mentor",
      description:
        "Turn your skills into someone else's success story and make a difference!",
      buttonText: "START MENTORING",
      path: "/mentor-registration",
    },
    {
      type: "MENTEE",
      title: "Unlock Your Potential",
      subtitle: "Find Your Mentor",
      description:
        "Connect with industry experts and accelerate your growth journey!",
      buttonText: "FIND A MENTOR",
      path: "/mentee-registration",
    },
    {
      type: "INSTITUTE",
      title: "Empower Your Students",
      subtitle: "Partner With Us",
      description:
        "Give your students access to real-world mentorship and guidance!",
      buttonText: "PARTNER NOW",
      path: "/institute-registration",
    },
    {
      type: "EMPLOYER",
      title: "Build Better Teams",
      subtitle: "Hire Top Talent",
      description:
        "Connect with pre-vetted professionals and grow your organization!",
      buttonText: "START HIRING",
      path: "/employer-registration",
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % roles.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleButtonClick = (path) => {};

  return (
    <>
      <div className="practywiz-CTA-container-outer">
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="practywiz-CTA-container"
        >
          <h3 className="practywiz-CTA-sub-header">JOIN PRACTYWIZ AS</h3>
          <div className="practywiz-CTA-tabs">
            {roles.map((role, index) => (
              <button
                key={role.type}
                onClick={() => setActiveTab(index)}
                className={`practywiz-CTA-tab ${
                  activeTab === index ? "active" : ""
                }`}
              >
                {role.type}
              </button>
            ))}
          </div>

          <div className="practywiz-CTA-content-wrapper">
            {roles.map((role, index) => (
              <div
                key={role.type}
                className={`practywiz-CTA-content ${
                  activeTab === index ? "active" : ""
                }`}
              >
                <h1 className="practywiz-CTA-title">
                  {role.title.split("Superpower").map((part, i) => (
                    <span key={i}>
                      {part}
                      {i === 0 && (
                        <span className="practywiz-CTA-highlight">
                          {" "}
                          Superpower
                        </span>
                      )}
                    </span>
                  ))}
                </h1>
                <h2 className="practywiz-CTA-subtitle">{role.subtitle}</h2>
                <p className="practywiz-CTA-description">{role.description}</p>
                <button
                  className="practywiz-CTA-button"
                  onClick={() => (window.location.href = `${role.path}`)}
                >
                  {role.buttonText}
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleSelectorCustom;
