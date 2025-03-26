import React from "react";
import TeacherDashboard from "../../../Components/Institute/FacultyManagement/TeacherDashboard/TeacherDashboard";
const TeacherDashboardPage = ({ user, token }) => {
  return (
    <>
      <TeacherDashboard user={user} token={token} />
    </>
  );
};

export default TeacherDashboardPage;
