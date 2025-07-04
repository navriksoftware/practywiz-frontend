import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AvegaLanding.css"; // Import main CSS styles
import businessStudent from "../../Images/Institute/business-student-avega.png";
import aiSimulator from "../../Images/Institute/ai-simulator.png";
import aiEvaluator from "../../Images/Institute/case-study-class.jpg";

export default function AvegaLanding() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [activeFaq, setActiveFaq] = useState(0); // Track which FAQ item is open

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="avega-landing-page-v2-container">
      {/* Floating Background Elements */}
      <div className="avega-landing-page-v2-floating-shapes">
        <div className="shape avega-landing-page-v2-shape-1"></div>
        <div className="shape avega-landing-page-v2-shape-2"></div>
        <div className="shape avega-landing-page-v2-shape-3"></div>
        <div className="shape avega-landing-page-v2-shape-4"></div>
        <div className="shape avega-landing-page-v2-shape-5"></div>
      </div>

      {/* Header */}
      {/* <header
        className={`avega-landing-page-v2-header ${
          isScrolled ? "avega-landing-page-v2-scrolled" : ""
        }`}
      >
        <div className="avega-landing-page-v2-header-content">
          <div className="avega-landing-page-v2-logo">
            <div className="avega-landing-page-v2-logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <span>Avega</span>
          </div>
          <nav className="avega-landing-page-v2-nav">
            <a href="#products">Products</a>
            <a href="#solutions">Solutions</a>
            <a href="#resources">Resources</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <div className="avega-landing-page-v2-header-actions">
            <button
              className="avega-landing-page-v2-theme-toggle"
              onClick={() => {
                const html = document.documentElement;
                const currentTheme = html.getAttribute("data-theme");
                html.setAttribute(
                  "data-theme",
                  currentTheme === "dark" ? "light" : "dark"
                );
              }}
            >
              <i className="fas fa-moon"></i>
            </button>
            <button className="avega-landing-page-v2-cta-btn">
              <span>Get Started</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section id="hero" className="avega-landing-page-v2-hero">
        <div className="avega-landing-page-v2-hero-background">
          <div className="avega-landing-page-v2-gradient-orb avega-landing-page-v2-orb-1"></div>
          <div className="avega-landing-page-v2-gradient-orb avega-landing-page-v2-orb-2"></div>
          <div className="avega-landing-page-v2-gradient-orb avega-landing-page-v2-orb-3"></div>
        </div>

        <div className="avega-landing-page-v2-hero-content">
          <div className="avega-landing-page-v2-hero-left">
            <div className="avega-landing-page-v2-hero-badge">
              <span>AI-Powered Education</span>
            </div>
            <h1 className="avega-landing-page-v2-hero-title">
              Powering the Next Level of Learning for
              <br />
              <span className="avega-landing-page-v2-gradient-text">
                {" "}
                B-School
              </span>
            </h1>
            {/* <h1 className="avega-landing-page-v2-hero-title">
              Are you worry about
            </h1> */}
            <div className="avega-landing-page-v2-hero-features">
              <div className="avega-landing-page-v2-feature-item">
                <div className="avega-landing-page-v2-feature-icon">
                  <i className="fas fa-brain"></i>
                </div>{" "}
                <h3 className="avega-landing-page-v2-gradient-text">
                  How to Integrate AI in B-Schools pedagogy?
                </h3>
              </div>
              <div className="avega-landing-page-v2-feature-item">
                <div className="avega-landing-page-v2-feature-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <h3 className="avega-landing-page-v2-gradient-text">
                  Using AI power to increase knowledge?
                </h3>
              </div>
            </div>
            <p className="avega-landing-page-v2-hero-subtitle">
              Revolutionize case-based learning with intelligent simulations,
              real-time feedback, and personalized educational experiences.
            </p>
            {/* <div className="avega-landing-page-v2-hero-features">
              <div className="avega-landing-page-v2-feature-item">
                <div className="avega-landing-page-v2-feature-icon">
                  <i className="fas fa-brain"></i>
                </div>
                <span>AI-Integrated Curriculum</span>
              </div>
              <div className="avega-landing-page-v2-feature-item">
                <div className="avega-landing-page-v2-feature-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <span>Enhanced Knowledge Delivery</span>
              </div>
            </div> */}
            <div className="avega-landing-page-v2-hero-buttons">
              <button
                onClick={() => navigate("/institute-registration")}
                className="avega-landing-page-v2-primary-btn"
              >
                <span>Register Now</span>
                <div className="avega-landing-page-v2-btn-glow"></div>
              </button>
              <button
                onClick={() =>
                  window.open(
                    "mailto:wecare@practywiz.com?subject=Interested in Avega&body=Hi, I would like to know more about Avega and how it can help my institution."
                  )
                }
                className="avega-landing-page-v2-secondary-btn"
              >
                {/* <i className="fas fa-play"></i> */}
                <span>Contact Sales</span>
              </button>
            </div>
          </div>

          <div className="avega-landing-page-v2-hero-right">
            <div className="avega-landing-page-v2-hero-visual">
              <div className="avega-landing-page-v2-floating-card avega-landing-page-v2-card-1">
                <div className="avega-landing-page-v2-card-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="avega-landing-page-v2-card-content">
                  <h4>Avega AI Case Simulator</h4>{" "}
                  <p>
                    Create student engagement with interactive case simulations
                  </p>
                </div>
              </div>
              <div className="avega-landing-page-v2-floating-card avega-landing-page-v2-card-2">
                <div className="avega-landing-page-v2-card-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="avega-landing-page-v2-card-content">
                  <h4>Avega Ai Evaluator</h4>
                  <p> Automated assessment and feedback for each student</p>
                </div>
              </div>{" "}
              <div className="avega-landing-page-v2-student-profile">
                <div>
                  {/* <div className="avega-landing-page-v2-vocabulary-badge">
                    <div className="avega-landing-page-v2-badge-label">
                      Case Knowledge Score
                    </div>
                    <div className="avega-landing-page-v2-badge-count">
                      3788 points
                    </div>
                  </div> */}
                  <div className="avega-landing-page-v2-student-image">
                    <img
                      src={businessStudent}
                      alt="Business student using Avega AI"
                    />
                  </div>{" "}
                  {/* <div className="avega-landing-page-v2-talent-badge">
                    <div className="avega-landing-page-v2-badge-icon">
                      <i className="fas fa-award"></i>
                    </div>
                    <div className="avega-landing-page-v2-badge-content">
                      <h4>Business Talent</h4>
                      <p>
                        Congratulations! Your analysis matches{" "}
                        <span className="avega-landing-page-v2-accent">
                          industry experts
                        </span>
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <div className="avega-landing-page-v2-floating-card avega-landing-page-v2-card-3">
                <div className="avega-landing-page-v2-card-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                 <div className="avega-landing-page-v2-card-content">
                  <h4>Innovation</h4>
                  <p>AI-powered solutions</p>
                </div> 
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Benefit Section */}
      <section id="benefits" className="avega-landing-page-v2-benefits">
        <div className="avega-landing-page-v2-container-inner">
          <div className="avega-landing-page-v2-section-header">
            <h2 className="avega-landing-page-v2-section-title">
              Who Benefits from Avega?
            </h2>
            <p className="avega-landing-page-v2-section-subtitle">
              Empowering educators and learners across the spectrum
            </p>
          </div>

          <div className="avega-landing-page-v2-benefits-grid">
            <div className="avega-landing-page-v2-benefit-card">
              <div className="avega-landing-page-v2-card-background"></div>
              <div className="avega-landing-page-v2-benefit-icon">
                <i className="fas fa-university"></i>
              </div>
              <h3>Business Schools</h3>
              <p>
                Transform traditional case studies into interactive, engaging
                learning experiences
              </p>
              <div className="avega-landing-page-v2-card-glow"></div>
            </div>

            <div className="avega-landing-page-v2-benefit-card">
              <div className="avega-landing-page-v2-card-background"></div>
              <div className="avega-landing-page-v2-benefit-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Corporate Trainers</h3>
              <p>
                Enhance training effectiveness with AI-driven personalized
                learning paths
              </p>
              <div className="avega-landing-page-v2-card-glow"></div>
            </div>

            <div className="avega-landing-page-v2-benefit-card">
              <div className="avega-landing-page-v2-card-background"></div>
              <div className="avega-landing-page-v2-benefit-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h3>Individual Learners</h3>
              <p>
                Access personalized AI-driven learning tailored to your unique
                needs
              </p>
              <div className="avega-landing-page-v2-card-glow"></div>
            </div>

            <div className="avega-landing-page-v2-benefit-card">
              <div className="avega-landing-page-v2-card-background"></div>
              <div className="avega-landing-page-v2-benefit-icon">
                <i className="fas fa-pen-fancy"></i>
              </div>
              <h3>Case Writers</h3>
              <p>
                Create dynamic, interactive content that adapts to learner
                responses
              </p>
              <div className="avega-landing-page-v2-card-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Simulation Section */}
      <section id="simulation" className="avega-landing-page-v2-simulation">
        <div className="avega-landing-page-v2-container-inner">
          <div className="avega-landing-page-v2-simulation-content">
            <div className="avega-landing-page-v2-simulation-left">
              {/* <div className="avega-landing-page-v2-section-badge">
                <span>AI Simulation</span>
              </div> */}
              <h2>Avega AI Case Simulator</h2>

              <div className="avega-landing-page-v2-info-cards">
                <div className="avega-landing-page-v2-info-card avega-landing-page-v2-problem">
                  <div className="avega-landing-page-v2-card-header">
                    <i className="fas fa-exclamation-triangle"></i>
                    <h3>Challenge</h3>
                  </div>
                  <p>
                    Traditional case studies lack interactivity and fail to
                    provide real-time feedback, limiting engagement.
                  </p>
                </div>

                <div className="avega-landing-page-v2-info-card avega-landing-page-v2-solution">
                  <div className="avega-landing-page-v2-card-header">
                    <i className="fas fa-lightbulb"></i>
                    <h3>Solution</h3>
                  </div>
                  <p>
                    AI-driven simulations create immersive, personalized
                    learning experiences with instant feedback.
                  </p>
                </div>

                <div className="avega-landing-page-v2-info-card avega-landing-page-v2-benefits">
                  <div className="avega-landing-page-v2-card-header">
                    <i className="fas fa-star"></i>
                    <h3>Benefits</h3>
                  </div>
                  <div className="avega-landing-page-v2-benefits-list">
                    <div className="avega-landing-page-v2-benefit-item">
                      <i className="fas fa-check"></i>
                      <span>Interactive Learning</span>
                    </div>
                    <div className="avega-landing-page-v2-benefit-item">
                      <i className="fas fa-check"></i>
                      <span>Real-time Analytics</span>
                    </div>
                    <div className="avega-landing-page-v2-benefit-item">
                      <i className="fas fa-check"></i>
                      <span>Personalized Paths</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="avega-landing-page-v2-action-buttons">
                <button className="avega-landing-page-v2-primary-btn">
                  <span>Try Simulation</span>
                  <div className="avega-landing-page-v2-btn-glow"></div>
                </button>
                <button className="avega-landing-page-v2-secondary-btn">
                  <span>Learn More</span>
                </button>
              </div>
            </div>{" "}
            <div className="avega-landing-page-v2-simulation-right">
              <div className="avega-landing-page-v2-simulation-visual">
                <div className="avega-landing-page-v2-simulation-image-card">
                  {" "}
                  <img
                    src={aiSimulator}
                    alt="AI Case Simulator Interface"
                    className="avega-landing-page-v2-simulator-image"
                  />
                  <div className="avega-landing-page-v2-simulator-card-items">
                    <div className="avega-landing-page-v2-simulator-feature-card-text">
                      <div className="avega-landing-page-v2-feature-icon">
                        <i className="fas fa-lightbulb"></i>
                      </div>
                      <span>Interactive Learning</span>
                    </div>
                    <div className="avega-landing-page-v2-simulator-feature-card-text">
                      <div className="avega-landing-page-v2-feature-icon">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <span>Real-time Analytics</span>
                    </div>
                    <div className="avega-landing-page-v2-simulator-feature-card-text">
                      <div className="avega-landing-page-v2-feature-icon">
                        <i className="fas fa-route"></i>
                      </div>
                      <span>Personalized Path</span>
                    </div>
                    <div className="avega-landing-page-v2-simulator-feature-card-text">
                      <div className="avega-landing-page-v2-feature-icon">
                        <i className="fas fa-bolt"></i>
                      </div>
                      <span>Instant Feedback</span>
                    </div>
                  </div>
                </div>
                {/* <div className="avega-landing-page-v2-floating-elements">
                  <div className="avega-landing-page-v2-element avega-landing-page-v2-element-1">
                    📊
                  </div>
                  <div className="avega-landing-page-v2-element avega-landing-page-v2-element-2">
                    🎯
                  </div>
                  <div className="avega-landing-page-v2-element avega-landing-page-v2-element-3">
                    ⚡
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Evaluator Section */}
      <section id="evaluator" className="avega-landing-page-v2-evaluator">
        <div className="avega-landing-page-v2-container-inner">
          {" "}
          <div className="avega-landing-page-v2-evaluator-content">
            <div className="avega-landing-page-v2-evaluator-left">
              <div className="avega-landing-page-v2-evaluator-visual">
                <div className="avega-landing-page-v2-simulation-image-card">
                  <img
                    src={aiEvaluator}
                    alt="AI Evaluator Dashboard"
                    className="avega-landing-page-v2-simulator-image"
                  />
                  <div className="avega-landing-page-v2-simulator-card-items">
                    <div className="avega-landing-page-v2-simulator-feature-card-text">
                      <div className="avega-landing-page-v2-feature-icon">
                        <i className="fas fa-lightbulb"></i>
                      </div>
                      <span>Smart Analytics</span>
                    </div>
                    <div className="avega-landing-page-v2-simulator-feature-card-text">
                      <div className="avega-landing-page-v2-feature-icon">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <span>AI Integration</span>
                    </div>
                    <div className="avega-landing-page-v2-simulator-feature-card-text">
                      <div className="avega-landing-page-v2-feature-icon">
                        <i className="fas fa-route"></i>
                      </div>
                      <span>Detailed Feedback</span>
                    </div>
                    <div className="avega-landing-page-v2-simulator-feature-card-text">
                      <div className="avega-landing-page-v2-feature-icon">
                        <i className="fas fa-bolt"></i>
                      </div>
                      <span>Easy Integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="avega-landing-page-v2-evaluator-right">
              {/* <div className="avega-landing-page-v2-section-badge">
                <span>AI Evaluator</span>
              </div> */}
              <h2>Avega Ai Evaluator</h2>

              <div className="avega-landing-page-v2-info-cards">
                <div className="avega-landing-page-v2-info-card avega-landing-page-v2-problem">
                  <div className="avega-landing-page-v2-card-header">
                    <i className="fas fa-clock"></i>
                    <h3>Challenge</h3>
                  </div>
                  <p>
                    Manual evaluation is time-consuming and lacks consistency
                    across different evaluators.
                  </p>
                </div>

                <div className="avega-landing-page-v2-info-card avega-landing-page-v2-solution">
                  <div className="avega-landing-page-v2-card-header">
                    <i className="fas fa-robot"></i>
                    <h3>Solution</h3>
                  </div>
                  <p>
                    Automated assessment with intelligent evaluation and
                    comprehensive feedback generation.
                  </p>
                </div>

                <div className="avega-landing-page-v2-info-card avega-landing-page-v2-benefits">
                  <div className="avega-landing-page-v2-card-header">
                    <i className="fas fa-trophy"></i>
                    <h3>Benefits</h3>
                  </div>
                  <div className="avega-landing-page-v2-benefits-list">
                    <div className="avega-landing-page-v2-benefit-item">
                      <i className="fas fa-check"></i>
                      <span>Smart Analytics</span>
                    </div>
                    <div className="avega-landing-page-v2-benefit-item">
                      <i className="fas fa-check"></i>
                      <span>Performance Tracking</span>
                    </div>
                    <div className="avega-landing-page-v2-benefit-item">
                      <i className="fas fa-check"></i>
                      <span>Detailed Feedback</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="avega-landing-page-v2-action-buttons">
                <button className="avega-landing-page-v2-primary-btn">
                  <span>Try Evaluator</span>
                  <div className="avega-landing-page-v2-btn-glow"></div>
                </button>{" "}
                <button
                  className="avega-landing-page-v2-secondary-btn"
                  onClick={() =>
                    window.open(
                      "https://youtu.be/Q-Xl7hR4Wd4?feature=shared",
                      "_blank"
                    )
                  }
                >
                  <span>View Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Types */}
      <section id="case-studies" className="avega-landing-page-v2-case-studies">
        <div className="avega-landing-page-v2-container-inner">
          <div className="avega-landing-page-v2-section-header">
            <h2 className="avega-landing-page-v2-section-title">
              Case Study Types
            </h2>
            <p className="avega-landing-page-v2-section-subtitle">
              Choose the perfect format for your educational needs
            </p>
          </div>

          <div className="avega-landing-page-v2-case-studies-grid">
            <div className="avega-landing-page-v2-case-study-card avega-landing-page-v2-avega-case">
              <div className="avega-landing-page-v2-card-header">
                <div className="avega-landing-page-v2-card-icon">
                  <i className="fas fa-magic"></i>
                </div>
                <h3>Avega Case</h3>
              </div>
              <p>
                AI-enhanced cases with intelligent placement, viewing, and
                comprehensive assessments.
              </p>
              <div className="avega-landing-page-v2-features">
                <h4>Perfect for assessments</h4>
                <div className="avega-landing-page-v2-feature-list">
                  <div className="avega-landing-page-v2-feature">
                    <i className="fas fa-check"></i>
                    <span>Customizable content</span>
                  </div>
                  <div className="avega-landing-page-v2-feature">
                    <i className="fas fa-check"></i>
                    <span>Easy integration</span>
                  </div>
                </div>
              </div>
              <div className="avega-landing-page-v2-card-glow"></div>
            </div>

            <div className="avega-landing-page-v2-case-study-card avega-landing-page-v2-non-avega-case">
              <div className="avega-landing-page-v2-card-header">
                <div className="avega-landing-page-v2-card-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <h3>External Case</h3>
              </div>
              <p>
                Integrate existing external content with our AI-powered
                assessment tools.
              </p>
              <div className="avega-landing-page-v2-features">
                <h4>Your content, our AI</h4>
                <div className="avega-landing-page-v2-feature-list">
                  <div className="avega-landing-page-v2-feature">
                    <i className="fas fa-check"></i>
                    <span>Custom assessments</span>
                  </div>
                  <div className="avega-landing-page-v2-feature">
                    <i className="fas fa-check"></i>
                    <span>Flexible integration</span>
                  </div>
                </div>
              </div>
              <div className="avega-landing-page-v2-card-glow"></div>
            </div>
          </div>

          {/* <div className="avega-landing-page-v2-cta-center">
            <button className="avega-landing-page-v2-primary-btn">
              <span>View Sample Assessment</span>
              <div className="avega-landing-page-v2-btn-glow"></div>
            </button>
          </div> */}
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="avega-landing-page-v2-timeline">
        <div className="avega-landing-page-v2-container-inner">
          <div className="avega-landing-page-v2-section-header">
            <h2 className="avega-landing-page-v2-section-title">
              Flexible Learning Timeline
            </h2>
            <p className="avega-landing-page-v2-section-subtitle">
              Seamlessly integrate into your existing workflow
            </p>
          </div>

          <div className="avega-landing-page-v2-timeline-flow">
            <div className="avega-landing-page-v2-timeline-item">
              <div className="avega-landing-page-v2-timeline-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="avega-landing-page-v2-timeline-content">
                <h3>Before Class</h3>
                <p>
                  Set up materials and configure AI parameters for optimal
                  learning outcomes
                </p>
              </div>
              <div className="avega-landing-page-v2-timeline-connector"></div>
            </div>

            <div className="avega-landing-page-v2-timeline-item">
              <div className="avega-landing-page-v2-timeline-icon">
                <i className="fas fa-play"></i>
              </div>
              <div className="avega-landing-page-v2-timeline-content">
                <h3>During Class</h3>
                <p>
                  Engage students with interactive simulations and real-time
                  feedback
                </p>
              </div>
              <div className="avega-landing-page-v2-timeline-connector"></div>
            </div>

            <div className="avega-landing-page-v2-timeline-item">
              <div className="avega-landing-page-v2-timeline-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="avega-landing-page-v2-timeline-content">
                <h3>After Class</h3>
                <p>
                  Analyze results, track progress, and generate detailed
                  performance reports
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section
        id="featured-cases"
        className="avega-landing-page-v2-featured-cases"
      >
        <div className="avega-landing-page-v2-container-inner">
          <div className="avega-landing-page-v2-section-header">
            <h2 className="avega-landing-page-v2-section-title">
              Explore Featured Cases
            </h2>
            <p className="avega-landing-page-v2-section-subtitle">
              Discover our latest AI-driven case studies designed for modern
              business education
            </p>
          </div>

          <div className="avega-landing-page-v2-featured-grid">
            <div className="avega-landing-page-v2-featured-card">
              {/* <div className="avega-landing-page-v2-featured-image">
                <i className="fas fa-digital-tachograph"></i>
              </div> */}
              <h3>Digital Transformation Strategy</h3>
              <p>
                Learn how to develop a comprehensive digital transformation
                strategy for modern businesses.
              </p>
              <div className="avega-landing-page-v2-featured-tags">
                <span>Strategy</span>
                <span>Digital</span>
              </div>
              {/* <a href="#" className="avega-landing-page-v2-featured-link">
                <span>View Case Study</span>
                <i className="fas fa-arrow-right"></i>
              </a> */}
            </div>
            <div className="avega-landing-page-v2-featured-card">
              {/* <div className="avega-landing-page-v2-featured-image">
                <i className="fas fa-chart-bar"></i>
              </div> */}
              <h3>Market Entry Strategy</h3>
              <p>
                Analyze market conditions and develop effective entry strategies
                for new markets.
              </p>
              <div className="avega-landing-page-v2-featured-tags">
                <span>Marketing</span>
                <span>Strategy</span>
              </div>
              {/* <a href="#" className="avega-landing-page-v2-featured-link">
                <span>View Case Study</span>
                <i className="fas fa-arrow-right"></i>
              </a> */}
            </div>
            <div className="avega-landing-page-v2-featured-card">
              {/* <div className="avega-landing-page-v2-featured-image">
                <i className="fas fa-coins"></i>
              </div> */}
              <h3>Financial Innovation</h3>
              <p>
                Explore innovative financial solutions and their impact on
                business growth.
              </p>
              <div className="avega-landing-page-v2-featured-tags">
                <span>Finance</span>
                <span>Innovation</span>
              </div>
              {/* <a href="#" className="avega-landing-page-v2-featured-link">
                <span>View Case Study</span>
                <i className="fas fa-arrow-right"></i>
              </a> */}
            </div>
          </div>
          <div className="avega-landing-page-v2-cta-center">
            <button
              className="avega-landing-page-v2-primary-btn"
              onClick={() => navigate("/case-studies")}
            >
              <span>View All Cases</span>
              <div className="avega-landing-page-v2-btn-glow"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section id="testimonials" className="avega-landing-page-v2-testimonials">
        <div className="avega-landing-page-v2-container-inner">
          <div className="avega-landing-page-v2-section-header">
            <h2 className="avega-landing-page-v2-section-title">
              Trusted by Educators & Mentors
            </h2>
            <p className="avega-landing-page-v2-section-subtitle">
              Here's what educators and trainers say about our platform
            </p>
          </div>
          <div className="avega-landing-page-v2-testimonials-grid">
            <div className="avega-landing-page-v2-testimonial-card">
              <p>
                "This AI simulation tool has revolutionized how we deliver case
                studies. It's incredibly powerful and intuitive."
              </p>
              <div className="avega-landing-page-v2-testimonial-author">
                <strong>Dr. Sarah Mitchell</strong>
                <span>Harvard Business School</span>
              </div>
            </div>
            <div className="avega-landing-page-v2-testimonial-card">
              <p>
                "Avega has made it possible to provide personalized feedback to
                each student at scale. Game-changing technology."
              </p>
              <div className="avega-landing-page-v2-testimonial-author">
                <strong>Prof. James Wilson</strong>
                <span>Stanford Graduate School</span>
              </div>
            </div>
            <div className="avega-landing-page-v2-testimonial-card">
              <p>
                "The platform's flexibility and ease of use have transformed our
                corporate training programs completely."
              </p>
              <div className="avega-landing-page-v2-testimonial-author">
                <strong>Dr. Emily Chen</strong>
                <span>MIT Sloan School</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section id="cta" className="avega-landing-page-v2-cta">
        <div className="avega-landing-page-v2-cta-background">
          <div className="avega-landing-page-v2-cta-orb avega-landing-page-v2-orb-1"></div>
          <div className="avega-landing-page-v2-cta-orb avega-landing-page-v2-orb-2"></div>
        </div>
        <div className="avega-landing-page-v2-container-inner">
          <div className="avega-landing-page-v2-cta-content">
            <h2>Ready to Transform Education?</h2>
            <p className="avega-landing-page-v2-section-subtitle">
              Join thousands of educators revolutionizing case-based learning
              with AI
            </p>
            <div className="avega-landing-page-v2-cta-buttons">
              <button
                onClick={() => navigate("/institute-registration")}
                className="avega-landing-page-v2-primary-btn"
              >
                <span>Register Now</span>
                <div className="avega-landing-page-v2-btn-glow"></div>
              </button>
              <button
                onClick={() =>
                  window.open(
                    "mailto:wecare@practywiz.com?subject=Interested in Avega&body=Hi, I would like to schedule a demo for Avega AI."
                  )
                }
                className="avega-landing-page-v2-secondary-btn"
              >
                <span>Schedule Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="avega-landing-page-v2-faq">
        <div className="avega-landing-page-v2-container-inner">
          <div className="avega-landing-page-v2-section-header">
            <h2 className="avega-landing-page-v2-section-title">FAQ</h2>
            <p className="avega-landing-page-v2-section-subtitle">
              Frequently Asked Questions
            </p>
          </div>
          <div className="avega-landing-page-v2-faq-list">
            {" "}
            {[
              {
                question: "What is Avega?",
                answer:
                  "Avega AI, developed by Practywiz, is an AI-powered case study simulation platform designed for business schools, corporate trainers, and educators. It enhances traditional case study methodology by enabling faculty to assign immersive, case-based assessments and guide students through structured, experiential learning. With built-in simulations, automated evaluations, and personalized feedback, Avega helps students engage in real-world decision-making and prepares them for practical business challenges",
              },
              {
                question: "How does Avega work?",
                answer:
                  "Step 1: Institutes purchase or create case studies (non-Practywiz or Practywiz-based). Step 2: Faculty assign these case studies to classes with a defined timeline (before, during, or after class). Step 3: Students read the case and respond to both fact-based (MCQs) and analysis-based (subjective) questions. Step 4: Faculty review submissions and track performance through reports and analytics.",
              },
              {
                question: "What are the types of case studies in Avega?",
                answer:
                  "Practywiz Case Studies: Pre-designed, read-only on web, based on real Indian corporate experiences. Non-Practywiz Case Studies: Faculty-added custom cases (e.g., Harvard), entered manually without copyright content.",
              },
              {
                question: "Who is Avega for?",
                answer:
                  "Faculty: To assign, evaluate, and manage student case study engagement. Students: To experience case simulations, sharpen decision-making, and receive structured feedback. Institutes: To modernize curriculum with experiential, application-based learning.",
              },
              {
                question:
                  "What types of questions can be added in a case study?",
                answer:
                  "Fact-based Questions (MCQs) – For testing understanding of data, facts, and figures. Analysis-based Questions (Subjective) – For evaluating critical thinking, strategy, and decision-making.",
              },
              {
                question: "Can faculty add their own case studies?",
                answer:
                  "Yes, faculty can upload Non-Practywiz case studies by adding the title, author, category, and assessment questions. These can be shared with students without using copyrighted content.",
              },
              {
                question: "What are the key benefits of using Avega?",
                answer:
                  "Enhances real-world thinking through simulations. Supports blended learning in B-schools. Simplifies assessment and analytics for faculty. Provides scalable, flexible tools to manage case-based learning. Promotes engagement over traditional theoretical teaching.",
              },
              {
                question: "Is Avega suitable for online and offline classes?",
                answer:
                  "Yes. Faculty can assign cases before, during, or after classes — making it ideal for both classroom and remote learning environments.",
              },
              {
                question:
                  "Can Practywiz help create custom case studies for my institute?",
                answer:
                  "Absolutely. Faculty can submit a request for custom case creation, and the Practywiz team can craft India-centric case studies tailored to specific learning objectives.",
              },
              {
                question:
                  "What makes Avega different from traditional case study teaching?",
                answer:
                  "Traditional methods rely on printed cases and manual evaluations. Avega digitizes the entire flow, enabling interactive, trackable, and flexible simulations while reducing administrative burden.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="avega-landing-page-v2-faq-item"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <h3>
                  {faq.question}
                  <i
                    className={`fas fa-chevron-${
                      activeFaq === index ? "up" : "down"
                    }`}
                  ></i>
                </h3>
                {activeFaq === index && <p>{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
