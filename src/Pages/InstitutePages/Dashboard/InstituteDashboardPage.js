import React from "react";
import InstituteDashboard from "../../../Components/Institute/InstituteDashboard/InstituteDashboard";
const InstituteDashboardPage = ({ user, token }) => {
  document.title = "Practywiz | Dashboard";
  return (
    <>
      <InstituteDashboard user={user} token={token} />
    </>
  );
};

export default InstituteDashboardPage;
