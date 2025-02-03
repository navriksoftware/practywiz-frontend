import React, { useState, useEffect } from "react";
import "./InternshipProfileMain.css";
import InternshipOverview from "./InternshipOverview";
import InternshipResume from "./InternshipResume";

import InternshipProfile from "./InternshipProfile";
import InternshipListing from "../../../Employer/Internships/OtherComponents/InternshipListing";
import MenteeInternshipManagement from "./MenteeInternshipManagement";
import MyApplications from "../../../Employer/Internships/OtherComponents/AppliedInternships";

const InternshipProfileMain = ({
  OnEditProfile,
  user,
  token,
  singleMentee,
  appliedInternships,
}) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [appliedInternshipsID, setAppliedInternshipsID] = useState([]);

  const tabs = [
    { name: "Overview", icon: "fa-regular fa-address-card" },
    // { name: "Profile", icon: "fa-regular fa-user" },
    { name: "Resume", icon: "fa-regular fa-clipboard" },
    // { name: "Internships", icon: "fa-solid fa-user" },
    { name: "Apply", icon: "fa-regular fa-paper-plane" },
    { name: "Applied", icon: "fa-regular fa-circle-check" },
  ];

  useEffect(() => {
    if (appliedInternships?.length > 0) {
      const internshipIDs = [
        ...new Set(
          appliedInternships.map((item) => item.internship_post_dtls_id)
        ),
      ];
      setAppliedInternshipsID(internshipIDs);
    }
  }, [appliedInternships]);

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <InternshipOverview
            OnEditProfile={OnEditProfile}
            singleMentee={singleMentee}
            user={user}
            token={token}
          />
        );
      case "Resume":
        return <InternshipResume />;
      case "Internships":
        return <MenteeInternshipManagement />;
      case "Apply":
        return (
          <InternshipListing appliedInternshipsID={appliedInternshipsID} />
        );
      case "Applied":
        return <MyApplications appliedInternships={appliedInternships} />;

      default:
        return (
          <div>
            <h1>404 Not Found</h1>
          </div>
        );
    }
  };

  return (
    <div className="profile-tabs-container">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <ul>
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`profile-sidebar-item ${
                activeTab === tab.name ? "profile-sidebar-item-active" : ""
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <i className={tab.icon}></i>
              <p className="profile-sidebar-item-name">{tab.name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="profile-main-content difuhtre_content">
        {renderContent()}
      </div>
    </div>
  );
};

export default InternshipProfileMain;
