import LoginFormPage from "./Pages/FormPages/LoginPages/LoginFormPage";
import RegisterFormPage from "./Pages/FormPages/RegisterPages/RegisterFormPage";
import Homepage from "./Pages/HomePages/Homepage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./Styles/custombs.css";
import "./Styles/responsive.css";
import "./Styles/style.css";
import "./index.css";
import "./Styles/DashBoard.css";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import ScrollButton from "./Utils/ScrollToTop";
import PublicRoute from "./Utils/PublicRoute";
import AboutusPage from "./Pages/MiscPages/AboutusPage";
import ContactusPage from "./Pages/MiscPages/ContactusPage";
import AllCoursePage from "./Pages/CoursePages/AllCoursePage";
import SingleCoursePage from "./Pages/CoursePages/SingleCoursePage";
import MentorDashboardPage from "./Pages/MentorPages/Dashboard/MentorDashboardPage";
import MenteeDashboardPage from "./Pages/MenteePages/Dashboard/MenteeDashboardPage";
import AllMentorsPage from "./Pages/MentorPages/AllMentors/AllMentorsPage";
import BusinessMentorsPage from "./Pages/MentorPages/AllMentors/BusinessMentorsPage";
import TechnologyMentorsPage from "./Pages/MentorPages/AllMentors/TechnologyMentorsPage";
import SingleMentorProfilePage from "./Pages/MentorPages/AllMentors/SingleMentorProfilePages/SingleMentorProfilePage";
import SingleJobPage from "./Pages/JobPages/SingleJobPage";
import CoursePayment from "./Components/Courses/SingleCourse/CoursePayment";
import MentorPayment from "./Components/Mentor/AllMentors/SingleMentorProfile/MentorPayment";
import AllJobPage from "./Pages/JobPages/AllJobPage";
import InstituteDashboardPage from "./Pages/InstitutePages/Dashboard/InstituteDashboardPage";
import InstituteProfilePage from "./Pages/InstitutePages/Profile/InstituteProfilePage";
import MenteeProfilePage from "./Pages/MenteePages/MenteeProfilePage";
import PaymentCancPage from "./Pages/MiscPages/PaymentCancPage";
import MenteeRegistrationPage from "./Pages/FormPages/RegisterPages/MenteeRegistrationPage";
import ProtectedRoute from "./Utils/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Utils/Spinner"; // Your spinner component
import Test from "./Pages/Test";
import MenteeFeedbackForm from "./Components/Mentee/MenteeFeedback/MenteeFeedbackForm";
import AdminDashboardPage from "./Pages/AdminPages/AdminDashboardPage";
import ForgotPasswordPage from "./Pages/FormPages/ForgotPasswordPages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/FormPages/ForgotPasswordPages/ResetPasswordPage";
import CaseStudyPage from "./Pages/CaseStudyPages/CaseStudyPage";
import SingleCaseStudyPage from "./Pages/CaseStudyPages/SingleCaseStudyPage";
import InstituteRegistrationPage from "./Pages/FormPages/RegisterPages/InstituteRegistrationPage";
import InternshipPages from "./Pages/InternshipPages/InternshipPages";
import LinkedInCallback from "./Components/Linkedin/LinkedInCallback";
import AdminMentorPrivateProfilePage from "./Pages/AdminPages/AdminMentorPrivateProfilePage";
import MainComponent from "./Components/Mentor/AllMentors/CustomDatepicker/MainComponent";
import MentorExpertListPage from "./Pages/MentorPages/AllMentors/MentorExpertListPage";
import MentorNotFoundDashboardPage from "./Pages/MentorPages/Dashboard/MentorNotFoundDashboardPage";
import MentorUpdatedRegistrationPage from "./Pages/FormPages/RegisterPages/MentorUpdatedRegistrationPage";
import RedirectHandler from "./Utils/RedirectHandler";
import Cart from "./Pages/CartPages/CartPage";

// import ReactDate from "./Components/Mentor/AllMentors/CustomDatepicker/MainComponent";
// Internship imports
import PostInternship from "./Components/Employer/Internships/OtherComponents/PostInternship";
import Orginternship from "./Components/Employer/Internships/OtherComponents/orginternship";
import EmployerRegistrationPage from "./Pages/FormPages/RegisterPages/EmployerRegistrationPage";

import InternshipListingPage from "./Pages/InternshipPages/InternshipListingPage";
// import MenteeInternshipListing from "./Components/Mentee/MenteeDashboard/OtherComponents/MenteeInternshipListing";
import MenteeInternshipApplyPage from "./Components/Employer/Internships/OtherComponents/MenteeInternshipApplyPage";
// import SinglePageInternApplication from "./Components/Internships/SinglePageInternApplication";
import ApplicationsReceivedPage from "./Pages/InternshipPages/ApplicationsReceivedPage";
// import ReactDate from "./Components/Mentor/AllMentors/CustomDatepicker/MainComponent";
import SingleInternshipDetailsPage from "./Pages/InternshipPages/SingleInternshipDetailsPage";
// import PersonalDetailsforInternship from "./Components/Employer/Internships/MenteeApplyInternship/PersonalDetailsforInternship";
// import EduWorkDetailsForinternship from "./Components/Employer/Internships/MenteeApplyInternship/EduWorkDetailsForinternship";
import EmployerDashboardPage from "./Pages/EmployerPages/EmployerDashboardPage";
import PurchasedCaseStudiesPage from "./Pages/CaseStudyPages/PurchasedCaseStudiesPage";
import CaseStudyDetailPage from "./Pages/CaseStudyPages/CaseStudyDetailPage";
import SimulationPage from "./Pages/CaseStudyPages/SimulationPage";
import ResultPage from "./Pages/CaseStudyPages/ResultPage";
import FAQPage from "./Pages/FAQPage/FAQPage";
import InternshipApplication from "./Components/Mentee/MenteeDashboard/MenteeInternship/InternshipApply";

import TermsConditionsPage from "./Pages/LegalPages/TermsConditionsPage";
import PrivacyPolicyPage from "./Pages/LegalPages/PrivacyPolicyPage";
import SingleApplicantProfilePage from "./Pages/InternshipPages/SingleApplicantProfilePage";
import TeacherDashboardPage from "./Pages/InstitutePages/TeacherDashboard/TeacherDashboardPage";
import SingleAssignedCase from "./Components/Institute/FacultyManagement/TeacherDashboard/OtherComponents/SingleAssignedCase";
import DemoResultPage from "./Pages/CaseStudyPages/DemoResultPage";
import SingleNonPractywizCaseStudy from "./Components/Institute/FacultyManagement/TeacherDashboard/OtherComponents/SingleNonPractywizCaseStudy";
import SingleStudentAssessmentPage from "./Components/Institute/FacultyManagement/TeacherDashboard/OtherComponents/SingleStudentAssessmentPage";
import AvegaLandingPage from "./Pages/OtherLandingPages/AvegaLandingPage";

function App() {
  const user = useSelector((state) => state.user?.currentUser);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const token = localStorage.getItem("accessToken");
  return (
    <>
      {isLoading && <Spinner />}
      <ToastContainer
        position="top-center"
        hideProgressBar
        transition={Flip}
        autoClose={1500}
        closeOnClick
        draggable
      />
      <Router>
        <Routes>
          <Route path="/image/test" element={<Test />} />
          <Route
            path="/result/:menteeId/:caseStudyId"
            element={<DemoResultPage />}
          />
          <Route
            path="/case-study/:id"
            element={<SingleNonPractywizCaseStudy />}
          />
          <Route path="/case-study" element={<SingleNonPractywizCaseStudy />} />{" "}
          {/* Default route without ID */}
          <Route path="/" exact element={<Homepage />} />
          <Route path="/avega" exact element={<AvegaLandingPage />} />
          <Route path="/aboutus" exact element={<AboutusPage />} />
          <Route path="/contact" exact element={<ContactusPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/login"
            exact
            element={<LoginFormPage user={user} token={token} />}
          />
          <Route
            path="/redirect"
            element={<RedirectHandler user={user} token={token} />}
          />
          <Route
            path="/register"
            exact
            element={<Navigate to="/mentor-registration" />}
          />
          <Route
            path="/mentor-registration"
            exact
            element={<MentorUpdatedRegistrationPage />}
          />
          <Route path="/courses" exact element={<AllCoursePage />} />
          {/* Mentor Links starts */}
          <Route path="/mentor-connect" element={<AllMentorsPage />} />
          <Route
            path="/mentor-connect/business-mentors"
            element={<BusinessMentorsPage />}
          />
          <Route
            path="/mentor-connect/technology-mentors"
            element={<TechnologyMentorsPage />}
          />
          <Route path="/mentor-connect" element={<AllMentorsPage />} />
          <Route
            path="/mentor-connect/:expert"
            element={<MentorExpertListPage />}
          />
          <Route
            path="/mentor-connect/mentor-profile/:name/:id"
            element={<SingleMentorProfilePage />}
          />
          <Route
            path="/mentor-connect/mentor-profile/private/:name/:id"
            element={
              <AdminMentorPrivateProfilePage user={user} token={token} />
            }
          />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/date" element={<MainComponent />} />
          {/* passing of the user and token to dashboard is completed */}
          {user?.user_type === "mentor" && (
            <Route
              path="/mentor/dashboard"
              element={
                <ProtectedRoute>
                  <MentorDashboardPage user={user} token={token} />
                </ProtectedRoute>
              }
            />
          )}
          {user?.user_type === "mentor" && (
            <Route
              path="/mentor/dashboard/update-details"
              element={
                <ProtectedRoute>
                  <MentorNotFoundDashboardPage user={user} token={token} />
                </ProtectedRoute>
              }
            />
          )}
          {/* Mentor Links ends */}
          <Route
            path="/courses/single-course/:id"
            element={<SingleCoursePage />}
          />
          {user?.user_type === "mentee" && (
            <Route
              path="/mentee/dashboard"
              element={
                <ProtectedRoute>
                  <MenteeDashboardPage user={user} token={token} />
                </ProtectedRoute>
              }
            />
          )}
          {user?.user_role === 1 && (
            <Route
              path="/user/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage user={user} token={token} />
                </ProtectedRoute>
              }
            />
          )}
          <Route
            path="/mentee/view-profile/:id"
            element={
              <ProtectedRoute>
                <MenteeProfilePage user={user} token={token} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentee-registration"
            element={<MenteeRegistrationPage />}
          />
          <Route
            path="/institute-registration"
            element={<InstituteRegistrationPage />}
          />
          <Route path="/test1" element={<CoursePayment />} />
          {/* Jobs links start */}
          <Route path="/jobs" element={<AllJobPage />} />
          <Route path="/jobs/view-job/:id" element={<SingleJobPage />} />
          {/* Jobs links ends */}
          {/* Institute links start */}
          <Route
            path="/institute/view-profile/:id"
            element={<InstituteProfilePage />}
          />
          {/* {user?.user_type === "institute" && ( */}
          <Route
            path="/institute/dashboard"
            element={<InstituteDashboardPage user={user} token={token} />}
          />
          {/* )} */}
          {/* Institute links ends */}
          <Route path="/payment-error" element={<PaymentCancPage />} />
          {/* <Route path="/internships" element={<InternshipPages />} /> */}
          <Route path="/trainings" element={<InternshipPages />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/user/activate/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/case-studies"
            element={<CaseStudyPage user={user} token={token} />}
          />
          <Route
            path="/case-studies/view-case-study/:id"
            element={<SingleCaseStudyPage user={user} token={token} />}
          />
          <Route
            path="/auth/linkedin/callback"
            element={<LinkedInCallback />}
          />
          <Route
            path="/purchased-case-studies"
            element={<PurchasedCaseStudiesPage user={user} token={token} />}
          />
          <Route
            path="/purchased-case-studies/:id"
            element={<CaseStudyDetailPage user={user} token={token} />}
          />
          <Route
            path="/results"
            element={<ResultPage user={user} token={token} />}
          />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/cart" element={<Cart user={user} token={token} />} />
          {/* teacher dashboard start */}
          <Route
            path="/faculty/dashboard"
            element={<TeacherDashboardPage user={user} token={token} />}
          />
          <Route
            path="/faculty/Single-Student-Assessment-Page/mentee/:Mid/assignedCase/:ACid"
            element={<SingleStudentAssessmentPage />}
          />
          {/* teacher dashboard end */}
          {/* internship section start */}
          <Route
            path="/employer/dashboard"
            element={<EmployerDashboardPage user={user} token={token} />}
          />
          <Route
            path="/employer-registration"
            element={<EmployerRegistrationPage />}
          />
          <Route path="/internships" element={<InternshipListingPage />} />
          <Route
            path="/internship-listing/:id"
            element={<SingleInternshipDetailsPage user={user} token={token} />}
          />
          <Route
            path="/internship/apply"
            element={<InternshipApplication user={user} token={token} />}
          />
          {/* <Route
            path="/showmenteepersonaldetails"
            element={<PersonalDetailsforInternship user={user} token={token} />}
          />{" "}
          <Route
            path="/showmenteeedudetails"
            element={<EduWorkDetailsForinternship user={user} token={token} />}
          />
          <Route
            path="/MenteeApplyInternship"
            element={<MenteeInternshipApplyPage user={user} token={token} />}
          />{" "} */}
          <Route path="/orgInternship" element={<Orginternship />} />
          {/* <Route
            path="/SinglePageInternApplicaion"
            element={<SinglePageInternApplication />}
          /> */}
          <Route
            path="/internships/applicants/:id"
            element={<SingleApplicantProfilePage />}
          />
          <Route
            path="/internships/:profile/:id/applicants"
            element={<ApplicationsReceivedPage />}
          />
          {/* internship end */}
          <Route path="/legal/terms" element={<TermsConditionsPage />} />
          <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </Router>
      <ScrollButton />
    </>
  );
}

export default App;
