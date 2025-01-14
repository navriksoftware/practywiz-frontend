import MentorNotifications from "./OtherComponents/MentorNotifications";
import MentorSessionSetup from "./OtherComponents/MentorSessionSetup";
import MentorChangePwd from "./OtherComponents/MentorChangePwd";
import MentorProfileSettings from "./ProfileSettings/MentorProfileSettings";
import MentorProfile from "./OtherComponents/MentorProfile";
import MentorBankdetails from "./OtherComponents/MentorBankdetails";
import { useDispatch } from "react-redux";
import { logOut } from "../../../Redux/userRedux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ApiURL } from "../../../Utils/ApiURL";
import MentorUpcomingSessions from "./OtherComponents/MentorUpcomingSessions";
import MentorCompletedSessions from "./OtherComponents/MentorCompletedSessions";
import MentorCaseStudyInput from "./CaseStudy/MentorCaseStudyInput";
import MentorCaseStudySubmited from "./CaseStudy/MentorCaseStudySubmited";
import SingleMentorProfilePageSkelton from "../AllMentors/SingleMentorProfile/Skelton/SingleMentorProfilePageSkelton";
import MentorRegProgressForm from "./MentorRegProgress/MentorRegProgressForm";
/* eslint-disable no-sequences */
import "./DashboardCSS/mentordashboardnotification.css";
import "./DashboardCSS/Mentor.css";
import "./DashboardCSS/MobileMentorDashboard.css";
import Logo from "../../../Images/logo.png";
import MentorDashboardSidebar from "./OtherComponents/MentorDashboardSidebar";
import MentorCaseStudyPurchased from "./CaseStudy/MentorCaseStudyPurchased";
const MentorDashboard = ({ user, token }) => {
  const url = ApiURL();
  const [singleMentor, setSingleMentor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMentorUpDetailsForm, setShowMentorUpDetailsForm] = useState(false);
  const [mentorTotalProgress, setMentorTotalProgress] = useState("");

  const mentorDtlsId = user?.user_id;
  useEffect(() => {
    const fetchSingleMentors = async () => {
      setLoading(true);
      const response = await axios.post(
        `${url}api/v1/mentor/dashboard/fetch-single-details/${mentorDtlsId}`,
        { userId: mentorDtlsId }
      );
      setLoading(false);
      if (response.data.success) {
        if (
          response.data.success[0]?.total_progress === 20 ||
          response.data.success[0]?.total_progress === 50
        ) {
          return (
            setShowMentorUpDetailsForm(true),
            setSingleMentor(response.data.success),
            setLoading(false),
            setMentorTotalProgress(response.data.success[0]?.total_progress),
            setShowMentorProfile(false)
          );
        } else if (response.data.success[0]?.total_progress === 80) {
          return (
            setSingleMentor(response.data.success),
            setLoading(false),
            setMentorTotalProgress(80)
          );
        } else if (response.data.success[0]?.total_progress === 100) {
          if (
            response.data.success[0]?.mentor_academic_qualification === "" ||
            response.data.success[0]?.mentor_guest_lectures_interest === "" ||
            response.data.success[0]?.mentor_curating_case_studies_interest ===
              "" ||
            response.data.success[0]?.mentor_sessions_free_of_charge === "" ||
            response.data.success[0]?.mentor_language === "" ||
            response.data.success[0]?.mentor_country === "" ||
            response.data.success[0]?.mentor_city === "" ||
            response.data.success[0]?.mentor_institute === ""
          ) {
            return (
              setSingleMentor(response.data.success),
              setLoading(false),
              setMentorTotalProgress(80)
            );
          } else {
            return (
              setSingleMentor(response.data.success),
              setLoading(false),
              setMentorTotalProgress(100)
            );
          }
        }
      }
      if (response.data.error) {
        return setLoading(false), setSingleMentor(null);
      }
    };
    fetchSingleMentors();
  }, [mentorDtlsId, url]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [showMentorProfile, setShowMentorProfile] = useState(true);
  const [showMentorPsettings, setshowMentorPsettings] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMentorMessage, setShowMentorMessage] = useState(false);
  const [showSessionSetup, setShowSessionSetup] = useState(false);
  const [showMentorUpcomingSessions, setshowMentorUpcomingSessions] =
    useState(false);
  const [showMentorCompletedSessions, setShowMentorCompletedSessions] =
    useState(false);
  const [profilemenu, setprofilemenu] = useState(false);
  const [Sessionmenu, setSessionmenu] = useState(false);
  const [CaseMenu, setCaseMenu] = useState(false);
  const [caseStudies, setCaseStudies] = useState(false);
  const [caseStudiesSubmited, setCaseStudiesSubmited] = useState(false);
  const [caseStudiesPurchased, setcaseStudiesPurchased] = useState(false);
  const [showSidebarList, setShowSidebarList] = useState(false);
  const toggleNoProfile = () => {
    setprofilemenu(true);
  };
  const toggleOffProfile = () => {
    setprofilemenu(false);
  };
  const toggleOnCase = () => {
    setCaseMenu(true);
  };
  const toggleOfCase = () => {
    setCaseMenu(false);
  };
  const toggleNosession = () => {
    setSessionmenu(true);
  };
  const toggleOffSession = () => {
    setSessionmenu(false);
  };

  const MentorProfileShowingHandler = () => {
    if (!showMentorProfile) {
      setShowMentorProfile(true);
    }
    return (
      setShowSessionSetup(false),
      setShowNotification(false),
      setShowChangePwd(false),
      setshowMentorPsettings(false),
      setshowMentorUpcomingSessions(false),
      setShowMentorCompletedSessions(false),
      setShowMentorMessage(false),
      setCaseStudies(false),
      setShowSidebarList(false),
      setCaseStudiesSubmited(false),
      setcaseStudiesPurchased(false)
    );
  };

  const MentorPsettingsHandler = () => {
    if (!showMentorPsettings) {
      setshowMentorPsettings(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowMentorProfile(false),
      setShowMentorCompletedSessions(false),
      setshowMentorUpcomingSessions(false),
      setShowMentorMessage(false),
      setShowMentorCompletedSessions(false),
      setCaseStudies(false),
      setShowSidebarList(false),
      setCaseStudiesSubmited(false),
      setcaseStudiesPurchased(false)
    );
  };

  const MentorChangePwdHandler = () => {
    if (!showChangePwd) {
      setShowChangePwd(true);
    }
    return (
      setShowSessionSetup(false),
      setShowNotification(false),
      setShowMentorCompletedSessions(false),
      setshowMentorUpcomingSessions(false),
      setshowMentorPsettings(false),
      setShowMentorProfile(false),
      setShowMentorMessage(false),
      setCaseStudies(false),
      setShowSidebarList(false),
      setCaseStudiesSubmited(false),
      setcaseStudiesPurchased(false)
    );
  };

  const ShowMentorUpcomingHandler = () => {
    if (!showMentorUpcomingSessions) {
      setshowMentorUpcomingSessions(true);
    }
    return (
      setShowSessionSetup(false),
      setShowNotification(false),
      setShowChangePwd(false),
      setshowMentorPsettings(false),
      setShowMentorCompletedSessions(false),
      setShowMentorMessage(false),
      setShowMentorProfile(false),
      setCaseStudies(false),
      setShowSidebarList(false),
      setCaseStudiesSubmited(false),
      setcaseStudiesPurchased(false)
    );
  };
  const ShowMentorCompletedHandler = () => {
    if (!showMentorCompletedSessions) {
      setShowMentorCompletedSessions(true);
    }
    return (
      setShowMentorMessage(false),
      setShowNotification(false),
      setShowChangePwd(false),
      setshowMentorPsettings(false),
      setShowMentorProfile(false),
      setshowMentorUpcomingSessions(false),
      setCaseStudies(false),
      setShowSidebarList(false),
      setCaseStudiesSubmited(false),
      setcaseStudiesPurchased(false)
    );
  };

  const MentorNotificationHandler = () => {
    if (!showNotification) {
      setShowNotification(true);
    }
    return (
      // setShowNotification(!showNotification),
      setShowSessionSetup(false),
      setShowChangePwd(false),
      setshowMentorPsettings(false),
      setShowMentorProfile(false),
      setShowMentorCompletedSessions(false),
      setshowMentorUpcomingSessions(false),
      setShowMentorMessage(false),
      setCaseStudies(false),
      setShowMentorUpDetailsForm(false),
      setShowSidebarList(false),
      setCaseStudiesSubmited(false),
      setcaseStudiesPurchased(false)
    );
  };
  const MentorSessionSetupHandler = () => {
    if (!showSessionSetup) {
      setShowSessionSetup(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setshowMentorPsettings(false),
      setShowMentorProfile(false),
      setShowMentorCompletedSessions(false),
      setshowMentorUpcomingSessions(false),
      setShowMentorMessage(false),
      setCaseStudies(false),
      setShowSidebarList(false),
      setCaseStudiesSubmited(false),
      setcaseStudiesPurchased(false)
    );
  };
  const showMentorApplicationHandler = () => {
    if (!showMentorUpDetailsForm) {
      setShowMentorUpDetailsForm(true);
    }
    return (
      setShowNotification(false),
      setShowSidebarList(false),
      setCaseStudiesSubmited(false),
      setcaseStudiesPurchased(false)
    );
  };
  const MentorBankingShowingHandler = () => {
    if (!showMentorMessage) {
      setShowMentorMessage(true);
    }
    return (
      setShowSessionSetup(false),
      setShowNotification(false),
      setShowChangePwd(false),
      setshowMentorPsettings(false),
      setShowMentorCompletedSessions(false),
      setshowMentorUpcomingSessions(false),
      setShowMentorProfile(false),
      setCaseStudies(false),
      setShowSidebarList(false),
      setCaseStudiesSubmited(false),
      setcaseStudiesPurchased(false)
    );
  };

  const MentorCaseStudiesShowingHandler = () => {
    if (!caseStudies) {
      setCaseStudies(true);
    }
    return (
      setShowSessionSetup(false),
      setShowNotification(false),
      setShowChangePwd(false),
      setshowMentorPsettings(false),
      setShowMentorCompletedSessions(false),
      setshowMentorUpcomingSessions(false),
      setShowMentorProfile(false),
      setShowMentorMessage(false),
      setShowSidebarList(false),
      setCaseStudiesSubmited(false),
      setcaseStudiesPurchased(false)
    );
  };
  const MentorCaseStudiesSubmitedShowingHandler = () => {
    setCaseStudiesSubmited(true);

    return (
      setCaseStudies(false),
      setShowSessionSetup(false),
      setShowNotification(false),
      setShowChangePwd(false),
      setshowMentorPsettings(false),
      setShowMentorCompletedSessions(false),
      setshowMentorUpcomingSessions(false),
      setShowMentorProfile(false),
      setShowMentorMessage(false),
      setShowSidebarList(false),
      setcaseStudiesPurchased(false)
    );
  };
  const MentorCaseStudiesPurchasedShowingHandler = () => {
    setcaseStudiesPurchased(true);

    return (
      setCaseStudiesSubmited(false),
      setCaseStudies(false),
      setShowSessionSetup(false),
      setShowNotification(false),
      setShowChangePwd(false),
      setshowMentorPsettings(false),
      setShowMentorCompletedSessions(false),
      setshowMentorUpcomingSessions(false),
      setShowMentorProfile(false),
      setShowMentorMessage(false),
      setShowSidebarList(false)
    );
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogoutHandler = () => {
    return dispatch(logOut()), navigate("/login");
  };
  useEffect(() => {
    const notifications = singleMentor?.map((item) => {
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
  }, [singleMentor]);
  const ProgressBar = ({ progress }) => {
    const progressBarStyles = {
      height: "20px",
      // width: "100%",
      backgroundColor: "#e0e0de",
      borderRadius: "5px",
      overflow: "hidden",
    };

    const fillerStyles = {
      height: "100%",
      width: `${progress}%`,
      backgroundColor: progress < 50 ? "rgb(92 144 234)" : "#4caf50", // Red if < 50, Green if >= 50
      borderRadius: "inherit",
      textAlign: "right",
      transition: "width 0.5s ease-in-out",
    };

    const labelStyles = {
      padding: "5px",
      color: "white",
      fontWeight: "bold",
    };

    return (
      <div style={progressBarStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${progress}%`}</span>
        </div>
      </div>
    );
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
                      <button className="btn btn-main mt-0" type="button">
                        <i className="fa-solid ps-0 fa-user"></i>
                      </button>

                      <ul className="djioerr_dpdwn bg-white position-absolute d-none p-3">
                        <li>
                          <Link
                            target="_blanks"
                            to={`/mentor-club/mentor-profile/${
                              user?.user_firstname +
                              "-" +
                              user.user_lastname.replace(" ", "-").toLowerCase()
                            }/${user?.user_id}`}
                          >
                            View Public Profile
                          </Link>
                        </li>
                        {user?.user_role === 1 && (
                          <li>
                            <Link target="_blanks" to={`/user/admin/dashboard`}>
                              Admin Dashboard
                            </Link>
                          </li>
                        )}
                        <li onClick={userLogoutHandler}>Log Out</li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <div className="mentor_dashboard" id="mentorRegisterBg">
          {/* <div className="row"> */}
          <div className="">
            <div className="col-md-flex-center">
              <div
                className="mobileMenuIconMentorDashboard"
                onClick={() => {
                  return setShowSidebarList(!showSidebarList);
                }}
              >
                <i className="fa-solid fa-2x fa-bars-staggered"></i>
              </div>
              {showSidebarList && (
                <MentorDashboardSidebar
                  showSidebarList={showSidebarList}
                  setShowSidebarList={setShowSidebarList}
                  MentorNotificationHandler={MentorNotificationHandler}
                  MentorProfileShowingHandler={MentorProfileShowingHandler}
                  MentorBankingShowingHandler={MentorBankingShowingHandler}
                  MentorCaseStudiesShowingHandler={
                    MentorCaseStudiesShowingHandler
                  }
                  ShowMentorUpcomingHandler={ShowMentorUpcomingHandler}
                  ShowMentorCompletedHandler={ShowMentorCompletedHandler}
                  MentorChangePwdHandler={MentorChangePwdHandler}
                  MentorPsettingsHandler={MentorPsettingsHandler}
                />
              )}
              {mentorTotalProgress < 80 ? (
                <>
                  <div className={"display-raw"}>
                    <button
                      className="btn btn-transparent text-center py-3 seeeett"
                      onClick={showMentorApplicationHandler}
                    >
                      <span className="d-block bg-white position-relative m-auto">
                        {/* <i className="fa-solid fa-user"> */}
                        <i className="fa-solid fa-house-circle-check"></i>
                      </span>

                      <h5>Mentor Application</h5>
                    </button>
                    <button
                      className="btn btn-transparent text-center py-3 seeeett"
                      onClick={MentorNotificationHandler}
                    >
                      <span className="d-block bg-white position-relative m-auto">
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
                  </div>
                </>
              ) : (
                <div className="display-raw">
                  <button
                    className="btn btn-transparent text-center py-3 seeeett"
                    onClick={MentorProfileShowingHandler}
                  >
                    <span className="d-block bg-white position-relative m-auto">
                      {/* <i className="fa-solid fa-user"> */}
                      <i className="fa-solid fa-house-circle-check"></i>
                    </span>

                    <h5>Dashboard</h5>
                  </button>
                  <div className="Baseposition" onMouseLeave={toggleOffProfile}>
                    <button
                      className="btn btn-transparent text-center py-3 seeeett"
                      onMouseOver={toggleNoProfile}
                    >
                      <span className="d-block bg-white position-relative m-auto">
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
                          onClick={MentorPsettingsHandler}
                        >
                          <h5>Profile Change</h5>
                        </button>
                        <button
                          className="submenu-item1"
                          onClick={MentorChangePwdHandler}
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
                      <span className="d-block bg-white position-relative m-auto">
                        {/* <i className="fa-solid fa-bars-progress"></i> */}
                        <i className="fa-solid fa-tv"></i>
                      </span>
                      <h5>
                        Session Info
                        <i className="fa-solid fa-chevron-down downarrowsize"></i>
                      </h5>
                    </button>
                    {Sessionmenu && (
                      <div className="submenu1">
                        <button
                          className="submenu-item1"
                          onClick={ShowMentorUpcomingHandler}
                        >
                          <h5>Upcomig Session</h5>
                        </button>
                        <button
                          className="submenu-item1"
                          onClick={ShowMentorCompletedHandler}
                        >
                          <h5>Completed Session</h5>
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    className="btn btn-transparent text-center py-3 seeeett"
                    onClick={MentorBankingShowingHandler}
                  >
                    <span className="d-block bg-white position-relative m-auto">
                      {/* <i className="fa-brands fa-rocketchat"></i> */}
                      <i className="fa-solid fa-building-columns"></i>
                    </span>

                    <h5>Bank Details</h5>
                  </button>

                  <button
                    className="btn btn-transparent text-center py-3 seeeett"
                    onClick={MentorNotificationHandler}
                  >
                    <span className="d-block bg-white position-relative m-auto">
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

                  {/* ************************************************************************ */}

                  {singleMentor[0]?.mentor_curating_case_studies_interest ===
                    "Yes" && (
                    <div className="Baseposition" onMouseLeave={toggleOfCase}>
                      <button
                        className="btn btn-transparent text-center py-3 seeeett"
                        onMouseOver={toggleOnCase}
                      >
                        <span className="d-block bg-white position-relative m-auto">
                          <i className="fa-solid fa-folder"></i>
                        </span>
                        <h5>
                          Case Studies
                          <i className="fa-solid fa-chevron-down downarrowsize"></i>
                        </h5>
                      </button>
                      {CaseMenu && (
                        <div className="submenu1">
                          <button
                            className="submenu-item1"
                            onClick={MentorCaseStudiesShowingHandler}
                          >
                            <h5>Create Case Study</h5>
                          </button>
                          <button
                            className="submenu-item1"
                            onClick={MentorCaseStudiesSubmitedShowingHandler}
                          >
                            <h5>Submitted Case Study</h5>
                          </button>
                          <button
                            className="submenu-item1"
                            onClick={MentorCaseStudiesPurchasedShowingHandler}
                          >
                            <h5>Purchased Case Studies</h5>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {/* ************************************************************************ */}
                </div>
              )}

              <div>
                <h5 className="h5stmt" style={{ margin: "0px" }}>
                  Status :
                  {singleMentor[0]?.mentor_approved_status === "Yes" && (
                    <>
                      <i className="fa-solid fa-circle-check fa-lg approveStatus"></i>
                      Approved
                    </>
                  )}
                  {singleMentor[0]?.mentor_approved_status === "No" && (
                    <>
                      <i className="fa-solid fa-circle-exclamation fa-lg disapproveStatus"></i>
                      Not Approved
                    </>
                  )}
                </h5>
              </div>
            </div>
            <div className="progressbarContainer">
              {singleMentor[0]?.mentor_approved_status === "No" &&
                mentorTotalProgress < 80 && (
                  <>
                    <div
                      className="idneihrrr p-3 jhjhjujhhh"
                      style={{
                        marginBottom:
                          mentorTotalProgress >= 80 ? "16px" : "0px",
                      }}
                    >
                      <h5 className="mb-0">
                        Hi
                        <span className="mentorNameSpan">
                          {" " + user?.user_firstname}
                        </span>
                        , Let's Get finished your mentor application. It Will
                        Take Approx. 4 Mins For Completing Profile
                      </h5>
                    </div>
                    <p className="errorNoteText">
                      (A minimum of 80% is needed to approve the mentor
                      application!)
                    </p>
                    <ProgressBar progress={mentorTotalProgress} />
                  </>
                )}
              {singleMentor[0]?.mentor_approved_status === "Yes" &&
                mentorTotalProgress > 80 && (
                  <>
                    <div
                      className="idneihrrr p-3 jhjhjujhhh"
                      style={{
                        marginBottom:
                          mentorTotalProgress >= 80 ? "16px" : "0px",
                      }}
                    >
                      <h5 className="mb-0">
                        Hi
                        <span className="mentorNameSpan">
                          {" " + user?.user_firstname}
                        </span>
                        , congratulations! Your mentor application has been
                        approved. We're excited to have you on board. Welcome to
                        the mentor community!
                      </h5>
                    </div>
                  </>
                )}
              {singleMentor[0]?.mentor_approved_status === "No" &&
                mentorTotalProgress === 80 && (
                  <>
                    <div
                      className="idneihrrr p-3 jhjhjujhhh"
                      style={{
                        marginBottom: mentorTotalProgress === 80 ? "0px" : "",
                      }}
                    >
                      <h5 className="mb-0">
                        Hi
                        <span className="mentorNameSpan">
                          {" " + user?.user_firstname}
                        </span>
                        , congratulations on completing the mentor application.
                        We are currently reviewing your submission. Please wait
                        for our approval.
                      </h5>
                    </div>
                    <p className="errorNoteText">
                      (Please complete the Preference and About Yourself page
                      details in the profile settings page.)
                    </p>
                    <ProgressBar progress={mentorTotalProgress} />
                  </>
                )}
              {singleMentor[0]?.mentor_approved_status === "No" &&
                mentorTotalProgress === 100 && (
                  <>
                    <div
                      className="idneihrrr p-3 jhjhjujhhh"
                      style={{
                        marginBottom: mentorTotalProgress === 100 ? "16px" : "",
                      }}
                    >
                      <h5 className="mb-0">
                        Hi
                        <span className="mentorNameSpan">
                          {" " + user?.user_firstname}
                        </span>
                        , congratulations on completing the mentor application.
                        We are currently reviewing your submission. Please wait
                        for our approval.
                      </h5>
                    </div>
                    <ProgressBar progress={mentorTotalProgress} />
                  </>
                )}
            </div>
            <div
              className="maincontent"
              onClick={() => {
                return setShowSidebarList(false);
              }}
            >
              {loading && <SingleMentorProfilePageSkelton />}
              {showNotification && (
                <MentorNotifications
                  user={user}
                  token={token}
                  data={singleMentor}
                  mentorDtlsId={mentorDtlsId}
                />
              )}
              {showSessionSetup && (
                <MentorSessionSetup
                  user={user}
                  token={token}
                  data={singleMentor}
                />
              )}
              {showChangePwd && (
                <MentorChangePwd
                  user={user}
                  token={token}
                  data={singleMentor}
                />
              )}
              {showMentorPsettings && (
                <MentorProfileSettings
                  user={user}
                  token={token}
                  data={singleMentor}
                />
              )}
              {showMentorProfile && (
                <MentorProfile user={user} token={token} data={singleMentor} />
              )}
              {showMentorUpDetailsForm && (
                <MentorRegProgressForm
                  user={user}
                  token={token}
                  singleMentor={singleMentor}
                />
              )}
              {showMentorMessage && (
                <MentorBankdetails
                  user={user}
                  token={token}
                  data={singleMentor}
                />
              )}
              {showMentorUpcomingSessions && (
                <MentorUpcomingSessions
                  user={user}
                  token={token}
                  data={singleMentor}
                />
              )}
              {showMentorCompletedSessions && (
                <MentorCompletedSessions
                  user={user}
                  token={token}
                  data={singleMentor}
                />
              )}
              {caseStudies && (
                <MentorCaseStudyInput
                  user={user}
                  token={token}
                  data={singleMentor}
                />
              )}
              {caseStudiesSubmited && (
                <MentorCaseStudySubmited
                  user={user}
                  token={token}
                  data={singleMentor}
                />
              )}
              {caseStudiesPurchased && (
                <MentorCaseStudyPurchased
                  user={user}
                  token={token}
                  data={singleMentor}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorDashboard;
