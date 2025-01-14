import React, { useState } from "react";
import MentorProfile1 from "./MentorProfile1.js";
import MentorProfile2 from "./MentorProfile2.js";
import MentorProfile3 from "./MentorProfile3.js";
import MentorProfile4 from "./MentorProfile4.js";
import Mentorprofile5 from "./MentorProfile5.js";
const MentorProfileSettings = ({ data, user, token }) => {
  const [page, setPage] = useState(0);
  const PageDisplay = () => {
    if (page === 0) {
      return <MentorProfile1 user={user} token={token} profiledata={data[0]} />;
    } else if (page === 1) {
      return <MentorProfile2 user={user} token={token} profiledata={data[0]} />;
    } else if (page === 2) {
      return <MentorProfile3 user={user} token={token} profiledata={data[0]} />;
    } else if (page === 3) {
      return <MentorProfile4 user={user} token={token} profiledata={data[0]} />;
    } else if (page === 4) {
      return <Mentorprofile5 user={user} token={token} profiledata={data[0]} />;
    }
  };

  const tab1 = () => {
    setPage(0);
  };
  const tab2 = () => {
    setPage(1);
  };
  const tab3 = () => {
    setPage(2);
  };
  const tab4 = () => {
    setPage(3);
  };
  const tab5 = () => {
    setPage(4);
  };
  return (
    <>
      <div div className="col-lg-10 ps-0">
        <div className="difuhtre_content">
          <div id="mentorRegisterBg">
            <div
              className="jdoieoir_wrapper"
              style={{ width: "90%", paddingTop: "2rem" }}
            >
              <div
                id="tabs"
                className="d-flex justify-content-between align-items-center mb-4"
              >
                {page === 5 ? (
                  <button
                    className="btn btn-primary tablinks active"
                    data-tab="form5"
                  >
                    <i className="fa-solid me-1 fa-user"></i> Profile Picture
                  </button>
                ) : (
                  <button
                    className="btn btn-primary tablinks "
                    data-tab="form5"
                    onClick={tab5}
                  >
                    <i className="fa-solid me-1 fa-user"></i> Profile Picture
                  </button>
                )}
                {page === 0 ? (
                  <button
                    className="btn btn-primary tablinks active"
                    data-tab="form1"
                  >
                    <i className="fa-solid me-1 fa-user"></i> ABOUT YOURSELF
                  </button>
                ) : (
                  <button
                    className="btn btn-primary tablinks "
                    data-tab="form1"
                    onClick={tab1}
                  >
                    <i className="fa-solid me-1 fa-user"></i> ABOUT YOURSELF
                  </button>
                )}
                {page === 1 ? (
                  <button
                    className="btn btn-primary tablinks active"
                    data-tab="form2"
                  >
                    <i className="fa-solid me-1 fa-bolt"></i> YOUR SUPER POWER
                  </button>
                ) : (
                  <button
                    className="btn btn-primary tablinks "
                    data-tab="form2"
                    onClick={tab2}
                  >
                    <i className="fa-solid me-1 fa-bolt"></i> YOUR SUPER POWER
                  </button>
                )}
                {page === 2 ? (
                  <button
                    className="btn btn-primary tablinks active"
                    data-tab="form3"
                  >
                    <i className="fa-solid fa-calendar-check"></i> AVAILABILITY
                  </button>
                ) : (
                  <button
                    className="btn btn-primary tablinks "
                    data-tab="form3"
                    onClick={tab3}
                  >
                    <i className="fa-solid fa-calendar-check"></i> AVAILABILITY
                  </button>
                )}
                {page === 3 ? (
                  <button
                    className="btn btn-primary tablinks active"
                    data-tab="form3"
                  >
                    <i className="fa-solid me-1 fa-asterisk"></i> PREFERENCES
                  </button>
                ) : (
                  <button
                    className="btn btn-primary tablinks "
                    data-tab="form3"
                    onClick={tab4}
                  >
                    <i className="fa-solid me-1 fa-asterisk"></i> PREFERENCES
                  </button>
                )}
              </div>

              <form>
                <div id="form1" className="tab active">
                  {PageDisplay()}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorProfileSettings;
