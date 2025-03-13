import React, { useState } from "react";
import Logo from "../../Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { logOut } from "../../Redux/userRedux";
// import Logo2 from "../../Images/logo.png";
const Navbar = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const [menutoggle, setmenutoggle] = useState(false);
  const [menuOn, setmenuOn] = useState(false);

  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 70) {
      setVisible(true);
    } else if (scrolled <= 70) {
      setVisible(false);
    }
  };
  const registermenuOn = () => {
    setmenuOn(true);
  };
  const registermenuOff = () => {
    setmenuOn(false);
  };

  const gotoMenteepage = () => {};
  const [BurgerMenu, SetBurgerMenu] = useState(false);
  const handleBurgerMenu = () => {
    SetBurgerMenu(!BurgerMenu);
  };
  const [SignUpMenu, setSignUpMenu] = useState(false);
  const handleSignUpMenu = () => {
    setSignUpMenu(!SignUpMenu);
  };

  window.addEventListener("scroll", toggleVisible);
  const technologyOptions = [
    {
      id: 1,
      value: "CXOs",
      label: "CXOs",
    },
    {
      id: 2,
      value: "Business-leaders",
      label: "Business leaders",
    },
    {
      id: 3,
      value: "Technology-Leaders",
      label: "Technology Leaders",
    },
    {
      id: 4,
      value: "Start-Up-Leaders",
      label: "Start-Up Leaders",
    },
    {
      id: 5,
      value: "Technology-Experts",
      label: "Technology Experts",
    },
    {
      id: 6,
      value: "Domain-Experts",
      label: "Domain Experts",
    },
    {
      id: 7,
      value: "Marketing-&-Sales",
      label: "Marketing & Sales",
    },
    {
      id: 8,
      value: "All-Mentors",
      label: "All Mentors",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogoutHandler = () => {
    return dispatch(logOut()), navigate("/login");
  };
  return (
    <>
      <header className={visible ? "headeractive" : ""}>
        <div className="header-wrapper">
          <div className="container-fluid">
            <nav
              className="navbar fixed-top mx-4 px-3 mt-2 navbar-expand-md navbar-light 
          navbarcolor
            "
            >
              <div className="nav-container">
                {/* <div className="container"> */}
                <a className="navbar-brand" href="/" id="diorjer-logo">
                  <img src={Logo} alt="Logo" id="dbgheuirbr-image-a" />

                  {/* <img
                    src="images/image - 2024-04-22T201352.571.png"
                    className="d-none"
                    alt=""
                    id="dbgheuirbr-image-b"
                  /> */}
                </a>
                {user ? (
                  <div className="udgehrr position-relative ps-3 menubarUserIconDnone">
                    <button
                      onClick={handleBurgerMenu}
                      className="btn btn-main mt-0"
                      type="button"
                    >
                      <i className="fa-solid ps-0 fa-user"></i>
                    </button>
                    {BurgerMenu && (
                      <ul className="djioerr_dpdwn bg-white position-absolute d-none p-3">
                        <li>
                          <Link to={"/mentor-club"}>
                            Mentor Connect{" "}
                            <i
                              className="fa-solid fa-plus"
                              style={{ color: "#1b63de" }}
                            ></i>
                          </Link>
                        </li>{" "}
                        <li className="nav-item">
                          <Link to="/case-studies">
                            Case Studies
                            <span className="ai-button">
                              AI<i className="fas fa-bolt"></i>
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/internships">Internships</Link>
                        </li>
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
                        <li>
                          <Link to={`/${user.user_type}/dashboard`}>
                            {user?.user_type + " Dashboard"}
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
                    )}
                  </div>
                ) : (
                  <div className="udgehrr position-relative ps-3">
                    <button
                      className="navbar-toggler"
                      type="button"
                      id="nav-toggler"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      onClick={handleBurgerMenu}
                    >
                      <span
                        id="bar-icon"
                        className="navbar-toggler-icon hrncenhjbf"
                      ></span>

                      <i
                        id="close-mark-icon"
                        className="fa-solid fa-xmark d-none"
                      ></i>
                    </button>
                    {BurgerMenu && (
                      <ul className="djioerr_dpdwn bg-white position-absolute d-none p-3">
                        <li>
                          <Link to={"/mentor-club"}>
                            Mentor Connect{" "}
                            <i
                              className="fa-solid fa-plus"
                              style={{ color: "#1b63de" }}
                            ></i>
                          </Link>
                        </li>{" "}
                        <li className="nav-item">
                          <Link to="/case-studies">
                            Case Studies
                            <span className="ai-button">
                              AI<i className="fas fa-bolt"></i>
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/internships">Internships</Link>
                        </li>
                        <li>
                          <Link to={"/login"}>Login</Link>
                        </li>
                        <li onClick={handleSignUpMenu}>Sign Up </li>
                        {SignUpMenu && (
                          <>
                            <li className="djgjefgndke">
                              <Link to="/mentee-registration">
                                {" "}
                                <i className="fa-solid fa-chalkboard-user menubarUsersIcons"></i>
                                Mentee
                              </Link>
                            </li>
                            <li className="djgjefgndke">
                              <Link to="mentor-registration">
                                {" "}
                                <i className="fa-solid fa-graduation-cap menubarUsersIcons"></i>
                                Mentor
                              </Link>
                            </li>
                            <li className="djgjefgndke">
                              <Link to="/institute-registration">
                                <i className="fa-solid fa-building-columns menubarUsersIcons"></i>{" "}
                                Institute
                              </Link>
                            </li>
                            <li className="djgjefgndke">
                              <Link to="/employer-registration">
                                <i className="fa-solid fa-briefcase menubarUsersIcons"></i>{" "}
                                Corporate
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    )}
                  </div>
                )}
                <div
                  className="navbarmenucollapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul
                    className="navbar-nav "
                    // onMouseLeave={() => {
                    //   setmenutoggle(false);
                    // }}
                  >
                    <li
                      className="nav-item regmenuR"
                      // onMouseOver={() => {
                      //   setmenutoggle(true);
                      // }}
                    >
                      <a className="nav-link" href="/mentor-club">
                        Mentor Connect
                        <i
                          className="fa-solid fa-plus"
                          style={{ color: "#1b63de" }}
                        ></i>
                      </a>
                    </li>
                    {/* {menutoggle && (
                      <div className="PositionAB">
                        <div className="menushowbox">
                          {technologyOptions?.map((option, index) => {
                            return (
                              <div className="MenuBox-item2">
                                <h6>
                                  <Link
                                    to={`/mentor-club/${option.value.toLowerCase()}`}
                                  >
                                    {option.label}
                                  </Link>
                                </h6>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )} */}

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="/case-studies"
                        onMouseOver={() => {
                          setmenutoggle(false);
                        }}
                      >
                        Case Studies
                        <span className="ai-button">
                          AI<i className="fas fa-bolt"></i>
                        </span>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" href="/internships">
                        Internships{" "}
                        <i
                          className="fa-regular fa-lightbulb"
                          style={{ color: "#1b63de", fontSize: "large" }}
                        ></i>
                      </a>
                    </li>
                  </ul>
                  {user ? (
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
                        <li>
                          <Link to={`/${user.user_type}/dashboard`}>
                            {user?.user_type + " Dashboard"}
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
                  ) : (
                    <div className="udgehrr" onMouseLeave={registermenuOff}>
                      <button className="btn btn-login fvjhdf_btn btn-main mt-0 btn-mainHome">
                        <Link to="/login">LogIn</Link>
                      </button>
                      <div>
                        <button
                          className="btn fvjhdf_btn btn-main mt-0 btn-mainHome"
                          onMouseOver={registermenuOn}
                        >
                          Sign Up
                        </button>
                        <div className="regmenu">
                          {menuOn && (
                            <div className="MenuBox">
                              <button
                                className="MenuBox-item1"
                                // onClick={gotoMenteepage}
                              >
                                <a
                                  className="inOneLine"
                                  href="/mentee-registration"
                                >
                                  <i className="fa-solid fa-chalkboard-user"></i>
                                  <h5>Mentee</h5>
                                </a>
                              </button>
                              <button
                                className="MenuBox-item1"
                                // onClick={gotoMentorpage}
                              >
                                <a
                                  className="inOneLine"
                                  href="mentor-registration"
                                >
                                  <i className="fa-solid fa-graduation-cap"></i>
                                  <h5>Mentor</h5>
                                </a>
                              </button>
                              <button
                                className="MenuBox-item1"
                                // onClick={gotoInstitute}
                              >
                                <a
                                  className="inOneLine"
                                  href="/institute-registration"
                                >
                                  <i className="fa-solid fa-building-columns"></i>
                                  <h5>Institute</h5>
                                </a>
                              </button>
                              <button
                                className="MenuBox-item1"
                                // onClick={gotoInstitute}
                              >
                                <a
                                  className="inOneLine"
                                  href="/employer-registration"
                                >
                                  <i className="fa-solid fa-briefcase"></i>
                                  <h5>Corporate</h5>
                                </a>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
