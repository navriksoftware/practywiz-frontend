import React from "react";
import TeacherDashboard from "../../../Components/Institute/FacultyManagement/TeacherDashboard/TeacherDashboard";
const TeacherDashboardPage = ({ user, token }) => {
  document.title = "Practywiz | Dashboard";
  return (
    <>
      <TeacherDashboard user={user} token={token} />
    </>
  );
};

export default TeacherDashboardPage;
