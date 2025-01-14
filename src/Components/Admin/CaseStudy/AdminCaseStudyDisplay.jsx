import React, { useState } from "react";
import "./AdminCaseStudyDisplay.css";

function AdminCaseStudyDisplay() {
  const [caseStudies, setCaseStudies] = useState([
    {
      caseTopic: "option1",
      lession: "Some lesson text",
      fututreSkils: "Some skill",
      characters: "2",
      roles: [
        {
          role1: "Leader",
          role2: "Support",
        },
      ],
      roleOfMainCharacter: "Leader",
      challenge: "Overcome a difficult challenge",
    },
    {
      caseTopic: "option3",
      lession: "Increase intelligence.",
      fututreSkils: "They should become more experienced and more intelligent.",
      characters: "3",
      roles: [
        {
          role1: "React Developer",
          role2: "Node Developer",
          role3: "Full-stack Developer",
        },
      ],
      roleOfMainCharacter: "Full-stack Developer",
      challenge: "Twists in projects.",
    },
    {
      caseTopic: "option4",
      lession: `In this case study, we explore how modern software development 
      processes have evolved over the years. This includes an in-depth analysis 
      of Agile methodologies, continuous integration practices, and how 
      cross-functional teams collaborate in today's fast-paced tech environment. 
      The case highlights the importance of adopting a growth mindset, constant 
      learning, and flexibility in adapting to new technologies. Additionally, 
      we discuss the role of communication in overcoming challenges.`,
      fututreSkils: `After reading this case study, participants will have a deeper 
      understanding of Agile development, how to improve team collaboration, and 
      the ability to adopt a continuous improvement approach. Participants will 
      also learn best practices for software deployment and how to leverage 
      automation tools effectively.`,
      characters: "4",
      roles: [
        {
          role1: "Scrum Master",
          role2: "Product Owner",
          role3: "Software Engineer",
          role4: "QA Engineer",
        },
      ],
      roleOfMainCharacter: "Scrum Master",
      challenge: `Managing complex, cross-functional teams while adhering to Agile 
      principles and maintaining high code quality standards.`,
    },
  ]);

  // State to track which case study is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Toggle "Read More" or "Read Less"
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Function to truncate text if not expanded
  const truncateText = (text, isExpanded) => {
    if (isExpanded) {
      return text;
    }
    return text.length > 150 ? `${text.substring(0, 150)}...` : text;
  };

  return (
    <div className="case-study-display-container">
      <h1>Case Studies</h1>
      {caseStudies.map((caseStudy, index) => (
        <div key={index} className="case-study-card">
          <h2>Case Topic: {caseStudy.caseTopic}</h2>
          <hr />
          <p>
            <strong>Lesson:</strong>{" "}
            {truncateText(caseStudy.lession, expandedIndex === index)}
          </p>
          <p>
            <strong>Future Skills:</strong>{" "}
            {truncateText(caseStudy.fututreSkils, expandedIndex === index)}
          </p>
          <p>
            <strong>Number of Characters:</strong> {caseStudy.characters}
          </p>
          <div>
            <strong>Roles:</strong>
            <ul>
              {caseStudy.roles.length > 0 &&
                Object.entries(caseStudy.roles[0]).map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
            </ul>
          </div>
          <p>
            <strong>Main Character Role:</strong>{" "}
            {caseStudy.roleOfMainCharacter}
          </p>
          <p>
            <strong>Challenge:</strong>{" "}
            {truncateText(caseStudy.challenge, expandedIndex === index)}
          </p>
          <button className="read-more-btn" onClick={() => toggleExpand(index)}>
            {expandedIndex === index ? "Read Less" : "Read More"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminCaseStudyDisplay;
