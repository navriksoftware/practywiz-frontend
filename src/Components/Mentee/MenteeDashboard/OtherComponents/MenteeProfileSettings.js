import React, { useState } from "react";
import MenteeProfilePersonalDetails from "./MenteeProfilePersonalDetails.js";
import MenteeProfileEduWorkExpDetails from "./MenteeProfileEduWorkExpDetails.js";
import Menteeprofile3 from "../ProfileSettings/MenteeProfile3.js";

const MenteeProfileSettings = ({ singleMentee, user, token }) => {
  console.log(singleMentee);
  const [page, setPage] = useState(0);
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <MenteeProfilePersonalDetails
          user={user}
          token={token}
          singleMentee={singleMentee}
        />
      );
    } else if (page === 1) {
      return (
        <MenteeProfileEduWorkExpDetails
          singleMentee={singleMentee}
          user={user}
          token={token}
        />
      );
    } else if (page === 2) {
      return (
        <Menteeprofile3 singleMentee={singleMentee} user={user} token={token} />
      );
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

  return (
    <>
      <div div className="col-lg-10 ps-0">
        <div className="">
          <div
          //  id="mentorRegisterBg"
           >
            <div
              className="jdoieoir_wrapper"
              style={{ width: "85%", paddingTop: "2rem" }}
            >
              <div
                id="tabs"
                className="d-flex justify-content-between align-items-center mb-4"
              >
                {page === 2 ? (
                  <button
                    className="btn btn-primary tablinks active"
                    data-tab="form1"
                  >
                    <i className="fa-solid me-1 fa-user"></i> Profile Picture
                  </button>
                ) : (
                  <button
                    className="btn btn-primary tablinks "
                    data-tab="form1"
                    onClick={tab3}
                  >
                    <i className="fa-solid me-1 fa-user"></i> Profile Picture
                  </button>
                )}
                {page === 0 ? (
                  <button
                    className="btn btn-primary tablinks active"
                    data-tab="form1"
                  >
                    <i className="fa-solid me-1 fa-user"></i> Personal Details
                  </button>
                ) : (
                  <button
                    className="btn btn-primary tablinks "
                    data-tab="form1"
                    onClick={tab1}
                  >
                    <i className="fa-solid me-1 fa-user"></i> Personal Details
                  </button>
                )}
                {page === 1 ? (
                  <button
                    className="btn btn-primary tablinks active"
                    data-tab="form2"
                  >
                    <i className="fa-solid me-1 fa-bolt"></i> Educational/Work
                    Experience Details
                  </button>
                ) : (
                  <button
                    className="btn btn-primary tablinks "
                    data-tab="form2"
                    onClick={tab2}
                  >
                    <i className="fa-solid me-1 fa-bolt"></i> Educational/Work
                    Experience Details
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
export default MenteeProfileSettings;
