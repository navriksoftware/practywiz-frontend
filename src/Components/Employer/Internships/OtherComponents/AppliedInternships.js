import React, { useState } from "react";
import "./InternshipCss/AppliedInternships.css";

const MyApplications = () => {
  const initialApplications = [
    {
      id: 1,
      company: "TechCorp Inc.",
      internshipProfile: "Software Development Engineering (Web)",
      appliedOn: "2024-03-15",
      applicationStatus: "Under Review",
    },
    {
      id: 2,
      company: "Analytics Pro",
      internshipProfile: "Data Science Intern",
      appliedOn: "2024-03-10",
      applicationStatus: "Accepted",
    },
    {
      id: 3,
      company: "Creative Solutions",
      internshipProfile: "UX/UI Design Intern",
      appliedOn: "2024-02-25",
      applicationStatus: "Rejected",
    },
    {
      id: 4,
      company: "AppWorks",
      internshipProfile: "Mobile App Development",
      appliedOn: "2024-03-05",
      applicationStatus: "Pending",
    },
    {
      id: 5,
      company: "CloudTech",
      internshipProfile: "DevOps Engineering Intern",
      appliedOn: "2024-03-20",
      applicationStatus: "Under Review",
    },
  ];

  //   const [applications, setApplications] = useState(initialApplications);
  //   const [searchQuery, setSearchQuery] = useState("");

  //   const handleSearch = (e) => {
  //     const query = e.target.value.toLowerCase();
  //     setSearchQuery(query);

  //     if (query.trim() === "") {
  //       setApplications(initialApplications);
  //     } else {
  //       const filtered = initialApplications.filter(
  //         (application) =>
  //           application.company.toLowerCase().includes(query) ||
  //           application.internshipProfile.toLowerCase().includes(query)
  //       );
  //       setApplications(filtered);
  //     }
  //   };

  //   const handleReviewApplication = (id) => {
  //     window.open(`/applications/${id}/review`, "_blank");
  //   };

  //   const getStatusClass = (status) => {
  //     switch (status.toLowerCase()) {
  //       case "accepted":
  //         return "my-app-status-accepted";
  //       case "rejected":
  //         return "my-app-status-rejected";
  //       case "under review":
  //         return "my-app-status-review";
  //       case "pending":
  //         return "my-app-status-pending";
  //       default:
  //         return "";
  //     }
  //   };

  //   return (
  //     <div className="my-app-container">
  //       <div className="my-app-header">
  //         <div style={{ textAlign: "center" }} className="my-app-mb-4">
  //           <h2>My Applications</h2>
  //         </div>
  //         <div className="my-app-search-wrapper">
  //           <input
  //             type="text"
  //             className="my-app-search-input"
  //             placeholder="Search applications..."
  //             value={searchQuery}
  //             onChange={handleSearch}
  //           />
  //           <button className="my-app-search-btn">Search</button>
  //         </div>
  //       </div>

  //       <div className="my-app-listings-container">
  //         {applications.map((application) => (
  //           <div key={application.id} className="my-app-card">
  //             <div className="my-app-card-content">
  //               <div className="my-app-info-section">
  //                 <h3 className="my-app-info-title">{application.company}</h3>
  //                 <p className="my-app-info-subtitle">
  //                   {application.internshipProfile}
  //                 </p>
  //               </div>
  //               <div className="my-app-applied-on">{application.appliedOn}</div>
  //               <div className="my-app-status-label">
  //                 <div
  //                   className={`my-app-status ${getStatusClass(
  //                     application.applicationStatus
  //                   )}`}
  //                 >
  //                   {application.applicationStatus}
  //                 </div>
  //               </div>

  //               <div className="my-app-action-section">
  //                 <button
  //                   className="my-app-review-btn"
  //                   onClick={() => handleReviewApplication(application.id)}
  //                 >
  //                   Review Application
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  const [applications, setApplications] = useState(initialApplications);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setApplications(initialApplications);
    } else {
      const filtered = initialApplications.filter(
        (application) =>
          application.company.toLowerCase().includes(query) ||
          application.internshipProfile.toLowerCase().includes(query)
      );
      setApplications(filtered);
    }
  };

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
      case "pending":
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
            onChange={handleSearch}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
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
                <td>
                  <button
                    className="my-app-review-btn"
                    onClick={() => handleReviewApplication(application.id)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyApplications;
