import React, { useState } from "react";
import "./MenteeInternshipManagement.css";

const MenteeInternshipManagement = () => {
  // Sample internship data (same as original)
  const internships = {
    current: {
      id: "current",
      company: "Tech Solutions Inc.",
      position: "Software Development Intern",
      startDate: "2025-01-15",
      endDate: "2025-07-15",
      duration: "6 months",
      supervisor: "Jane Smith",
      status: "In Progress",
      stipend: "$1000/month",
      totalPayment: "$6000",
      paymentsReceived: [
        {
          month: "January",
          amount: "$1000",
          status: "Paid",
          date: "2025-01-31",
        },
        { month: "February", amount: "$1000", status: "Pending", date: null },
      ],
    },
    past: [
      {
        id: "past1",
        company: "DataCorp Systems",
        position: "Data Analysis Intern",
        startDate: "2024-06-01",
        endDate: "2024-12-31",
        duration: "6 months",
        supervisor: "John Doe",
        status: "Completed",
        certificate: {
          issued: true,
          date: "2024-12-31",
          id: "CERT-2024-001",
        },
        paymentsReceived: [],
      },
    ],
  };

  const [activeInternshipId, setActiveInternshipId] = useState("current");
  const [activeTab, setActiveTab] = useState("overview");
  const [showReportDialog, setShowReportDialog] = useState(false);

  const [weeklyReports, setWeeklyReports] = useState([
    {
      week: 1,
      submitted: true,
      date: "2025-01-22",
      status: "Approved",
      content: "Completed orientation and setup development environment",
    },
    {
      week: 2,
      submitted: true,
      date: "2025-01-29",
      status: "Pending",
      content: "Worked on frontend components",
    },
  ]);

  const [newReport, setNewReport] = useState({
    week: weeklyReports.length + 1,
    content: "",
    tasks: "",
  });

  const getSelectedInternship = () => {
    if (activeInternshipId === "current") {
      return internships.current;
    }
    return (
      internships.past.find((intern) => intern.id === activeInternshipId) ||
      internships.current
    );
  };

  const selectedInternship = getSelectedInternship();

  const submitWeeklyReport = () => {
    const report = {
      week: newReport.week,
      submitted: true,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      content: newReport.content,
    };

    setWeeklyReports([...weeklyReports, report]);
    setNewReport({ week: weeklyReports.length + 2, content: "", tasks: "" });
    setShowReportDialog(false);
  };

  return (
    <>
      <div className="mim-container">
        <h1 className="mim-title">My Internships</h1>

        <div
          className={`mim-card ${
            activeInternshipId === "current" ? "active" : ""
          }`}
          onClick={() => setActiveInternshipId("current")}
        >
          <div className="mim-card-header">
            <div>
              <h2 className="mim-card-title">{internships.current.position}</h2>
              <p className="mim-company">{internships.current.company}</p>
            </div>
            <span className="mim-status mim-status-progress">
              {internships.current.status}
            </span>
          </div>
        </div>

        <h2 className="mim-title" style={{ fontSize: "20px" }}>
          Past Internships
        </h2>
        {internships.past.map((internship) => (
          <div
            key={internship.id}
            className={`mim-card ${
              activeInternshipId === internship.id ? "active" : ""
            }`}
            onClick={() => setActiveInternshipId(internship.id)}
          >
            <div className="mim-card-header">
              <div>
                <h2 className="mim-card-title">{internship.position}</h2>
                <p className="mim-company">{internship.company}</p>
              </div>
              <span className="mim-status mim-status-completed">
                {internship.status}
              </span>
            </div>
          </div>
        ))}

        <div className="mim-tabs">
          <div className="mim-tab-list">
            <button
              className={`mim-tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`mim-tab ${activeTab === "reports" ? "active" : ""}`}
              onClick={() => setActiveTab("reports")}
            >
              Weekly Reports
            </button>
            <button
              className={`mim-tab ${activeTab === "payments" ? "active" : ""}`}
              onClick={() => setActiveTab("payments")}
            >
              Payments
            </button>
            <button
              className={`mim-tab ${
                activeTab === "certificates" ? "active" : ""
              }`}
              onClick={() => setActiveTab("certificates")}
            >
              Certificates
            </button>
          </div>

          <div className="mim-content">
            {activeTab === "overview" && (
              <div className="mim-grid">
                <div className="mim-info-item">
                  <span>Start Date:</span>
                  <span>{selectedInternship.startDate}</span>
                </div>
                <div className="mim-info-item">
                  <span>Duration:</span>
                  <span>{selectedInternship.duration}</span>
                </div>
                <div className="mim-info-item">
                  <span>Supervisor:</span>
                  <span>{selectedInternship.supervisor}</span>
                </div>
                {selectedInternship.stipend && (
                  <div className="mim-info-item">
                    <span>Stipend:</span>
                    <span>{selectedInternship.stipend}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reports" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                    Weekly Reports
                  </h3>
                  {selectedInternship.status === "In Progress" && (
                    <button
                      className="mim-button"
                      onClick={() => setShowReportDialog(true)}
                    >
                      Submit New Report
                    </button>
                  )}
                </div>
                {weeklyReports.map((report) => (
                  <div key={report.week} className="mim-report-item">
                    <div className="mim-report-header">
                      <div>
                        <h4 style={{ fontWeight: "500" }}>
                          Week {report.week}
                        </h4>
                        <p style={{ color: "#6b7280", fontSize: "14px" }}>
                          {report.date}
                        </p>
                      </div>
                      <span
                        className={`mim-status ${
                          report.status === "Approved"
                            ? "mim-status-progress"
                            : "mim-status-completed"
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <p>{report.content}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "payments" && (
              <div>
                {selectedInternship.totalPayment && (
                  <div style={{ textAlign: "right", marginBottom: "16px" }}>
                    <p style={{ fontWeight: "500" }}>
                      Total Amount: {selectedInternship.totalPayment}
                    </p>
                  </div>
                )}
                {selectedInternship.paymentsReceived?.map((payment, index) => (
                  <div key={index} className="mim-payment-item">
                    <div>
                      <h4 style={{ fontWeight: "500" }}>{payment.month}</h4>
                      <p style={{ color: "#6b7280", fontSize: "14px" }}>
                        {payment.date || "Pending"}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <span>{payment.amount}</span>
                      <span
                        className={`mim-status ${
                          payment.status === "Paid"
                            ? "mim-status-progress"
                            : "mim-status-completed"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "certificates" && (
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "16px",
                  }}
                >
                  Certificates
                </h3>
                {selectedInternship.status === "In Progress" ? (
                  <p style={{ color: "#6b7280" }}>
                    Certificate will be generated upon internship completion.
                  </p>
                ) : selectedInternship.certificate ? (
                  <div className="mim-report-item">
                    <h4 style={{ fontWeight: "500" }}>
                      {selectedInternship.company}
                    </h4>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>
                      Issued: {selectedInternship.certificate.date}
                    </p>
                    <p style={{ color: "#6b7280", fontSize: "14px" }}>
                      Certificate ID: {selectedInternship.certificate.id}
                    </p>
                    <button
                      className="mim-button"
                      style={{ marginTop: "16px" }}
                    >
                      Download
                    </button>
                  </div>
                ) : (
                  <p style={{ color: "#6b7280" }}>No certificates available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showReportDialog && (
        <>
          <div
            className="mim-dialog-overlay"
            onClick={() => setShowReportDialog(false)}
          />
          <div className="mim-dialog">
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              Submit Weekly Report
            </h2>
            <div>
              <h4 style={{ marginBottom: "8px" }}>Week {newReport.week}</h4>
              <textarea
                className="mim-textarea"
                placeholder="Describe your work this week..."
                value={newReport.content}
                onChange={(e) =>
                  setNewReport({ ...newReport, content: e.target.value })
                }
              />
              <textarea
                className="mim-textarea"
                placeholder="List completed tasks..."
                value={newReport.tasks}
                onChange={(e) =>
                  setNewReport({ ...newReport, tasks: e.target.value })
                }
              />
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="mim-button"
                  style={{ background: "#e5e7eb", color: "#374151" }}
                  onClick={() => setShowReportDialog(false)}
                >
                  Cancel
                </button>
                <button className="mim-button" onClick={submitWeeklyReport}>
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MenteeInternshipManagement;
