import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import collegeData from "../../../data/collegesname.json";
import { allSkills } from "../../../data/Skills";

const MenteeRegStep2 = ({ userType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showOption, setShowOption] = useState(true);
  console.log(userType)
  const handleOptionFalse = () => setShowOption(false);
  const handleOptionTrue = () => setShowOption(true);

  const {
    register,
    setValue,
    control,
    trigger,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  // Skills function
  const [skills, setSkills] = useState(""); // For the input field
  const [skillList, setSkillList] = useState([]); // For added skills
  const [suggestions, setSuggestions] = useState([]); // For suggestions
  const [message, setMessage] = useState(""); // For displaying messages

  // const handleInputChangeSkills = (e) => {
  //   const input = e.target.value.trimStart(); // Trim leading spaces
  //   setSkills(input);

  //   if (input.length > 3) {
  //     // Suggest the input and filter suggestions from `allSkills`
  //     setSuggestions([
  //       input,
  //       ...allSkills.filter(
  //         (skill) =>
  //           skill.toLowerCase().includes(input.toLowerCase()) &&
  //           !skillList?.some(
  //             (existingSkill) =>
  //               existingSkill.toLowerCase() === skill.toLowerCase()
  //           )
  //       ),
  //     ]);
  //   } else if (input) {
  //     // Filter suggestions if input is not empty
  //     const filteredSuggestions = allSkills.filter(
  //       (skill) =>
  //         skill.toLowerCase().includes(input.toLowerCase()) &&
  //         !skillList?.some(
  //           (existingSkill) =>
  //             existingSkill.toLowerCase() === skill.toLowerCase()
  //         )
  //     );
  //     setSuggestions(filteredSuggestions);
  //   } else {
  //     // Clear suggestions if input is empty
  //     setSuggestions([]);
  //   }
  // };



  // const handleAddSkill = (newSkill) => {
  //   const trimmedSkill = newSkill.trim();

  //   // Prevent adding empty or duplicate skills
  //   if (!trimmedSkill) {
  //     setMessage("Skill cannot be empty");
  //     setTimeout(() => setMessage(""), 2000);
  //     return;
  //   }

  //   // Check if the skill already exists (case-insensitive)
  //   const exists = (skillList || []).some(
  //     (existingSkill) =>
  //       existingSkill.toLowerCase() === trimmedSkill.toLowerCase()
  //   );

  //   if (!exists) {
  //     setSkillList([...(skillList || []), trimmedSkill]); // Use fallback to avoid undefined
  //     setValue("mentee_Skills", [...(skillList || []), trimmedSkill]);
  //     setMessage(""); // Clear any previous message
  //   } else {
  //     setMessage("Skill already added");
  //     setTimeout(() => setMessage(""), 2000);
  //   }

  //   setSkills(""); // Clear input
  //   setSuggestions([]); // Clear suggestions
  // };

  const handleInputChangeSkills = (e) => {
    const input = e.target.value.trimStart(); // Trim leading spaces
    setSkills(input);

    if (!input) {
      // Clear suggestions if input is empty
      setSuggestions([]);
      return;
    }

    // Normalize input
    const lowerInput = input.toLowerCase();

    // Filter out skills already in the skillList (supporting string or object with 'name')
    const filteredSuggestions = allSkills.filter((skill) => {
      const lowerSkill = skill.toLowerCase();
      const alreadyAdded = skillList?.some((existingSkill) => {
        const skillName = typeof existingSkill === 'string' ? existingSkill : existingSkill.name;
        return skillName?.toLowerCase() === lowerSkill;
      });
      return lowerSkill.includes(lowerInput) && !alreadyAdded;
    });

    // If input length > 3, add the input as the first suggestion
    if (input.length > 3) {
      setSuggestions([input, ...filteredSuggestions]);
    } else {
      setSuggestions(filteredSuggestions);
    }
  };
  const handleAddSkill = (newSkill) => {
    if (!newSkill.trim()) {
      setMessage("Skill cannot be empty");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    // Split by comma, trim, remove empty strings, and normalize to lowercase for duplicate check
    const skillEnteredByUser = newSkill
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    if (skillEnteredByUser.length === 0) {
      setMessage("Skill cannot be empty");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    // Remove duplicates within the newly entered skills
    const uniqueNewSkills = [...new Set(skillEnteredByUser.map((s) => s.toLowerCase()))];

    // Prepare lowercased list of already added skills
    const existingSkillsLower = (skillList || []).map((s) =>
      (typeof s === "string" ? s : s.name).toLowerCase()
    );

    // Filter only new skills that aren't already in skillList
    const finalSkillsToAdd = uniqueNewSkills.filter(
      (skill) => !existingSkillsLower.includes(skill)
    );

    if (finalSkillsToAdd.length === 0) {
      setMessage("Skill already added");
      setTimeout(() => setMessage(""), 2000);
      setSkills("");
      setSuggestions([]);
      return;
    }

    // Capitalize first letter of each skill (optional)
    const formattedSkillsToAdd = finalSkillsToAdd.map(
      (skill) => skill.charAt(0).toUpperCase() + skill.slice(1)
    );

    const updatedSkillList = [...(skillList || []), ...formattedSkillsToAdd];

    setSkillList(updatedSkillList);
    setValue("mentee_Skills", updatedSkillList);
    setMessage("");
    setSkills("");
    setSuggestions([]);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSkill(skills);
    }
  };
  const removeSkill = (index) => {
    const updatedSkillList = skillList.filter((_, i) => i !== index);
    setSkillList(updatedSkillList); // Update the state
    setValue("mentee_Skills", updatedSkillList); // Update the form field immediately
  };
  useEffect(() => {
    if (skillList?.length > 0) {
      setValue("mentee_Skills", skillList);
    }
  }, [skillList]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setValue("mentee_InstituteName", value);
    setDropdownVisible(value !== ""); // Only show dropdown when input is not empty
  };

  const filteredColleges = collegeData.filter((item) =>
    item["College Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleOptionClick = (college) => {
    setSelectedCollege(college); // Set selected college
    setSearchTerm(college["College Name"]); // Update input with selected college name
    setDropdownVisible(false); // Hide dropdown after selection
    setValue("mentee_InstituteName", college["College Name"]); // Update the form value
    clearErrors("mentee_InstituteName"); // Clear error when an option is selected
    trigger("mentee_InstituteName"); // Optionally trigger validation if needed
  };

  return (
    <div className="step" id="step2">
      {/* <h4 className="text-center">
        <img src="images/icons8-account-96.webp" alt="" className="me-1" />
        More About You
      </h4> */}

      <div className="ihduwfr_form_wrapper mt-4">
        {/* Radio Buttons for Type Selection */}

        {
          userType.userType === "InstituteStudent" ? "" : <div className="csfvgdtrfs cihseriniewr mb-3 position-relative">
            <label htmlFor="exampleInputEmail1" className="form-label">
              I Am A
            </label>
            <br />
            <input
              type="radio"
              id="rdo4"
              className="radio-input"
              value={"Student"}
              defaultChecked
              onClick={handleOptionTrue}
              {...register("mentee_type", {
                required: "Please select one of the options",
              })}
            />
            <label htmlFor="rdo4" className="radio-label pe-3">
              <span className="radio-border"></span> Student
            </label>

            <input
              type="radio"
              id="rdo5"
              className="radio-input"
              value={"Working Professional"}
              onClick={handleOptionFalse}
              {...register("mentee_type", {
                required: "Please select one of the options",
              })}
            />
            <label htmlFor="rdo5" className="radio-label pe-3">
              <span className="radio-border"></span> Working Professional
            </label>

            <input
              type="radio"
              id="rdo10"
              className="radio-input"
              value={"Fresher"}
              onClick={handleOptionFalse}
              {...register("mentee_type", {
                required: "Please select one of the options",
              })}
            />
            <label htmlFor="rdo10" className="radio-label pe-3">
              <span className="radio-border"></span> Fresher
            </label>

            {errors.mentee_type && (
              <p className="Error-meg-login-register">
                {errors.mentee_type.message}
              </p>
            )}
          </div>
        }


        {/* College Name Search with Dropdown */}
        {showOption && (
          <div>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Institute/College name <span className="RedColorStarMark">*</span>
            </label>
            <div className="dkjiherer moideuirer_list hello mb-3">
              <div className="dropdown">
                <input
                  onKeyUp={() => {
                    trigger("mentee_InstituteName");
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Choose/Search for a college..."
                  value={searchTerm} // Ensure input value is controlled
                  {...register("mentee_InstituteName", {
                    required: "College or Institute Name is required",
                  })}
                  onChange={handleInputChange}
                  onFocus={() => setDropdownVisible(searchTerm !== "")} // Show dropdown when focused
                  onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
                />
                {errors.mentee_InstituteName && (
                  <p className="Error-meg-login-register">
                    {errors.mentee_InstituteName.message}
                  </p>
                )}
                {dropdownVisible && filteredColleges.length > 0 && (
                  <div className="dropdown-contentMentee">
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
          </div>
        )}

        {/* Gender Selection */}
        <div className="mb-3">
          <div className="csfvgdtrfs cihseriniewr position-relative">
            <label htmlFor="exampleInputEmail1" className="form-label pe-3">
              Gender <span className="RedColorStarMark">*</span>
            </label>
            <input
              type="radio"
              id="rdo7"
              className="radio-input"
              name="radio-group2"
              value={"Male"}
              {...register("mentee_gender", {
                required: "Please select a gender",
              })}
              onClick={() => clearErrors("mentee_gender")} // Clear errors on click
            />
            <label htmlFor="rdo7" className="radio-label pe-3">
              <span className="radio-border"></span> Male
            </label>

            <input
              type="radio"
              id="rdo8"
              className="radio-input"
              name="radio-group2"
              value={"Female"}
              {...register("mentee_gender", {
                required: "Please select a gender",
              })}
              onClick={() => clearErrors("mentee_gender")} // Clear errors on click
            />
            <label htmlFor="rdo8" className="radio-label pe-3">
              <span className="radio-border"></span> Female
            </label>

            <input
              type="radio"
              id="rdo9"
              className="radio-input"
              name="radio-group2"
              value={"Other"}
              {...register("mentee_gender", {
                required: "Please select a gender",
              })}
              onClick={() => clearErrors("mentee_gender")} // Clear errors on click
            />
            <label htmlFor="rdo9" className="radio-label pe-3">
              <span className="radio-border"></span> Other
            </label>
          </div>
          {errors.mentee_gender && (
            <p className="Error-meg-login-register">
              {errors.mentee_gender.message}
            </p>
          )}
        </div>

        {/* Skills Input */}

        <div className="col-lg-12 mb-4">
          <label htmlFor="" className="form-label">
            Your Skill <span className="RedColorStarMark">*</span>
          </label>
          <div className="input-wrapper">
            <Controller
              onKeyUp={() => {
                trigger("mentee_Skills");
              }}
              name="mentee_Skills" // The name you want to use in form data
              control={control}
              rules={{ required: "Skills is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Type skills and press Enter"
                  value={skills}
                  onChange={handleInputChangeSkills}
                  onKeyDown={handleKeyPress}
                  className="form-control"
                />
              )}
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
          {message && <div className="message">{message}</div>}

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
          {errors.mentee_Skills && (
            <p className="Error-meg-login-register">
              {errors.mentee_Skills.message}
            </p>
          )}
        </div>

        {/* About Yourself */}
        <div className="mb-4">
          <label htmlFor="" className="form-label">
            About Yourself <span className="RedColorStarMark">*</span>
          </label>
          <textarea
            className="form-control"
            placeholder="Write something about yourself"
            {...register("mentee_About", {
              required: "Write something about yourself",
              // minLength: {
              //   value: 100,
              //   message: "Must be greater than 100 characters.",
              // },
              maxLength: {
                value: 200,
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
            onChange={() => clearErrors("mentee_About")} // Clear errors when user types
          ></textarea>
          {errors.mentee_About && (
            <p className="Error-meg-login-register">
              {errors.mentee_About.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="termsConditions"
            {...register("mentee_Agree", {
              required: "You must agree before submitting.",
            })}
            onChange={() => clearErrors("mentee_Agree")} // Clear error when checkbox is clicked
          />
          <label className="form-check-label" htmlFor="termsConditions">
            I agree to the Terms and Conditions{" "}
            <span className="RedColorStarMark">*</span>
          </label>
          {errors.mentee_Agree && (
            <p className="Error-meg-login-register">
              {errors.mentee_Agree.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenteeRegStep2;