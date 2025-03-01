import React, { useEffect, useRef } from "react";
import "./about.css";

import founderImg from "../../Images/Aboutus/founderImg.jpg";
import uniqueImg from "../../Images/Aboutus/au-uniqueImg.svg";
import bridgeImg from "../../Images/Aboutus/vector-bridge.jpeg";
import aboutImg from "../../Images/Aboutus/aboutImg.svg";
import CallroactionSection from "../Home/CalltoactionSection";

const About = () => {
  const timelineData = [
    {
      year: "2021",
      title: "Navrik Software",
      description:
        "Tarun Gautam, Founder of Practywiz, first founded Navrik Software with the vision to create innovate IT solutions. Navrik lives upto to it's name which is fused by two words - Navomesh (Innovation in Sanskrit) and Maverik (Passionate).",
    },
    {
      year: "2022",
      title: "Global Growth",
      description:
        "By 2022 Navrik Software had delivered Intelligent Automation (RPA & AI) solutions for leading Indian and International corporate brands and built a strong partner network in US, Middle East and Africa.",
    },
    {
      year: "2023",
      title: "Birth of Practywiz",
      description:
        "In 2023, the vision of Practywiz was born with the intent to bridge the skill gap by providing practical skills. We started by providing technical skills based on our experience of executing Intelligent Automation projects. We associated with leading colleges technical and b-schools and provided internships to over 70+ students.",
    },
    {
      year: "2024",
      title: "AI Innovation",
      description:
        "In 2024, we launched our AI Based Case Simulator along with our Mentor Connect offering.",
    },
    {
      year: "2025",
      title: "Complete Solution",
      description:
        "In 2025, we have launched Practwiz as a complete offering to connect Academic organizations with Corporates.",
    },
  ];

  const observerRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("practywiz-about-timeline-visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    observerRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="practywiz-about-container">
      <section className="practywiz-about-hero-section">
        <div className="practywiz-about-hero-container">
          <div className="practywiz-about-hero-content">
            <h2 className="practywiz-about-hero-subtitle">Who Are We?</h2>
            <h1 className="practywiz-about-hero-title">PractyWiz</h1>
            <h3 className="practywiz-about-hero-tagline">
              Bridge to Greatness
            </h3>
            <p className="practywiz-about-hero-text">
              We bridge the gap between academia and the corporate world,
              forging powerful collaborations that drive innovation and unlock
              new opportunities for both.
            </p>
          </div>
          <div className="practywiz-about-hero-image">
            <img
              src={bridgeImg}
              alt="Team"
              className="practywiz-about-hero-img"
            />
          </div>
        </div>
      </section>

      <section className="practywiz-about-vision-mission">
        <div className="practywiz-about-vn-container">
          <div className="practywiz-about-vn-illustration">
            <img
              src={aboutImg}
              alt="Illustration of people walking with puzzle piece"
              className="practywiz-about-vn-image"
            />
          </div>
          <div className="practywiz-about-vn-content">
            <div className="practywiz-about-vn-card">
              <h2 className="practywiz-about-vn-title">Our Vision</h2>
              <p className="practywiz-about-vn-text">
                Create PractyWizards by Bridging the Gap Between Academic
                Organizations & Corporates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="practywiz-about-timeline-section">
        <h2 className="practywiz-about-section-title">Our Journey</h2>
        <div className="practywiz-about-timeline-container">
          {timelineData.map((item, index) => (
            <div
              key={item.year}
              className="practywiz-about-timeline-item"
              ref={(el) => (observerRef.current[index] = el)}
            >
              <div className="practywiz-about-timeline-marker"></div>
              <div className="practywiz-about-timeline-year">{item.year}</div>
              <div className="practywiz-about-timeline-content">
                <h3 className="practywiz-about-timeline-subtitle">
                  {item.title}
                </h3>
                <p className="practywiz-about-timeline-text">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="practywiz-about-offer-grid-our-offer">
        <h1 className="practywiz-about-offer-grid-section-title">
          Our Offerings
        </h1>

        <div className="practywiz-about-offer-grid-container">
          <h1 className="practywiz-about-offer-grid-main-title">PractyWiz</h1>
          <h3 className="practywiz-about-offer-grid-subtitle">
            Where Everyone Belongs
          </h3>

          <div className="practywiz-about-offer-grid-grid-top">
            <div className="practywiz-about-offer-grid-col-7">
              <div className="practywiz-about-offer-grid-section practywiz-about-offer-grid-mentors">
                <h3>For Seasoned Professionals</h3>
                <ul>
                  <li>Opportunity to give back to your alma mater</li>
                  <li>Mentor and Groom students & professionals</li>
                  <li>Join institutes as Guest/Visiting faculty</li>
                  <li>Author Case Studies</li>
                </ul>
              </div>
            </div>

            <div className="practywiz-about-offer-grid-col-5">
              <div className="practywiz-about-offer-grid-section practywiz-about-offer-grid-students">
                <h3>For Students & Professionals</h3>
                <ul>
                  <li>Mentorship programs</li>
                  <li>Access to premium internships</li>
                  <li>Case Studies with AI assessment</li>
                  <li>Experiential Trainings & Practical skill development</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="practywiz-about-offer-grid-grid-bottom">
            <div className="practywiz-about-offer-grid-col-9">
              <div className="practywiz-about-offer-grid-section practywiz-about-offer-grid-institutes">
                <h3>For Institutes</h3>
                <div className="practywiz-about-offer-grid-two-cols">
                  <ul>
                    <li>Single Platform for Institutes</li>
                    <li>Get access to Alumni pool</li>
                    <li>Access to Alumni and Non-Alumni mentors</li>

                    <li>Invite top experts for guest lectures</li>
                  </ul>
                  <ul>
                    <li>Industry Connect Programs</li>
                    <li>Provide students with AI case studies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="practywiz-about-offer-grid-col-3">
              <div className="practywiz-about-offer-grid-section practywiz-about-offer-grid-forall">
                <h3>For Corporates</h3>
                <ul>
                  <li>Mentorship Programs for Employees</li>
                  <li>Intern from selective top colleges</li>
                  <li>Caselet Contribution & Access</li>
                  <li>Corporate Trainings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="practywiz-about-unique">
        <div className="practywiz-about-section-container">
          <h2 className="practywiz-about-section-title">
            What Makes Us Unique
          </h2>
          <div className="practywiz-about-unique-content">
            <div className="practywiz-about-unique-grid">
              <div className="practywiz-about-unique-text-content">
                <div className="practywiz-about-unique-header">
                  <div className="practywiz-about-icon-container">
                    <i class="fa-solid fa-code practywiz-about-icon"></i>
                  </div>
                  <div>
                    <div className="practywiz-about-unique-text">
                      <h4>Bridging the Gap</h4>
                      <p>
                        We serve as a bridge between educational institutions
                        and corporations, ensuring that students gain practical
                        skills that align with industry demands.
                      </p>
                    </div>

                    <div className="practywiz-about-unique-text">
                      <h4>A Single, Unified Platform</h4>
                      <p>
                        Practywiz offers a comprehensive ecosystem that caters
                        to institutes, corporations, students, and
                        professionals, making learning, mentorship, and career
                        progression seamless.
                      </p>
                    </div>

                    <div className="practywiz-about-unique-text">
                      <h4>AI Capabilities</h4>
                      <p>
                        AI capabilities are deeply embedded across Practywiz’s
                        modules, enhancing learning efficiency, performance
                        tracking, and personalized guidance.
                      </p>
                    </div>

                    <div className="practywiz-about-unique-text">
                      <h4>The Power of Practywiz & Navrik</h4>
                      <p>
                        As a collaboration between an Edtech platform and a
                        software solutions company, we bring unparalleled value
                        to colleges and corporates—offering tailored solutions
                        that integrate learning with cutting-edge technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="practywiz-about-unique-image">
                <img src={uniqueImg} alt="Unique approach illustration" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="practywiz-about-founder">
        <div className="practywiz-about-section-container">
          <h2 className="practywiz-about-offer-grid-section-title">
            The Founder
          </h2>
          <div className="practywiz-about-founder-content">
            <div className="practywiz-about-founder-image">
              <div className="practywiz-about-founder-image-container">
                <img src={founderImg} alt="Founder" />
              </div>
            </div>
            <div className="practywiz-about-founder-text">
              <h3>Tarun Gautam</h3>
              <div className="practywiz-about-founder-quote">
                <p>
                  Tarun Gautam is an IIM Lucknow alumnus and after a successful
                  career of over 20 years in the IT industry, he founded two
                  start-up brands – Navrik Software Solutions and PractyWiz.
                </p>
              </div>
              <div className="practywiz-about-founder-description">
                <p>
                  Navrik Software Solutions is a Software Products and Solutions
                  company that helps organizations adopt AI Based Intelligent
                  Automation solutions.
                </p>
                <p>
                  PractyWiz is an innovative platform that provides practical
                  training. The mentorship platform provides sessions from
                  Industry experts.
                </p>
                <p>
                  Tarun is an avid speaker and loves to interact with students.
                  He has been invited to IIM Lucknow, Lingaya Institute of
                  Management, BIMTECH Noida, IIHMR Dwarka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallroactionSection />
    </div>
  );
};

export default About;
