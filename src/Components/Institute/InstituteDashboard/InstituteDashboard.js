import React, { useEffect, useState } from "react";
import "./DashboardCSS/Institutedashboardnotification.css";
import Logo from "../../../Images/logo.png";
import InstituteNotifications from "./OtherComponents/InstituteNotifications";
import InstituteChangePwd from "./OtherComponents/InstituteChangePwd";
import InstituteMessages from "./OtherComponents/InstituteMessages";
import InstituteProfileDashboard from "./OtherComponents/InstituteProfileDashboard";
import AddMentor from "./OtherComponents/AddMentor";
import SearchGuestLacture from "./OtherComponents/SearchGuestLacture";
import RequestGuestlacture from "./OtherComponents/RequestGuestLacture";
import RegisterGuestlacture from "./OtherComponents/RegisterGuestLacture";
import HistoryGuestlacture from "./OtherComponents/HistoryGuestlacture";
import CommunicationTemplate from "./OtherComponents/CommunicationTemplate";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../Redux/userRedux";
import AlumniMentor from "./OtherComponents/AlumniMentor";
import NonAlumniMentor from "./OtherComponents/NonAlumniMentor";
import AlumniList from "./OtherComponents/AlumniList";
import InstituteProfileSetting from "./OtherComponents/InstituteProfileSetting";
import InstituteUserList from "./OtherComponents/InstituteUserList";
import { ApiURL } from "../../../Utils/ApiURL";
import axios from "axios";
import CaseStudiesListPage from "./OtherComponents/CaseStudiesListPage";
import { set } from "react-hook-form";
import TeacherDetailslistings from "./OtherComponents/TeacherDetailslistings";
import SingleTeacherdetailspage from "./OtherComponents/SingleTeacherdetailspage";

const InstituteDashboard = ({ user, token }) => {
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [showInstituteMessage, setShowInstituteMessage] = useState(false);
  const [showInstituteProfile, setshowInstituteProfile] = useState(true);
  const [showAddMentor, setshowAddMentor] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showsearchguest, setshowsearchguest] = useState(false);
  const [ShowRequestGuest, setShowRequestGuest] = useState(false);
  const [ShowRegisterGuest, setShowRegisterGuest] = useState(false);
  const [ShowHistory, setShowHistory] = useState(false);
  const [ShowAlumniMentor, setShowAlumniMentor] = useState(false);
  const [ShowNonAlumniMentor, setShowNonAlumniMentor] = useState(false);
  const [AlumniListMentor, setAlumniListMentor] = useState(false);
  const [CaseStudiesList, setCaseStudiesList] = useState(false);
  const [TeachersList, setTeachersList] = useState(false);
  const [SingleTeacherdetails, setSingleTeacherdetails] = useState(false)
  const [Communication, setCommunication] = useState(false);
  const [profilemenu, setprofilemenu] = useState(false);
  const [mentormenu, setmentormenu] = useState(false);
  const [sub_sub1, setsub_sub1] = useState(false);
  const [sub_sub2, setsub_sub2] = useState(false);
  const toggleMenu = () => {
    setIsOpen(true);
    setsub_sub2(false);
    setsub_sub1(false);
  };
  const toggleMenu2 = () => {
    setIsOpen(false);
  };
  const toggleMenu1 = () => {
    setprofilemenu(true);
    setsub_sub2(false);
    setsub_sub1(false);
  };
  const toggleMenu3 = () => {
    setprofilemenu(false);
  };
  const toggleMenu4 = () => {
    setmentormenu(true);
  };
  const toggleMenu5 = () => {
    setmentormenu(false);
  };
  const toggleMenu6 = () => {
    setsub_sub1(true);
    setsub_sub2(false);
  };
  const toggleMenu7 = () => {
    setsub_sub1(false);
    setsub_sub2(true);
  };
  const toggleMenu8 = () => {
    setsub_sub1(false);
    setsub_sub2(false);
  };
  // const toggleMenu9 = () => {};
  const SubmenuAllOff = () => {
    setsub_sub2(false);
    setsub_sub1(false);
    setmentormenu(false);
  };

  const InstituteUsersListHandler = () => {
    if (!showProfileSettings) {
      setShowUserList(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowsearchguest(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowHistory(false),
      setshowAddMentor(false),
      setCommunication(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowProfileSettings(false),
      setshowInstituteProfile(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };
  const InstituteProfileSettingHandler = () => {
    if (!showProfileSettings) {
      setShowProfileSettings(true);
    }
    return (
      setShowNotification(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowsearchguest(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowHistory(false),
      setshowAddMentor(false),
      setCommunication(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setshowInstituteProfile(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };

  const InstituteProfileHandler = () => {
    if (!showInstituteProfile) {
      setshowInstituteProfile(true);
    }
    return (
      setShowProfileSettings(false),
      setShowNotification(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowsearchguest(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowHistory(false),
      setshowAddMentor(false),
      setCommunication(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };

  const InstituteAddmentorShowingHandler = () => {
    if (!showAddMentor) {
      setshowAddMentor(true);
    }
    return (
      setShowProfileSettings(false),
      setShowNotification(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowHistory(false),
      setCommunication(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };

  const InstituteNotificationHandler = () => {
    if (!showNotification) {
      setShowNotification(true);
    }
    return (
      setShowProfileSettings(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowHistory(false),
      setshowAddMentor(false),
      setCommunication(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };

  const InstituteSearchGuestLacture = () => {
    if (!showsearchguest) {
      setshowsearchguest(true);
    }
    return (
      setShowProfileSettings(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowHistory(false),
      setshowAddMentor(false),
      setShowNotification(false),
      setCommunication(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };

  const InstituteRequestGuest = () => {
    if (!ShowRequestGuest) {
      setShowRequestGuest(true);
    }
    return (
      setShowProfileSettings(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setShowRegisterGuest(false),
      setShowHistory(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setCommunication(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };
  const InstituteRegiterGuest = () => {
    if (!ShowRegisterGuest) {
      setShowRegisterGuest(true);
    }
    return (
      setShowProfileSettings(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setShowRequestGuest(false),
      setShowHistory(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setCommunication(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };
  const InstituteHistoryGuest = () => {
    if (!ShowHistory) {
      setShowHistory(true);
    }
    return (
      setShowProfileSettings(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setCommunication(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };

  const InstituteCommunicationTemplate = () => {
    if (!Communication) {
      setCommunication(true);
    }
    return (
      setShowProfileSettings(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setShowHistory(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };

  const InstituteAlumniMentor = () => {
    if (!ShowAlumniMentor) {
      setShowAlumniMentor(true);
    }
    return (
      setShowProfileSettings(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setCommunication(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setShowHistory(false),
      setShowChangePwd(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };

  const InstituteNonAlumniMentor = () => {
    if (!ShowNonAlumniMentor) {
      setShowNonAlumniMentor(true);
    }
    return (
      setShowProfileSettings(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setCommunication(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setShowHistory(false),
      setShowAlumniMentor(false),
      setShowChangePwd(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };
  const InstituteAlumniListMentor = () => {
    if (!AlumniListMentor) {
      setAlumniListMentor(true);
    }
    return (
      setShowProfileSettings(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setCommunication(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setShowHistory(false),
      setShowNonAlumniMentor(false),
      setShowChangePwd(false),
      setShowAlumniMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };

  const InstituteChangePwdHandler = () => {
    if (!showChangePwd) {
      setShowChangePwd(true);
    }
    return (
      setShowProfileSettings(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setCommunication(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setShowHistory(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };
  const HandleCaseStudieslist = () => {
    if (!CaseStudiesList) {
      setCaseStudiesList(true)
    }
    return (
      setShowProfileSettings(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setCommunication(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setShowHistory(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setTeachersList(false),
      setSingleTeacherdetails(false)
    );
  };
  const HandleTeacherslist = () => {
    if (!TeachersList) {
      setTeachersList(true)
    }
    return (
      setShowProfileSettings(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setCommunication(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setShowHistory(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setSingleTeacherdetails(false)
    );
  };
  const HandleSingleTeacherDetails = () => {
    if (!SingleTeacherdetails) {
      setSingleTeacherdetails(true)
    }
    return (
      setShowProfileSettings(false),
      setShowChangePwd(false),
      setShowInstituteMessage(false),
      setshowInstituteProfile(false),
      setshowsearchguest(false),
      setCommunication(false),
      setShowRequestGuest(false),
      setShowRegisterGuest(false),
      setShowNotification(false),
      setshowAddMentor(false),
      setShowHistory(false),
      setShowAlumniMentor(false),
      setShowNonAlumniMentor(false),
      setAlumniListMentor(false),
      setShowUserList(false),
      setCaseStudiesList(false),
      setTeachersList(false)
    );
  };






  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogoutHandler = () => {
    return dispatch(logOut()), navigate("/login");
  };
  const [instituteDashboardDetails, setInstituteDashboardDetails] = useState(
    []
  );
  const url = ApiURL();
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await Promise.race([
          axios.post(`${url}api/v1/institute/dashboard/get-details`, {
            instituteUserId: user?.user_id,
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setInstituteDashboardDetails(response.data.success);
        } else if (response.data.error) {
          setInstituteDashboardDetails([]);
        }
      } catch (error) {
        setInstituteDashboardDetails([]);
        if (error.message === "Request timed out") {
          console.log("Request timed out. Please try again.");
        } else {
          console.log("An error occurred. Please try again.");
        }
      } finally {
        console.log("Request completed");
      }
    };
    fetchMentors();
  }, [url, user?.user_id]);
  useEffect(() => {
    const notifications = instituteDashboardDetails?.map((item) => {
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
  }, [instituteDashboardDetails]);
  return (
    <>
      <div className="md-header">
        <header>
          <div className="header-wrapper">
            <nav className="navbar mx-4 px-3 mt-3 navbar-expand-sm navbar-light bg-color">
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
                        <li>Account Settings</li>
                        <li>View Public Profile</li>
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

                <div className="odejr_res d-none">
                  <div className="d-flex align-items-center">
                    <div className="udgehrr position-relative me-3 ps-3">
                      <button className="btn btn-main mt-0" type="button">
                        <i className="fa-solid ps-0 fa-user"></i>
                      </button>

                      <ul className="djioerr_dpdwn bg-white position-absolute d-none p-3">
                        <li>Account Settings</li>

                        <li>View Public Profile</li>

                        <li>Log Out</li>
                      </ul>
                    </div>

                    <div
                      className="dashboard-side-bar"
                      id="responsive-side-bar"
                    >
                      <i className="fa-solid fa-2x fa-bars-staggered"></i>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <div className="mentor_dashboard">
          {/* <div className="row"> */}
          {/* <div className="col-lg-2 pe-0 csdegbfraedd"> */}
          <div className=" display-raw  ">
            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={InstituteProfileHandler}
            >
              <span className="d-block bg-white position-relative m-auto ">
                <i className="fa-solid fa-house-circle-check"></i>
              </span>

              <h5>Dashboard</h5>
            </button>
            <div className="Baseposition" onMouseLeave={toggleMenu3}>
              <button
                className="btn btn-transparent text-center py-3 seeeett"
                // onClick={InstituteProfilesettings}

                onMouseOver={toggleMenu1}

              // onBlur={toggleMenu1}
              >
                <span className="d-block bg-white position-relative m-auto ">
                  <i className="fa-solid fa-bars"></i>
                </span>

                <h5>
                  Profile Settings{" "}
                  <i className="fa-solid fa-chevron-down downarrowsize"></i>
                </h5>
              </button>
              {profilemenu && (
                <div className="submenu1">
                  <button
                    className="submenu-item1"
                    onClick={InstituteProfileSettingHandler}
                  >
                    <h5> Profile Settings </h5>
                  </button>
                  <button
                    className="submenu-item1"
                    onClick={InstituteUsersListHandler}
                  >
                    <h5> Users List</h5>
                  </button>
                  <button
                    className="submenu-item1"
                    onClick={InstituteChangePwdHandler}
                  >
                    <h5>Change Password</h5>
                  </button>
                </div>
              )}
            </div>

            <div className="Baseposition" onMouseLeave={toggleMenu5}>
              <button
                className="btn btn-transparent text-center py-3 seeeett "
                onMouseOver={toggleMenu4}
              >
                <span className="d-block bg-white position-relative m-auto ">
                  <i className="fa-solid fa-user-plus"></i>
                </span>

                <h5>
                  Mentorship{" "}
                  <i className="fa-solid fa-chevron-down downarrowsize"></i>
                </h5>
              </button>

              {mentormenu && (
                <div className="submenu1">
                  <span className="submenu-item1" onMouseOver={toggleMenu6}>
                    <h5>
                      Alumni{" "}
                      <i
                        className="fa-solid fa-chevron-right "
                        style={{ fontSize: "10px" }}
                      ></i>{" "}
                    </h5>
                  </span>
                  <span className="submenu-item1" onMouseOver={toggleMenu7}>
                    <h5>
                      {" "}
                      Mentor{" "}
                      <i
                        className="fa-solid fa-chevron-right "
                        style={{ fontSize: "10px" }}
                      ></i>
                    </h5>
                  </span>
                </div>
              )}
              {sub_sub1 && (
                <div className="submenu_sub " onMouseLeave={toggleMenu8}>
                  {" "}
                  <span
                    className="submenu_sub1 submenu-item"
                    onClick={InstituteAddmentorShowingHandler}
                  >
                    <h5>Alumni Upload</h5>
                  </span>
                  <span
                    className="submenu_sub1 submenu-item"
                    onClick={InstituteAlumniListMentor}
                  >
                    <h5>Alumni List</h5>
                  </span>
                </div>
              )}
              {sub_sub2 && (
                <div className="submenu_sub2" onMouseLeave={toggleMenu8}>
                  {" "}
                  <span
                    className="submenu_sub1 submenu-item"
                    onClick={InstituteAlumniMentor}
                  >
                    <h5>Alumni Mentor</h5>
                  </span>
                  <span
                    className="submenu_sub1 submenu-item"
                    onClick={InstituteNonAlumniMentor}
                  >
                    <h5>Non Alumni Mentor</h5>
                  </span>
                </div>
              )}
            </div>

            <div className="Baseposition" onMouseLeave={toggleMenu2}>
              <button
                className="btn btn-transparent text-center py-3 seeeett"
                onMouseOver={toggleMenu}
              >
                <span className="d-block bg-white position-relative m-auto  ">
                  {/* <img src={Pic2} alt="pic2" width={"44px"} /> */}
                  <i className="fa-solid fa-chalkboard-user"></i>
                </span>

                <h5>
                  Guest Lectures{" "}
                  <i className="fa-solid fa-chevron-down downarrowsize"></i>
                </h5>
              </button>
              {isOpen && (
                <div className="submenu">
                  <button
                    className="submenu-item"
                    onClick={InstituteSearchGuestLacture}
                  >
                    <h5> Search Guest lct.</h5>
                  </button>
                  <button
                    className="submenu-item"
                    onClick={InstituteRequestGuest}
                  >
                    <h5>Request</h5>
                  </button>
                  <button
                    className="submenu-item"
                    onClick={InstituteRegiterGuest}
                  >
                    <h5> Register</h5>
                  </button>
                  <button
                    className="submenu-item"
                    onClick={InstituteHistoryGuest}
                  >
                    <h5> History</h5>
                  </button>
                  <button
                    className="submenu-item"
                    onClick={InstituteCommunicationTemplate}
                  >
                    <h5>Communication Template</h5>
                  </button>
                </div>
              )}
            </div>

            {/* <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={InstituteCommunicationTemplate}
            >
              <span className="d-block bg-white position-relative m-auto ">
                <i className="fa-solid fa-phone-volume"></i>
              </span>

              <h5>Communication Template</h5>
              </button> */}

            <button
              className="btn btn-transparent text-center py-3 seeeett"
            onClick={HandleCaseStudieslist}
            >
              <span className="d-block bg-white position-relative m-auto ">
                <i className="fa-solid fa-file-lines"></i>
              </span>

              <h5>All Case Studies</h5>
            </button>

            <button
              className="btn btn-transparent text-center py-3 seeeett"
            onClick={HandleTeacherslist}
            >
              <span className="d-block bg-white position-relative m-auto ">
                <i className="fa-solid fa-briefcase"></i>
              </span>

              <h5>Teachers Info</h5>
            </button>

            {/* <button
              className="btn btn-transparent text-center py-3 seeeett"
              // onClick={InstituteCommunicationTemplate}
            >
              <span className="d-block bg-white position-relative m-auto ">
                <i className="fa-solid fa-graduation-cap"></i>
              </span>

              <h5>Tranings</h5>
            </button>

            <button
              className="btn btn-transparent text-center py-3 seeeett"
              // onClick={InstituteCommunicationTemplate}
            >
              <span className="d-block bg-white position-relative m-auto ">
                <i className="fa-solid fa-briefcase"></i>
              </span>

              <h5>Jobs</h5>
            </button> */}

            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={InstituteNotificationHandler}
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
          </div>
          <div className="maincontent" onMouseOver={SubmenuAllOff}>
            {showUserList ? (
              <InstituteUserList
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {showProfileSettings ? (
              <InstituteProfileSetting
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {showNotification ? (
              <InstituteNotifications
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {CaseStudiesList ? (
              <CaseStudiesListPage
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {TeachersList ? (
              <TeacherDetailslistings
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
                HandleSingleTeacherDetails={HandleSingleTeacherDetails}
              />
            ) : (
              ""
            )}
            {SingleTeacherdetails ? (
              <SingleTeacherdetailspage
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
                
              />
            ) : (
              ""
            )}


            {showInstituteProfile ? (
              <InstituteProfileDashboard
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
                HandleSingleTeacherDetails={HandleSingleTeacherDetails}
              />
            ) : (
              ""
            )}
            {showChangePwd ? (
              <InstituteChangePwd
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {showInstituteMessage ? (
              <InstituteMessages
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {showAddMentor ? (
              <AddMentor
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {showsearchguest ? (
              <SearchGuestLacture
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {ShowRequestGuest ? (
              <RequestGuestlacture
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {ShowRegisterGuest ? (
              <RegisterGuestlacture
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {ShowHistory ? (
              <HistoryGuestlacture
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {Communication ? (
              <CommunicationTemplate
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {ShowAlumniMentor ? (
              <AlumniMentor
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {ShowNonAlumniMentor ? (
              <NonAlumniMentor
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
            {AlumniListMentor ? (
              <AlumniList
                instituteDashboardDetails={instituteDashboardDetails}
                user={user}
                token={token}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InstituteDashboard;
