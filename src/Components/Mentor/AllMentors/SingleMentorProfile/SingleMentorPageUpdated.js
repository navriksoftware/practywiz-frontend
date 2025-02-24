import Navbar from "../../../Navbar/Navbar.js";
import "./SingleMentorPageUpdated.css";
import React, { useEffect, useState } from "react";
import { countryCurrencyMapping } from "../../../data/Currency_Convertion.js";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import MentorBookingAppointment from "./MentorBookingAppointment";
import { useSelector } from "react-redux";
import CustomDatePicker from "../CustomDatepicker/CustomDatePicker";
import { toast } from "react-toastify";
import SingleMentorProfilePageSkelton from "./Skelton/SingleMentorProfilePageSkelton";
import MentorRatingCard from "./MentorRatingCard";
import StarRating from "../../../../Utils/StartRating";
import { Link, useNavigate, useParams } from "react-router-dom";

const SingleMentorPageUpdated = () => {
  function toTitleCase(str) {
    if (!str) return ""; // Handle null or undefined values
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const handleScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const user = useSelector((state) => state.user?.currentUser);

  const [showBookingModel, setShowBookingModel] = useState(false);
  const url = ApiURL();
  const params = useParams();
  const mentorDtlsId = params.id;
  const navigate = useNavigate();

  const [singleMentor, setSingleMentor] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mentorTimeSlotDuration, setMentorTimeSlotDuration] = useState("30");

  const handleDateSlotSelect = (date, slot, timeSlotId) => {
    setSelectedDate(date);
    setSelectedSlot(slot);
    setSelectedTimeSlotId(timeSlotId);
  };
  const MentorTimeSlotDurationHandler = (e) => {
    setMentorTimeSlotDuration(e.target.value);
  };

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

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const FCurrency = fromCurrency.slice(0, -1);

    if (!countryCurrencyMapping || countryCurrencyMapping.length === 0) {
      console.error("Currency mapping data is not available.");
      return 0; // Return a default value
    }

    // Find the conversion rates for `fromCurrency` and `toCurrency`
    const fromRateEntry = countryCurrencyMapping.find(
      (entry) => entry.currency === FCurrency
    );
    const toRateEntry = countryCurrencyMapping.find(
      (entry) => entry.currency === toCurrency
    );

    // Validate if the rates exist
    if (!fromRateEntry || !toRateEntry) {
      console.error(
        `Conversion rate not found for ${!fromRateEntry ? fromCurrency : toCurrency
        }`
      );
      return 0; // Return a default value
    }

    const fromRate = fromRateEntry.conversionRate;
    const toRate = toRateEntry.conversionRate;

    // Convert the amount from `fromCurrency` to `USD` and then to `toCurrency`
    const amountInUSD = amount / fromRate; // Convert to USD
    const convertedAmount = amountInUSD * toRate; // Convert from USD to `toCurrency`

    // Round the result to 2 decimal places for better readability
    return parseFloat(convertedAmount.toFixed(2));
  };

  const convertCurrencySymbol = (toCurrency) => {
    // Save the currency symbol in state
    const symbol = countryCurrencyMapping.find(
      (entry) => entry.currency === toCurrency
    ).currencySymbol;

    return symbol;
  };

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      const response = await axios.post(
        `${url}api/v1/mentor/fetch-single-details/${mentorDtlsId}`,
        { userId: mentorDtlsId }
      );
      setLoading(false);
      if (response.data.success) {
        setLoading(false);

        // Set the mentor data in state
        const mentorData = response.data.success;
        setSingleMentor(mentorData); // Set the mentor data

        // Access the mentor session price directly from the response data
        setSelectedPrice(mentorData[0].mentor_session_price / 2);
      }

      if (response.data.error) {
        return (
          toast.error(
            "Public profile will be available after mentor application is approved"
          ),
          navigate("/redirect"),
          setLoading(false),
          setSingleMentor(null)
        );
      }
    };
    fetchMentors();
    handleScroll("targetElementTop");
  }, [mentorDtlsId, url]);
  const CreateBookingAppointment = () => {
    if (selectedDate === null || selectedSlot === null) {
      toast.error("Please select the Date and Time slot details");
    } else {
      setShowBookingModel(!showBookingModel);
    }
  };
  useEffect(() => {
    document.title = `Practywiz | ${singleMentor[0]?.mentor_firstname + " " + singleMentor[0]?.mentor_lastname
      }`;
  }, [singleMentor]);
  const [showLessText, setShowLessText] = useState(false);

  const Rating = Math.floor(Math.random() * 3) + 3;
  const RatingNo = 329;
  return (
    <div id="targetElementTop">
      <div className="Singlementor-screen">
        {" "}
        <Navbar />
      </div>

      {loading ? (
        <>
          <SingleMentorProfilePageSkelton />
        </>
      ) : (
        <>
          {showBookingModel && (
            <MentorBookingAppointment
              mentorTimeSlotDuration={mentorTimeSlotDuration}
              selectedTimeSlotId={selectedTimeSlotId}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              singleMentor={singleMentor}
              showCloseHandler={CreateBookingAppointment}
            />
          )}
          {singleMentor?.map((sMentor, index) => {
            const convertedAmount = convertCurrency(
              sMentor.mentor_session_price,
              sMentor.mentor_currency_type,
              DefaultCurruncyType
            );
            return (
              <div key={index} className="mentor-profile-mainpage">
                {/* Blue ribbon at top */}
                <div className="mentor-profile-ribbon"></div>

                {/* Main content container */}
                <div className="SingleMentorProfile-Flex">
                  {" "}
                  <div className="mentor-profile-container">
                    <div className="mentor-profile-content">
                      {/* Left Column */}

                      <div className="mentor-profile-col1">
                        <div className="mentor-image-container">
                          <img
                            src={sMentor.mentor_profile_photo}
                            className="mentor-image"
                            alt={
                              sMentor.mentor_firstname +
                              " " +
                              sMentor.mentor_lastname
                            }
                            style={{ borderRadius: "15px", width: "100%" }}
                          />
                        </div>
                        <span className="SingleMentor-span121 span121">
                          <StarRating rating={Rating}
                          // rating={sMentor.avg_mentor_rating}
                          />(
                          {/* {sMentor.feedback_count} */}
                          {RatingNo} Reviews)
                        </span>
                      </div>

                      {/* Middle Column */}
                      <div className="mentor-profile-col2">
                        <div className="mentor-name-section">
                          <span className="mentor-name">
                            {toTitleCase(sMentor?.mentor_firstname)}{" "}
                            {toTitleCase(sMentor?.mentor_lastname)} 
                            
                          </span>
                          <span className="linkedinIconMediaQ"> {sMentor.mentor_social_media_profile && (
                              <>
                                <a
                                  href={sMentor.mentor_social_media_profile}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="linkedin-link"
                                >
                                  <i className="fa-brands fa-linkedin fa-2xl"></i>
                                </a>
                              </>
                            )}</span>
                        </div>

                        <div className="mentor-company">
                          {toTitleCase(sMentor.mentor_job_title)} @{" "}
                          {toTitleCase(sMentor.mentor_company_name)}{" "}

                        </div>

                        <div className="mentor-domains">
                          {sMentor?.mentor_domain &&
                            sMentor.mentor_domain !== "[]" &&
                            JSON.parse(sMentor.mentor_domain)?.map(
                              (domain, index, arr) => (
                                <span key={index} className="domain-tag">
                                  {toTitleCase(domain)}
                                  {index < arr.length - 1 && " |"}
                                </span>
                              )
                            )}
                        </div>
                      </div>
                      <div className="mentor-description">
                        <p className="mentor-headline">
                          {!showLessText
                            ? sMentor.mentor_headline.slice(0, 300) + " "
                            : sMentor.mentor_headline}
                          <span
                            className="show-more-text"
                            onClick={() => setShowLessText(!showLessText)}
                          >
                            {!showLessText ? "see more" : "see less"}
                          </span>
                        </p>
                      </div>

                      {/* Skills Section */}
                      {sMentor.mentor_area_expertise !== "undefined" &&
                        sMentor?.mentor_area_expertise &&
                        sMentor.mentor_area_expertise !== "[]" && (
                          <div className="mentor-skills">
                            <div className="skills-header">
                              <span className="skills-title">Skills</span>
                            </div>{" "}
                            <div
                              className="SingleMentorProfile-Skills"
                            // key={index}
                            >
                              {JSON.parse(sMentor?.mentor_area_expertise)?.map(
                                (skill, index) => (
                                  <span
                                    key={index}
                                    className="MentorDashboardskill-tag"
                                  >
                                    {skill}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      <div className="MentorDashboard-RatingSection Hide-elementforScreenSize1275">
                        <div>
                          {" "}
                          <span className="SingleMentor-SkillsHeadline">
                            Ratings and Reviews
                          </span>
                        </div>
                        <div>
                          {" "}
                          <div id="tab-10" className="">
                            <div className="jfgghghhghkgkhjg">
                              <div className="jhdfgfjgg">
                                <MentorRatingCard
                                  feedbackCount={sMentor.feedback_count}
                                  feedback_details={sMentor.feedback_details}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="Singlementor-Row2 Hide-elementforScreenSize1275"
                    id="targetElement1"
                  >
                    <div className="Singlementor-bookingContainer">
                      <div className="Singlementor-booking1">
                        <div className="Singlementor-booking2 dkjiherer moideuirer_list SingleMentor-Radio">
                          {" "}
                          <ul className="ps-0 mb-0">
                            <li>
                              <input
                                value={"30"}
                                type="radio"
                                name="MentorPrice_Min"
                                id="check_11"
                                // defaultValue
                                className="d-none"
                                onChange={MentorTimeSlotDurationHandler}
                              />
                              <label htmlFor="check_11">
                                <span className="MarginR">30 Minutes</span>
                                <span>
                                  {convertCurrencySymbol(DefaultCurruncyType)}{" "}
                                  {convertedAmount.toFixed(1) / 2}
                                </span>
                              </label>
                            </li>

                            <li>
                              <input
                                type="radio"
                                id="check_30"
                                name="MentorPrice_Min"
                                value={"60"}
                                className="d-none"
                                onChange={MentorTimeSlotDurationHandler}
                              />
                              <label htmlFor="check_30">
                                <span className="MarginR">60 Minutes</span>
                                <span>
                                  {convertCurrencySymbol(DefaultCurruncyType)}{" "}
                                  {convertedAmount.toFixed(1)}
                                </span>
                              </label>
                            </li>
                          </ul>
                        </div>{" "}
                        <CustomDatePicker
                          mentorTimeSlotDuration={mentorTimeSlotDuration}
                          onDateSlotSelect={handleDateSlotSelect}
                          timeslotList={JSON.parse(sMentor.timeslot_list)}
                          bookingDetails={JSON.parse(
                            sMentor?.booking_dtls_list
                          )}
                        />
                      </div>

                      <div className="dfghjffg mt-3">
                        {user && user?.user_type !== "mentor" && (
                          <button
                            className="btn btn-main"
                            onClick={CreateBookingAppointment}
                          >
                            BOOK NOW
                          </button>
                        )}
                        {!user && (
                          <button className="btn btn-main">
                            <Link to="/login">LOGIN</Link>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="Singlementor-bookingContainer Hide-elementforScreenSizeFull">
                    <div className="Singlementor-booking1">
                      <div className="Singlementor-booking2 dkjiherer moideuirer_list SingleMentor-Radio">
                        {" "}
                        <ul className="ps-0 mb-0">
                          <li>
                            <input
                              value={"30"}
                              type="radio"
                              name="MentorPrice_Min"
                              id="check_11"
                              defaultChecked
                              className="d-none"
                              onChange={MentorTimeSlotDurationHandler}
                            />
                            <label htmlFor="check_11">
                              <span className="MarginR">30 Minutes</span>
                              <span>
                                {convertCurrencySymbol(DefaultCurruncyType)}{" "}
                                {convertedAmount.toFixed(1) / 2}
                              </span>
                            </label>
                          </li>

                          <li>
                            <input
                              type="radio"
                              id="check_30"
                              name="MentorPrice_Min"
                              value={"60"}
                              className="d-none"
                              onChange={MentorTimeSlotDurationHandler}
                            />
                            <label htmlFor="check_30">
                              <span className="MarginR">60 Minutes</span>
                              <span>
                                {convertCurrencySymbol(DefaultCurruncyType)}{" "}
                                {convertedAmount.toFixed(1)}
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>{" "}
                      <CustomDatePicker
                        mentorTimeSlotDuration={mentorTimeSlotDuration}
                        onDateSlotSelect={handleDateSlotSelect}
                        timeslotList={JSON.parse(sMentor.timeslot_list)}
                        bookingDetails={JSON.parse(sMentor?.booking_dtls_list)}
                      />
                    </div>

                    <div className="dfghjffg mt-3">
                      {user && user?.user_type !== "mentor" && (
                        <button
                          className="btn btn-main"
                          onClick={CreateBookingAppointment}
                        >
                          BOOK NOW
                        </button>
                      )}
                      {!user && (
                        <button className="btn btn-main">
                          <Link to="/login">LOGIN</Link>
                        </button>
                      )}
                    </div>
                  </div>{" "}
                  <div className="MentorDashboard-RatingSection Hide-elementforScreenSizeFull">
                    <div>
                      {" "}
                      <span className="SingleMentor-SkillsHeadline">
                        Ratings and Reviews
                      </span>
                    </div>
                    <div>
                      {" "}
                      <div id="tab-10" className="">
                        <div className="jfgghghhghkgkhjg">
                          <div className="jhdfgfjgg">
                            <MentorRatingCard
                              feedbackCount={sMentor.feedback_count}
                              feedback_details={sMentor.feedback_details}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SingleMentorPageUpdated;
