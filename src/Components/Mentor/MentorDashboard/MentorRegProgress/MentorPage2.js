import React, { useState, useEffect } from "react";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import GoToTop from "../../../../Utils/GoToTop";
import options from "../../../data/CountryData.json";
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
  const API_KEY = process.env.REACT_APP_API_KEY;
  const {
    register,
    control,
    setValue,
    getValues,
    trigger,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "MentorEduDetails",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ Institute: "", Degree: "", YearCompletion: "" });
    }
  }, [fields, append]);

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

  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;

    setSelectedCurrency(newCurrency);

    setValue("pricing", "");

    // Dynamically update price range based on new currency
    const currencyRange = Object.values(countryCurrencyData).find(
      (data) => data.currency === newCurrency
    )?.range;

    if (currencyRange) {
      setPriceRange(currencyRange);
    } else {
      setPriceRange({ min: 0, max: 0 }); // Default if currency not found
    }
  };

  // Function to fetch the user's location data including the IP address
  const fetchLocationData = async () => {
    try {
      const response = await fetch(`https://ipinfo.io?token=${API_KEY}`);
      const data = await response?.json();
      // Automatically set currency and price range based on the user's country
      const countryShort = data?.country;
      if (countryCurrencyData[countryShort]) {
        const { currency, range } = countryCurrencyData[countryShort];
        setSelectedCurrency(currency);
        const countryName = options.find((c) => c.sortname === countryShort);
        setValue("mentor_country", countryName.country_name);
        setValue("mentorCityName", data?.city || "");
        setPriceRange(range);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      const countryShort = "IN";
      const { currency, range } = countryCurrencyData[countryShort];

      setSelectedCurrency(currency);
      setValue("mentor_country", "");
      setValue("mentor_country", currency);
      setPriceRange(range);
      setValue("pricing", "");
    }
  };

  // Fetch the location data when the component mounts
  useEffect(() => {
    fetchLocationData();
  }, []);

  // Maintain separate state for each field
  const [searchStates, setSearchStates] = useState(
    fields.map(() => ({
      searchTerm: "",
      dropdownVisible: false,
    }))
  );

  const handleInputCollegeName = (e, index) => {
    const value = e.target.value;
    setSearchStates((prev) => {
      const newStates = [...prev];
      if (!newStates[index]) {
        newStates[index] = { searchTerm: "", dropdownVisible: false };
      }
      newStates[index] = {
        ...newStates[index],
        searchTerm: value,
        dropdownVisible: value !== "",
      };
      return newStates;
    });
    setValue(`MentorEduDetails.${index}.Institute`, value);
  };

  const handleOptionClick = (college, index) => {
    setSearchStates((prev) => {
      const newStates = [...prev];
      newStates[index] = {
        searchTerm: college["College Name"],
        dropdownVisible: false,
      };
      return newStates;
    });
    setValue(`MentorEduDetails.${index}.Institute`, college["College Name"]);
  };

  // Skill Search
  const [skills, setSkills] = useState(""); // For the input field
  const [skillList, setSkillList] = useState([]); // For added skills
  const [suggestions, setSuggestions] = useState([]); // For suggestions
  const [message, setMessage] = useState(""); // For displaying messages

  const handleInputChange = (e) => {
    const input = e.target.value.trimStart(); // Trim leading spaces
    setSkills(input);

    if (input.length > 3) {
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
      setValue("mentorSkill", [...(skillList || []), trimmedSkill]);
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

  useEffect(() => {
    const storedData = loadStoredData();

    if (storedData) {
      Object.keys(storedData).forEach((key) => {
        setValue(key, storedData[key]);
        setSkillList(storedData.mentorSkill || []);
      });
    }
  }, [setValue]);

  // Domain search
  const [Domain, setDomain] = useState(""); // For the input field
  const [DomainList, setDomainList] = useState([]); // For added skills
  const [Domainsuggestions, setDomainSuggestions] = useState([]); // For suggestions
  const [messageDomain, setMessageDomain] = useState(""); // For displaying messages

  const handleDomainInputChange = (e) => {
    trigger("mentorDomain");
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
      setValue("mentorDomain", [...(DomainList || []), trimmedSkill]); // Update the form field immediately
      setMessageDomain(""); // Clear any previous message
      clearErrors("mentorDomain");
    } else {
      setMessageDomain("Skill already added");
      setTimeout(() => setMessageDomain(""), 2000);
    }

    setDomain(""); // Clear input
    setDomainSuggestions([]); // Clear suggestions
  };

  const removeDomain = (index) => {
    const updatedDomainList = DomainList.filter((_, i) => i !== index);
    setDomainList(updatedDomainList); // Update the state
    setValue("mentorDomain", updatedDomainList); // Update the form field immediately
  };

  useEffect(() => {
    if (DomainList?.length > 0) {
      setValue("mentorDomain", DomainList);
    }
  }, [DomainList]);

  const formValues = getValues();

  useEffect(() => {
    const storedData = loadStoredData();
    if (storedData) {
      Object.keys(storedData).forEach((key) => {
        setValue(key, storedData[key]);
        setDomainList(storedData.mentorDomain || []);
      });
    }
  }, [setValue]);

  const saveDataToStorage = (formValues) => {
    localStorage.setItem("formData1", JSON.stringify(formValues));
  };

  useEffect(() => {
    saveDataToStorage(formValues);
  }, [formValues, register]);

  const [visibleHelp, setVisibleHelp] = useState({
    DomainHelp: false,
    SkillHelp: false,
    PriceHelp: false,
    GuestLecturesHelp: false,
    CaseStudiesHelp: false,
  });

  const handleMouseEnter = (field) => {
    setVisibleHelp((prev) => ({ ...prev, [field]: true }));
  };

  const handleMouseLeave = (field) => {
    setVisibleHelp((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <>
      <div className="doiherner_wrapper">
        <div className="ihduwfr_form_wrapper p-0" style={{ height: "auto" }}>
          <div className="row tageye">
            <div className="col-lg-12">
              <label className="taglabel">About Your Profession</label>
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
                placeholder="Type Your Job Title"
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
                  Company Name<span className="RedColorStarMark">*</span>
                </b>
              </label>
              <input
                onKeyUp={() => {
                  trigger("mentorCompanyName");
                }}
                type="text"
                spellCheck={true} // Enables browser spell check
                className="form-control"
                placeholder="Type Your Company/Freelancer Name"
                {...register("mentorCompanyName", {
                  required: "Company name is required",
                  validate: (value) => {
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
            <div
              className="col-lg-6 mb-4"
              style={{
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <label htmlFor="mentorJobTitle" className="form-label">
                <b>
                  Domain's <span className="RedColorStarMark">*</span>
                  <i
                    className="fa-solid fa-circle-info mentorMicroHelpIcon"
                    onMouseEnter={() => handleMouseEnter("DomainHelp")}
                    onMouseLeave={() => handleMouseLeave("DomainHelp")}
                  ></i>
                  {visibleHelp.DomainHelp && (
                    <div className="mentorMicroHelpMessageDomain">
                      <ul>
                        <li className="Mentor-Microhelp-listFrontSize">
                          {" "}
                          Select or enter the fields where you specialize (e.g.,
                          Technology, Education, Healthcare).
                        </li>
                        <li className="Mentor-Microhelp-listFrontSize">
                          {" "}
                          Note: You can add multiple domains to represent your
                          areas of expertise.
                        </li>
                      </ul>
                    </div>
                  )}
                </b>
              </label>
              <div className="input-wrapper">
                <Controller
                  name="mentorDomain" // The name you want to use in form data
                  control={control}
                  rules={{ required: "Domain is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Type your Domain and press Enter"
                      value={Domain}
                      spellCheck={true} // Enables browser spell check
                      onChange={(e) => {
                        // field.onChange(e); // Update value in react-hook-form
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
                {Domainsuggestions?.length > 0 && (
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
              {messageDomain && (
                <div className="RedColorStarMark">{messageDomain}</div>
              )}

              <div className="skill-list">
                {DomainList?.map((Domains, index) => {
                  return (
                    <span key={index} className="skill-tag">
                      {Domains}
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

              {DomainList.length === 0 && (
                <>
                  {errors.mentorDomain && (
                    <p className="Error-meg-login-register">
                      {errors.mentorDomain.message}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="row tageye">
            <div className="col-lg-12">
              <label className="taglabel">Your Skills</label>
            </div>
            {/* skill section */}
            <div
              className="col-lg-12 mb-4"
              style={{
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <label htmlFor="mentorJobTitle" className="form-label">
                <b>
                  Skill's
                  {/* <span className="RedColorStarMark">*</span> */}
                </b>{" "}
                <i
                  className="fa-solid fa-circle-info mentorMicroHelpIcon"
                  onMouseEnter={() => handleMouseEnter("SkillHelp")}
                  onMouseLeave={() => handleMouseLeave("SkillHelp")}
                ></i>
                {visibleHelp.SkillHelp && (
                  <div className="mentorMicroHelpMessageSkills">
                    <ul>
                      <li className="Mentor-Microhelp-listFrontSize">
                        {" "}
                        List the key skills you specialize in within your
                        domains (e.g., Python,Data Analysis,Public Speaking).
                      </li>
                      <li className="Mentor-Microhelp-listFrontSize">
                        Why This Matters: Your skills help mentees understand
                        your expertise and choose you as their mentor for
                        relevant guidance.
                      </li>
                    </ul>
                  </div>
                )}
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
                    value: 10,
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
          {/* edu details */}
          <div className=" tageye">
            <div className="col-lg-12">
              <label className="taglabel">Education Details</label>
            </div>

            {fields.map((field, index) => {
              const currentSearchState = searchStates[index] || {
                searchTerm: "",
                dropdownVisible: false,
              };
              const filteredColleges = collegeData.filter((item) =>
                item["College Name"]
                  .toLowerCase()
                  .includes(currentSearchState.searchTerm.toLowerCase())
              );

              return (
                <div className="row" key={field.id}>
                  {fields.length > 1 && (
                    <div className="MentorProfile-EduD-Removebtn">
                      <i
                        className="fa-solid fa-xmark"
                        onClick={() => remove(index)}
                      ></i>
                    </div>
                  )}

                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">
                        <b>
                          Institute Name:
                          <span className="RedColorStarMark">*</span>
                        </b>
                      </label>
                      <div className="dkjiherer moideuirer_list hello">
                        <div className="MR-positionInstitute">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Choose/Search for a college"
                            // value={currentSearchState.searchTerm}

                            {...register(
                              `MentorEduDetails.${index}.Institute`,
                              {
                                required: "Institute name is required",
                              }
                            )}
                            onChange={(e) => handleInputCollegeName(e, index)}
                            onKeyUp={() =>
                              trigger(`MentorEduDetails.${index}.Institute`)
                            }
                            onBlur={() => {
                              setTimeout(() => {
                                setSearchStates((prev) => {
                                  const newStates = [...prev];
                                  if (newStates[index]) {
                                    newStates[index] = {
                                      ...newStates[index],
                                      dropdownVisible: false,
                                    };
                                  }
                                  return newStates;
                                });
                              }, 200);
                            }}
                          />
                          {currentSearchState.dropdownVisible &&
                            filteredColleges.length > 0 && (
                              <div className="MentorRegInstitutePage">
                                {filteredColleges
                                  .slice(0, 50)
                                  .map((college, collegeIndex) => (
                                    <div
                                      key={`${index}-${collegeIndex}`}
                                      className="dropdown-item"
                                      onClick={() =>
                                        handleOptionClick(college, index)
                                      }
                                    >
                                      {college["College Name"]}
                                    </div>
                                  ))}
                              </div>
                            )}
                        </div>
                      </div>
                      {errors.MentorEduDetails?.[index]?.Institute && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {errors.MentorEduDetails[index].Institute.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-6 row">
                    <div className="col-lg-6">
                      <div className="mb-4">
                        <label className="form-label">
                          <b>
                            Degree Name
                            <span className="RedColorStarMark">*</span>
                          </b>
                        </label>
                        <input
                          className="form-control"
                          {...register(`MentorEduDetails.${index}.Degree`, {
                            required: "Degree Name is required",
                          })}
                          placeholder="Enter Degree"
                          onKeyUp={() =>
                            trigger(`MentorEduDetails.${index}.Degree`)
                          }
                        />
                        {errors.MentorEduDetails?.[index]?.Degree && (
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.MentorEduDetails[index].Degree.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="mb-4">
                        <label className="form-label">
                          <b>
                            Year of Completion:
                            <span className="RedColorStarMark">*</span>
                          </b>
                        </label>
                        <input
                          type="number"
                          onWheel={(e) => e.currentTarget.blur()}
                          className="form-control"
                          {...register(
                            `MentorEduDetails.${index}.YearCompletion`,
                            {
                              required: "Year of completion is required",
                              pattern: {
                                value: /^\d{4}$/, // Ensures exactly 4 digits
                                message: "Year must be exactly 4 digits",
                              },
                              validate: (value) =>
                                value.length === 4 ||
                                "Year must be exactly 4 characters long",
                            }
                          )}
                          placeholder="Enter Year of completion"
                          onKeyUp={() =>
                            trigger(`MentorEduDetails.${index}.YearCompletion`)
                          }
                        />
                        {errors.MentorEduDetails?.[index]?.YearCompletion && (
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {
                              errors.MentorEduDetails[index].YearCompletion
                                .message
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="Mentorpage2-edu-Addbtn">
              <span
                onClick={() => {
                  append({ Degree: "", Institute: "", YearCompletion: "" });
                  setSearchStates((prev) => [
                    ...prev,
                    { searchTerm: "", dropdownVisible: false },
                  ]);
                }}
              >
                <i className="fa-regular fa-plus"></i>
                Add More
              </span>
            </div>
          </div>
          <div className="row tageye">
            <div
              className="col-lg-12"
              style={{
                // marginBottom: "20px",
                position: "relative",
              }}
            >
              <label className="taglabel">Pricing</label>{" "}
              <i
                className="fa-solid fa-circle-info mentorMicroHelpIcon"
                onMouseEnter={() => handleMouseEnter("PriceHelp")}
                onMouseLeave={() => handleMouseLeave("PriceHelp")}
              ></i>
              {visibleHelp.PriceHelp && (
                <div className="mentorMicroHelpMessagePrice">
                  <ul>
                    <li className="Mentor-Microhelp-listFrontSize">
                      Please enter the amount you will earn for a 60-minute call
                      below. For shorter calls, the payment will be prorated.
                      For example, a 30-minute call will earn half the total
                      amount.
                    </li>
                    <li className="Mentor-Microhelp-listFrontSize">
                      Your price will determine the amount that you will receive
                      after deduction of convenience fee ( 5%) and bank transfer
                      charges
                    </li>
                    <li className="Mentor-Microhelp-listFrontSize">
                      We will request you to enter your bank account details in
                      your profile after completion of registration process
                    </li>
                  </ul>
                </div>
              )}
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
                    <i
                      className="fa-solid fa-circle-info mentorMicroHelpIcon"
                      onMouseEnter={() => handleMouseEnter("GuestLecturesHelp")}
                      onMouseLeave={() => handleMouseLeave("GuestLecturesHelp")}
                    ></i>
                    {visibleHelp.GuestLecturesHelp && (
                      <div className="mentorMicroHelpMessagePrice">
                        <ul>
                          <li className="Mentor-Microhelp-listFrontSize">
                            By opting for the Guest Lecture option, your profile
                            will be visible to institutions that are looking for
                            part-time lecturers
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <i
                      className="fa-solid fa-circle-info mentorMicroHelpIcon"
                      onMouseEnter={() => handleMouseEnter("CaseStudiesHelp")}
                      onMouseLeave={() => handleMouseLeave("CaseStudiesHelp")}
                    ></i>
                    {visibleHelp.CaseStudiesHelp && (
                      <div className="mentorMicroHelpMessagePrice">
                        <ul>
                          <li className="Mentor-Microhelp-listFrontSize">
                            By opting for the Case Study option, you can become
                            a case study contributor and get paid for it
                          </li>
                        </ul>
                      </div>
                    )}
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
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
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
                    Would You Be Open to Offering Three Free Sessions For Your
                    Alumni? <span className="RedColorStarMark">*</span>
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
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                {errors.sessionsFreeOfCharge && (
                  <p className="Error-meg-login-register">
                    {errors.sessionsFreeOfCharge.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="row tageye">
            <div className="col-lg-12">
              <label className="taglabel">Location</label>
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <b>
                    City <span className="RedColorStarMark">*</span>
                  </b>
                </label>
                <input
                  onKeyUp={() => {
                    trigger("mentorCityName");
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Enter City name"
                  {...register("mentorCityName", {
                    required: "Please enter the City name",
                  })}
                />

                {errors.mentorCityName && (
                  <p className="Error-meg-login-register">
                    {errors.mentorCityName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <label className="form-label">
                  <b>Which Country Do You Live in?</b>
                  <span className="RedColorStarMark">*</span>
                </label>
                <select
                  onKeyUp={() => {
                    trigger("mentor_country");
                  }}
                  className=" form-select"
                  name="mentor_country"
                  {...register("mentor_country", {
                    required: "Please enter the country name",
                  })}
                >
                  <option value="">Please select your Country name</option>
                  {options.map((option) => (
                    <option key={option.country_id} value={option.country_name}>
                      {option.country_name}
                    </option>
                  ))}
                </select>
                {errors.mentor_country && (
                  <p className="Error-meg-login-register">
                    {errors.mentor_country.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <GoToTop />
      </div>
    </>
  );
};

export default MentorPage2;
