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
            <h2 className="practywiz-about-hero-subtitle">About us</h2>
            <h1 className="practywiz-about-hero-title">PractyWiz</h1>
            <h3 className="practywiz-about-hero-tagline">
              Bridge to Greatness
            </h3>
            <p className="practywiz-about-hero-text">
              We are a bridge between the corporate sector and academia to
              create mutually beneficial opportunities.
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
                Organizations and Corporates. To keep pace with the changing
                need of corporates, it’s an imperative that students and
                professionals keep acquiring practical skills.
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
                  <li>Mentorship opportunities</li>
                  <li>Visiting/Guest Faculty positions</li>
                  <li>Caselet Contribution</li>
                  <li>Recognition and Earn for your impact</li>
                </ul>
              </div>
            </div>

            <div className="practywiz-about-offer-grid-col-5">
              <div className="practywiz-about-offer-grid-section practywiz-about-offer-grid-students">
                <h3>For Students & Professionals</h3>
                <ul>
                  <li>Mentorship programs</li>
                  <li>Experiential Trainings</li>
                  <li>Access to premium internships</li>
                  <li>Practical skill development</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="practywiz-about-offer-grid-grid-bottom">
            <div className="practywiz-about-offer-grid-col-9">
              <div className="practywiz-about-offer-grid-section practywiz-about-offer-grid-institutes">
                <h3>For Institutes & Corporates</h3>
                <div className="practywiz-about-offer-grid-two-cols">
                  <ul>
                    <li>Industry Connect Programs</li>
                    <li>Get access to Alumni pool</li>
                    <li>Provide students with AI case studies</li>
                    <li>Invite top experts for guest lectures</li>
                  </ul>
                  <ul>
                    <li>Mentorship Programs for Employees</li>
                    <li>Intern from selective top colleges</li>
                    <li>Caselet Contribution & Access</li>
                    <li>Corporate Trainings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="practywiz-about-offer-grid-col-3">
              <div className="practywiz-about-offer-grid-section practywiz-about-offer-grid-forall">
                <h3>For All</h3>
                <ul>
                  <li>Get 100% in-house training tailored for our team</li>
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
                    <h3>A Soft-Edtech Approach</h3>
                    <div className="practywiz-about-unique-text">
                      <p>
                        Practywiz is not just an Edtech platform—we are a
                        Soft-Edtech, a technology-driven ecosystem that
                        seamlessly connects education with industry. With strong
                        expertise in software development, we collaborate with
                        organizations to create real-world, industry-aligned
                        learning experiences for students and professionals.
                      </p>
                      <p>
                        Our platform leverages AI-driven insights to enhance
                        learning efficiency, track performance, and provide
                        personalized mentorship. These capabilities empower
                        learners, ensuring they gain practical skills that align
                        with industry needs.
                      </p>
                      <p>
                        As a collaboration between Practywiz and Navrik, we
                        merge the strengths of Edtech and software solutions,
                        delivering innovative, tech-integrated education that
                        adds value for colleges and corporates alike.
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
