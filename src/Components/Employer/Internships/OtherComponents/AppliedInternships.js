import React, { useState, useEffect } from "react";
import "../InternshipCss/AppliedInternships.css";

const MyApplications = ({ appliedInternships }) => {
  const [myApplications, setMyApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    if (appliedInternships?.length > 0) {
      const extractedData = appliedInternships.map((item) => ({
        id: item.internship_post_dtls_id,
        company: item.employer_organization_name,
        internshipProfile: item.employer_internship_post_position,
        appliedOn: new Date(
          item.internship_applicant_dtls_cr_date
        ).toLocaleDateString(),
        applicationStatus: item.mentee_internship_applied_status.toUpperCase(),
      }));
      setMyApplications(extractedData);
      setFilteredApplications(extractedData);
    }
  }, [appliedInternships]);

  useEffect(() => {
    let result = myApplications;

    if (searchQuery) {
      result = result.filter((application) => {
        const searchString = searchQuery.toLowerCase();
        return (
          application.internshipProfile.toLowerCase().includes(searchString) ||
          application.company.toLowerCase().includes(searchString)
        );
      });
    }

    setFilteredApplications(result);
  }, [myApplications, searchQuery]);

  const handleReviewApplication = (id) => {
    window.open(`/applications/${id}/review`, "_blank");
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "my-app-status-accepted";
      case "rejected":
        return "my-app-status-rejected";
      case "under review":
        return "my-app-status-review";
      case "applied":
        return "my-app-status-pending";
      default:
        return "";
    }
  };

  return (
    <div className="my-app-container">
      <div className="my-app-header">
        <div style={{ textAlign: "center" }} className="my-app-mb-4">
          <h2>My Applications</h2>
        </div>
        <div className="my-app-search-wrapper">
          <input
            type="text"
            className="my-app-search-input"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="my-app-search-btn">Search</button>
        </div>
      </div>

      <div className="my-app-table-container">
        <table className="my-app-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Internship Profile</th>
              <th>Applied On</th>
              <th>Application Status</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application.id}>
                <td>{application.company}</td>
                <td>{application.internshipProfile}</td>
                <td>{application.appliedOn}</td>
                <td>
                  <span
                    className={`my-app-status ${getStatusClass(
                      application.applicationStatus
                    )}`}
                  >
                    {application.applicationStatus}
                  </span>
                </td>
                {/* <td>
                  <button
                    className="my-app-review-btn"
                    onClick={() => handleReviewApplication(application.id)}
                  >
                    Review
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
