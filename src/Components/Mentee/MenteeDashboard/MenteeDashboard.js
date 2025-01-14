import React, { useEffect, useState } from "react";
import Logo from "../../../Images/logo.png";
import MenteeCompletedCourses from "./OtherComponents/MenteeCompletedCourses";
import MenteeNotifications from "./OtherComponents/MenteeNotifications";
import MenteeChangePwd from "./OtherComponents/MenteeChangePwd";
import MenteeSavedJobs from "./OtherComponents/MenteeSavedJobs";
import MenteeCourseProgress from "./OtherComponents/MenteeCourseProgress";
import MenteeMessages from "./OtherComponents/MenteeMessages";
import MenteeProfileSettings from "./OtherComponents/MenteeProfileSettings";
import MenteeProfileDashboard from "./OtherComponents/MenteeProfileDashboard";
import { Link } from "react-router-dom";
import MenteeUpcomingSessions from "./OtherComponents/MenteeUpcomingSessions";
import MenteeCompletedSessions from "./OtherComponents/MenteeCompletedSessions";
import { logOut } from "../../../Redux/userRedux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ApiURL } from "../../../Utils/ApiURL";
import "./DashboardCSS/Mentee.css";
import MenteePaymentHistory from "./OtherComponents/MenteePaymentHistory";

// import for internships -start
import InternshipListing from "../../Employer/Internships/OtherComponents/InternshipListing";
import AppliedInternships from "../../Employer/Internships/OtherComponents/InternshipListing";
// import MenteeStipendPage from "./OtherComponents/MenteeStipendPage";
// end
const MenteeDashboard = ({ user, token }) => {
  const url = ApiURL();
  const [showNotification, setShowNotification] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [showMenteePsettings, setShowMenteePsettings] = useState(false);
  const [showCompletedCourse, setShowCompletedCourse] = useState(false);
  const [showMenteeSavedJobs, setShowMenteeSavedJobs] = useState(false);
  const [showMenteeCourseProgress, setShowMenteeCourseProgress] =
    useState(false);
  const [showMenteeMessage, setShowMenteeMessage] = useState(false);
  const [showMenteeProfile, setShowMenteeProfile] = useState(true);
  const [showMenteeUpcomingSessions, setShowMenteeUpcomingSessions] =
    useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [showMenteeCompletedSessions, setShowMenteeCompletedSessions] =
    useState(false);
  const [profilemenu, setprofilemenu] = useState(false);
  const [Sessionmenu, setSessionmenu] = useState(false);
  const [Coursemenu, setCoursemenu] = useState(false);
  const [singleMentee, setSingleMentee] = useState([]);
  const [showMenteePaymentHistory, setShowMenteePaymentHistory] =
    useState(false);

  const [internshipMenu, setinternshipMenu] = useState(false);
  const [AppliedInternship, setAppliedInternship] = useState(false);
  const [StipendPage, setStipendPage] = useState(false);

  const [mobMenu, setMobMenu] = useState(false);
  const [mobProfileSubMenu, setMobProfileSubMenu] = useState(false);
  const [mySessionInfo, setMySessionInfo] = useState(false);

  const MenteeNotificationHandler = () => {
    if (!showNotification) {
      setShowNotification(true);
    }
    return (
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeProfile(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };

  const HandleInternshipmenu = () => {
    if (!internshipMenu) {
      setinternshipMenu(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteeProfile(false),
      setShowMenteePaymentHistory(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const HandleAppliedInternshipmenu = () => {
    if (!AppliedInternship) {
      setAppliedInternship(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteeProfile(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setStipendPage(false)
    );
  };
  const HandleStipendInternshipmenu = () => {
    if (!StipendPage) {
      setStipendPage(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteeProfile(false),
      setShowMenteePaymentHistory(false),
      setAppliedInternship(false),
      setinternshipMenu(false)
    );
  };
  const MenteeChangePwdHandler = () => {
    if (!showChangePwd) {
      setShowChangePwd(true);
    }
    return (
      setShowNotification(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeProfile(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const MenteeSavedJobsHandler = () => {
    if (!showMenteeSavedJobs) {
      setShowMenteeSavedJobs(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeProfile(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const MenteeCourseProgressHandler = () => {
    if (!showMenteeCourseProgress) {
      setShowMenteeCourseProgress(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeMessage(false),
      setShowMenteeProfile(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const MenteeCompCourseHandler = () => {
    if (!showCompletedCourse) {
      setShowCompletedCourse(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeProfile(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const MenteePsettingsHandler = () => {
    if (!showMenteePsettings) {
      setShowMenteePsettings(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeProfile(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const MenteeMessageHandler = () => {
    if (!showMenteeMessage) {
      setShowMenteeMessage(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeProfile(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const ShowMenteeProfileHandler = () => {
    if (!showMenteeProfile) {
      setShowMenteeProfile(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const ShowMenteeUpcomingHandler = () => {
    if (!showMenteeUpcomingSessions) {
      setShowMenteeUpcomingSessions(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeProfile(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const ShowMenteeCompletedHandler = () => {
    if (!showMenteeCompletedSessions) {
      setShowMenteeCompletedSessions(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeProfile(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteePaymentHistory(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const ShowMenteePaymentHistoryHandler = () => {
    if (!showMenteePaymentHistory) {
      setShowMenteePaymentHistory(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMenteePsettings(false),
      setShowCompletedCourse(false),
      setShowMenteeSavedJobs(false),
      setShowMenteeCourseProgress(false),
      setShowMenteeMessage(false),
      setShowMenteeUpcomingSessions(false),
      setShowMenteeCompletedSessions(false),
      setShowMenteeProfile(false),
      setinternshipMenu(false),
      setAppliedInternship(false),
      setStipendPage(false)
    );
  };
  const menteeDtlsId = user?.user_id;
  useEffect(() => {
    const fetchSingleMentee = async () => {
      const response = await axios.post(
        `${url}api/v1/mentee/dashboard/fetch-single-details/${menteeDtlsId}`,
        { userId: menteeDtlsId }
      );
      if (response.data.success) {
        setSingleMentee(response.data.success);
      }
      if (response.data.error) {
        setSingleMentee(null);
      }
    };
    fetchSingleMentee();
  }, [menteeDtlsId, url]);

  useEffect(() => {
    const notifications = singleMentee?.map((item) => {
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
  }, [singleMentee]);
  const toggleNoProfile = () => {
    setprofilemenu(true);
  };
  const toggleOffProfile = () => {
    setprofilemenu(false);
  };
  const toggleNosession = () => {
    setSessionmenu(true);
  };
  const toggleOffSession = () => {
    setSessionmenu(false);
  };
  const toggleNoCourse = () => {
    setCoursemenu(true);
  };
  const toggleOffCourse = () => {
    setCoursemenu(false);
  };

  const dispatch = useDispatch();
  const LogoutHandler = () => {
    dispatch(logOut());
  };
  return (
    <>
      <div className="md-header">
        <header>
          <div className="header-wrapper">
            <nav className="navbar mx-4 px-3 mt-3 navbar-expand-sm navbar-light ">
              <div className="container-fluid">
                <a className="navbar-brand" href="/">
                  <img src={Logo} alt="" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  id="nav-toggler"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                >
                  <span id="bar-icon" className="navbar-toggler-icon"></span>
                  <i
                    id="close-mark-icon"
                    className="fa-solid fa-xmark d-none"
                  ></i>
                </button>
                <div
                  className="navbarmenucollapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <form className="d-flex iugeuirrr align-items-center">
                    <div className="udgehrr pe-3">
                      <div className="cdsfsdvnghff position-relative">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Discover Your Mentor..."
                        />

                        <i className="fa-solid fa-magnifying-glass position-absolute"></i>
                      </div>
                    </div>

                    <div className="udgehrr position-relative ps-3">
                      <div
                        className="dashboard-side-bar"
                        id="responsive-side-bar"
                      >
                        <button className="btn btn-main mt-0" type="button">
                          <i className="fa-solid ps-0 fa-user"></i>
                        </button>

                        <ul className="djioerr_dpdwn bg-white position-absolute d-none p-3">
                          <li>Account Settings</li>

                          <li>
                            <Link to="/mentee/view-profile/mahesh">
                              View Public Profile
                            </Link>
                          </li>
                          {user?.user_role === 1 && (
                            <li>
                              <Link
                                target="_blanks"
                                to={`/user/admin/dashboard`}
                              >
                                Admin Dashboard
                              </Link>
                            </li>
                          )}
                          <li onClick={LogoutHandler}>Log Out</li>
                        </ul>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="odejr_res d-none">
                  <div className="d-flex align-items-center">
                    <div className="udgehrr position-relative me-3 ps-3">
                      <div
                        // className="dashboard-side-bar"
                        id="responsive-side-bar"
                      >
                        <button className="btn btn-main mt-0" type="button">
                          <i className="fa-solid ps-0 fa-user"></i>
                        </button>

                        <ul className="djioerr_dpdwn bg-white position-absolute d-none p-3">
                          <li onClick={MenteePsettingsHandler}>
                            Account Settings
                          </li>

                          <li>
                            <Link to="/mentee/view-profile/mahesh">
                              View Public Profile
                            </Link>
                          </li>
                          {user?.user_role === 1 && (
                            <li>
                              <Link
                                target="_blanks"
                                to={`/user/admin/dashboard`}
                              >
                                Admin Dashboard
                              </Link>
                            </li>
                          )}
                          <li onClick={LogoutHandler}>Log Out</li>
                        </ul>
                      </div>
                    </div>

                    {/* Menu for mobile coded by aman */}
                    <div className="udgehrr position-relative me-3 ps-3">
                      <div
                        className="dashboard-side-bar"
                        id="responsive-side-bar"
                      >
                        <i
                          className="fa-solid fa-2x fa-bars-staggered"
                          onClick={() => {
                            setMobMenu(true);
                          }}
                        ></i>
                        {/* Menu Items */}
                        {mobMenu && (
                          <ul className="djioerr_dpdwn w15r bg-white position-absolute d-none p-3 ">
                            <li className="mob-close-menu-container">
                              <i
                                className="fa-solid fa-x mob-close-menu"
                                onClick={() => {
                                  setMobMenu(false);
                                  setMobProfileSubMenu(false);
                                  setMySessionInfo(false);
                                }}
                              ></i>
                            </li>
                            <li
                              className="menu-items"
                              onClick={ShowMenteeProfileHandler}
                            >
                              <span>
                                <i className=" fa-solid fa-user"> </i>
                              </span>
                              <span>Dashboard</span>
                            </li>

                            <li
                              onClick={() => {
                                setMobProfileSubMenu(!mobProfileSubMenu);
                                setMySessionInfo(false);
                              }}
                            >
                              <div className="menu-items">
                                <span>
                                  <i className="fa-solid fa-bars"></i>
                                </span>
                                <span>
                                  Profile Settings
                                  <span>
                                    <i className="fa-solid fa-chevron-down downarrowsize">
                                      {" "}
                                    </i>
                                  </span>
                                </span>
                              </div>
                              <span>
                                {mobProfileSubMenu && (
                                  <ul>
                                    <li onClick={MenteePsettingsHandler}>
                                      Profile Change
                                    </li>
                                    <li onClick={MenteeChangePwdHandler}>
                                      Change Password
                                    </li>
                                  </ul>
                                )}
                              </span>
                            </li>

                            <li
                              onClick={() => {
                                setMySessionInfo(!mySessionInfo);
                                setMobProfileSubMenu(false);
                              }}
                            >
                              <div className="menu-items">
                                <span>
                                  <i className="fa-solid fa-tv"></i>
                                </span>
                                <span>
                                  Session Info
                                  <span>
                                    <i className="fa-solid fa-chevron-down downarrowsize">
                                      {" "}
                                    </i>
                                  </span>
                                </span>
                              </div>

                              {mySessionInfo && (
                                <ul>
                                  <li onClick={ShowMenteeUpcomingHandler}>
                                    Upcomig Session
                                  </li>
                                  <li onClick={ShowMenteeCompletedHandler}>
                                    Completed Session
                                  </li>
                                </ul>
                              )}
                            </li>

                            <li
                              className="menu-items"
                              onClick={ShowMenteePaymentHistoryHandler}
                            >
                              <span>
                                <i className=" fa-solid fa-userfa-solid fa-clock-rotate-left">
                                  {" "}
                                </i>
                              </span>
                              <span>Payment History</span>
                            </li>

                            <li
                              className="menu-items"
                              onClick={MenteeNotificationHandler}
                            >
                              <span>
                                <i className="fa-solid fa-bell"> </i>
                              </span>
                              <span>Notifications </span>
                            </li>
                            <li></li>
                          </ul>
                        )}

                        {/* <i className="fa-solid fa-2x fa-bars-staggered"></i> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <div className="mentor_dashboard">
          {/* <div className=""> */}
          <div className="display-raw mob-hide">
            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={ShowMenteeProfileHandler}
            >
              <span className="d-block bg-white position-relative m-auto ">
                <i className="fa-solid fa-user"></i>
              </span>

              <h5>Dashboard</h5>
            </button>
            <div className="Baseposition" onMouseLeave={toggleOffProfile}>
              <button
                className="btn btn-transparent text-center py-3 seeeett"
                onMouseOver={toggleNoProfile}
              >
                <span className="d-block bg-white position-relative m-auto ">
                  <i className="fa-solid fa-bars"></i>
                </span>
                <h5>
                  Profile Settings
                  <i className="fa-solid fa-chevron-down downarrowsize"></i>
                </h5>
              </button>
              {profilemenu && (
                <div className="submenu1">
                  <button
                    className="submenu-item1"
                    onClick={MenteePsettingsHandler}
                  >
                    <h5>Profile Change</h5>
                  </button>
                  <button
                    className="submenu-item1"
                    onClick={MenteeChangePwdHandler}
                  >
                    <h5>Change Password</h5>
                  </button>
                </div>
              )}
            </div>
            <div className="Baseposition" onMouseLeave={toggleOffSession}>
              <button
                className="btn btn-transparent text-center py-3 seeeett"
                onMouseOver={toggleNosession}
              >
                <span className="d-block bg-white position-relative m-auto ">
                  {/* <i className="fa-solid fa-bars-progress"></i> */}
                  <i className="fa-solid fa-tv"></i>
                </span>

                <h5>
                  My Session Info
                  <i className="fa-solid fa-chevron-down downarrowsize"></i>
                </h5>
              </button>
              {Sessionmenu && (
                <div className="submenu1">
                  <button
                    className="submenu-item1"
                    onClick={ShowMenteeUpcomingHandler}
                  >
                    <h5>Upcomig Session</h5>
                  </button>
                  <button
                    className="submenu-item1"
                    onClick={ShowMenteeCompletedHandler}
                  >
                    <h5>Completed Session</h5>
                  </button>
                </div>
              )}
            </div>
            {/* <div className="Baseposition" onMouseLeave={toggleOffCourse}>
                <button
                  className="btn btn-transparent text-center py-3 seeeett"
                  onMouseOver={toggleNoCourse}
                >
                  <span className="d-block bg-white position-relative m-auto ">
                
                    <i className="fa-solid fa-book-open-reader"></i>
                  </span>
                  <h5>
                    Course Info
                    <i className="fa-solid fa-chevron-down downarrowsize"></i>
                  </h5>
                </button>
                {Coursemenu && (
                  <div className="submenu1">
                    <button
                      className="submenu-item1"
                      onClick={MenteeCourseProgressHandler}
                    >
                      <h5>Course Progress </h5>
                    </button>
                    <button
                      className="submenu-item1"
                      onClick={MenteeCompCourseHandler}
                    >
                      <h5>Completed Course</h5>
                    </button>
                  </div>
                )}
              </div> */}
            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={ShowMenteePaymentHistoryHandler}
            >
              <span className="d-block bg-white position-relative m-auto ">
                <i className="fa-solid fa-clock-rotate-left"></i>
              </span>

              <h5>Payment History</h5>
            </button>
            {/* <button className="btn btn-transparent text-center py-3 seeeett">
                <span className="d-block bg-white position-relative m-auto ">
                  <i className="fa-regular fa-building"></i>
                </span>

                <h5>Saved Institute</h5>
              </button> */}
            {/* <button
                className="btn btn-transparent text-center py-3 seeeett"
                onClick={MenteeSavedJobsHandler}
              >
                <span className="d-block bg-white position-relative m-auto ">
              
                  <i className="fa-regular fa-bookmark"></i>
                </span>

                <h5>Saved Jobs</h5>
              </button> */}
            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={MenteeNotificationHandler}
            >
              <span className="d-block bg-white position-relative m-auto ">
                <i className="fa-solid fa-bell"></i>
                {hasUnreadNotifications && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-3px",
                      right: "-5px",
                      width: "12px",
                      height: "12px",
                      backgroundColor: "red",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                )}
              </span>
              <h5>Notifications</h5>
            </button>

            <div className="Baseposition" onMouseLeave={toggleOffCourse}>
              <button
                className="btn btn-transparent text-center py-3 seeeett"
                onMouseOver={toggleNoCourse}
              >
                <span className="d-block bg-white position-relative m-auto ">
                  <i className="fa-solid fa-briefcase"></i>
                </span>
                <h5>
                  Internship
                  <i className="fa-solid fa-chevron-down downarrowsize"></i>
                </h5>
              </button>
              {Coursemenu && (
                <div className="submenu1">
                  <button
                    className="submenu-item1"
                    onClick={HandleInternshipmenu}
                  >
                    <h5> Apply for Internship</h5>
                  </button>
                  <button
                    className="submenu-item1"
                    onClick={HandleAppliedInternshipmenu}
                  >
                    <h5>Applied Internship</h5>
                  </button>
                  <button
                    className="submenu-item1"
                    onClick={HandleStipendInternshipmenu}
                  >
                    <h5>Stipend Info</h5>
                  </button>
                </div>
              )}
            </div>

            {/* </div> */}
          </div>
          {/* </div>
        <div className="mob-main"> */}
          {showMenteeProfile && (
            <MenteeProfileDashboard
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {showMenteePsettings && (
            <MenteeProfileSettings
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {showChangePwd && (
            <MenteeChangePwd
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {showMenteeCompletedSessions && (
            <MenteeCompletedSessions
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {showMenteeUpcomingSessions && (
            <MenteeUpcomingSessions
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {showMenteeCourseProgress && (
            <MenteeCourseProgress
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {showCompletedCourse && (
            <MenteeCompletedCourses
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {showMenteeSavedJobs && (
            <MenteeSavedJobs
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {showMenteeMessage && (
            <MenteeMessages
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {showNotification && (
            <MenteeNotifications
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {showMenteePaymentHistory && (
            <MenteePaymentHistory
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {/* {internshipMenu && <MenteeInternshipListing/>} */}
          {internshipMenu && (
            <InternshipListing
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {AppliedInternship && (
            <AppliedInternships
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )}
          {/* {StipendPage && (
            <MenteeStipendPage
              singleMentee={singleMentee}
              user={user}
              token={token}
            />
          )} */}
        </div>
      </div>
    </>
  );
};

export default MenteeDashboard;
