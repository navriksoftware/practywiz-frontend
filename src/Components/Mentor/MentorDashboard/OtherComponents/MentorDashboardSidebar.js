import React from "react";

const MentorDashboardSidebar = ({
  MentorProfileShowingHandler,
  MentorNotificationHandler,
  MentorBankingShowingHandler,
  MentorCaseStudiesShowingHandler,
  ShowMentorUpcomingHandler,
  ShowMentorCompletedHandler,
  MentorChangePwdHandler,
  MentorPsettingsHandler,
  showSidebarList,
  setShowSidebarList,
  userLogoutHandler,
}) => {
  return (
    <ul className="djioerr_dpdwn22 bg-white position-absolute p-3">
      <p
        className="asdfasdfa"
        onClick={() => {
          return setShowSidebarList(false);
        }}
      >
        <i class="fa fa-times" aria-hidden="true"></i>
      </p>
      <li onClick={MentorProfileShowingHandler} style={{ cursor: "pointer" }}>
        <i className="fa-solid fa-house-circle-check ksjdflaksjflk"></i>
        Dashboard
      </li>
      <li onClick={MentorChangePwdHandler} style={{ cursor: "pointer" }}>
        <i className="fa fa-key ksjdflaksjflk" aria-hidden="true"></i>Change
        Password
      </li>
      <li onClick={MentorPsettingsHandler} style={{ cursor: "pointer" }}>
        <i className="fa fa-user ksjdflaksjflk " aria-hidden="true"></i>Profile
        Settings
      </li>
      <li onClick={ShowMentorUpcomingHandler} style={{ cursor: "pointer" }}>
        <i className="fa fa-laptop ksjdflaksjflk" aria-hidden="true"></i>Mentor
        Upcoming Sessions
      </li>
      <li onClick={ShowMentorCompletedHandler} style={{ cursor: "pointer" }}>
        <i className="fa fa-laptop ksjdflaksjflk" aria-hidden="true"></i>Mentor
        Completed Sessions
      </li>
      <li onClick={MentorBankingShowingHandler} style={{ cursor: "pointer" }}>
        <i className="fa fa-university ksjdflaksjflk" aria-hidden="true"></i>
        Bank Details
      </li>
      <li onClick={MentorNotificationHandler} style={{ cursor: "pointer" }}>
        <i className="fa fa-bell ksjdflaksjflk" aria-hidden="true"></i>
        Notifications
      </li>
      <li
        onClick={MentorCaseStudiesShowingHandler}
        style={{ cursor: "pointer" }}
      >
        <i className="fa-solid fa-folder ksjdflaksjflk" aria-hidden="true"></i>
        Case Studies
      </li>
      <li onClick={userLogoutHandler} style={{ cursor: "pointer" }}>
        <i
          className="fa-solid fa-right-from-bracket ksjdflaksjflk"
          aria-hidden="true"
        ></i>
        Log Out
      </li>
    </ul>
  );
};

export default MentorDashboardSidebar;
