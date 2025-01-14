import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import "../../../Forms/Register/Mentor/input-radio.css";
import { allDomain } from "../../../data/DomainData.js";
import { allSkills } from "../../../data/Skills.js";

import { toast } from "react-toastify";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";

import { experienceOptions } from "../../../data/DomainData.js";
import { json } from "react-router-dom";
const MentorProfile2 = ({ profiledata, user, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const url = ApiURL();
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    mentor_job_title: profiledata?.mentor_job_title,
    mentor_years_of_experience: profiledata?.mentor_years_of_experience,
    mentor_company_name: profiledata?.mentor_company_name,
    mentor_recommended_area_of_mentorship:
      profiledata?.mentor_recommended_area_of_mentorship,
    mentor_headline: profiledata?.mentor_headline,
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Check if the input field is 'mentor_years_of_experience'
    if (name === "mentor_years_of_experience") {
      const selectedExperience = experienceOptions.find(
        (option) => option.value === value
      );

      if (selectedExperience) {
        // Update the formData state with the selected experience
        setFormData((prevData) => ({
          ...prevData,
          mentor_years_of_experience: selectedExperience.value, // or use selectedExperience.label if you prefer
        }));
      }
    } else {
      // For other inputs, just update the formData as usual
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Update formData dynamically for any input field
      }));

      if (name === "mentor_domain") {
        const updatedDomains = [...formData.mentor_domain]; // Copy the array

        // Check if the index exists in the array
        if (updatedDomains[index]) {
          updatedDomains[index].label = value; // Update the specific domain
          setFormData((prevData) => ({
            ...prevData,
            mentor_domain: updatedDomains, // Update formData state
          }));
        } else {
          console.error(`No domain found at index ${index}`);
        }
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const validateForm = () => {
    const {
      mentor_job_title,
      mentor_years_of_experience,
      mentor_company_name,
      mentor_headline,
    } = formData;

    if (
      !mentor_job_title ||
      !mentor_years_of_experience ||
      !mentor_company_name ||
      !mentor_headline ||
      !(JSON.parse(DomainList.length) > 0)
    ) {
      toast.error("All fields are required!");
      return false;
    }
    if (!(mentor_headline.length > 100)) {
      toast.error("length must be 100 character ");
      return false;
    }

    return true;
  };

  const DomainPre = JSON.parse(profiledata?.mentor_domain);
  const [DomainList, setDomainList] = useState([]);

  useEffect(() => {
    if (DomainPre && Array.isArray(DomainPre)) {
      const tempList = [];
      for (let i = 0; i < DomainPre.length; i++) {
        tempList.push(DomainPre[i]);
      }
      setDomainList(tempList);
    }
  }, []); // Re-run the effect when DomainPre changes

  const [Domain, setDomain] = useState(""); // For the input field
  const [Domainsuggestions, setDomainSuggestions] = useState([]); // For suggestions
  const [messageDomain, setMessageDomain] = useState(""); // For displaying messages

  const handleDomainInputChange = (e) => {
    const input = e.target.value.trimStart(); // Trim leading spaces
    setDomain(input);

    if (input.length > 3) {
      // Suggest the input and filter suggestions from `allDomain`
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
    setDomainList(updatedDomainList); // Update the state of DomainList
  };

  // No need for `useEffect` now, as `mentorDomain` is directly updated in `removeDomain`

  useEffect(() => {
    if (DomainList?.length > 0) {
      setValue("mentorDomain", DomainList);
    }
  }, [DomainList]);
  // ------------------------------------------------------------------------------------------
  const [SkillsPre, setSkillsPre] = useState();
  useEffect(() => {
    if (profiledata?.mentor_area_expertise !== "undefined") {
      if (profiledata?.mentor_area_expertise !== "[]") {
        const Skills = JSON.parse(profiledata?.mentor_area_expertise);
        setSkillsPre(Skills);
      }
    }
  }, []);

  const [skillList, setSkillList] = useState([]); // For added skills

  useEffect(() => {
    if (SkillsPre && Array.isArray(SkillsPre)) {
      const tempList = [];
      for (let i = 0; i < SkillsPre.length; i++) {
        tempList.push(SkillsPre[i]);
      }
      setSkillList(tempList);
    }
  }, []); // Re-run the effect when DomainPre changes

  const [skills, setSkills] = useState(""); // For the input field

  const [suggestions, setSuggestions] = useState([]); // For suggestions
  const [message, setMessage] = useState(""); // For displaying messages
  // Example skill suggestions

  const handleInputChangee = (e) => {
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
    setSkillList(skillList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (skillList?.length > 0) {
      setValue("mentorSkill", skillList);
    }
  }, [skillList]);
  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log(formData);
      try {
        dispatch(showLoadingHandler());
        const res = await Promise.race([
          axios.post(
            `${url}api/v1/mentor/dashboard/update/profile-2`,
            {
              formData,
              mentor_domain: JSON.stringify(DomainList),
              expertiseList: JSON.stringify(skillList),

              mentorUserDtlsId: user.user_id,
              mentor_email: profiledata?.mentor_email,
              mentorPhoneNumber: profiledata?.mentor_phone_number,
            },
            {
              headers: { authorization: "Bearer " + token },
            }
          ),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (res.data.success) {
          toast.success("Profile Details updated successfully");
          setIsEditing(false);
        } else if (res.data.error) {
          toast.error(res.data.error);
          setIsEditing(false);
        }
      } catch (error) {
        if (error.message === "Request timed out") {
          toast.error("Update failed due to a timeout. Please try again.");
        } else {
          toast.error(
            "Error in updating the profile details, please try again!"
          );
        }
      } finally {
        dispatch(hideLoadingHandler());
        setIsEditing(false);
      }
    }
  };

  return (
    <main>
      {!isEditing && (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            type="button"
            className="btn juybeubrer_btn btn-primary"
            style={{ textAlign: "right" }}
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      )}
      <div className="doiherner_wrapper">
        <div className="ihduwfr_form_wrapper p-0 " style={{ height: "auto" }}>
          <div className="row ">
            {/* <div className="col-lg-6"> */}
            <div className="col-lg-6 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>Job Title</b>
                <span className="RedColorStarMark">*</span>
              </label>
              <input
                type="text"
                name="mentor_job_title"
                className="form-control"
                placeholder=" Job title"
                value={formData.mentor_job_title}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="col-lg-6 mb-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <b>Years of Experience</b>
                <span className="RedColorStarMark">*</span>
              </label>
              <select
                className="form-control form-select"
                onChange={handleInputChange}
                disabled={!isEditing}
                name="mentor_years_of_experience" // The name must match the form field
                value={formData.mentor_years_of_experience || ""} // Ensure the correct value is reflected
              >
                {/* Default option or placeholder */}
                <option value="" disabled>
                  {formData.mentor_years_of_experience
                    ? `Selected: ${formData.mentor_years_of_experience}`
                    : "Select your experience"}
                </option>

                {/* Mapping over your experienceOptions array */}
                {experienceOptions?.map((experience) => (
                  <option key={experience.value} value={experience.value}>
                    {experience.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-6 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>Company</b>
                <span className="RedColorStarMark">*</span>
              </label>
              <input
                type="text"
                name="mentor_company_name"
                className="form-control"
                placeholder="Company name"
                value={formData.mentor_company_name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            {/* Domain section */}
            <div className="col-lg-6 mb-4">
              <label htmlFor="mentorJobTitle" className="form-label">
                <b>Domain</b>
                <span className="RedColorStarMark">*</span>(Multiple)
              </label>
              <div className="input-wrapper">
                <Controller
                  onKeyUp={() => {
                    trigger("mentorDomain");
                  }}
                  name="mentorDomain" // The name you want to use in form data
                  control={control}
                  rules={{ required: "Domain is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Type your Domain and press Enter"
                      value={Domain}
                      disabled={!isEditing}
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
                    {Domainsuggestions.map((Domainsuggestions, index) => (
                      <li
                        key={index}
                        onClick={() => handleAddDomain(Domainsuggestions)}
                        className="suggestion-item"
                      >
                        {Domainsuggestions}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Display message */}
              {messageDomain && <div className="message">{messageDomain}</div>}

              <div className="skill-list">
                {DomainList?.map((Domains, index) => (
                  <span key={index} className="skill-tag">
                    {Domains}{" "}
                    <button
                      type="button"
                      onClick={() => removeDomain(index)}
                      className="remove-skill-btn"
                      disabled={!isEditing}
                    >
                      &times;
                    </button>
                  </span>
                ))}
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

          <div className="row ">
            <div className="col-lg-12"></div>
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
                  disabled={!isEditing}
                  onChange={handleInputChangee}
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
              {message && <div className="message">{message}</div>}

              <div className="skill-list">
                {skillList?.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}{" "}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="remove-skill-btn"
                      disabled={!isEditing}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="">
            <div className="col-lg-12 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>Brief About Yourself </b>{" "}
                <span className="RedColorStarMark">*</span>
                <p className=" mb-0 ghhduenee">
                  {/* (*Give a good headline, This helps us understand the mentor
                  overview*) */}
                  (*This helps us understand the mentor overview*)
                </p>
              </label>

              <textarea
                name="mentor_headline"
                className="form-control"
                style={{ height: "100px" }}
                placeholder="Type A Headline Here"
                value={formData.mentor_headline}
                onChange={handleInputChange}
                disabled={!isEditing}
              ></textarea>
            </div>
            <div className="col-lg-12 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>Your Recommended Area of Mentorship</b>
              </label>

              <input
                type="text"
                className="form-control"
                name="mentor_recommended_area_of_mentorship"
                placeholder=" Mentorship Area "
                value={formData.mentor_recommended_area_of_mentorship}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing && (
            <div className="d-flex justify-content-between m-4">
              <button
                type="button"
                onClick={handleEditClick}
                className="btn juybeubrer_btn btn-primary"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="btn juybeubrer_btn btn-primary"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MentorProfile2;
