import StarRating from "../../../Utils/StartRating";
import "./AllMentorsMobile.css";
import React, { useEffect, useState } from "react";
import { countryCurrencyMapping } from "../../data/Currency_Convertion.js";
const AllMentorCard = ({ mentor }) => {
  let mentorName = mentor.user_firstname + " " + mentor.user_lastname;

  function toTitleCase(str) {
    if (!str) return ""; // Handle null or undefined values
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

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


  const convertedAmount = convertCurrency(
    mentor.mentor_session_price,
    mentor.mentor_currency_type,
    DefaultCurruncyType
  );


  return (
    <div className="AllMentorCard-profile-card">
      <div>
        {/* Profile Image Section */}

        {/* <div className="AllmentorCard-price-tag">
          {convertCurrencySymbol(DefaultCurruncyType)}{" "}
          {convertedAmount.toFixed(1)} /Hr


        </div> */}
        <div className="AllMentorCard-image-container">
          <div className="AllMentorCard-rating">
            <i
              className="fa-solid fa-star"
              style={{ color: "gold", fontSize: "13px" }}
            ></i>
            {mentor.avg_mentor_rating === null ? 4.5 : mentor.avg_mentor_rating}
          </div>

          <div className="AllMentorCard-photo-placeholder">
            <img
              src={mentor.mentor_profile_photo}
              alt={mentor.user_firstname + " " + mentor.user_lastname}
              className="AllMentorCard-photo-placeholder"
              loading="eager"
            />
          </div>
          {/* Reaction Buttons */}
          <div className="AllMentorCard-reaction-buttons">
            {mentor.mentor_area_expertise !== "undefined" &&
              mentor?.mentor_area_expertise &&
              mentor.mentor_area_expertise !== "[]" && (
                <>
                  {JSON.parse(mentor?.mentor_area_expertise)
                    .slice(0, 3)
                    ?.map((skill, index) => (
                      <span key={index} className="AllmentorCard-skill-item">
                        {skill}
                      </span>
                    ))}
                </>
              )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="AllMentorCard-profile-info">
          {/* Name and Title */}
          <div className="AllMentorCard-user-details">
            <div className="AllMentorCard-name-location">
              <h2>
                {toTitleCase(mentor.user_firstname) +
                  " " +
                  toTitleCase(mentor.user_lastname)}
              </h2>
              <span className="AllMentorCard-location">
                ({mentor.mentor_country})
              </span>
            </div>
            <div className="AllMentorCardInline">
              {" "}
              <i class="fa-solid fa-briefcase IconestyleBrifcase"></i>{" "}
              <span className="AllMentorCard-job-title">
                {" "}
                {mentor.mentor_job_title}
              </span>
            </div>

            <div className="AllMentorCardInline">
              <i className="fa-regular fa-at AttherateIcone "></i>
              <span className="AllMentorCard-company">
                {" "}
                {mentor.mentor_company_name}
              </span>
            </div>
          </div>

          {/* Experience and Domain */}

          <div className="AllMentorCard-tags-container">
            <div className="AllMentorCard-footer-item">
              <div className="AllMentorCard-label">Domain</div>
              <div className="AllMentorCard-value">
                {mentor?.mentor_domain &&
                  mentor.mentor_domain !== "[]" &&
                  JSON.parse(mentor.mentor_domain)
                    .slice(0, 3)
                    .map((domain, index, arr) => (
                      <span key={index}>
                        {toTitleCase(domain)}
                        {index < arr.length - 1 && " | "}
                      </span>
                    ))}
              </div>
            </div>

            <div className="AllMentorCard-footer-itemExp">
              <div className="AllMentorCard-label">Experience</div>
              <div className="AllMentorCard-value">
                {(() => {
                  const experience = mentor.mentor_years_of_experience?.split("-")[0] || "";
                  return experience.includes("+") ? experience : experience + "+";
                })()}

              </div>
            </div>
          </div>
        </div>

      </div>
      {/* Tags */}
      <div className="AllMentorCard-footer">
        <div className="AllMentorCard-tags">
          {/* {JSON.parse(mentor.mentor_language || "[]").map(
                (language, index, arr) => (
                  <span key={index} className="AllMentorCard-language-tag">
                    {language.label}{" "}
                  </span>
                )
              )} */}
          <span>{convertCurrencySymbol(DefaultCurruncyType)}{" "}
            {convertedAmount.toFixed(0)} /hr
          </span>
        </div>
        {/* <div className="AllMentorCard-BookNow-Btn" onClick={() =>
        (window.location.href = `/mentor-club/mentor-profile/${mentorName
          .replace(/\s+/g, "-")
          .toLowerCase()}/${mentor.user_dtls_id}`)
        }>

         
        </div> */}
        <span className="MentorCard-Booknow-Btn" onClick={() =>
        (window.location.href = `/mentor-club/mentor-profile/${mentorName
          .replace(/\s+/g, "-")
          .toLowerCase()}/${mentor.user_dtls_id}`)
        }>Book Now<i className="fa-solid fa-arrow-right"></i></span>
      </div>
    </div>
  );
};

export default AllMentorCard;
