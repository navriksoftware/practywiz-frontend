import { useState, useEffect } from "react";
import Spinner from "../../Utils/Spinner.js";
import Logo from "../../Images/logo.png";
import EmployerProfile from "../Employer/Internships/OtherComponents/EmployerProfile.js";
import PostInternship from "../Employer/Internships/OtherComponents/PostInternship.js";
import ApplicationsReceived from "../Employer/Internships/OtherComponents/ApplicationsReceived.js";
import ViewEditInternshipPost from "../Employer/Internships/OtherComponents/ViewEditInternshipPost.js";
import { ApiURL } from "../../Utils/ApiURL";
import InternshipChangePwd from "../Employer/Internships/OtherComponents/InternshipChangePwd.js";
import PostedInternshipListing from "./Internships/OtherComponents/PostedInternships.js";
import InternshipNotification from "../Employer/Internships/OtherComponents/InternshipNotification.js";
import InternshipProfileSettings from "../Employer/Internships/OtherComponents/InternshipProfileSettings.js";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/userRedux.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import OrgUpdateDetails from "./OrgUpdateDetails/OrgUpdateDetails.js";
import InternManagement from "./Internships/OtherComponents/InternManagement.js";
import { set } from "react-hook-form";
import EditInternshipPost from "./Internships/OtherComponents/EditInternshipPost.js";

const EmployerDashboard = ({ user, token }) => {
  const [employerDetails, setEmployerDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOrgUpdateDetails, setShowOrgUpdateDetails] = useState(false);
  const [employerTotalProgress, setEmployerTotalProgress] = useState(0);
  const [showEmployerProfile, setShowEmployerProfile] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [showInternshipDashboad, setshowInternshipDashboad] = useState(false);
  const [ShowPostInternship, setShowPostInternship] = useState(false);
  const [ShowPostedInternship, setShowPostedInternship] = useState(false);
  const [InternshipApplicationR, setInternshipApplicationR] = useState(false);

  const [mobMenu, setMobMenu] = useState(false);
  const [mobProfileSubMenu, setMobProfileSubMenu] = useState(false);

  const [InternshipProfileSetting, setInternshipProfileSetting] =
    useState(false);
  const [InternshipChangePassword, setInternshipChangePassword] =
    useState(false);
  const [ShowInternshipNotification, setShowInternshipNotification] =
    useState(false);
  const [showViewEditInternshipPost, setShowViewEditInternshipPost] =
    useState(false);
  const [profilemenu, setprofilemenu] = useState(false);
  const [Sessionmenu, setSessionmenu] = useState(false);

  const [showInternManagement, setShowInternManagement] = useState(false);

  const [showInternshipPostId, setShowInternshipPostId] = useState(null);

  const [showEditInternshipPost, setShowEditInternshipPost] = useState(false);
  const [internPostData, setInternPostData] = useState(null); // try to use another method to get the data in future

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage || "dashboard";
  }); //to save current page on refresh

  const toggleOnProfile = () => {
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

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    return () => {
      // Cleanup localStorage when component unmounts
      localStorage.removeItem("currentPage");
    };
  }, []);
  //
  const HandleInternshipDashBoardProfile = () => {
    if (!showInternshipDashboad) {
      setshowInternshipDashboad(true);
      setCurrentPage("dashboard");
    }
    return (
      setShowInternshipNotification(false),
      setInternshipApplicationR(false),
      setShowPostInternship(false),
      setInternshipProfileSetting(false),
      setInternshipChangePassword(false),
      setShowViewEditInternshipPost(false),
      setShowPostedInternship(false),
      setShowInternManagement(false),
      setShowEditInternshipPost(false)
    );
  };

  const HandlePostedInternship = () => {
    if (!ShowPostedInternship) {
      setShowPostedInternship(true);
      setCurrentPage("postedInternship");
    }
    return (
      setShowInternshipNotification(false),
      setInternshipApplicationR(false),
      setshowInternshipDashboad(false),
      setShowPostInternship(false),
      setInternshipProfileSetting(false),
      setInternshipChangePassword(false),
      setShowViewEditInternshipPost(false),
      setShowInternManagement(false),
      setShowEditInternshipPost(false)
    );
  };

  const HandlePostInternship = () => {
    if (!ShowPostInternship) {
      setShowPostInternship(true);
      setCurrentPage("postInternship");
    }
    return (
      setShowInternshipNotification(false),
      setInternshipApplicationR(false),
      setshowInternshipDashboad(false),
      setInternshipProfileSetting(false),
      setInternshipChangePassword(false),
      setShowViewEditInternshipPost(false),
      setShowPostedInternship(false),
      setShowInternManagement(false),
      setShowEditInternshipPost(false)
    );
  };
  const HandleShowInternshipNotification = () => {
    if (!ShowInternshipNotification) {
      setShowInternshipNotification(true);
      setCurrentPage("notifications");
    }
    return (
      setShowPostInternship(false),
      setInternshipApplicationR(false),
      setshowInternshipDashboad(false),
      setInternshipProfileSetting(false),
      setInternshipChangePassword(false),
      setShowViewEditInternshipPost(false),
      setShowPostedInternship(false),
      setShowInternManagement(false),
      setShowEditInternshipPost(false)
    );
  };

  const HandleApplicationsReceived = () => {
    if (!InternshipApplicationR) {
      setInternshipApplicationR(true);
      setCurrentPage("applications");
    }
    return (
      setShowPostInternship(false),
      setShowInternshipNotification(false),
      setshowInternshipDashboad(false),
      setInternshipProfileSetting(false),
      setInternshipChangePassword(false),
      setShowViewEditInternshipPost(false),
      setShowPostedInternship(false),
      setShowInternManagement(false),
      setShowEditInternshipPost(false)
    );
  };
  const HandleChangePwd = () => {
    if (!InternshipChangePassword) {
      setInternshipChangePassword(true);
      setCurrentPage("changePassword");
    }
    return (
      setShowPostInternship(false),
      setShowInternshipNotification(false),
      setshowInternshipDashboad(false),
      setInternshipProfileSetting(false),
      setInternshipApplicationR(false),
      setShowViewEditInternshipPost(false),
      setShowPostedInternship(false),
      setShowInternManagement(false),
      setShowEditInternshipPost(false)
    );
  };
  const HandleInternshipProfileSetting = () => {
    if (!InternshipProfileSetting) {
      setInternshipProfileSetting(true);
      setCurrentPage("profileSettings");
    }
    return (
      setShowPostInternship(false),
      setShowInternshipNotification(false),
      setshowInternshipDashboad(false),
      setInternshipApplicationR(false),
      setInternshipChangePassword(false),
      setShowViewEditInternshipPost(false),
      setShowPostedInternship(false),
      setShowInternManagement(false),
      setShowEditInternshipPost(false)
    );
  };

  const handleEditInternshipPost = (id) => {
    if (!showViewEditInternshipPost) {
      setShowInternshipPostId(id);
      setShowViewEditInternshipPost(true);
    }
    return (
      setShowPostInternship(false),
      setShowInternshipNotification(false),
      setshowInternshipDashboad(false),
      setInternshipApplicationR(false),
      setInternshipChangePassword(false),
      setInternshipProfileSetting(false),
      setShowPostedInternship(false),
      setShowInternManagement(false),
      setShowEditInternshipPost(false)
    );
  };

  const handleInternManagement = () => {
    if (!showInternManagement) {
      setShowInternManagement(true);
      setCurrentPage("internManagement");
    }
    return (
      setShowPostInternship(false),
      setShowInternshipNotification(false),
      setshowInternshipDashboad(false),
      setInternshipApplicationR(false),
      setInternshipChangePassword(false),
      setInternshipProfileSetting(false),
      setShowPostedInternship(false),
      setShowViewEditInternshipPost(false),
      setShowEditInternshipPost(false)
    );
  };

  const handleEditInternshipSinglePost = () => {
    if (!showEditInternshipPost) {
      setShowEditInternshipPost(true);
    }
    return (
      setShowPostInternship(false),
      setShowInternshipNotification(false),
      setshowInternshipDashboad(false),
      setInternshipApplicationR(false),
      setInternshipChangePassword(false),
      setInternshipProfileSetting(false),
      setShowPostedInternship(false),
      setShowViewEditInternshipPost(false),
      setShowInternManagement(false)
    );
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = ApiURL();
  const userLogoutHandler = () => {
    localStorage.removeItem("currentPage");
    return dispatch(logOut()), navigate("/login");
  };

  const employerUserDtlsId = user?.user_id;
  useEffect(() => {
    const fetchSingleMentors = async () => {
      setLoading(true);
      const response = await axios.post(
        `${url}api/v1/employer/dashboard/fetch-single-details/${employerUserDtlsId}`,
        { userId: employerUserDtlsId }
      );
      setLoading(false);
      if (response.data.success) {
        if (response.data.success[0]?.total_progress === 50) {
          return (
            setShowOrgUpdateDetails(true),
            setEmployerDetails(response.data.success),
            setLoading(false),
            setEmployerTotalProgress(response.data.success[0]?.total_progress),
            setShowEmployerProfile(false),
            setShowPostInternship(false),
            setShowInternshipNotification(false),
            setshowInternshipDashboad(false),
            setInternshipApplicationR(false),
            setInternshipChangePassword(false),
            setInternshipProfileSetting(false),
            setShowPostedInternship(false),
            setShowViewEditInternshipPost(false),
            setShowInternManagement(false),
            setShowEditInternshipPost(false)
          );
        } else if (response.data.success[0]?.total_progress === 90) {
          return (
            setEmployerDetails(response.data.success),
            setLoading(false),
            setEmployerTotalProgress(response.data.success[0]?.total_progress)
          );
        } else if (response.data.success[0]?.total_progress === 100) {
          return (
            setShowOrgUpdateDetails(false),
            setEmployerDetails(response.data.success),
            setLoading(false),
            setEmployerTotalProgress(response.data.success[0]?.total_progress),
            setShowEmployerProfile(true),
            setCurrentPage("dashboard")
          );
        }
      }
      if (response.data.error) {
        return setLoading(false), setEmployerDetails(null);
      }
    };
    fetchSingleMentors();
  }, [employerUserDtlsId, url]);
  useEffect(() => {
    const notifications = employerDetails?.map((item) => {
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
  }, [employerDetails]);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (!savedPage) {
      return HandleInternshipDashBoardProfile();
    }
    // if (employerDetails.length > 0) {
    switch (savedPage) {
      case "dashboard":
        HandleInternshipDashBoardProfile();
        break;
      case "postedInternship":
        HandlePostedInternship();
        break;
      case "postInternship":
        HandlePostInternship();
        break;
      case "notifications":
        HandleShowInternshipNotification();
        break;
      case "applications":
        HandleApplicationsReceived();
        break;
      case "changePassword":
        HandleChangePwd();
        break;
      case "profileSettings":
        HandleInternshipProfileSetting();
        break;
      case "internManagement":
        handleInternManagement();
        break;
      default:
        HandleInternshipDashBoardProfile();
    }
    // }
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
                          {/* <li>
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
                        </li> */}
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
                          <li onClick={userLogoutHandler}>Log Out</li>
                        </ul>
                      </div>
                    </form>
                  </div>
                  <div className="odejr_res d-none">
                    <div className="d-flex align-items-center">
                      {/* Employer dashboard modile view menu  */}
                      <div className="udgehrr position-relative me-3 ps-3">
                        <div
                          className="dashboard-side-bar"
                          id="responsive-side-bar"
                        >
                          <i
                            class="fa-solid fa-bars"
                            style={{ fontSize: "1.5rem" }}
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
                                  }}
                                ></i>
                              </li>
                              <li
                                className="menu-items"
                                onClick={HandleInternshipDashBoardProfile}
                              >
                                <span>
                                  <i className=" fa-solid fa-user"> </i>
                                </span>
                                <span>Dashboard</span>
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

                              <li
                                onClick={() => {
                                  setMobProfileSubMenu(!mobProfileSubMenu);
                                  // setMySessionInfo(false);
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
                                      <li
                                        onClick={HandleInternshipProfileSetting}
                                      >
                                        Profile Change
                                      </li>
                                      <li onClick={HandleChangePwd}>
                                        Change Password
                                      </li>
                                    </ul>
                                  )}
                                </span>
                              </li>

                              {/* <li
                              onClick={() => {
                                // setMySessionInfo(!mySessionInfo);
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
                                  <li
                                  //  onClick={ShowMenteeUpcomingHandler}
                                  >
                                    Upcomig Session
                                  </li>
                                  <li 
                                  // onClick={ShowMenteeCompletedHandler}
                                  >
                                    Completed Session
                                  </li>
                                </ul>
                              )}
                            </li> */}

                              <li
                                className="menu-items"
                                onClick={HandlePostedInternship}
                              >
                                <span>
                                  <i className=" fa-solid fa-userfa-solid fa-clock-rotate-left">
                                    {" "}
                                  </i>
                                </span>
                                <span>Posted Internship</span>
                              </li>
                              <li
                                className="menu-items"
                                onClick={HandlePostInternship}
                              >
                                <span>
                                  <i className=" fa-solid fa-userfa-solid fa-clock-rotate-left">
                                    {" "}
                                  </i>
                                </span>
                                <span>Post Internship</span>
                              </li>

                              <li
                                className="menu-items"
                                onClick={HandleShowInternshipNotification}
                              >
                                <span>
                                  <i className="fa-solid fa-bell"> </i>
                                </span>
                                <span>Notifications </span>
                              </li>
                              <li
                                onClick={userLogoutHandler}
                                className="menu-items"
                              >
                                <span>
                                  <i class="fa-solid fa-right-from-bracket"></i>
                                </span>
                                <span>Log Out</span>
                              </li>
                              <li></li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </header>

          <div className="mentor_dashboard" id="mentorRegisterBg">
            {/* <div className="row"> */}
            <div className="">
              <div className="col-md-flex-center">
                {showOrgUpdateDetails ? (
                  <div className="display-raw">
                    <button
                      className="btn btn-transparent text-center py-3 seeeett"
                      onClick={HandleInternshipDashBoardProfile}
                    >
                      <span className="d-block bg-white position-relative m-auto">
                        {/* <i className="fa-solid fa-user"> */}
                        <i className="fa-solid fa-house-circle-check"></i>
                      </span>

                      <h5>Dashboard</h5>
                    </button>
                    <button
                      className="btn btn-transparent text-center py-3 seeeett"
                      onClick={HandleShowInternshipNotification}
                    >
                      <i className="fa-solid fa-bell"></i>
                      <span className="d-block bg-white position-relative m-auto">
                        {hasUnreadNotifications && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-15px",
                              right: "7px",
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
                ) : (
                  <div className="display-raw">
                    <button
                      className="btn btn-transparent text-center py-3 seeeett"
                      onClick={HandleInternshipDashBoardProfile}
                    >
                      <span className="d-block bg-white position-relative m-auto">
                        {/* <i className="fa-solid fa-user"> */}
                        <i className="fa-solid fa-house-circle-check"></i>
                      </span>

                      <h5>Dashboard</h5>
                    </button>
                    <div
                      className="Baseposition"
                      onMouseLeave={toggleOffProfile}
                    >
                      <button
                        className="btn btn-transparent text-center py-3 seeeett"
                        onMouseOver={toggleOnProfile}
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
                            onClick={HandleInternshipProfileSetting}
                          >
                            <h5>Profile Change</h5>
                          </button>
                          <button
                            className="submenu-item1"
                            onClick={HandleChangePwd}
                          >
                            <h5>Change Password</h5>
                          </button>
                        </div>
                      )}
                    </div>{" "}
                    <button
                      className="btn btn-transparent text-center py-3 seeeett"
                      onClick={HandlePostedInternship}
                    >
                      <span className="d-block bg-white position-relative m-auto">
                        <i class="fa-solid fa-folder-open"></i>
                      </span>

                      <h5>Posted Internships</h5>
                    </button>
                    <button
                      className="btn btn-transparent text-center py-3 seeeett"
                      onClick={HandlePostInternship}
                    >
                      <span className="d-block bg-white position-relative m-auto">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </span>

                      <h5>Post Internship</h5>
                    </button>
                    {/* 
                <button
                  className="btn btn-transparent text-center py-3 seeeett"
                  onClick={HandleApplicationsReceived}
                >
                  <span className="d-block bg-white position-relative m-auto">
                    <i className="fa-solid fa-folder"></i>
                  </span>

                  <h5>Applications received</h5>
                </button> */}
                    {/* handleInternManagement */}
                    {/* <button
                    className="btn btn-transparent text-center py-3 seeeett"
                    onClick={handleInternManagement}
                  >
                    <span className="d-block bg-white position-relative m-auto">
                      <i className="fa-solid fa-folder"></i>
                    </span>
                    <h5>Intern Management</h5>
                  </button> */}
                    <button
                      className="btn btn-transparent text-center py-3 seeeett"
                      onClick={HandleShowInternshipNotification}
                    >
                      {" "}
                      <i className="fa-solid fa-bell"></i>
                      <span className="d-block bg-white position-relative m-auto">
                        {hasUnreadNotifications && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-15px",
                              right: "7px",
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
                )}
              </div>

              <div className="maincontent">
                {showOrgUpdateDetails && (
                  <OrgUpdateDetails employerUserDtlsId={employerUserDtlsId} />
                )}

                {ShowPostedInternship && (
                  <PostedInternshipListing
                    data={employerDetails}
                    employerDtlsId={employerUserDtlsId}
                    onEditInternshipPost={handleEditInternshipPost}
                  />
                )}
                {ShowPostInternship && (
                  <PostInternship
                    user={user}
                    token={token}
                    employerDetails={employerDetails}
                    setCurrentPage={setCurrentPage}
                  />
                )}
                {/* {InternshipApplicationR && <ApplicationsReceived />} */}
                {ShowInternshipNotification && (
                  <InternshipNotification
                    data={employerDetails}
                    employerDtlsId={employerUserDtlsId}
                  />
                )}
                {showInternshipDashboad && (
                  <EmployerProfile
                    data={employerDetails}
                    employerDtlsId={employerUserDtlsId}
                    token={token}
                  />
                  // <PostedInternshipListing
                  //   data={employerDetails}
                  //   employerDtlsId={employerUserDtlsId}
                  //   onEditInternshipPost={handleEditInternshipPost}
                  // />
                )}
                {InternshipProfileSetting && (
                  <InternshipProfileSettings
                    data={employerDetails}
                    employerDtlsId={employerUserDtlsId}
                  />
                )}
                {InternshipChangePassword && (
                  <InternshipChangePwd user={user} token={token} />
                )}
                {showViewEditInternshipPost && (
                  <ViewEditInternshipPost
                    internshipPostId={showInternshipPostId}
                    onEditInternshipPost={handleEditInternshipSinglePost}
                    setInternPostData={setInternPostData}
                  />
                )}

                {showEditInternshipPost && (
                  <EditInternshipPost
                    internshipPostId={showInternshipPostId}
                    internPostData={internPostData}
                    user={user}
                    token={token}
                    employerDetails={employerDetails}
                  />
                )}

                {showInternManagement && (
                  <InternManagement employerDtlsId={employerUserDtlsId} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployerDashboard;
