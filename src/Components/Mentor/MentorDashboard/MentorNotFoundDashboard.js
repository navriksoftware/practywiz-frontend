/* eslint-disable no-sequences */
import "./DashboardCSS/mentordashboardnotification.css";
import "./DashboardCSS/Mentor.css";
import Logo from "../../../Images/logo.png";
import { useDispatch } from "react-redux";
import { logOut } from "../../../Redux/userRedux";
import { Link, useNavigate } from "react-router-dom";
import MentorUpdateProfileDetails from "./MentorUpdateDetails/MentorUpdateProfileDetails";

const MentorNotFoundDashboard = ({ user, token }) => {
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
                            to={`/mentor-connect/mentor-profile/${
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
          <div className="  ">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "0 40px 0",
              }}
            >
              <div className="  display-raw">
                <button className="btn btn-transparent text-center py-3 seeeett">
                  <span className="d-block bg-white position-relative m-auto">
                    {/* <i className="fa-solid fa-user"> */}
                    <i className="fa-solid fa-house-circle-check"></i>
                  </span>

                  <h5>Dashboard</h5>
                </button>
              </div>
            </div>
            <div className="maincontent">
              <MentorUpdateProfileDetails user={user} token={token} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorNotFoundDashboard;
