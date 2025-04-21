import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import Logo from "../../../../Images/logo.png";
import { useDispatch } from "react-redux";
import { logOut } from "../../../../Redux/userRedux";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
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

const TeacherDashboard = ({ user, token }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirecting after logout

  const [mobMenu, setMobMenu] = useState(false);
  const [mobProfileSubMenu, setMobProfileSubMenu] = useState(false);
  const [profilemenu, setprofilemenu] = useState(false);
  const [userdata, setuserdata] = useState([])
  // Initialize activePage from localStorage or default to "profile"
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("activePage") || "profile";
  });
  const url = ApiURL();
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
  }, [url, user?.user_id]);

  // Update localStorage when activePage changes
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const userLogoutHandler = () => {
    localStorage.removeItem("activePage");
    return dispatch(logOut()), navigate("/login");
  };

  // Reset activePage to "profile" on mount (fresh login)
  // useEffect(() => {
  //   // Check if this is a fresh login by verifying user data
  //   if (Object.keys(user).length === 0 && !loading) {
  //     setActivePage("profile");
  //     localStorage.setItem("activePage", "profile");
  //   }
  // }, [user, loading]);

  const [dataFormchild, setdataFormchild] = useState("")

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <Profile userdata={userdata} setActivePage={setActivePage} />;
      case "singlecase":
        return <SingleAssignedCase userdata={userdata} />;
      case "settings":
        return <Setting userdata={userdata} />;
      case "ChangePwd":
        return <ChangePassword user={user} token={token}/>;
      case "store":
        return <Store userdata={userdata} setActivePage={setActivePage} />;
      case "AddCaseStudy":
        return (
          <AddNonPractywizCase userdata={userdata}
            setActivePage={setActivePage}
          />
        );

      case "showclasses":
        return <ShowClasses userdata={userdata} setActivePage={setActivePage} setdataFormchild={setdataFormchild} />;
      // case "createclass":
      //   return <CreateClass user={user} token={token} setActivePage={setActivePage} />;
      case "singleclassdetails":
        return (
          <SingleClassdetails setActivePage={setActivePage} dataFormchild={dataFormchild} />
        );
      // case "addbulkstudents":
      //   return <AddBulkStudents data={data.store} setActivePage={setActivePage} />;
      // case "addsinglestudent":
      //   return <AddSingleStudent data={data.store} setActivePage={setActivePage} />;
      case "assigncase":
        return <CaseAssigneProcess />;
      case "notifications":
        return <Notification />;
      default:
        return <Profile />;
    }
  };

  const toggleOnProfile = () => {
    setprofilemenu(true);
  };
  const toggleOffProfile = () => {
    setprofilemenu(false);
  };

  if (false) {
    return <div>Loading...</div>;
  }

  return (
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
                            onClick={() => setActivePage("profile")}
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
                            className="menu-items"
                            onClick={() => setActivePage("store")}
                          >
                            <span>
                              <i className="fa-solid fa-folder-open"> </i>
                            </span>
                            <span>Available Cases</span>
                          </li>
                          <li
                            className="menu-items"
                            onClick={() => setActivePage("AddCaseStudy")}
                          >
                            <span>
                              <i className="fa-solid fa-pen-to-square"></i>
                            </span>
                            <span>Add Case Study</span>
                          </li>
                          <li
                            className="menu-items"
                            onClick={() => setActivePage("AddCaseStudy")}
                          >
                            <span>
                              <i className="fa-solid fa-pen-to-square"></i>
                            </span>
                            <span>Add Case Study</span>
                          </li>

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
                                  <li onClick={() => setActivePage("settings")}>
                                    Profile Change
                                  </li>
                                  <li onClick={() => setActivePage("settings")}>
                                    Change Password
                                  </li>
                                </ul>
                              )}
                            </span>
                          </li>

                          <li
                            className="menu-items"
                            onClick={() => setActivePage("notifications")}
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
      <div
        className="mentor_dashboard"
      //  id="mentorRegisterBg"
      >
        <div className="col-md-flex-center">
          <div className="display-raw">
            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={() => setActivePage("profile")}
            >
              <span className="d-block bg-white position-relative m-auto">
                {/* <i className="fa-solid fa-user"> */}
                <i className="fa-solid fa-house-circle-check"></i>
              </span>

              <h5>Dashboard</h5>
            </button>
            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={() => setActivePage("store")}
            >
              <span className="d-block bg-white position-relative m-auto">
                <i class="fa-solid fa-folder-open"></i>
              </span>

              <h5>Available Cases</h5>
            </button>
            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={() => setActivePage("AddCaseStudy")}
            >
              <span className="d-block bg-white position-relative m-auto">
                <i className="fa-solid fa-pen-to-square"></i>
              </span>

              <h5>Add Case Study</h5>
            </button>
            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={() => setActivePage("showclasses")}
            >
              <span className="d-block bg-white position-relative m-auto">
                <i class="fa-solid fa-folder-open"></i>
              </span>

              <h5>Class info</h5>
            </button>
            <div className="Baseposition" onMouseLeave={toggleOffProfile}>
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
                    onClick={() => setActivePage("settings")}
                  >
                    <h5>Profile Change</h5>
                  </button>
                  <button
                    className="submenu-item1"
                    onClick={() => setActivePage("ChangePwd")}
                  >
                    <h5>Change Password</h5>
                  </button>
                </div>
              )}
            </div>{" "}
            <button
              className="btn btn-transparent text-center py-3 seeeett"
              onClick={() => setActivePage("notifications")}
            >
              {" "}
              <i className="fa-solid fa-bell"></i>
              <span className="d-block bg-white position-relative m-auto">
                {
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
                }
              </span>
              <h5>Notifications</h5>
            </button>
          </div>
        </div>
        {renderPage()}
      </div>
    </div>
  );
};

export default TeacherDashboard;
