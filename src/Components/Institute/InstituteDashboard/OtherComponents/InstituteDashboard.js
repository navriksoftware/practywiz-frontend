import React, { useState } from "react";
import "./DashboardCSS/Institutedashboardnotification.css";
import Logo from "../../../Images/logo.jpg";
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
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../Redux/userRedux";
import AlumniMentor from "./OtherComponents/AlumniMentor";
import NonAlumniMentor from "./OtherComponents/NonAlumniMentor";
import AlumniList from "./OtherComponents/AlumniList";
import InstituteProfileSetting from "./OtherComponents/InstituteProfileSetting";
import InstituteUserList from "./OtherComponents/InstituteUserList";

const InstituteDashboard = () => {
  const user = useSelector((state) => state.user?.currentUser);
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
      setshowInstituteProfile(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
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
      setShowUserList(false)
    );
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogoutHandler = () => {
    return dispatch(logOut()), navigate("/login");
  };

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
              <span className="d-block bg-white position-relative m-auto mb-3">
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
                <span className="d-block bg-white position-relative m-auto mb-3">
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
                <span className="d-block bg-white position-relative m-auto mb-3">
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
                <div className="submenu_sub" onMouseLeave={toggleMenu8}>
                  {" "}
                  <span
                    className="submenu_sub1"
                    onClick={InstituteAddmentorShowingHandler}
                  >
                    <h5>Alumni Upload</h5>
                  </span>
                  <span
                    className="submenu_sub1"
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
                    className="submenu_sub1"
                    onClick={InstituteAlumniMentor}
                  >
                    <h5>Alumni Mentor</h5>
                  </span>
                  <span
                    className="submenu_sub1"
                    onClick={InstituteNonAlumniMentor}
                  >
                    <h5>Non Alumni Mentor</h5>
                  </span>
                </div>
              )}
            </div>

            <div className="Baseposition" onMouseLeave={toggleMenu2}>
              <button
                className="btn btn-transparent text-center py-3 seeeett main-button "
                onMouseOver={toggleMenu}
              >
                <span className="d-block bg-white position-relative m-auto mb-3 ">
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
                </div>
              )}
            </div>

            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={InstituteCommunicationTemplate}
            >
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-solid fa-phone-volume"></i>
              </span>

              <h5>Communication Template</h5>
            </button>
            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={InstituteNotificationHandler}
            >
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-solid fa-bell"></i>
              </span>

              <h5>Notifications</h5>
            </button>
          </div>
          <div className="maincontent" onMouseOver={SubmenuAllOff}>
            {showUserList ? <InstituteUserList /> : ""}
            {showProfileSettings ? <InstituteProfileSetting /> : ""}
            {showNotification ? <InstituteNotifications /> : ""}
            {showInstituteProfile ? <InstituteProfileDashboard /> : ""}
            {showChangePwd ? <InstituteChangePwd /> : ""}
            {showInstituteMessage ? <InstituteMessages /> : ""}
            {showAddMentor ? <AddMentor /> : ""}
            {showsearchguest ? <SearchGuestLacture /> : ""}
            {ShowRequestGuest ? <RequestGuestlacture /> : ""}
            {ShowRegisterGuest ? <RegisterGuestlacture /> : ""}
            {ShowHistory ? <HistoryGuestlacture /> : ""}
            {Communication ? <CommunicationTemplate /> : ""}
            {ShowAlumniMentor ? <AlumniMentor /> : ""}
            {ShowNonAlumniMentor ? <NonAlumniMentor /> : ""}
            {AlumniListMentor ? <AlumniList /> : ""}
          </div>
        </div>
      </div>
      <div className="res-db-sidebar">
        <div className="md-header ugenhuhrtniu" id="res-db-side-bar">
          <div className="difuhtre_nav" style={{ display: "none" }}>
            <div className="huirebff_close">
              <i
                className="fa-solid fa-circle-arrow-left"
                id="close-filter"
              ></i>
            </div>

            <button className="btn btn-transparent text-center py-3">
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-solid fa-user"></i>
              </span>

              <h5>Dashboard</h5>
            </button>

            <button className="btn btn-transparent text-center py-3">
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-solid fa-bars"></i>
              </span>

              <h5>PROFILE SETTINGS</h5>
            </button>

            <button className="btn btn-transparent text-center py-3">
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-brands fa-rocketchat"></i>
              </span>

              <h5>ADD MENTOR</h5>
            </button>
            <button className="btn btn-transparent text-center py-3">
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-brands fa-rocketchat"></i>
              </span>

              <h5>ADD MENTEE</h5>
            </button>
            <button className="btn btn-transparent text-center py-3">
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-brands fa-rocketchat"></i>
              </span>

              <h5>MESSAGES</h5>
            </button>

            <button className="btn btn-transparent text-center py-3">
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-solid fa-bell"></i>
              </span>

              <h5>NOTIFICATIONS</h5>
            </button>

            <button className="btn btn-transparent text-center py-3">
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-solid fa-arrow-right-arrow-left"></i>
              </span>

              <h5>CHANGE PASSWORD</h5>
            </button>

            <button className="btn btn-transparent text-center py-3">
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-solid fa-folder"></i>
              </span>

              <h5>SESSION SETUP</h5>
            </button>

            <button className="btn btn-transparent text-center py-3">
              <span className="d-block bg-white position-relative m-auto mb-3">
                <i className="fa-solid fa-right-from-bracket"></i>
              </span>

              <h5>LOG OUT</h5>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstituteDashboard;
