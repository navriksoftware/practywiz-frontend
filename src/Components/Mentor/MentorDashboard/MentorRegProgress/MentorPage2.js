import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import GoToTop from "../../../../Utils/GoToTop";
import {
  countryCurrencyData,
  allCurrencies,
} from "../../../data/Currency_Convertion.js";
import { allSkills } from "../../../data/Skills.js";
import { experienceOptions } from "../../../data/DomainData.js";
import collegeData from "../../../data/collegesname.json";
import { allDomain } from "../../../data/DomainData.js";

import "./MentorPage2.css";

const MentorPage2 = () => {
  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    trigger,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  // setValue("mentorCountryName", "");
  // ---------------------------------------------------------------------------------------
  // State for country, selected currency, price range, and user price
  const [country, setCountry] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [userPrice, setUserPrice] = useState("");

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);
    setValue("mentorCurrency", newCurrency);

    // Dynamically update price range based on new currency
    const currencyRange = Object.values(countryCurrencyData).find(
      (data) => data.currency === newCurrency
    )?.range;

    if (currencyRange) {
      setPriceRange(currencyRange);
    } else {
      setPriceRange({ min: 0, max: 0 }); // Default if currency not found
    }
    setUserPrice(""); // Reset user price on currency change
  };

  const API_KEY = "d255e8678f5e63"; // Replace with your actual API key

  // Function to fetch the user's location data including the IP address
  const fetchLocationData = async () => {
    try {
      const response = await fetch(`https://ipinfo.io?token=${API_KEY}`);
      const data = await response?.json();

      setCountry(data?.country);

      // Automatically set currency and price range based on the user's country
      const countryShort = data?.country;
      if (countryCurrencyData[countryShort]) {
        const { currency, range } = countryCurrencyData[countryShort];
        setSelectedCurrency(currency);

        setValue("mentorCurrency", currency || "");
        // setValue("mentorCountryName", countryShort);
        setValue("mentorCityName", data?.city || "");
        setPriceRange(range);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      const countryShort = "IN";
      const { currency, range } = countryCurrencyData[countryShort];
      setSelectedCurrency(currency);
      setValue("mentorCurrency", currency);
      setPriceRange(range);

      // if (countryCurrencyData[countryShort]) {
      //   const { currency, range } = countryCurrencyData[countryShort];
      //   setSelectedCurrency(currency);
      //   setValue("mentorCurrency", currency);
      //   setPriceRange(range);
      // }
    }
  };

  // Fetch the location data when the component mounts
  useEffect(() => {
    fetchLocationData();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null); // Store selected college
  // ______________________________________________________________________________________________

  const handleInputCollagename = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setValue("mentorInstituteName", value);
    setDropdownVisible(value !== ""); // Only show dropdown when input is not empty
  };
  // Filter colleges based on the search term
  const filteredColleges = collegeData.filter((item) =>
    item["College Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle dropdown option click
  const handleOptionClick = (college) => {
    setSelectedCollege(college); // Set selected college
    setSearchTerm(college["College Name"]); // Update input with selected college name
    setDropdownVisible(false); // Hide dropdown after selection
    setValue("mentorInstituteName", college["College Name"]);
  };

  // Filter colleges based on the search term

  // -------------------------------------------------------------------------------------------

  const [skills, setSkills] = useState(""); // For the input field
  const [skillList, setSkillList] = useState([]); // For added skills
  const [suggestions, setSuggestions] = useState([]); // For suggestions
  const [message, setMessage] = useState(""); // For displaying messages

  const handleInputChange = (e) => {
    const input = e.target.value.trimStart(); // Trim leading spaces
    setSkills(input);

    if (input.length > 3) {
      // Suggest the input and filter suggestions from `allSkills`
      setSuggestions([
        input,
        ...allSkills.filter(
          (skill) =>
            skill.toLowerCase().includes(input.toLowerCase()) &&
            !skillList?.some(
              (existingSkill) =>
                existingSkill.toLowerCase() === skill.toLowerCase()
            )
        ),
      ]);
    } else if (input) {
      // Filter suggestions if input is not empty
      const filteredSuggestions = allSkills.filter(
        (skill) =>
          skill.toLowerCase().includes(input.toLowerCase()) &&
          !skillList?.some(
            (existingSkill) =>
              existingSkill.toLowerCase() === skill.toLowerCase()
          )
      );
      setSuggestions(filteredSuggestions);
    } else {
      // Clear suggestions if input is empty
      setSuggestions([]);
    }
  };

  const handleAddSkill = (newSkill) => {
    const trimmedSkill = newSkill.trim();

    // Prevent adding empty or duplicate skills
    if (!trimmedSkill) {
      setMessage("Skill cannot be empty");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    // Check if the skill already exists (case-insensitive)
    const exists = (skillList || []).some(
      (existingSkill) =>
        existingSkill.toLowerCase() === trimmedSkill.toLowerCase()
    );

    if (!exists) {
      setSkillList([...(skillList || []), trimmedSkill]); // Use fallback to avoid undefined
      setMessage(""); // Clear any previous message
    } else {
      setMessage("Skill already added");
      setTimeout(() => setMessage(""), 2000);
    }

    setSkills(""); // Clear input
    setSuggestions([]); // Clear suggestions
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSkill(skills);
    }
  };

  const removeSkill = (index) => {
    const updatedSkillList = skillList.filter((_, i) => i !== index);
    setSkillList(updatedSkillList); // Update the state
    setValue("mentorSkill", updatedSkillList); // Update the form field immediately
  };

  useEffect(() => {
    if (skillList?.length > 0) {
      setValue("mentorSkill", skillList);
    }
  }, [skillList]);

  const [Domain, setDomain] = useState(""); // For the input field
  const [DomainList, setDomainList] = useState([]); // For added skills
  const [Domainsuggestions, setDomainSuggestions] = useState([]); // For suggestions
  const [messageDomain, setMessageDomain] = useState(""); // For displaying messages

  const handleDomainInputChange = (e) => {
    const input = e.target.value.trimStart(); // Trim leading spaces
    setDomain(input);

    if (input.length > 3) {
      // Suggest the input and filter suggestions from `allSkills`
      setDomainSuggestions([
        input,
        ...allDomain.filter(
          (skill) =>
            skill.toLowerCase().includes(input.toLowerCase()) &&
            !DomainList?.some(
              (existingSkill) =>
                existingSkill.toLowerCase() === skill.toLowerCase()
            )
        ),
      ]);
    } else if (input) {
      // Filter suggestions if input is not empty
      const filteredSuggestions = allDomain.filter(
        (skill) =>
          skill.toLowerCase().includes(input.toLowerCase()) &&
          !DomainList?.some(
            (existingSkill) =>
              existingSkill.toLowerCase() === skill.toLowerCase()
          )
      );
      setDomainSuggestions(filteredSuggestions);
    } else {
      // Clear suggestions if input is empty
      setDomainSuggestions([]);
    }
  };

  const handleAddDomain = (newSkill) => {
    const trimmedSkill = newSkill.trim();

    // Prevent adding empty or duplicate skills
    if (!trimmedSkill) {
      setMessageDomain("Domain cannot be empty");
      setTimeout(() => setMessageDomain(""), 2000);
      return;
    }

    // Check if the skill already exists (case-insensitive)
    const exists = (DomainList || []).some(
      (existingSkill) =>
        existingSkill.toLowerCase() === trimmedSkill.toLowerCase()
    );

    if (!exists) {
      setDomainList([...(DomainList || []), trimmedSkill]); // Use fallback to avoid undefined
      setMessageDomain(""); // Clear any previous message
    } else {
      setMessageDomain("Skill already added");
      setTimeout(() => setMessageDomain(""), 2000);
    }

    setDomain(""); // Clear input
    setDomainSuggestions([]); // Clear suggestions
  };

  const handleDomainKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddDomain(Domain);
    }
  };

  const removeDomain = (index) => {
    const updatedDomainList = DomainList.filter((_, i) => i !== index);
    setDomainList(updatedDomainList); // Update the state
    setValue("mentorDomain", updatedDomainList); // Update the form field immediately
  };

  // No need for `useEffect` now, as `mentorDomain` is directly updated in `removeDomain`

  useEffect(() => {
    if (DomainList?.length > 0) {
      setValue("mentorDomain", DomainList);
    }
  }, [DomainList]);

  const formValues = getValues();

  const loadStoredData = () => {
    const storedData = localStorage.getItem("formData1");
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
    return {};
  };

  const saveDataToStorage = (formValues) => {
    localStorage.setItem("formData1", JSON.stringify(formValues));
    localStorage.setItem("formData1", JSON.stringify(watch()));
  };

  const [update, setupdate] = useState({});
  useEffect(() => {
    const storedData = loadStoredData();
    if (storedData) {
      Object.keys(storedData).forEach((key) => {
        setValue(key, storedData[key]);
        setSkillList(storedData.mentorSkill);
      });
      setupdate([]);
    }
  }, [setValue]);
  useEffect(() => {
    const storedData = loadStoredData();
    if (storedData) {
      Object.keys(storedData).forEach((key) => {
        setValue(key, storedData[key]);
        setDomainList(storedData.mentorDomain);
      });
      setupdate([]);
    }
  }, [setValue]);

  useEffect(() => {
    saveDataToStorage(formValues);
  }, [formValues, register]);

  const showInstituteInput = getValues("sessionsFreeOfCharge");
  //

  return (
    <>
      <div className="doiherner_wrapper">
        <div className="ihduwfr_form_wrapper p-0" style={{ height: "auto" }}>
          <div className="row tageye">
            <div className="col-lg-12">
              <label className="taglabel">About your Profession</label>
            </div>
            <div className="col-lg-6 mb-4">
              <label htmlFor="mentorJobTitle" className="form-label">
                <b>
                  Your Job Title <span className="RedColorStarMark">*</span>
                </b>
              </label>
              <input
                onKeyUp={() => {
                  trigger("mentorJobTitle");
                }}
                type="text"
                className="form-control"
                placeholder="Type Your Job Title....."
                {...register("mentorJobTitle", {
                  required: "Job title is required",
                  validate: (value) => {
                    // Check if the trimmed value is not empty (i.e., the input is not only spaces)
                    if (!value.trim()) {
                      return "Job title cannot be only spaces.";
                    }
                    return true;
                  },
                })}
              />
              {errors.mentorJobTitle && (
                <p className="Error-meg-login-register">
                  {errors.mentorJobTitle.message}
                </p>
              )}
            </div>

            <div className="col-lg-6 mb-4">
              <label htmlFor="yearsOfExperience" className="form-label">
                <b>
                  Years of Experience{" "}
                  <span className="RedColorStarMark">*</span>
                </b>
              </label>
              <select
                className=" form-select "
                {...register("yearsOfExperience", {
                  required: "Please select the Years Of experience",
                })}
                onChange={(e) => {
                  if (e.target.value) {
                    clearErrors("yearsOfExperience"); // Clear error when a valid option is selected
                  }
                }}
                onKeyUp={() => {
                  trigger("yearsOfExperience"); // Optional: still trigger validation on keyup
                }}
              >
                <option value="">Please Select Years Of experience</option>
                {experienceOptions?.map((experience) => (
                  <option key={experience.value} value={experience.value}>
                    {experience.label}
                  </option>
                ))}
              </select>

              {errors.yearsOfExperience && (
                <p className="Error-meg-login-register">
                  {errors.yearsOfExperience.message}
                </p>
              )}
            </div>
            <div className="col-lg-6 mb-4">
              <label htmlFor="mentorCompanyName" className="form-label">
                <b>
                  Company <span className="RedColorStarMark">*</span>
                </b>
              </label>
              <input
                onKeyUp={() => {
                  trigger("mentorCompanyName");
                }}
                type="text"
                className="form-control"
                placeholder="Type Your Company/Freelancer Name"
                {...register("mentorCompanyName", {
                  required: "Company name is required",
                  validate: (value) => {
                    // Check if the trimmed value is not empty (i.e., the input is not only spaces)
                    if (!value.trim()) {
                      return "Company name cannot be only spaces.";
                    }
                    return true;
                  },
                })}
              />
              {errors.mentorCompanyName && (
                <p className="Error-meg-login-register">
                  {errors.mentorCompanyName.message}
                </p>
              )}
            </div>
            {/* Domain section */}
            <div className="col-lg-6 mb-4">
              <label htmlFor="mentorJobTitle" className="form-label">
                <b>
                  Domain<span className="RedColorStarMark">*</span>(Multiple)
                </b>
              </label>
              <div className="input-wrapper">
                <Controller
                  
                  name="mentorDomain" // The name you want to use in form data
                  control={control}
                  rules={{ required: "Domain is required" }}
                  render={({ field }) => (
                    <input
                    onKeyUp={() => {
                      trigger("mentorDomain");
                    }}
                      type="text"
                      placeholder="Type your Domain and press Enter"
                      value={Domain}
                      onChange={(e) => {
                        field.onChange(e); // Update value in react-hook-form
                        handleDomainInputChange(e); // Handle input change for suggestions
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddDomain(Domain);
                        }
                      }}
                      className="form-control"
                    />
                  )}
                />

                {/* Suggestions Dropdown */}
                {Domainsuggestions.length > 0 && (
                  <ul className="suggestions-dropdown">
                    {Domainsuggestions.map((suggestion, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => handleAddDomain(suggestion)}
                          className="suggestion-item"
                        >
                          {suggestion}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Display message */}
              {messageDomain && <div className="RedColorStarMark">{messageDomain}</div>}

              <div className="skill-list">
                {DomainList?.map((Domains, index) => {
                  return (
                    <span key={index} className="skill-tag">
                      {Domains}{" "}
                      <button
                        onClick={() => removeDomain(index)}
                        className="remove-skill-btn"
                      >
                        &times;
                      </button>
                    </span>
                  );
                })}
              </div>
              {/* {DomainList && (
                <>
                  {DomainList === 0 && (
                    <>
                      {errors.mentorDomain && (
                        <p className="Error-meg-login-register">
                          {errors.mentorDomain.message}
                        </p>
                      )}
                    </>
                  )}
                </>
              )} */}
              {errors.mentorDomain && (
                        <p className="Error-meg-login-register">
                          {errors.mentorDomain.message}
                        </p>
                      )}
            </div>
          </div>
          <div className="row tageye">
            <div className="col-lg-12">
              <label className="taglabel">Your Skills</label>
            </div>
            {/* skill section */}
            <div className="col-lg-12 mb-4">
              <label htmlFor="mentorJobTitle" className="form-label">
                <b>
                  Skills
                  {/* <span className="RedColorStarMark">*</span> */}
                </b>(Multiple)
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Type skills and press Enter"
                  value={skills}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  className="form-control"
                />

                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                  <ul className="suggestions-dropdown">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleAddSkill(suggestion)}
                        className="suggestion-item"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Display message */}
              {message && <div className="RedColorStarMark">{message}</div>}

              <div className="skill-list">
                {skillList?.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}{" "}
                    <button
                      onClick={() => removeSkill(index)}
                      className="remove-skill-btn"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="row tageye">
            <div className="col-lg-12">
              <label className="taglabel">Profession Summary</label>
            </div>
            <div className="col-lg-12 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>
                  Brief About Yourself{" "}
                  <span className="RedColorStarMark">*</span>
                </b>{" "}
                <p className=" mb-0 ghhduenee">
                  {/* (*Give a good headline, This helps us understand the mentor
                  overview*) */}
                  (*This helps us understand the mentor overview*)
                </p>
              </label>
              <textarea
                onKeyUp={() => {
                  trigger("mentorHeadline");
                }}
                className="form-control"
                placeholder="My superpower is problem-solving. I excel at breaking down complex challenges into manageable steps and finding innovative solutions, whether it's troubleshooting technical issues or resolving conflicts in a team."
                style={{ height: "100px" }}
                {...register("mentorHeadline", {
                  required: "This field is required",
                  minLength: {
                    value: 100,
                    message: "Must be greater than 100 characters.",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Must be less than 1000 characters.",
                  },
                  validate: (value) => {
                    const trimmedValue = value.trim();
                    // Check if the input contains at least 3 alphanumeric characters
                    const hasEnoughAlphanumeric =
                      (trimmedValue.match(/[a-zA-Z0-9]/g) || []).length >= 3;
                    // Check if more than 3 consecutive spaces exist
                    const hasTooManySpaces = /\s{4,}/.test(value);

                    if (!hasEnoughAlphanumeric) {
                      return "Must contain at least 3 alphanumeric characters.";
                    }
                    if (hasTooManySpaces) {
                      return "Must not contain more than 3 consecutive spaces.";
                    }

                    return true;
                  },
                })}
              ></textarea>

              {errors.mentorHeadline && (
                <p className="Error-meg-login-register">
                  {errors.mentorHeadline.message}
                </p>
              )}
            </div>

            <div className="col-lg-12 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>Your Recommended Area of Mentorship </b>
              </label>{" "}
              <input
                onKeyUp={() => {
                  trigger("recommendedAreaOfMentorship");
                }}
                type="text"
                className="form-control"
                // id="exampleInputEmail1"
                placeholder="Eg:I will give the mentorship about the react development, communication skills, and resume building"
                aria-describedby="emailHelp"
                {...register("recommendedAreaOfMentorship", {
                  minLength: {
                    value: 50,
                    message: "Must be greater than 50 characters.",
                  },
                  maxLength: {
                    value: 200,
                    message: "Must be less than 200 characters.",
                  },
                })}
              />
              {errors.recommendedAreaOfMentorship && (
                <p className="Error-meg-login-register">
                  {errors.recommendedAreaOfMentorship.message}
                </p>
              )}
            </div>
          </div>
          <div className="row tageye">
            <div className="col-lg-12">
              <label className="taglabel">Pricing</label>
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <b>
                    Currency <span className="RedColorStarMark">*</span>
                  </b>
                </label>

                <select
                  className="form-select"
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                >
                  {allCurrencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>

                {errors.mentorCurrency && (
                  <p className="Error-meg-login-register">
                    {errors.mentorCurrency.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <b>
                    Pricing
                    <span className="RedColorStarMark">*</span>
                  </b>{" "}
                  (
                  <span className="RecommendationText">
                    {" "}
                    Enter Price (Range: {priceRange.min} - {priceRange.max})
                  </span>
                  )
                </label>

                <input
                  onKeyUp={() => {
                    trigger("pricing");
                  }}
                  id="pricing"
                  type="number"
                  className="form-control"
                  onWheel={(e) => e.currentTarget.blur()} // Removes focus on scroll
                  placeholder="Enter price"
                  {...register("pricing", {
                    required: "Please enter the price amount",
                    validate: (value) => {
                      const numericValue = parseFloat(value); // Ensure it's treated as a number

                      if (numericValue < priceRange.min) {
                        return `Price should be greater than ${priceRange.min}`;
                      }
                      if (numericValue > priceRange.max) {
                        return `Price should be less than ${priceRange.max}`;
                      }
                      return true; // Return true if the value is within the valid range
                    },
                  })}
                />
                {errors.pricing && (
                  <p className="Error-meg-login-register">
                    {errors.pricing.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="row tageye">
            <div className="col-lg-12">
              <label className="taglabel">Preferences</label>
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <b>
                    Would You Be Interested in Delivering Guest Lectures?{" "}
                    <span className="RedColorStarMark">*</span>
                  </b>
                </label>
                <select
                  className="form-select"
                  {...register("guestLecturesInterest", {
                    required: "Please select the guest lecture option", // Validation rule
                  })}
                  onChange={(e) => {
                    clearErrors("guestLecturesInterest");
                    setValue("guestLecturesInterest", e.target.value);
                  }}
                >
                  <option value="">Choose An Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                {errors.guestLecturesInterest && (
                  <p className="Error-meg-login-register">
                    {errors.guestLecturesInterest.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <b>
                    Would You Be Interested in Curating Case Studies?{" "}
                    <span className="RedColorStarMark">*</span>
                  </b>
                </label>
                <select
                  className="form-select"
                  {...register("curatingCaseStudiesInterest", {
                    required: "Please select the case study interest",
                  })}
                  onChange={(e) => {
                    clearErrors("curatingCaseStudiesInterest");
                    setValue("curatingCaseStudiesInterest", e.target.value);
                  }}
                >
                  <option value="">Choose An Option</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>{" "}
                {errors.curatingCaseStudiesInterest && (
                  <p className="Error-meg-login-register">
                    {errors.curatingCaseStudiesInterest.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <label htmlFor="sessionsFreeOfCharge" className="form-label">
                  <b>
                    Would You Be Fine to Do Sessions Free of Charge?{" "}
                    <span className="RedColorStarMark">*</span>
                  </b>
                </label>
                <select
                  className="form-select"
                  {...register("sessionsFreeOfCharge", {
                    required:
                      "Please select whether you are willing to do sessions free of charge.",
                  })}
                  onChange={(e) => {
                    clearErrors("sessionsFreeOfCharge");
                    setValue("sessionsFreeOfCharge", e.target.value);
                  }}
                >
                  <option value="">Choose An Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                {errors.sessionsFreeOfCharge && (
                  <p className="Error-meg-login-register">
                    {errors.sessionsFreeOfCharge.message}
                  </p>
                )}
              </div>
            </div>
            {showInstituteInput === "yes" && (
              <div className=" col-lg-6 ">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <b>
                    Institute/College name{" "}
                    <span className="RedColorStarMark">*</span>
                  </b>
                </label>
                <div className="dkjiherer moideuirer_list hello">
                  <div className="MR-positionInstitute">
                    <input
                      onKeyUp={() => {
                        trigger("mentorInstituteName");
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Choose/Search for a college..."
                      // value={searchTerm} // Ensure input value is controlled
                      {...register("mentorInstituteName", {
                        required: "College or Institute Name is required",
                      })}
                      onChange={handleInputCollagename}
                      onFocus={() => setDropdownVisible(searchTerm !== "")} // Show dropdown when focused
                    />
                    {dropdownVisible && filteredColleges.length > 0 && (
                      <div className="MentorRegInstitutePage ">
                        {filteredColleges.slice(0, 50).map(
                          (
                            college,
                            index // Limit to 10 results
                          ) => (
                            <div
                              key={index}
                              className="dropdown-item"
                              onClick={() => handleOptionClick(college)}
                            >
                              {college["College Name"]}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {errors.mentorInstituteName && (
                  <p className="Error-meg-login-register">
                    {errors.mentorInstituteName.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <GoToTop />
      </div>
    </>
  );
};

export default MentorPage2;
