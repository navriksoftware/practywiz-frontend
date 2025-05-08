import React, { useState, useEffect } from "react";
import "./DashboardCSS/ShowClasses.css";
import CreateClass from "./OtherComponents/CreateClass";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL.js";
import { useDispatch } from "react-redux";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux.js";

const ClassCard = ({
  title,
  code,
  students,
  schedule,
  progress,
  color,
  class_dtls_id,
  setActivePage,
  setClickedClassId,
  handleCreateClassClick,
  setclassid,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleEdit = () => {
    handleCreateClassClick();
    setclassid(class_dtls_id);
    setDropdownVisible(false);
  };

  return (
    <div
      className="showclasses-card"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <div className="showclasses-card-content">
        <div className="showclasses-card-header">
          <div>
            <h3 className="showclasses-card-title">{title.toUpperCase()}</h3>
            <p className="showclasses-card-code">{code}</p>
          </div>
          <div className="showclasses-options-container">
            <button
              className="showclasses-options-button"
              onClick={handleDropdownToggle}
            >
              {isDropdownVisible ? (
                <i className="fa-solid fa-xmark"></i>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              )}
            </button>
            {isDropdownVisible && (
              <div className="showclasses-options-dropdown">
                <div
                  className="showclasses-options-dropdown-item"
                  onClick={handleEdit}
                >
                  Edit
                </div>
                <div className="showclasses-options-dropdown-item">Delete</div>
              </div>
            )}
          </div>
        </div>

        <p className="showclasses-card-meta">{students}</p>

        <div className="showclasses-progress-container">
          <p className="showclasses-progress-label">Course Progress</p>
          <div className="showclasses-progress-bar-container">
            <div className="showclasses-progress-bar-wrapper">
              <div
                className="showclasses-progress-bar"
                style={{ width: `${progress}%`, backgroundColor: color }}
              ></div>
            </div>
            <span className="showclasses-progress-text">{progress}%</span>
          </div>
        </div>

        <div className="showclasses-card-footer">
          <button
            className="showclasses-details-button"
            onClick={() => {
              setActivePage("singleclassdetails");
              setClickedClassId(class_dtls_id);
            }}
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="showclasses-arrow-icon"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const ShowClasses = ({ userdata, data, setActivePage, setClickedClassId }) => {
  const dispatch = useDispatch();
  const url = ApiURL();
  const [classDetails, setClassDetails] = useState([]);
  const [showCreateClassForm, setShowCreateClassForm] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        setLoading(true);
        // dispatch(showLoadingHandler());
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/class/get`, {
            FacultyUserId: userdata[0]?.faculty_dtls_id,
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000)
          ),
        ]);

        if (response.data.success) {
          setClassDetails(response.data.success);
        } else {
          setClassDetails([]);
        }
      } catch (error) {
        console.error(error.message);
        setClassDetails([]);
      } finally {
        setLoading(false);
        // dispatch(hideLoadingHandler());
      }
    };

    if (!showCreateClassForm) {
      fetchClassDetails();
    }
  }, [url, userdata, showCreateClassForm]);

  const handleCreateClassClick = () => {
    setShowCreateClassForm(true);
  };

  // Fixed calculateProgress function moved outside the ClassCard component
  const calculateProgress = (endDateStr) => {
    if (!endDateStr || endDateStr === "N/A" || endDateStr === "Invalid Date")
      return 0;

    try {
      const endDate = new Date(endDateStr.split("-").reverse().join("-")); // Convert DD-MM-YYYY to YYYY-MM-DD
      if (isNaN(endDate.getTime())) return 0;

      // Calculate startDate as 6 months before end date
      const startDate = new Date(endDate);
      startDate.setMonth(startDate.getMonth() - 6);

      const now = new Date();

      if (now < startDate) return 0; // Not started yet
      if (now > endDate) return 100; // Completed

      const totalDuration = endDate - startDate;
      const elapsedDuration = now - startDate;
      return Math.round((elapsedDuration / totalDuration) * 100);
    } catch (error) {
      console.error("Error calculating progress:", error);
      return 0;
    }
  };

  const formatDate = (isoDateStr) => {
    if (!isoDateStr) return "N/A";
    try {
      const date = new Date(isoDateStr);
      const iso = date.toISOString().split("T")[0]; // "2025-05-24"
      const [year, month, day] = iso.split("-");
      return `${day}-${month}-${year}`;
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formattedClassDetails = classDetails.map((cls) => ({
    title: cls.class_name,
    code: cls.class_subject_code,
    students: cls.class_subject,
    schedule: cls.class_name,
    progress: calculateProgress(formatDate(cls.class_sem_end_date)),
    class_dtls_id: cls.class_dtls_id,
    color: "#2563eb",
  }));

  return (
    <div className="showclasses-container">
      {showCreateClassForm && (
        <CreateClass
          userdata={userdata}
          setActivePage={setActivePage}
          setShowCreateclassform={setShowCreateClassForm}
          classid={selectedClassId}
        />
      )}

      <div className="showclasses-wrapper">
        <div className="showclasses-header">
          <h1 className="showclasses-title">My Classes</h1>
          {formattedClassDetails.length > 0 && (
            <button
              className="showclasses-create-button"
              onClick={handleCreateClassClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="showclasses-plus-icon"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create New Class
            </button>
          )}
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading classes...</p>
          </div>
        ) : formattedClassDetails.length > 0 ? (
          <div className="showclasses-grid">
            {formattedClassDetails.reverse().map((cls, index) => (
              <ClassCard
                key={index}
                {...cls}
                handleCreateClassClick={handleCreateClassClick}
                setclassid={setSelectedClassId}
                title={cls.title}
                code={cls.code}
                students={cls.students}
                schedule={cls.schedule}
                progress={cls.progress}
                color={cls.color}
                class_dtls_id={cls.class_dtls_id}
                setActivePage={setActivePage}
                setClickedClassId={setClickedClassId}
              />
            ))}
          </div>
        ) : (
          <div className="showclasses-empty-state">
            <div className="showclasses-empty-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="showclasses-empty-icon"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <h2 className="showclasses-empty-title">No Classes Found</h2>
              <p className="showclasses-empty-description">
                You haven't created any classes yet.
              </p>
              <button
                className="showclasses-empty-button"
                onClick={handleCreateClassClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="showclasses-plus-icon"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create Your First Class
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowClasses;
