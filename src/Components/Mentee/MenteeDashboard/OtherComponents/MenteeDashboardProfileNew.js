"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Calendar,
  HelpCircle,
  FileText,
  Briefcase,
  Headphones,
  TrendingUp,
  Target,
  Zap,
  CalendarIcon,
  ChevronRight,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { useDispatch } from "react-redux";
import "../DashboardCSS/MenteeDashboardProfileNew.css";
import { ApiURL } from "./../../../../Utils/ApiURL";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";

// Dummy data
const dummyData = {
  user: {
    name: "Tushar",
    profileCompletion: 65,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  upcomingSession: {
    mentor: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=60&width=60",
      expertise: ["UX Design", "Product Management"],
    },
    topic: "Creating User-Centered Design Systems",
    time: "Today, 4:00 PM - 5:00 PM",
    countdown: "02:43:15",
  },

  internship: {
    current: {
      company: "TechFusion Inc.",
      position: "UX Design Intern",
      duration: "May 15 - Jul 15, 2025",
      salary: "₹15,000/month",
      progress: 60,
      status: "Active",
    },
    recommended: [
      {
        id: 1,
        company: "InnovateTech",
        position: "Product Management Intern",
        location: "Bangalore (Remote)",
        duration: "3 months",
        salary: "₹20,000/month",
      },
      {
        id: 2,
        company: "DesignHub",
        position: "UI/UX Design Intern",
        location: "Mumbai (Hybrid)",
        duration: "6 months",
        salary: "₹18,000/month",
      },
    ],
  },
  progress: {
    weeklyActivity: [
      { day: "Mon", value: 2 },
      { day: "Tue", value: 1 },
      { day: "Wed", value: 3 },
      { day: "Thu", value: 2 },
      { day: "Fri", value: 4 },
      { day: "Sat", value: 1 },
      { day: "Sun", value: 0 },
    ],
    stats: {
      completionRate: 78,
      currentStreak: 5,
      sessionsAttended: 12,
      totalSessions: 15,
    },
    goals: {
      portfolioCompletion: 75,
      message:
        "You're making great progress! Complete 2 more case studies to finish your portfolio.",
    },
  },
};

// TODO: create API to fetch recommended mentors, if any case studies, if any current internships, recommended internships, and progress summary data
// TODO:need to make backend controller for this component in mentee controller, also need to create a route for this component in mentee routes and sql query for this component in mentee queries
// TODO: need to handle no data like zero state for new mentee or if no data is available for any of the sections like recommended mentors, case studies, internships, and progress summary
const MenteeDashboardProfileNew = ({
  user,
  singleMenteeDtlsId,
  token,
  handleViewCaseStudy,
  HandleInternshipmenu,
}) => {
  const [recommendedMentors, setRecommendedMentors] = useState([]);
  const [recommendedInternships, setRecommendedInternships] = useState([]);
  const [assignedCaseStudies, setAssignedCaseStudies] = useState([]);
  const [allBookingSessions, setAllBookingSessions] = useState([]);
  // const [internshipTracker, setInternshipTracker] = useState([]);
  const [menteeOngoingInternship, setMenteeOngoingInternship] = useState([]);
  const dispatch = useDispatch();
  const url = ApiURL();

  // const mentee_id = user?.user?.user_id;
  // useEffect(() => {
  //   dispatch(showLoadingHandler());
  //   if (singleMenteeDtlsId) {
  //     // setLoading(dispatch);

  //     fetchMentors();
  //     recomMentors();
  //     recomInternships();
  //     menteeAssignedCaseStudies();
  //     dispatch(hideLoadingHandler());

  //   }
  // }, [url, user?.user_id]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        dispatch(showLoadingHandler());

        if (singleMenteeDtlsId) {
          await Promise.all([
            fetchMentors(),
            recomMentors(),
            recomInternships(),
            menteeAssignedCaseStudies(),
            MenteeOngoingInternship(),
          ]);
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
        // Optionally handle error state here
      } finally {
        dispatch(hideLoadingHandler());
      }
    };

    fetchAllData();
  }, [url, user?.user_id, singleMenteeDtlsId]);
  const recomMentors = async () => {
    try {
      const response = await axios.get(
        `${url}api/v1/mentee/dashboard/recommend-mentors/${singleMenteeDtlsId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        const recommendedMentorsData = response.data.recommendedMentors;
        setRecommendedMentors(recommendedMentorsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMentors = async () => {
    try {
      const response = await axios.post(
        `${url}api/v1/mentee/dashboard/appointments/upcoming`,
        { userDtlsId: user?.user_id }
      );
      if (response.data) {
        setAllBookingSessions(response.data.success);
      }
      if (response.data.error) {
        setAllBookingSessions([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const recomInternships = async () => {
    try {
      const response = await axios.get(
        `${url}api/v1/mentee/dashboard/recommend-internships/${singleMenteeDtlsId}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      if (response) {
        const recommendedInternshipsData = response.data.matchedInternships;
        setRecommendedInternships(recommendedInternshipsData);

        // console.log(recommendedInternshipsData);

        const handleResize = () => {
          setWindowWidth(window.innerWidth);
          setCurrentMentorIndex(0); // Reset to start when screen size changes
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const menteeAssignedCaseStudies = async () => {
    try {
      const response = await axios.get(
        `${url}api/v1/mentee/dashboard/mentee-case-studies/${singleMenteeDtlsId}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      if (response && response.data) {
        // console.log(response.data.data);
        setAssignedCaseStudies(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const MenteeOngoingInternship = async () => {
    try {
      const response = await axios.get(
        `${url}api/v1/mentee/dashboard/mentee-ongoing-internship/${user.user_id}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      if (response && response.data) {
        // console.log(response.data.data);
        setMenteeOngoingInternship(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [currentMentorIndex, setCurrentMentorIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  // Responsive mentors per page
  const getMentorsPerPage = () => {
    if (windowWidth <= 600) return 1; // Mobile: 1 card
    if (windowWidth <= 900) return 2; // Tablet: 2 cards
    if (windowWidth <= 1200) return 3; // Large tablet: 3 cards
    return 4; // Desktop: 4 cards
  };

  const mentorsPerPage = getMentorsPerPage();

  // Window resize handler
  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //     setCurrentMentorIndex(0); // Reset to start when screen size changes
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const nextMentors = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      if (currentMentorIndex + 4 >= recommendedMentors.length) {
        // Loop back to the beginning
        setCurrentMentorIndex(0);
      } else {
        setCurrentMentorIndex(currentMentorIndex + 1);
      }
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const prevMentors = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      if (currentMentorIndex <= 0) {
        // Loop to the end
        setCurrentMentorIndex(recommendedMentors.length - 1);
      } else {
        setCurrentMentorIndex(currentMentorIndex - 1);
      }
      setTimeout(() => setIsAnimating(false), 300);
    }
  }; // Get current mentors to display
  // const currentMentors =
  //   recommendedMentors.slice(
  //     currentMentorIndex,
  //     currentMentorIndex + mentorsPerPage
  //   );
  // With infinite loop, buttons are always enabled
  const canGoNext = true;
  const canGoPrev = true;

  // Filter mentors based on search query
  // const filteredMentors = useMemo(() => {
  //   if (!debouncedSearchQuery) return dummyData.recommendedMentors;

  //   return dummyData.recommendedMentors.filter(
  //     (mentor) =>
  //       mentor.name
  //         .toLowerCase()
  //         .includes(debouncedSearchQuery.toLowerCase()) ||
  //       mentor.position
  //         .toLowerCase()
  //         .includes(debouncedSearchQuery.toLowerCase()) ||
  //       mentor.expertise.some((skill) =>
  //         skill.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  //       )
  //   );
  // }, [debouncedSearchQuery]);
  return (
    <div className="mentee-new-dashboard-container">
      <main className="mentee-new-dashboard-main">
        {/* Upcoming Mentor Session - 100% width */}
        {allBookingSessions.length > 0 ? (
          <div className="new-mentee-profile-upcomming-session">
            <div className="new-mentee-profile-upcomming-session-left">
              {" "}
              <div className="new-mentee-profile-upcomming-session-header">
                <span className="new-mentee-profile-upcomming-session-title">
                  Upcoming Mentor Session
                </span>
                <span className="new-mentee-profile-upcomming-session-time">
                  <Calendar
                    size={16}
                    className="new-mentee-profile-upcomming-session-icon"
                  />
                  {allBookingSessions[0].mentor_session_booking_date.slice(
                    0,
                    10
                  )}
                </span>
              </div>
              <div className="new-mentee-profile-upcomming-session-mentor-row">
                <img
                  src={allBookingSessions[0].mentor_profile_photo}
                  alt="Priya Sharma"
                  className="new-mentee-profile-upcomming-session-mentor-image"
                  draggable={false}
                />
                <div className="new-mentee-profile-upcomming-session-mentor-info">
                  <span className="new-mentee-profile-upcomming-session-mentor-name">
                    {allBookingSessions[0].user_firstname}
                    {allBookingSessions[0].user_lastname}
                  </span>
                  <div className="new-mentee-profile-upcomming-session-mentor-tags">
                    <span className="new-mentee-profile-upcomming-session-mentor-tag ux">
                      {allBookingSessions[0].mentor_job_title}
                    </span>
                    <span className="new-mentee-profile-upcomming-session-mentor-tag pm">
                      {/* Product Management */}
                    </span>
                  </div>
                  <div className="new-mentee-profile-upcomming-session-topic">
                    {allBookingSessions[0].mentor_session_status}
                  </div>
                </div>
              </div>
            </div>
            <div className="new-mentee-profile-upcomming-session-right">
              <div className="new-mentee-profile-upcomming-session-start">
                {/* <span className="new-mentee-profile-upcomming-session-starts-label">
                  Starts in
                </span>
                <span className="new-mentee-profile-upcomming-session-starts-time">
                  02:43:15
                </span>{" "} */}
                <button className="new-mentee-profile-upcomming-session-join-btn">
                  <a href={allBookingSessions[0].trainee_join_url}>
                    Join Session
                  </a>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="new-mentee-profile-upcomming-session-nodata">
            <div className="new-mentee-profile-upcomming-session-header">
              <span className="new-mentee-profile-upcomming-session-title">
                Upcoming Mentor Session
              </span>
              <a href="#" className="ready-to-meet-link">
                Ready to meet an industry expert?
              </a>
            </div>

            <div className="session-content">
              <div className="session-info">
                <div className="calendar-icon">
                  <Calendar size={24} color="#9CA3AF" />
                </div>
                <div className="session-text">
                  <div className="no-sessions-text">
                    You haven't booked any sessions yet
                  </div>
                  <p className="guidance-text">
                    Book your first mentoring session to get personalized
                    guidance
                  </p>
                </div>
              </div>
              <div className="find-mentors-button">Find Available Mentors</div>
            </div>
          </div>
        )}
        {/* Recommended Mentors - 100% width */}

        {recommendedInternships && (
          <div className="new-mentee-profile-recommended-mentor-container">
            <div className="new-mentee-profile-recommended-mentor-header">
              <h3>Recommended Mentors</h3>
              <div className="new-mentee-profile-recommended-mentor-controls">
                <button
                  className={`new-mentee-profile-mentor-nav-btn ${
                    !canGoPrev ? "disabled" : ""
                  }`}
                  onClick={prevMentors}
                  disabled={!canGoPrev}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className={`new-mentee-profile-mentor-nav-btn ${
                    !canGoNext ? "disabled" : ""
                  }`}
                  onClick={nextMentors}
                  disabled={!canGoNext}
                >
                  <ChevronRight size={20} />
                </button>
                {/* <a
                href="#"
                className="new-mentee-profile-recommended-mentor-view-all"
              >
                <span>View All</span>
                <ChevronRight size={16} />
              </a> */}
              </div>
            </div>{" "}
            <div className="new-mentee-profile-recommended-mentor-carousel">
              {" "}
              <div
                className="new-mentee-profile-recommended-mentor-list"
                style={{
                  transform: `translateX(-${
                    currentMentorIndex * (100 / mentorsPerPage)
                  }%)`,
                  transition: isAnimating
                    ? "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
                }}
              >
                {recommendedMentors &&
                  recommendedMentors.map((mentor, index) => (
                    <div
                      className="new-mentee-profile-recommended-mentor-card"
                      key={mentor.mentor_id}
                      style={{
                        opacity:
                          index >= currentMentorIndex &&
                          index < currentMentorIndex + mentorsPerPage
                            ? 1
                            : 0.6,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <div className="new-mentee-profile-recommended-mentor-row">
                        <img
                          src={mentor.profile_photo}
                          alt={mentor.mentor_name}
                          className="new-mentee-profile-recommended-mentor-img"
                          draggable={false}
                        />
                        <div className="new-mentee-profile-recommended-mentor-details">
                          <div className="new-mentee-profile-recommended-mentor-name">
                            {mentor.mentor_name}
                          </div>
                          <div className="new-mentee-profile-recommended-mentor-title">
                            @ {mentor.mentor_company}
                          </div>
                          <div className="new-mentee-profile-recommended-mentor-tags">
                            {mentor.mentor_titile}
                          </div>
                          <div className="new-mentee-profile-recommended-mentor-rating">
                            {/* <Star size={16} className="star" fill="currentColor" /> */}
                            {/* <span className="rating-score">{mentor.rating}</span> */}
                          </div>
                        </div>
                      </div>
                      <div className="new-mentee-profile-recommended-mentor-tags">
                        {mentor.mentor_domain.map((tag) => (
                          <span
                            className="new-mentee-profile-recommended-mentor-tag"
                            key={tag}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="new-mentee-profile-recommended-mentor-footer">
                        <span
                        // className={new-mentee-profile-recommended-mentor-availability ${mentor.availabilityClass}}
                        >
                          {"Available"}
                        </span>
                        <a
                          className="new-mentee-profile-recommended-mentor-session"
                          href="#"
                        >
                          {"Book Now"}
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* end of recommend section */}

        {/* Quick Actions - 100% width */}
        <div className="new-mentee-profile-quick-action-root">
          <div className="new-mentee-profile-quick-action-header">
            Quick Actions
          </div>
          <div className="new-mentee-profile-quick-action-list">
            <Link to={"/mentor-connect"}>
              <div className="new-mentee-profile-quick-action-card ">
                <div
                  // onClick={}
                  className={`new-mentee-profile-quick-action-icon-bg mn-calendar`}
                >
                  <Calendar className="quick-action-icon mn-calendar" />
                </div>
                <div className="new-mentee-profile-quick-action-label mn-calendar">
                  Book Session
                </div>
              </div>
            </Link>
            {/* Case Study Card */}
            <div
              onClick={handleViewCaseStudy}
              className="new-mentee-profile-quick-action-card"
            >
              <div
                className={`new-mentee-profile-quick-action-icon-bg mn-help`}
              >
                <Headphones className="quick-action-icon mn-help" />
              </div>
              <div className="new-mentee-profile-quick-action-label mn-help">
                Case Studies
              </div>
            </div>
            {/* Internship Dashboard card */}
            <div
              onClick={HandleInternshipmenu}
              className="new-mentee-profile-quick-action-card"
            >
              <div
                className={`new-mentee-profile-quick-action-icon-bg mn-briefcase`}
              >
                <Briefcase className="quick-action-icon mn-briefcase" />
              </div>
              <div className="new-mentee-profile-quick-action-label">
                Internship Dashboard
              </div>
            </div>
            {/* help and support Card */}
            <Link to={"/faq"}>
              <div className="new-mentee-profile-quick-action-card">
                <div
                  className={`new-mentee-profile-quick-action-icon-bg mn-help`}
                >
                  <HelpCircle className="quick-action-icon mn-help" />
                </div>
                <div className="new-mentee-profile-quick-action-label">
                  Help & Support
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="new-mentee-profile-cs-internship-2col">
          <div className="new-mentee-profile-assigned-case-">
            <div className="assigned-case-header-row">
              <span className="assigned-case-header">
                Assigned Case Studies
              </span>
            </div>
            <div className="assigned-case-list">
              {assignedCaseStudies.length < 1 ? (
                <div className="assigned-case-card-blank">
                  <div className="assigned-case-card-blank-inner-section">
                    <div className="assigned-case-card-blank-inner-section-icon">
                      <FileText size={48} color="#d1d5db" />
                    </div>

                    <div className="assigned-case-card-blank-content">
                      <div className="assigned-case-card-blank-text">
                        If your faculty adds one, it will appear here. If you
                        not part of institute you can join one
                      </div>

                      <div className="assigned-case-card-blank-subtitle">
                        Work on real-world problems to build your portfolio
                      </div>

                      <button
                        className="assigned-case-card-blank-button"
                        onMouseEnter={(e) =>
                          (e.target.style.background = "#2563eb")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.background = "#3b82f6")
                        }
                      >
                        <a href="#" className="assigned-case-view-link">
                          Explore Case Studies
                        </a>
                      </button>
                    </div>
                  </div>{" "}
                </div>
              ) : (
                assignedCaseStudies.map((c, i) => (
                  <div className="assigned-case-card" key={i}>
                    <div className="assigned-case-card-top">
                      <span className="assigned-case-platform">
                        {c.faculty_case_assign_owned_by_practywiz
                          ? "PractyWiz"
                          : "Non-Practywiz"}
                      </span>{" "}
                      <a
                        href="#"
                        onClick={handleViewCaseStudy}
                        className="assigned-case-view-link"
                      >
                        View Case Study <ExternalLink size={14} />
                      </a>
                    </div>
                    <div className="assigned-case-company">
                      {c.non_practywiz_case_title ||
                        c.case_title ||
                        "Demo Case Study Title"}
                    </div>
                    <div className="assigned-case-role">{c.class_name}</div>
                    <div className="assigned-case-meta-row">
                      <span className="assigned-case-due">
                        Due {c.faculty_case_assign_end_date.slice(0, 10)}
                      </span>
                      <span className="assigned-case-status">
                        {c.class_status ? "Active" : "InActive"}
                      </span>
                    </div>
                    <div className="assigned-case-assessment">
                      Assessment start time and date
                    </div>
                    <div className="assigned-case-card-bottom">
                      <CalendarIcon className="assigned-case-calendar-icon" />
                      <span className="assigned-case-start">
                        Start: {c.faculty_case_assign_start_date.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                ))
              )}
              {}
            </div>
          </div>

          {/* Internship Tracker section */}
          <div className="new-mentee-profile-internship-tracker-">
            {" "}
            <div className="internship-header-row">
              <span className="internship-header">Internship Tracker</span>{" "}
            </div>
            <div className="new-mentee-profile-internship-tracker-list">
              {menteeOngoingInternship.length > 0 ? (
                menteeOngoingInternship.map((internship) => (
                  <div
                    key={internship.internship_post_dtls_id}
                    className="internship-tracker-card"
                  >
                    <div className="internship-tracker-card-top">
                      <span className="internship-company">
                        {internship.employer_internship_post_position}
                      </span>
                      <span className="internship-status">
                        {internship.progressbar === 100
                          ? "Completed"
                          : "Active"}
                      </span>{" "}
                    </div>
                    <div className="internship-role">
                      {internship.employer_organization_name}
                    </div>
                    <div className="internship-dates-row">
                      <CalendarIcon className="internship-date-icon" />
                      <span className="internship-dates">
                        {internship.internship_applicant_dtls_update_date.slice(
                          0,
                          10
                        )}{" "}
                      </span>
                      <span className="internship-dates">
                        {internship.employer_internship_post_duration}
                        months
                      </span>
                      <span className="internship-stipend">
                        {internship.employer_internship_post_stipend_amount >
                          0 && <span>&#8377;</span>}{" "}
                        {internship.employer_internship_post_stipend_amount}
                      </span>
                    </div>
                    <div className="internship-progress-row">
                      <span className="internship-progress-label">
                        Progress
                      </span>
                      <div className="internship-progress-bar-bg">
                        <div
                          className="internship-progress-bar-fg"
                          style={{ width: internship.progressbar + "%" }}
                        />
                      </div>
                      <span className="internship-progress-percent">
                        {internship.progressbar}%
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="internship-tracker-card-blank">
                  {/* <div className="no-internships-content"> */}
                  <div className="no-internships-icon">
                    <FileText size={48} />
                  </div>
                  <div className="no-internships-title">
                    No Active Internships
                    <div className="no-internships-subtitle">
                      You haven't applied for any internships yet
                    </div>
                  </div>

                  <button
                    onClick={HandleInternshipmenu}
                    className="start-applying-button"
                  >
                    Start Applying
                  </button>
                  {/* </div> */}
                </div>
              )}
            </div>
            <div className="internship-rec-header">Recommended Internships</div>
            <div className="internship-rec-list">
              {recommendedInternships.length > 0 &&
                recommendedInternships.map((internship) => (
                  <div
                    className="internship-rec-card"
                    key={internship.internship_id}
                  >
                    <div className="internship-rec-left">
                      <div className="internship-rec-company">
                        {internship.internship_domain}
                      </div>
                      <div className="internship-rec-role">
                        {internship.internship_title}
                      </div>
                      <div className="internship-rec-meta">
                        <span>{internship.internship_location}</span>
                        <span className="internship-rec-dot">·</span>
                        <span>{internship.internship_duration} months</span>
                      </div>
                    </div>
                    <div className="internship-rec-right">
                      <div className="internship-stipend">
                        {internship.internship_amount > 0 && (
                          <span>&#8377;</span>
                        )}{" "}
                        {internship.internship_amount}
                        {internship.internship_amount > 0 && (
                          <span>/Month</span>
                        )}{" "}
                      </div>
                      <a href="#" className="internship-rec-cta">
                        Apply Now
                        {/* <ExternalLink size={14} /> */}
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Progress Summary */}
        {/* <section className="mentee-new-dashboard-progress-summary">
          <h2>Progress Summary</h2>

          <div className="mentee-new-dashboard-progress-grid">
            <div className="mentee-new-dashboard-weekly-activity">
              <h3>Weekly Activity</h3>
              <div className="mentee-new-dashboard-chart">
                <div className="mentee-new-dashboard-chart-bars">
                  {dummyData.progress.weeklyActivity.map((day, index) => (
                    <div
                      key={index}
                      className="mentee-new-dashboard-chart-bar-container"
                    >
                      <div
                        className="mentee-new-dashboard-chart-bar"
                        style={{ height: `${day.value * 25}%` }}
                      ></div>
                      <span className="mentee-new-dashboard-chart-label">
                        {day.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mentee-new-dashboard-stats">
              <h3>Your Stats</h3>
              <div className="mentee-new-dashboard-stat-item">
                <div className="mentee-new-dashboard-stat-icon">
                  <Target size={20} color="#10B981" />
                </div>
                <div>
                  <span className="mentee-new-dashboard-stat-label">
                    Completion Rate
                  </span>
                  <span className="mentee-new-dashboard-stat-value">
                    {dummyData.progress.stats.completionRate}%
                  </span>
                </div>
              </div>

              <div className="mentee-new-dashboard-stat-item">
                <div className="mentee-new-dashboard-stat-icon">
                  <TrendingUp size={20} color="#3B82F6" />
                </div>
                <div>
                  <span className="mentee-new-dashboard-stat-label">
                    Current Streak
                  </span>
                  <span className="mentee-new-dashboard-stat-value">
                    {dummyData.progress.stats.currentStreak} days
                  </span>
                </div>
              </div>

              <div className="mentee-new-dashboard-stat-item">
                <div className="mentee-new-dashboard-stat-icon">
                  <Zap size={20} color="#F59E0B" />
                </div>
                <div>
                  <span className="mentee-new-dashboard-stat-label">
                    Sessions Attended
                  </span>
                  <span className="mentee-new-dashboard-stat-value">
                    {dummyData.progress.stats.sessionsAttended}/
                    {dummyData.progress.stats.totalSessions}
                  </span>
                </div>
              </div>
            </div>

            <div className="mentee-new-dashboard-goal-progress">
              <h3>Goal Progress</h3>
              <div className="mentee-new-dashboard-goal-item">
                <div className="mentee-new-dashboard-goal-header">
                  <span>Complete UX Portfolio</span>
                  <span>{dummyData.progress.goals.portfolioCompletion}%</span>
                </div>
                <div className="mentee-new-dashboard-progress-bar">
                  <div
                    className="mentee-new-dashboard-progress-fill"
                    style={{
                      width: `${dummyData.progress.goals.portfolioCompletion}%`,
                    }}
                  ></div>
                </div>
                <p className="mentee-new-dashboard-goal-message">
                  {dummyData.progress.goals.message}
                </p>
              </div>
              <button className="mentee-new-dashboard-view-goals">
                View All Goals
              </button>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default MenteeDashboardProfileNew;
