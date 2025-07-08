import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import { setfacultyDtls } from "../../../../Redux/facultySlice";
import "./DashboardCSS/TeacherDahboard.css"; // Import your CSS file here

// Import all components
import Profile from "./OtherComponents/Profile";
import Setting from "./OtherComponents/Setting";
import Store from "./OtherComponents/Store";
import Notification from "./OtherComponents/Notification";
import SingleAssignedCase from "./OtherComponents/SingleAssignedCase";
import CaseAssigneProcess from "./OtherComponents/CaseAssignProcess";
import ShowClasses from "./ShowClasses";
import SingleClassdetails from "./OtherComponents/SingleClassdetails";
import ChangePassword from "./OtherComponents/ChangePassword";
import AddNonPractywizCase from "./AddNonPractywizCases/AddNonPractywizCase";
import NavBar from "./FacultyNavbar";

const TeacherDashboard = ({ user, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State variables
  const [userdata, setuserdata] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  // Initialize activePage from localStorage or default to "profile"
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("activePage") || "profile";
  });
  const [clickedClassId, setClickedClassId] = useState(() => {
    return localStorage.getItem("clickedClassId") || null;
  });

  const url = ApiURL();

  // Fetch faculty details
  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/faculty/dashboard/details`, {
            FacultyUserId: user?.user_id,
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          const facultyRaw = response.data.success[0];
          const cleanedData = {
            faculty_id: facultyRaw?.faculty_dtls_id,
            user_dtls_id: facultyRaw?.user_dtls_id,
            institute_name: facultyRaw?.faculty_institute_name,
            institute_code: facultyRaw?.faculty_institute_code,
            faculty_name: facultyRaw?.faculty_firstname + " " + facultyRaw?.faculty_lastname,
          };
          dispatch(setfacultyDtls(cleanedData));
          setuserdata(response.data.success);
        } else if (response.data.error) {
          setuserdata([]);
        }
      } catch (error) {
        setuserdata([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        console.log("Request completed");
      }
    };
    fetchFacultyDetails();
  }, [url, user?.user_id, dispatch]);

  useEffect(() => {
    const notifications = userdata?.map((item) => {
      if (item?.notification_list) {
        try {
          return JSON.parse(item.notification_list);
        } catch (error) {
          console.error("Failed to parse notification_list:", error);
          return []; // Return an empty array if parsing fails
        }
      }
      return []; // Return an empty array if notification_list is undefined or null
    });
    const allNotifications = notifications?.flat();
    const unreadExists = allNotifications?.some(
      (notification) => !notification.notification_is_read
    );
    // Delay the state update slightly
    setTimeout(() => {
      setHasUnreadNotifications(unreadExists);
    }, 0);
  }, [userdata]);

  console.log("hasUnreadNotifications:", hasUnreadNotifications);

  // Update localStorage when activePage changes
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
    localStorage.setItem("clickedClassId", clickedClassId);
  }, [activePage, clickedClassId]);

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <Profile userdata={userdata} setActivePage={setActivePage} />;
      case "singlecase":
        return (
          <SingleAssignedCase
            userdata={userdata}
            setActivePage={setActivePage}
          />
        );
      case "settings":
        return <Setting userdata={userdata} />;
      case "ChangePwd":
        return <ChangePassword user={user} token={token} />;
      case "store":
        return <Store userdata={userdata} setActivePage={setActivePage} />;
      case "AddCaseStudy":
        return (
          <AddNonPractywizCase
            userdata={userdata}
            setActivePage={setActivePage}
          />
        );
      case "showclasses":
        return (
          <ShowClasses
            userdata={userdata}
            setActivePage={setActivePage}
            setClickedClassId={setClickedClassId}
          />
        );
      case "singleclassdetails":
        return (
          <SingleClassdetails
            setActivePage={setActivePage}
            clickedClassId={clickedClassId}
          />
        );
      case "assigncase":
        return <CaseAssigneProcess />;
      case "notifications":
        return (
          <Notification
            data={userdata}
            userId={user?.user_id}
            token={token}
            setHasUnreadNotifications={setHasUnreadNotifications}
          />
        );
      default:
        return <Profile />;
    }
  };

  return (
    <div className="teacher-dashboard-container">
      <NavBar
        user={user}
        activePage={activePage}
        setActivePage={setActivePage}
        hasUnreadNotifications={hasUnreadNotifications}
      />
      <div className="dashboard-content">{renderPage()}</div>
    </div>
  );
};

export default TeacherDashboard;
