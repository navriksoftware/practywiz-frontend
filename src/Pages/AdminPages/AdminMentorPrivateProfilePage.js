import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import GoToTop from "../../Utils/GoToTop";
import MentorPrivateProfile from "../../Components/Admin/Dashboard/Mentors/MentorPrivateProfile";
const AdminMentorPrivateProfilePage = ({ user, token }) => {
  document.title = "Practywiz | Mentor Private Profile";

  return (
    <>
      <Navbar />
      <MentorPrivateProfile user={user} token={token} />
      <Footer />
      <GoToTop />
    </>
  );
};

export default AdminMentorPrivateProfilePage;
