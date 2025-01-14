import React, { useEffect, useState } from "react";
import MentorCardSkelton from "../SkeltonLoaders/MentorCardSkelton";
import AllMentorCard from "../AllMentors/AllMentorCard";
import axios from "axios";
import { ApiURL } from "../../../Utils/ApiURL";
import { Link, useParams } from "react-router-dom";

const MentorExpertList = () => {
  const url = ApiURL();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [allMentors, setAllExpertMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);

  const [filters, setFilters] = useState({
    availability: "",
    experience: "",
    pricing: "",
    rating: "",
  });

  useEffect(() => {
    const fetchMentors = async () => {
      if (params.expert === "all-mentors") {
        var response = await axios.get(`${url}api/v1/mentor/fetch-details`);
      } else {
        response = await axios.post(`${url}api/v1/mentor/expert-list`, {
          expert: params.expert,
        });
      }
      setLoading(false);
      if (response.data.success) {
        // Parse JSON strings into JavaScript objects
        const mentorsWithParsedData = response.data.success.map((mentor) => ({
          ...mentor,
          timeslot_list: JSON.parse(mentor.timeslot_list || "[]"),
          booking_dtls_list: JSON.parse(mentor.booking_dtls_list || "[]"),
        }));
        setAllExpertMentors(mentorsWithParsedData);
        setFilteredMentors(mentorsWithParsedData);
      } else {
        setAllExpertMentors([]);
        setFilteredMentors([]);
      }
    };
    fetchMentors();
  }, [url, params.expert]);
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };
  const experienceOptions = [
    { value: "5-8", label: "5-8 years" },
    { value: "8-11", label: "8-11 years" },
    { value: "11-14", label: "11-14 years" },
    { value: "14-17", label: "14-17 years" },
    { value: "17-20", label: "17-20 years" },
    { value: "20-23", label: "20-23 years" },
    { value: "23-26", label: "23-26 years" },
    { value: "26-29", label: "26-29 years" },
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
          } else if (filters.experience === "8-11") {
            return experience > 8 && experience <= 11;
          } else if (filters.experience === "11-14") {
            return experience > 11 && experience <= 14;
          } else if (filters.experience === "14-17") {
            return experience > 14 && experience <= 17;
          } else if (filters.experience === "17-20") {
            return experience > 17 && experience <= 20;
          } else if (filters.experience === "20-23") {
            return experience > 20 && experience <= 23;
          } else if (filters.experience === "23-26") {
            return experience > 23 && experience <= 26;
          } else if (filters.experience === "26-29") {
            return experience > 26 && experience <= 29;
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
          Mentor Connect{" "}
          <i
            className="fa-solid fa-plus fa-2xl fgtrbdhefg"
            style={{ color: "#1b63de" }}
          ></i>
        </h2>
        <h4 style={{ textAlign: "center" }}>
          Learn From The Corporate, Step Into Corporate World!
        </h4>
      </div>

      <div className="kghfbgfgbhfg pb-0 " style={{ paddingTop: "2rem" }}>
        <div className="ighefirr bg-white py-2">
          <p style={{ paddingLeft: "50px" }}>
            <Link to={"/"}>
              <i className="fa fa-home" style={{ fontSize: "14px" }}></i>
              Home
            </Link>
            <i
              className="fa-solid fa-angles-right"
              style={{ fontSize: "14px" }}
            ></i>
            Mentor Connect
          </p>
          <div className="container-fluid px-5">
            <div className="uilhdier_filter_wrap d-flex slign-items-center justify-content-between">
              <div class="filter-container">
                <div class="filter-button">
                  <span class="icon icon-availability"></span>
                  <span class="filter-text">Mentor Availability</span>
                  <select
                    class="filter-dropdown"
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
                    <button
                      className="btn-clear-availability-unique"
                      onClick={() => clearFilters("availability")}
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div class="filter-button">
                  <span class="icon icon-experience"></span>
                  <span class="filter-text">Experience</span>
                  <select
                    class="filter-dropdown"
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
                    <button
                      className="btn-clear-availability-unique"
                      onClick={() => clearFilters("experience")}
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div class="filter-button">
                  <span class="icon icon-price"></span>
                  <span class="filter-text">Price Range (₹)</span>
                  <select
                    class="filter-dropdown"
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
                    <button
                      className="btn-clear-availability-unique"
                      onClick={() => clearFilters("pricing")}
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div class="filter-button">
                  <span class="icon icon-rating"></span>
                  <span class="filter-text">Rating</span>
                  <select
                    class="filter-dropdown"
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
                    <button
                      className="btn-clear-availability-unique"
                      onClick={() => clearFilters("rating")}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="kjgbhdfdfgfghfghfg">
        <div className="container-fluid px-5">
          <div
            className="nfhjgbgf"
            style={{
              alignItems:
                !loading && filteredMentors.length === 0 ? "center" : "",
              justifyContent:
                !loading && filteredMentors.length === 0 ? "center" : "",
            }}
          >
            {loading ? (
              <>
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
                <MentorCardSkelton />
              </>
            ) : (
              <>
                {filteredMentors.length > 0 ? (
                  filteredMentors?.map((mentor) => {
                    return <AllMentorCard mentor={mentor} />;
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

export default MentorExpertList;
