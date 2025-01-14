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
      <li onClick={MentorProfileShowingHandler}>
        <i className="fa-solid fa-house-circle-check ksjdflaksjflk"></i>
        Dashboard
      </li>
      <li onClick={MentorChangePwdHandler}>
        <i class="fa fa-key ksjdflaksjflk" aria-hidden="true"></i>Change
        Password
      </li>
      <li onClick={MentorPsettingsHandler}>
        <i class="fa fa-user ksjdflaksjflk " aria-hidden="true"></i>Profile
        Settings
      </li>
      <li onClick={ShowMentorUpcomingHandler}>
        <i class="fa fa-laptop ksjdflaksjflk" aria-hidden="true"></i>Mentor
        Upcoming Sessions
      </li>
      <li onClick={ShowMentorCompletedHandler}>
        <i class="fa fa-laptop ksjdflaksjflk" aria-hidden="true"></i>Mentor
        Completed Sessions
      </li>
      <li onClick={MentorBankingShowingHandler}>
        <i class="fa fa-university ksjdflaksjflk" aria-hidden="true"></i>Bank
        Details
      </li>
      <li onClick={MentorNotificationHandler}>
        <i class="fa fa-bell ksjdflaksjflk" aria-hidden="true"></i>
        Notifications
      </li>
      <li onClick={MentorCaseStudiesShowingHandler}>
        <i class="fa-solid fa-folder ksjdflaksjflk" aria-hidden="true"></i>Case
        Studies
      </li>
    </ul>
  );
};

export default MentorDashboardSidebar;
