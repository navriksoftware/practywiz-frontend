import React, { useEffect, useState } from "react";
import AllMentorCard from "./AllMentorCard";
import axios from "axios";
import { ApiURL } from "../../../Utils/ApiURL";
import MentorCardSkelton from "../SkeltonLoaders/MentorCardSkelton";
import "./AllMentors.css";
import "./Dropdown.css";
import { Link } from "react-router-dom";
import Spinner from "../../../Utils/Spinner";
const AllMentors = () => {
  const url = ApiURL();
  const [loading, setLoading] = useState(false);
  const [allMentors, setAllMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);

  const [filters, setFilters] = useState({
    availability: "",
    experience: "",
    pricing: "",
    rating: "",
  });

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      const response = await axios.get(`${url}api/v1/mentor/fetch-details`);
      setLoading(false);
      if (response.data.success) {
        // Parse JSON strings into JavaScript objects
        const mentorsWithParsedData = response.data.success.map((mentor) => ({
          ...mentor,
          timeslot_list: JSON.parse(mentor.timeslot_list || "[]"),
          booking_dtls_list: JSON.parse(mentor.booking_dtls_list || "[]"),
        }));

        setAllMentors(mentorsWithParsedData);
        setFilteredMentors(mentorsWithParsedData);
      } else {
        setAllMentors([]);
        setFilteredMentors([]);
      }
    };
    fetchMentors();
  }, [url]);

const API_KEY = process.env.REACT_APP_API_KEY;

  const [DefaultCurruncyType, setDefaultCurruncyType] = useState("IN");

  const fetchLocationData = async () => {
    try {
      const response = await fetch(`https://ipinfo.io?token=${API_KEY}`);
      const data = await response.json();
      setDefaultCurruncyType(data.country);

    } catch (error) {
      setDefaultCurruncyType("IN");

      console.error("Error fetching location data:", error);
    }
  };

  // Fetch the location data when the component mounts
  useEffect(() => {
    fetchLocationData();
  }, []);





  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };
  const experienceOptions = [
    { value: "5-8", label: "5-8 years" },
    { value: "9-11", label: "9-11 years" },
    { value: "12-14", label: "12-14 years" },
    { value: "15-17", label: "15-17 years" },
    { value: "18-20", label: "18-20 years" },
    { value: "21-23", label: "21-23 years" },
    { value: "24-26", label: "24-26 years" },
    { value: "27-29", label: "27-29 years" },
    { value: "30+", label: "30+ years" },
  ];
  const ratingOptions = [
    { value: "0-1", label: "0-1 stars" },
    { value: "1-2", label: "1-2 stars" },
    { value: "2-3", label: "2-3 stars" },
    { value: "3-4", label: "3-4 stars" },
    { value: "4-5", label: "4-5 stars" },
  ];
  const pricingOptions = [
    { value: "300-500", label: "₹300 - ₹500" },
    { value: "500-800", label: "₹500 - ₹800" },
    { value: "800-1100", label: "₹800 - ₹1100" },
    { value: "1100-1400", label: "₹1100 - ₹1400" },
    { value: "1400-1700", label: "₹1400 - ₹1700" },
    { value: "1700-2000", label: "₹1700 - ₹2000" },
    { value: "2000-2500", label: "₹2000 - ₹2500" },
  ];
  const technologyOptions = [
    {
      value: "Technology & Software Development",
      label: "Technology & Software Development",
    },
    { value: "Business & Management", label: "Business & Management" },
    { value: "Finance & Accounting", label: "Finance & Accounting" },
    { value: "Healthcare & Medical", label: "Healthcare & Medical" },
    { value: "Creative & Media", label: "Creative & Media" },
    { value: "Education & Training", label: "Education & Training" },
    { value: "Law & Legal Services", label: "Law & Legal Services" },
    { value: "Engineering", label: "Engineering" },
    { value: "Science & Research", label: "Science & Research" },
    { value: "Marketing & Sales", label: "Marketing & Sales" },
  ];
  useEffect(() => {
    const applyFilters = () => {
      let updatedMentors = [...allMentors];

      // Assuming 'filters.availabilityDays' contains the selected availability option (7, 14, 21, 30 days, etc.)

      // Availability filtering
      if (filters.availability) {
        const today = new Date();
        const daysToAdd = parseInt(filters.availability, 10);
        const availabilityEndDate = new Date(today);
        availabilityEndDate.setDate(today.getDate() + daysToAdd);

        updatedMentors = updatedMentors.filter((mentor) => {
          // Check if the mentor has any timeslot that is valid until the availability end date
          return mentor.timeslot_list.some((timeslot) => {
            const mentorEndDate = new Date(
              timeslot.mentor_timeslot_rec_end_timeframe
            ); // Get the mentor's end date
            return mentorEndDate >= availabilityEndDate; // Check if mentor's end date is greater than or equal to availability end date
          });
        });
      }

      if (filters.experience) {
        // Filter logic for experience
        updatedMentors = updatedMentors.filter((mentor) => {
          const experience = parseInt(mentor.mentor_years_of_experience, 10);
          if (filters.experience === "5-8") {
            return experience >= 5 && experience <= 8;
          } else if (filters.experience === "9-11") {
            return experience >= 9 && experience <= 11;
          } else if (filters.experience === "12-14") {
            return experience >= 12 && experience <= 14;
          } else if (filters.experience === "15-17") {
            return experience >= 15 && experience <= 17;
          } else if (filters.experience === "18-20") {
            return experience >= 18 && experience <= 20;
          } else if (filters.experience === "21-23") {
            return experience >= 21 && experience <= 23;
          } else if (filters.experience === "24-26") {
            return experience >= 24 && experience <= 26;
          } else if (filters.experience === "27-29") {
            return experience >= 27 && experience <= 29;
          } else if (filters.experience === "30+") {
            return experience >= 30;
          }
          return true; // Default case
        });
      }
      if (filters.pricing) {
        // filter logic for price range
        updatedMentors = updatedMentors.filter((mentor) => {
          const price = parseInt(mentor.mentor_session_price, 10);
          if (filters.pricing === "300-500") {
            return price >= 300 && price <= 500;
          } else if (filters.pricing === "500-800") {
            return price > 500 && price <= 800;
          } else if (filters.pricing === "800-1100") {
            return price > 800 && price <= 1100;
          } else if (filters.pricing === "1100-1400") {
            return price > 1100 && price <= 1400;
          } else if (filters.pricing === "1400-1700") {
            return price > 1400 && price <= 1700;
          } else if (filters.pricing === "1700-2000") {
            return price > 1700 && price <= 2000;
          } else if (filters.pricing === "2000-2500") {
            return price > 2000 && price <= 2500;
          }

          return true; // Default case
        });
      }

      if (filters.rating) {
        // filter logic for rating
        // filter logic for price range
        updatedMentors = updatedMentors.filter((mentor) => {
          const rating = parseInt(mentor.feedback_count, 10);
          if (filters.rating === "0-1") {
            return rating >= 0 && rating <= 1;
          } else if (filters.rating === "1-2") {
            return rating > 1 && rating <= 2;
          } else if (filters.rating === "2-3") {
            return rating > 2 && rating <= 3;
          } else if (filters.rating === "3-4") {
            return rating > 3 && rating <= 4;
          } else if (filters.rating === "4-5") {
            return rating > 4 && rating <= 5;
          }

          return true; // Default case
        });
      }

      setFilteredMentors(updatedMentors);
    };

    applyFilters();
  }, [filters, allMentors]);

  const clearFilters = (filterType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: filterType === "priceRange" ? { min: "", max: "" } : "",
    }));
  };

  return (
    <>
      <div className="adadadad mt-8">
        <h2 style={{ textAlign: "center" }} className="kukuddd">
          Mentor Connect
          <i
            className="fa-solid fa-plus fa-2xl fgtrbdhefg"
            style={{ color: "#1b63de" }}
          ></i>
        </h2>
        {/* <h4 style={{ textAlign: "center" }}>
          Learn From The Corporate, Step Into Corporate World!
        </h4> */}
      </div>

      <div className="kghfbgfgbhfg pb-0 " style={{ paddingTop: "1rem" }}>
        <div className="ighefirr bg-white py-2">
          {/* <p style={{ paddingLeft: "50px" }}>
            <Link to={"/"}>
              <i className="fa fa-home" style={{ fontSize: "14px" }}></i>
              Home
            </Link>
            <i
              className="fa-solid fa-angles-right"
              style={{ fontSize: "14px" }}
            ></i>
            Mentor Connect
          </p> */}
          <div className="container-fluid">
            <div className="uilhdier_filter_wrap d-flex align-items-center justify-content-center ">
              <div class="filter-container">
                <div class="filter-button">
                  <span class="icon icon-availability"></span>
                  <span class="filter-text">Mentor Availability</span>
                  <select
                    class="filter-dropdown"
                    value={filters.availability}
                    onChange={(e) =>
                      handleFilterChange("availability", e.target.value)
                    }
                  >
                    <option value="">Select Availability</option>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                    <option value="21">21 Days</option>
                    <option value="30">30 Days</option>
                    <option value="100">100 Days</option>
                  </select>
                  {filters.availability && (
                    // <button
                    //   className="btn-clear-availability-unique"
                    //   onClick={() => clearFilters("availability")}
                    // >
                    //  <i class="fa-solid fa-xmark"></i>
                    // </button>
                    <i
                      onClick={() => clearFilters("availability")}
                      class="fa-solid fa-xmark"
                    ></i>
                  )}
                </div>

                <div class="filter-button">
                  <span class="icon icon-experience"></span>
                  <span class="filter-text">Experience</span>
                  <select
                    class="filter-dropdown"
                    value={filters.experience}
                    onChange={(e) =>
                      handleFilterChange("experience", e.target.value)
                    }
                  >
                    <option value="">Select Experience</option>
                    {experienceOptions?.map((experience) => {
                      return (
                        <option value={experience.value}>
                          {experience.label}
                        </option>
                      );
                    })}
                  </select>
                  {filters.experience && (
                    // <button
                    //   className="btn-clear-availability-unique"
                    //   onClick={() => clearFilters("experience")}
                    // >

                    // </button>
                    <i
                      onClick={() => clearFilters("experience")}
                      class="fa-solid fa-xmark"
                    ></i>
                  )}
                </div>

                <div class="filter-button">
                  <span class="icon icon-price"></span>
                  <span class="filter-text">Price Range (₹)</span>
                  <select
                    class="filter-dropdown"
                    value={filters.pricing}
                    onChange={(e) =>
                      handleFilterChange("pricing", e.target.value)
                    }
                  >
                    <option value="">Select Pricing</option>
                    {pricingOptions?.map((price) => {
                      return <option value={price.value}>{price.label}</option>;
                    })}
                  </select>
                  {filters.pricing && (
                    // <button
                    //   className="btn-clear-availability-unique"
                    //   onClick={() => clearFilters("pricing")}
                    // >
                    // </button>
                    <i
                      onClick={() => clearFilters("pricing")}
                      class="fa-solid fa-xmark"
                    ></i>
                  )}
                </div>

                <div class="filter-button">
                  <span class="icon icon-rating"></span>
                  <span class="filter-text">Rating</span>
                  <select
                    class="filter-dropdown"
                    value={filters.rating}
                    onChange={(e) =>
                      handleFilterChange("rating", e.target.value)
                    }
                  >
                    <option value="">Select Rating</option>
                    {ratingOptions?.map((rating) => {
                      return (
                        <option value={rating.value}>{rating.label}</option>
                      );
                    })}
                  </select>
                  {filters.rating && (
                    // <button
                    //   className="btn-clear-availability-unique"
                    //   onClick={() => clearFilters("rating")}
                    // >

                    // </button>
                    <i
                      onClick={() => clearFilters("rating")}
                      class="fa-solid fa-xmark"
                    ></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="kjgbhdfdfgfghfghfg">
        <div className="container-fluid">
          <div
            className="AllMentor-showAllCards"
            style={{
              alignItems:
                !loading && filteredMentors.length === 0 ? "center" : "",
              justifyContent:
                !loading && filteredMentors.length === 0 ? "center" : "",
            }}
          >
            {loading ? (
              <>
                {/* <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton /> */}
                <Spinner />
              </>
            ) : (
              <>
                {filteredMentors.length > 0 ? (
                  filteredMentors?.map((mentor) => {
                    return <AllMentorCard mentor={mentor} DefaultCurruncyType={DefaultCurruncyType} />;
                  })
                ) : (
                  <div className="options-container">
                    <div className="main-option">
                      <h4 className="noReviewsFound">
                        No Mentor Found, Try with Different Filters
                      </h4>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMentors;
