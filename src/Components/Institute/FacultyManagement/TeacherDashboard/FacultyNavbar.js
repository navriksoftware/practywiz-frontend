import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../../Images/logo.png";
import { useDispatch } from "react-redux";
import { logOut } from "../../../../Redux/userRedux";
import "./DashboardCSS/FacultyNavbar.css";

const NavBar = ({
  user,
  activePage,
  setActivePage,
  hasUnreadNotifications,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const profileDropdownRef = useRef(null);
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 10) {
          navbarRef.current.classList.add("sticky");
        } else {
          navbarRef.current.classList.remove("sticky");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownRef]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.classList.contains("faculty-navbar-burger-menu")
      ) {
        closeMobileMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Handle mobile menu item click
  const handleMobileMenuItemClick = (page) => {
    setActivePage(page);
    closeMobileMenu();
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      setMobileMenuOpen(true);
      setIsClosing(false);
    }
  };

  // Close mobile menu with animation
  const closeMobileMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 400); // This matches the CSS animation duration
  };

  const userLogoutHandler = () => {
    localStorage.removeItem("activePage");
    localStorage.removeItem("clickedClassId");
    localStorage.removeItem("ClassId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("caseStudyFormData");
    localStorage.removeItem("caseStudyId");
    localStorage.removeItem("caseType");
    localStorage.removeItem("facultyCaseAssignId");

    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="faculty-navbar-new-nav-bar-comp" ref={navbarRef}>
      <div className="faculty-navbar-nav-container">
        <div className="faculty-navbar-nav-logo">
          <a href="/">
            <img src={Logo} alt="PractyWiz" />
          </a>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="faculty-navbar-nav-menu">
          <ul className="faculty-navbar-nav-links">
            <li
              className={
                ["profile", "singlecase"].includes(activePage) ? "active" : ""
              }
            >
              <button onClick={() => setActivePage("profile")}>
                <i className="fa-solid fa-house-chimney"></i>
                <span>Dashboard</span>
              </button>
            </li>
            <li className={activePage === "store" ? "active" : ""}>
              <button onClick={() => setActivePage("store")}>
                <i className="fa-solid fa-folder-open"></i>
                <span>Available Cases</span>
              </button>
            </li>
            <li className={activePage === "AddCaseStudy" ? "active" : ""}>
              <button onClick={() => setActivePage("AddCaseStudy")}>
                <i className="fa-solid fa-pen-to-square"></i>
                <span>Add Case Study</span>
              </button>
            </li>
            <li className={activePage === "showclasses" ? "active" : ""}>
              <button onClick={() => setActivePage("showclasses")}>
                <i className="fa-solid fa-chalkboard-user"></i>
                <span>Class info</span>
              </button>
            </li>
            {/* <li className={activePage === "notifications" ? "active" : ""}>
              <button onClick={() => setActivePage("notifications")}>
                <i className="fa-solid fa-bell"></i>
                <span>Notifications</span>
              </button>
            </li> */}
          </ul>
        </div>

        {/* Desktop Profile Section */}
        <div className="faculty-navbar-nav-profile" ref={profileDropdownRef}>
          <div className="faculty-navbar-profile-buttons">
            <button
              onClick={() => setActivePage("notifications")}
              className={`faculty-navbar-notification-button ${
                activePage === "notifications" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-bell"></i>
              {hasUnreadNotifications && (
                <span
                  style={{
                    position: "absolute",
                    top: "3px",
                    right: "9px",
                    width: "10px",
                    height: "10px",
                    padding: "1px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "100%",
                    fontSize: "12px",
                    fontWeight: "bold",
                    border: "2px solid white",
                    zIndex: 10,
                  }}
                />
              )}
            </button>
            <button
              className="faculty-navbar-profile-button"
              onClick={toggleProfileDropdown}
            >
              {user?.profile_image ? (
                <img
                  src={user.profile_image}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <div className="faculty-navbar-profile-circle">
                  <span>
                    {user?.user_firstname?.charAt(0).toUpperCase() || "S"}
                  </span>
                </div>
              )}
              <span className="faculty-navbar-username">
                {user?.user_firstname || "Dr. Ramani"}
              </span>
              <i className="fa-solid fa-chevron-down faculty-navbar-dropdown-icon"></i>
            </button>
          </div>

          {profileDropdownOpen && (
            <ul className="faculty-navbar-profile-dropdown">
              <div className="faculty-navbar-dropdown-header">
                <div className="faculty-navbar-dropdown-image">
                  {user?.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt="Profile"
                      className="profile-image"
                    />
                  ) : (
                    <div className="faculty-navbar-profile-circle">
                      <div>{user?.user_firstname?.charAt(0).toUpperCase()}</div>
                    </div>
                  )}
                </div>
                <div className="faculty-navbar-dropdown-user-info">
                  <div className="faculty-navbar-dropdown-username">
                    {user?.user_firstname} {user?.user_lastname}
                  </div>
                  <div className="faculty-navbar-dropdown-email">
                    {user?.user_email}
                  </div>
                </div>
              </div>
              <li
                onClick={() => {
                  setActivePage("settings");
                  setProfileDropdownOpen(false);
                }}
              >
                <i className="fa-solid fa-user-pen"></i>
                <span>Manage account</span>
              </li>
              <li
                onClick={() => {
                  setActivePage("ChangePwd");
                  setProfileDropdownOpen(false);
                }}
              >
                <i className="fa-solid fa-key"></i>
                <span>Change Password</span>
              </li>
              <li onClick={userLogoutHandler}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Sign out</span>
              </li>
            </ul>
          )}
        </div>

        {/* Burger Menu for Mobile */}
        <button
          className="faculty-navbar-burger-menu"
          onClick={toggleMobileMenu}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`faculty-navbar-mobile-menu ${
          mobileMenuOpen ? "active" : ""
        } ${isClosing ? "closing" : ""}`}
      >
        <div className="faculty-navbar-mobile-menu-content" ref={mobileMenuRef}>
          <div className="faculty-navbar-mobile-menu-header">
            {/* <img src={Logo} alt="PractyWiz" style={{ height: "28px" }} /> */}
            <button
              className="faculty-navbar-mobile-close"
              onClick={toggleMobileMenu}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Mobile Profile Section */}
          <div className="faculty-navbar-mobile-profile-section">
            <div className="faculty-navbar-mobile-profile-header">
              <div className="faculty-navbar-mobile-profile-image">
                {user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt="Profile"
                    className="profile-image"
                  />
                ) : (
                  <div className="faculty-navbar-profile-circle">
                    <span>{user?.user_firstname?.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div className="faculty-navbar-mobile-profile-info">
                <div className="faculty-navbar-mobile-profile-name">
                  {user?.user_firstname} {user?.user_lastname}
                </div>
                <div className="faculty-navbar-mobile-profile-email">
                  {user?.user_email}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <ul className="faculty-navbar-mobile-nav-links">
            <li className={activePage === "profile" ? "active" : ""}>
              <button onClick={() => handleMobileMenuItemClick("profile")}>
                <i className="fa-solid fa-house-chimney"></i>
                <span>Dashboard</span>
              </button>
            </li>
            <li className={activePage === "store" ? "active" : ""}>
              <button onClick={() => handleMobileMenuItemClick("store")}>
                <i className="fa-solid fa-folder-open"></i>
                <span>Available Cases</span>
              </button>
            </li>
            <li className={activePage === "AddCaseStudy" ? "active" : ""}>
              <button onClick={() => handleMobileMenuItemClick("AddCaseStudy")}>
                <i className="fa-solid fa-pen-to-square"></i>
                <span>Add Case Study</span>
              </button>
            </li>
            <li className={activePage === "showclasses" ? "active" : ""}>
              <button onClick={() => handleMobileMenuItemClick("showclasses")}>
                <i className="fa-solid fa-chalkboard-user"></i>
                <span>Class info</span>
              </button>
            </li>
            <li className={activePage === "notifications" ? "active" : ""}>
              <button
                onClick={() => handleMobileMenuItemClick("notifications")}
              >
                <i className="fa-solid fa-bell"></i>
                <span>Notifications</span>
              </button>
            </li>
            <li className={activePage === "settings" ? "active" : ""}>
              <button onClick={() => handleMobileMenuItemClick("settings")}>
                <i className="fa-solid fa-user-pen"></i>
                <span>Manage account</span>
              </button>
            </li>
            <li className={activePage === "ChangePwd" ? "active" : ""}>
              <button onClick={() => handleMobileMenuItemClick("ChangePwd")}>
                <i className="fa-solid fa-key"></i>
                <span>Change Password</span>
              </button>
            </li>
            <li>
              <button onClick={userLogoutHandler}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Sign out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
