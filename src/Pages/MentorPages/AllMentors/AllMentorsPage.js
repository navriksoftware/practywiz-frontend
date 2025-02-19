import React , {Suspense} from "react";
// import AllMentors from "../../../Components/Mentor/AllMentors/AllMentors";
import Navbar from "../../../Components/Navbar/Navbar";
import Spinner from "../../../Utils/Spinner.js";
import Footer from "../../../Components/Footer/Footer";
import { Section7 } from "../../../Components/Contactus/contact";
import GoToTop from "../../../Utils/GoToTop";
// const AllMentors = React.lazy(() =>
//   import("../../../Components/Mentor/AllMentors/AllMentors")
// );
import AllMentors from "../../../Components/Mentor/AllMentors/AllMentors.js";
const AllMentorsPage = () => {
  document.title = "Practywiz | Mentor Connect";

  return (
    <>

      <Navbar />
      {/* <Suspense fallback={<Spinner />}> */}
      <AllMentors />
      {/* </Suspense> */}
      {/* <Section7 /> */}
      <Footer />
      <GoToTop />
    </>
  );
};

export default AllMentorsPage;
