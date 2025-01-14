import React, { useState } from "react";
import "../InternshipCss/InternManagement.css";

const InternManagement = () => {
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [activeTab, setActiveTab] = useState("active"); // New state for active/past tabs

  const [showAddInternModal, setShowAddInternModal] = useState(false); //for add intern modal
  const [newIntern, setNewIntern] = useState({
    name: "",
    department: "",
    college: "",
    startDate: "",
    endDate: "",
  });

  // Updated sample data with status and end dates
  const [interns, setInterns] = useState([
    {
      id: 1,
      name: "Tushar",
      status: "active",
      department: "Frontend Development",
      avatar: "/api/placeholder/100/100",
      college: "Tech University",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      internshipDuration: 6,
      weeksCompleted: 8,
      totalInternshipWeeks: 24,
      weeklyReports: [
        {
          week: "Week 1",
          status: "Submitted",
          date: "2024-01-22",
          details: {
            accomplishments: "Completed initial React component design",
            challenges: "Learning new state management techniques",
            nextWeekPlan: "Start implementing complex components",
          },
        },
        {
          week: "Week 2",
          status: "Pending",
          date: "2024-01-29",
          details: {
            accomplishments: "Began UI component integration",
            challenges: "Synchronizing state across components",
            nextWeekPlan: "Complete component testing",
          },
        },
      ],
      payments: [{ month: "January", status: "Paid", amount: 5000 }],
      certificateStatus: "Not Generated",
    },
    {
      id: 2,
      name: "Siddharth Verma",
      status: "active",
      department: "Backend Development",
      avatar: "/api/placeholder/100/100",
      college: "Computer Science Institute",
      startDate: "2024-01-10",
      endDate: "2024-07-10",
      internshipDuration: 6,
      weeksCompleted: 5,
      totalInternshipWeeks: 24,
      weeklyReports: [
        {
          week: "Week 1",
          status: "Submitted",
          date: "2024-01-17",
          details: {
            accomplishments: "Set up database schema",
            challenges: "Optimizing query performance",
            nextWeekPlan: "Implement API endpoints",
          },
        },
      ],
      payments: [],
      certificateStatus: "Not Generated",
    },
    {
      id: 3,
      name: "Priya Sharma",
      status: "past",
      department: "UI/UX Design",
      avatar: "/api/placeholder/100/100",
      college: "Design Institute",
      startDate: "2023-07-01",
      endDate: "2023-12-31",
      internshipDuration: 6,
      weeksCompleted: 24,
      totalInternshipWeeks: 24,
      weeklyReports: [],
      payments: [
        { month: "July", status: "Paid", amount: 5000 },
        { month: "August", status: "Paid", amount: 5000 },
      ],
      certificateStatus: "Generated",
    },
  ]);

  //to calculate completed weeks
  const calculateCompleteWeeks = (startDateStr) => {
    const startDate = new Date(startDateStr);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - startDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const completeWeeks = Math.floor(diffInDays / 7);

    return completeWeeks;
  };

  const calculateProgress = (completed, total) => {
    return (completed / total) * 100;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Add intern modal
  const handleAddIntern = (e) => {
    e.preventDefault();
    const internshipDurationInWeeks = Math.ceil(
      (new Date(newIntern.endDate) - new Date(newIntern.startDate)) /
        (1000 * 60 * 60 * 24 * 7)
    );

    const newInternEntry = {
      id: interns.length + 1,
      ...newIntern,
      status: "active",
      avatar: "/api/placeholder/100/100",
      internshipDuration: Math.ceil(internshipDurationInWeeks / 4),
      weeksCompleted: 0,
      totalInternshipWeeks: internshipDurationInWeeks,
      weeklyReports: [],
      payments: [],
      certificateStatus: "Not Generated",
    };

    setInterns([...interns, newInternEntry]);
    setNewIntern({
      name: "",
      department: "",
      college: "",
      startDate: "",
      endDate: "",
    });
    setShowAddInternModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIntern((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const AddInternModal = () => (
    <div
      className="im-modal-overlay"
      onClick={() => setShowAddInternModal(false)}
    >
      <div className="im-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="im-modal-header">
          <h3>Add New Intern</h3>
          <button
            className="im-modal-close"
            onClick={() => setShowAddInternModal(false)}
          >
            ×
          </button>
        </div>
        <div className="im-modal-body">
          <form onSubmit={handleAddIntern} className="im-add-intern-form">
            <div className="im-form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={newIntern.name}
                onChange={handleInputChange}
                required
                className="im-form-input"
              />
            </div>
            <div className="im-form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={newIntern.department}
                onChange={handleInputChange}
                required
                className="im-form-input"
              />
            </div>
            <div className="im-form-group">
              <label>College</label>
              <input
                type="text"
                name="college"
                value={newIntern.college}
                onChange={handleInputChange}
                required
                className="im-form-input"
              />
            </div>
            <div className="im-form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={newIntern.startDate}
                onChange={handleInputChange}
                required
                className="im-form-input"
              />
            </div>
            <div className="im-form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={newIntern.endDate}
                onChange={handleInputChange}
                required
                className="im-form-input"
              />
            </div>
            <button type="submit" className="im-submit-btn">
              Add Intern
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  //end of add intern modal

  const InternStatusTabs = () => (
    <div className="intern-status-tabs">
      <button
        className={`status-tab ${activeTab === "active" ? "active" : ""}`}
        onClick={() => setActiveTab("active")}
      >
        Active Interns
      </button>
      <button
        className={`status-tab ${activeTab === "past" ? "active" : ""}`}
        onClick={() => setActiveTab("past")}
      >
        Past Interns
      </button>
    </div>
  );

  const InternGrid = () => {
    const filteredInterns = interns.filter(
      (intern) => intern.status === activeTab
    );

    return (
      <div className="intern-container">
        {filteredInterns.length === 0 ? (
          <div className="no-interns-message">No {activeTab} interns found</div>
        ) : (
          filteredInterns.map((intern) => (
            <div
              key={intern.id}
              className="intern-card"
              onClick={() => setSelectedIntern(intern)}
            >
              <div className="college-name">{intern.college}</div>
              <div className="card-content">
                <img
                  src={intern.avatar}
                  alt={intern.name}
                  className="profile-image"
                />

                <div className="info-section">
                  <h2 className="intern-name">{intern.name}</h2>
                  <p className="department">{intern.department}</p>

                  <div className="dates-container">
                    <div className="date-box">
                      <span className="date-label">Start Date</span>
                      <div className="date-value">
                        {formatDate(intern.startDate)}
                      </div>
                    </div>
                    <div className="date-box">
                      <span className="date-label">End Date</span>
                      <div className="date-value">
                        {formatDate(intern.endDate)}
                      </div>
                    </div>
                  </div>

                  <div className="progress-section">
                    <div className="progress-header">
                      <span className="info-label">Weeks Completed: </span>
                      <span className="info-value">
                        {intern.weeksCompleted} / {intern.totalInternshipWeeks}
                      </span>
                    </div>

                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${calculateProgress(
                            intern.weeksCompleted,
                            intern.totalInternshipWeeks
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {intern.status === "past" && (
                    <div className="certificate-status">
                      Certificate: {intern.certificateStatus}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const InternProfile = ({ intern }) => {
    const [activeTab, setActiveTab] = useState("reports");
    const [selectedReportDetails, setSelectedReportDetails] = useState(null);

    const handleViewReport = (report) => {
      setSelectedReportDetails(report);
    };

    return (
      <div className="im-intern-profile">
        <button
          className="im-back-button"
          onClick={() => setSelectedIntern(null)}
        >
          ← Back to All Interns
        </button>

        <div className="im-intern-header-card">
          <img
            src={intern.avatar}
            alt={intern.name}
            className="im-profile-avatar"
          />
          <div>
            <h2 className="im-profile-name">{intern.name}</h2>
            <p className="im-profile-department">{intern.department}</p>
            <p className="im-profile-start-date">Started: {intern.startDate}</p>
          </div>
        </div>

        <div className="im-tabs-container">
          <div className="im-tabs-list">
            <button
              className={`im-tab ${
                activeTab === "reports" ? "im-tab-active" : ""
              }`}
              onClick={() => setActiveTab("reports")}
            >
              <i className="fas fa-file-text"></i> Weekly Reports
            </button>
            <button
              className={`im-tab ${
                activeTab === "payments" ? "im-tab-active" : ""
              }`}
              onClick={() => setActiveTab("payments")}
            >
              <i class="fa-solid fa-indian-rupee-sign"></i> Payments
            </button>
            <button
              className={`im-tab ${
                activeTab === "certificate" ? "im-tab-active" : ""
              }`}
              onClick={() => setActiveTab("certificate")}
            >
              <i className="fas fa-graduation-cap"></i> Certificate
            </button>
          </div>

          {activeTab === "reports" && (
            <div className="im-tab-content">
              <div className="im-card">
                <div className="im-card-header">
                  <h3>Weekly Reports</h3>
                </div>
                <div className="im-card-content">
                  {intern.weeklyReports.map((report, index) => (
                    <div key={index} className="im-report-item">
                      <div>
                        <p className="im-report-week">{report.week}</p>
                        <p className="im-report-date">Due: {report.date}</p>
                      </div>
                      <div className="im-report-actions">
                        <span
                          className={`im-report-status ${
                            report.status === "Submitted"
                              ? "im-status-submitted"
                              : "im-status-pending"
                          }`}
                        >
                          {report.status}
                        </span>
                        <button
                          className="im-view-report-btn"
                          onClick={() => handleViewReport(report)}
                        >
                          <i className="fas fa-eye"></i> View Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="im-tab-content">
              <div className="im-card">
                <div className="im-card-header">
                  <h3>Payment History</h3>
                </div>
                <div className="im-card-content">
                  {intern.payments.length > 0 ? (
                    <div className="im-payments-list">
                      {intern.payments.map((payment, index) => (
                        <div key={index} className="im-payment-item">
                          <div>
                            <p className="im-payment-month">{payment.month}</p>
                            <p className="im-payment-amount">
                              ₹{payment.amount}
                            </p>
                          </div>
                          <span className="im-payment-status">
                            {payment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="im-no-payments">No payments recorded yet</p>
                  )}
                  <button className="im-process-payment-btn">
                    Process New Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "certificate" && (
            <div className="im-tab-content">
              <div className="im-card">
                <div className="im-card-header">
                  <h3>Internship Certificate</h3>
                </div>
                <div className="im-card-content im-certificate-content">
                  <i className="fas fa-graduation-cap im-certificate-icon"></i>
                  <h3 className="im-certificate-status">
                    Certificate Status: {intern.certificateStatus}
                  </h3>
                  <p className="im-certificate-description">
                    Generate an internship completion certificate for this
                    intern.
                  </p>
                  <button className="im-generate-certificate-btn">
                    Generate Certificate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {selectedReportDetails && (
          <div
            className="im-modal-overlay"
            onClick={() => setSelectedReportDetails(null)}
          >
            <div
              className="im-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="im-modal-header">
                <h3>{selectedReportDetails.week} Report Details</h3>
                <button
                  className="im-modal-close"
                  onClick={() => setSelectedReportDetails(null)}
                >
                  ×
                </button>
              </div>
              <div className="im-modal-body">
                <div className="im-report-section">
                  <h4>Accomplishments</h4>
                  <p>{selectedReportDetails.details.accomplishments}</p>
                </div>
                <div className="im-report-section">
                  <h4>Challenges</h4>
                  <p>{selectedReportDetails.details.challenges}</p>
                </div>
                <div className="im-report-section">
                  <h4>Next Week Plan</h4>
                  <p>{selectedReportDetails.details.nextWeekPlan}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="im-container">
      <div className="im-header">
        <h1>Manage Interns</h1>
        <div className="im-header-actions">
          <button
            className="im-add-intern-btn"
            onClick={() => setShowAddInternModal(true)}
          >
            <i className="fas fa-plus"></i> Add Intern
          </button>
          {/* <button className="im-filter-btn">
            <i className="fas fa-calendar"></i> Filter by Date
          </button> */}
          <button className="im-filter-btn">
            <i className="fas fa-user"></i> Filter by Department
          </button>
        </div>
      </div>

      {showAddInternModal && <AddInternModal />}

      {selectedIntern ? (
        <InternProfile intern={selectedIntern} />
      ) : (
        <>
          <InternStatusTabs />
          <InternGrid />
        </>
      )}
    </div>
  );
};

export default InternManagement;
