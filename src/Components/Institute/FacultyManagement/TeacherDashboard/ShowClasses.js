import React, { useState, useEffect } from "react";
import "./DashboardCSS/ShowClasses.css";
import CreateClass from "./OtherComponents/CreateClass";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL.js";
import { useDispatch } from "react-redux";

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
}) => {
  return (
    <div
      className="showclasses-card"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <div className="showclasses-card-content">
        <div className="showclasses-card-header">
          <div>
            <h3 className="showclasses-card-title">{title}</h3>
            <p className="showclasses-card-code">{code}</p>
          </div>
          <button className="showclasses-options-button">
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
          </button>
        </div>

        <p className="showclasses-card-meta">
          {students}
          {/* • {schedule} */}
        </p>

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
          {/* <button className="showclasses-share-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
};

const ShowClasses = ({ userdata, data, setActivePage, setClickedClassId }) => {
  const dispatch = useDispatch();
  const url = ApiURL();
  const [classDetalis, setclassDetalis] = useState([]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/class/get`, {
            FacultyUserId: userdata[0]?.faculty_dtls_id,
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setclassDetalis(response.data.success);
        } else if (response.data.error) {
          setclassDetalis([]);
        }
      } catch (error) {
        setclassDetalis([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        console.log("Request completed");
      }
    };
    fetchClassDetails();
  }, [url, userdata]);

  console.log("classDetalis", classDetalis);
  const classDetails = classDetalis.map((cls) => ({
    title: cls.class_name,
    code: cls.class_subject_code,
    students: cls.class_subject,
    schedule: cls.class_name,
    progress: 63,
    class_dtls_id: cls.class_dtls_id,
    color: "#6366f1", // indigo
  }));

  // const classes = [
  //   {
  //     title: "Financial Accounting",
  //     code: "FIN 301",
  //     students: "28 Students",
  //     schedule: "Mon, Wed, Fri • 10:00 AM",
  //     progress: 65,
  //     color: "#6366f1" // indigo
  //   },
  //   {
  //     title: "Global Economics",
  //     code: "ECO 201",
  //     students: "32 Students",
  //     schedule: "Tue, Thu • 2:00 PM",
  //     progress: 45,
  //     color: "#06b6d4" // cyan
  //   },
  //   {
  //     title: "Marketing Strategies",
  //     code: "MKT 101",
  //     students: "24 Students",
  //     schedule: "Mon, Wed • 1:00 PM",
  //     progress: 80,
  //     color: "#6366f1" // indigo
  //   },
  //   {
  //     title: "Business Communication",
  //     code: "BUS 202",
  //     students: "30 Students",
  //     schedule: "Tue, Thu • 11:00 AM",
  //     progress: 35,
  //     color: "#ec4899" // pink
  //   },
  //   {
  //     title: "Entrepreneurship & Innovation",
  //     code: "ENT 401",
  //     students: "22 Students",
  //     schedule: "Wed, Fri • 3:00 PM",
  //     progress: 55,
  //     color: "#f59e0b" // amber
  //   }
  // ];

  const [ShowCreateclassform, setShowCreateclassform] = useState(false);

  const handleCreateClassClick = () => {
    setShowCreateclassform(true);
  };

  return (
    <div className="showclasses-container">
      {ShowCreateclassform && (
        <CreateClass
          userdata={userdata}
          setActivePage={setActivePage}
          setShowCreateclassform={setShowCreateclassform}
        />
      )}
      <div className="showclasses-wrapper">
        <div className="showclasses-header">
          <h1 className="showclasses-title">My Classes</h1>
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
        </div>

        {/* <div className="showclasses-tabs-container">
          <div className="showclasses-tabs">
            <button className="showclasses-tab showclasses-tab-active">All Classes</button>
            <button className="showclasses-tab">Active</button>
            <button className="showclasses-tab">Archived</button>
          </div>
          <button className="showclasses-filter-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="showclasses-filter-icon">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            Filter by Subject
          </button>
        </div> */}

        <div className="showclasses-grid">
          {classDetails.reverse().map((cls, index) => (
            <ClassCard
              key={index}
              title={cls.title}
              code={cls.code}
              students={cls.students}
              schedule={cls.schedule}
              progress={cls.progress}
              color={cls.color}
              class_dtls_id={cls.class_dtls_id}
              setActivePage={setActivePage} // Pass the setActivePage function to ClassCard
              setClickedClassId={setClickedClassId} // Pass the setClickedClassId function to ClassCard
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowClasses;
