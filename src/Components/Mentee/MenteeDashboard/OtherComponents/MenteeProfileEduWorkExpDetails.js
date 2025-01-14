import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import collegeData from "../../../data/collegesname.json";
import { allSkills } from "../../../data/Skills";
import "../DashboardCSS/MenteeProfileEduWorkExpDetails.css";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";
import axios from "axios";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";

const MenteeProfileEduWorkexpDetails = ({ singleMentee, user, token }) => {
  const url = ApiURL();
  const dispatch = useDispatch();
  const handleEditClick = () => {
    setIfEdit(!ifEdit);
  };

  const [formData, setFormData] = useState({
    mentee_type: singleMentee[0]?.mentee_type,
  });

  const educationDetilsArray = singleMentee[0]?.mentee_institute_details;
  const parsedArrayEducation = JSON.parse(educationDetilsArray);

  const certificateDetilsArray = singleMentee[0]?.mentee_certificate_details;
  const parsedArraycertificate = JSON.parse(certificateDetilsArray);

  const workExperienceDetilsArray = singleMentee[0]?.mentee_experience_details;
  const parsedArrayworkExperience = JSON.parse(workExperienceDetilsArray);

  const additionalDetilsArray = singleMentee[0]?.mentee_additional_details;
  const parsedArrayadditionaldetails = JSON.parse(additionalDetilsArray);

  const [ifEdit, setIfEdit] = useState(false);

  const [Edutype, setEdutype] = useState(singleMentee[0]?.mentee_type);

  // const [searchTerm, setSearchTerm] = useState();

  // // Filter colleges based on the search term
  // const filteredColleges = collegeData.filter((item) =>
  //   item["College Name"]?.toLowerCase().includes(searchTerm?.toLowerCase())
  // );

  const currentYear = new Date().getFullYear(); // Get the current year
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // Generate array of last 10 years
  const yearsForEnd = Array.from({ length: 16 }, (_, i) => currentYear + 5 - i);
  // ---------------------------------------------------------------------------------------------------
  // const [inputList, setInputList] = useState(getInitialInputList("college"));
  const [inputList, setInputList] = useState(
    parsedArrayEducation || [
      {
        educationType: "college",
        collage_name: "",
        mentee_courseName: "",
        mentee_institute_Percentage: "",
        mentee_institute_Start_Year: "",
        mentee_institute_End_Year: "",
        searchTerm: "", // Added individual searchTerm for each entry
      },
    ]
  );

  // const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  function getInitialInputList(type) {
    return [
      {
        educationType: type, // Initialize each item with the selected type
      },
    ];
  }

  // const handleClearCollege = (index) => {
  //   const list = [...inputList];
  //   list[index].collage_name = "";
  //   list[index].searchTerm = "";
  //   setInputList(list);
  // };
  const handleAddClick = () => {
    if (inputList.length < 3) {
      setInputList([...inputList, getInitialInputList("college")[0]]);
    }
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleEduChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // const handleOptionClick = (college, index) => {
  //   const list = [...inputList];
  //   list[index].collage_name = college["College Name"];
  //   setInputList(list);
  //   setOpenDropdownIndex(null); // Close dropdown after selection
  //   setSearchTerm(""); // Clear search term after selection
  // };
  // const handleSearchChange = (e, index) => {
  //   setSearchTerm(e.target.value);
  //   setOpenDropdownIndex(index); // Open dropdown only for this index
  // };
  const handleEducationTypeChange = (type, index) => {
    const list = [...inputList];
    list[index].educationType = type; // Update the selected type per index
    setInputList(list);
  };
  // --------------------------------------------------------------------------------------------------
  const [CertificationList, setCertificationList] = useState(
    parsedArraycertificate || [
      {
        mentee_Certificate_Name: "",
        mentee_Certificate_level: "",
        mentee_Certificate_Desc: "",
        mentee_Certificate_Start_Year: "",
        mentee_Certificate_End_Year: "",
      },
    ]
  );

  const handleCertificateAddClick = () => {
    if (CertificationList.length < 3) {
      setCertificationList([
        ...CertificationList,
        {
          mentee_Certificate_Name: "",
          mentee_Certificate_level: "",
          mentee_Certificate_Desc: "",
          mentee_Certificate_Start_Year: "",
          mentee_Certificate_End_Year: "",
        },
      ]);
    }
  };

  const handleCertificateRemoveClick = (index) => {
    const list = [...CertificationList];
    list.splice(index, 1);
    setCertificationList(list);
  };

  const handleCertificateChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...CertificationList];
    list[index][name] = value;
    setCertificationList(list);
  };
  // ---------------------------------------------------------------------------------------------------------

  const [WorkExpList, setWorkExpList] = useState(
    parsedArrayworkExperience || [
      {
        mentee_workexp_CompanyName: "",
        mentee_workexp_Role: "",
        mentee_workexp_Desc: "",
        mentee_workexp_Location: "",
        mentee_workexp_Start_Year: "",
        mentee_workexp_End_Year: "",
      },
    ]
  );
  const handleWorkExpAddClick = () => {
    if (WorkExpList.length < 3) {
      setWorkExpList([
        ...WorkExpList,
        {
          mentee_workexp_CompanyName: "",
          mentee_workexp_Role: "",
          mentee_workexp_Desc: "",
          mentee_workexp_Location: "",
          mentee_workexp_Start_Year: "",
          mentee_workexp_End_Year: "",
        },
      ]);
    }
  };
  const handleWorkExpRemoveClick = (index) => {
    const list = [...WorkExpList];
    list.splice(index, 1);
    setWorkExpList(list);
  };
  const handleWorkExpChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...WorkExpList];
    list[index][name] = value;
    setWorkExpList(list);
  };
  // -------------------------------------------------------------------------------------------------
  const [additionalText, setadditionalText] = useState(
    parsedArrayadditionaldetails || [
      {
        additionalHeadline: "",
        additionalDec: "",
      },
    ]
  );
  const handleadditionlText = () => {
    if (WorkExpList.length < 3) {
      setadditionalText([
        ...additionalText,
        {
          additionalHeadline: "",
          additionalDec: "",
        },
      ]);
    }
  };
  const handleadditionlTextRemoveClick = (index) => {
    const list = [...additionalText];
    list.splice(index, 1);
    setadditionalText(list);
  };
  const handleadditionlTextChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...additionalText];
    list[index][name] = value;
    setadditionalText(list);
  };
  // -------------------------------------------------------------------------------------------------------------------

  const SkillsPre = JSON.parse(singleMentee[0]?.mentee_skills) || [];
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

  const handleSavechanges = async (event) => {
    try {
      dispatch(showLoadingHandler());
      const response = await Promise.race([
        axios.post(
          `${url}api/v1/mentee/dashboard/profile/edu-work-details`,
          {
            edutype: Edutype,
            mentee_skills: skillList,
            mentee_EduDetails: inputList,
            mentee_CertDetails: CertificationList,
            mentee_WorkExpDetails: WorkExpList,
            mentee_AddDetails: additionalText,
            menteeUserDtlsId: user?.user_id,
          },
          {
            headers: { authorization: "Bearer " + token },
          }
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 45000)
        ),
      ]);
      if (response.data.success) {
        dispatch(hideLoadingHandler());
        toast.success("Profile Details changed successfully");
      }
      if (response.data.error) {
        dispatch(hideLoadingHandler());
        toast.error(
          "There is some error while updating the profile details. Please try again"
        );
      }
    } catch (error) {
      toast.error(
        "There is some error while updating the profile details. Please try again"
      ); // Stop loading
      dispatch(hideLoadingHandler());
    } finally {
      dispatch(hideLoadingHandler());
      setIfEdit(false);
    }
  };

  return (
    <div className="col-lg-10 ps-0">
      <div className="">
        <div className="container">
          <div className="col-lg-10 col-md-12">
            <div className="mentee-prf-settings py-5">
              {!ifEdit && (
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <button
                    type="button"
                    className="btn btn-primary "
                    style={{ textAlign: "right" }}
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                </div>
              )}

              <div>
                <div className="pb-3">
                  <label htmlFor="" className="form-label">
                    <h3> Educational Level</h3>
                  </label>

                  <select
                    name="menteeEduLevel"
                    className="form-select"
                    disabled={!ifEdit}
                    onChange={(e) => {
                      setEdutype(e.target.value); // Update the state on selection
                    }}
                  >
                    {/* Default selected option */}
                    <option value={formData.mentee_type}>
                      {formData.mentee_type}
                    </option>

                    {/* Render other options conditionally */}
                    {formData.mentee_type !== "Student" && (
                      <option value="Student">Student</option>
                    )}
                    {formData.mentee_type !== "Working Professional" && (
                      <option value="Working Professional">
                        Working Professional
                      </option>
                    )}
                    {formData.mentee_type !== "Corporate" && (
                      <option value="Corporate">Corporate</option>
                    )}
                    {formData.mentee_type !== "Fresher" && (
                      <option value="Fresher">Fresher</option>
                    )}
                  </select>
                </div>

                <div className="col-lg-12 mb-4">
                  <label htmlFor="mentorJobTitle" className="form-label">
                    <h3>Skills<span className="RedColorStarMark">*</span></h3>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Type skills and press Enter "
                      value={skills}
                      onChange={handleInputChangee}
                      onKeyDown={handleKeyPress}
                      disabled={!ifEdit}
                      className="form-control MentorProfile-BorderColor"
                    />

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

                  {message && <span className="RedColorStarMark">{message}</span>}

                  <div className="skill-list">
                    {skillList?.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}{" "}
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="remove-skill-btn"
                          disabled={!ifEdit}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pb-3 Mentee-EduDetails" id="skill-tag">
                  <div>
                    {inputList.map((x, i) => (
                      <div>
                        <label htmlFor="" className="form-label">
                          <h3> Education details {i + 1}</h3>
                        </label>{" "}
                        <div className="form-control tag43763" key={i}>
                          <div className="education-type-selection tag3678">
                            <label>
                              <input
                                type="radio"
                                name={`educationType-${i}`} // Unique name per index
                                value="college"
                                checked={x.educationType === "college"}
                                disabled={!ifEdit}
                                onChange={() =>
                                  handleEducationTypeChange("college", i)
                                }
                              />
                              College
                            </label>
                            <label>
                              <input
                                type="radio"
                                name={`educationType-${i}`} // Unique name per index
                                value="school"
                                checked={x.educationType === "school"}
                                disabled={!ifEdit}
                                onChange={() =>
                                  handleEducationTypeChange("school", i)
                                }
                              />
                              School
                            </label>
                          </div>
                          {inputList.length > 1 && (
                            <span
                              className="tag928"
                              disabled={!ifEdit}
                              onClick={() => handleRemoveClick(i)}
                            >
                              <i class="fa-regular fa-trash-can"></i>
                            </span>
                          )}

                          {x.educationType === "college" && (
                            <div className="college-fields">
                              <div className="row">
                                <div className="col-lg-6">
                                  <h5>College/Institute Name</h5>
                                  <div className="dropdown">
                                    <input
                                      type="text"
                                      name="collage_name"
                                      disabled={!ifEdit}
                                      className="form-control h-38px MentorProfile-BorderColor"
                                      placeholder="Search for a college..."
                                      onChange={(e) => handleEduChange(e, i)}
                                      value={x.collage_name}
                                      // onChange={(e) => handleSearchChange(e, i)}
                                      // onFocus={() => setOpenDropdownIndex(i)}
                                      // onBlur={() =>
                                      //   setTimeout(
                                      //     () => setOpenDropdownIndex(null),
                                      //     100
                                      //   )
                                      // }
                                    />
                                    {/* {x.collage_name && (
                                      <button
                                        type="button"
                                        className="clear-button"
                                        disabled={!ifEdit}
                                        onClick={() => handleClearCollege(i)}
                                      >
                                        Clear
                                      </button>
                                    )}
                                    {openDropdownIndex === i &&
                                      filteredColleges.length > 0 && (
                                        <div className="dropdown-content">
                                          {filteredColleges
                                            .slice(0, 10)
                                            .map((college, index) => (
                                              <div
                                                key={index}
                                                className="dropdown-item"
                                                disabled={!ifEdit}
                                                onClick={() =>
                                                  handleOptionClick(college, i)
                                                }
                                              >
                                                {college["College Name"]}
                                              </div>
                                            ))}
                                        </div>
                                      )} */}
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <h5>Course Name</h5>
                                  <input
                                    type="text"
                                    name="mentee_courseName"
                                    disabled={!ifEdit}
                                    className="form-control MentorProfile-BorderColor"
                                    placeholder="Enter your Course Name"
                                    value={x.mentee_courseName}
                                    onChange={(e) => handleEduChange(e, i)}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-6 mt-2 tag2334">
                                  <h5 className="ml-1">Percentage :-</h5>
                                  <input
                                    type="text"
                                    name="mentee_institute_Percentage"
                                    disabled={!ifEdit}
                                    className="form-control MentorProfile-BorderColor"
                                    placeholder="Percentage %"
                                    value={x.mentee_institute_Percentage}
                                    onChange={(e) => handleEduChange(e, i)}
                                  />
                                </div>
                                <div className="col-lg-6 mt-2 ">
                                  <div className="row">
                                    <div className="col-lg-6 tag2334">
                                      <h5 className="ml-1">Start Date</h5>

                                      <select
                                        className="form-select "
                                        disabled={!ifEdit}
                                        value={x.mentee_institute_Start_Year}
                                        onChange={(e) => handleEduChange(e, i)}
                                        name="mentee_institute_Start_Year"
                                      >
                                        <option value="">Select Year</option>
                                        {years.map((year) => (
                                          <option key={year} value={year}>
                                            {year}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="col-lg-6 tag2334">
                                      <h5 className="ml-1">End Date</h5>

                                      <select
                                        className="form-select "
                                        disabled={!ifEdit}
                                        value={x.mentee_institute_End_Year}
                                        name="mentee_institute_End_Year"
                                        onChange={(e) => handleEduChange(e, i)}
                                      >
                                        <option value="">Select Year</option>
                                        <option value={"Present"}>Present</option>
                                        {yearsForEnd.map((year) => (
                                          <option key={year} value={year}>
                                            {year}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {x.educationType === "school" && (
                            <div className="school-fields">
                              <div className="row ">
                                <div className="col-lg-6 ">
                                  <h5>School Name</h5>
                                  <input
                                    type="text"
                                    disabled={!ifEdit}
                                    name="school_name"
                                    className="form-control MentorProfile-BorderColor"
                                    placeholder="Enter your School Name"
                                    value={x.school_name}
                                    onChange={(e) => handleEduChange(e, i)}
                                  />
                                </div>

                                <div className="col-lg-6 ">
                                  <div className="row">
                                    {" "}
                                    <div className="col-lg-6">
                                      {" "}
                                      <h5>Board</h5>
                                      <input
                                        type="text"
                                        disabled={!ifEdit}
                                        name="schoolBoard"
                                        className="form-control MentorProfile-BorderColor"
                                        placeholder="Enter School Board"
                                        value={x.schoolBoard}
                                        onChange={(e) => handleEduChange(e, i)}
                                      />
                                    </div>{" "}
                                    <div className="col-lg-6">
                                      <h5 className="ml-1">Class</h5>
                                      <select
                                        className="form-select "
                                        disabled={!ifEdit}
                                        value={x.schoolClass}
                                        onChange={(e) => handleEduChange(e, i)}
                                        name="schoolClass"
                                      >
                                        <option value="">Select Class</option>
                                        <option value="10">10th Class</option>
                                        <option value="12">12th Class</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-6 mt-2 ">
                                  {" "}
                                  <h5 className="mt-1">Percentage</h5>
                                  <input
                                    type="text"
                                    disabled={!ifEdit}
                                    name="school_location"
                                    className="form-control MentorProfile-BorderColor"
                                    placeholder="Percentage %"
                                    value={x.school_location}
                                    onChange={(e) => handleEduChange(e, i)}
                                  />
                                </div>

                                <div className="col-lg-6 mt-2">
                                  <div className="row tag374 ">
                                    <div className="col-lg-6 tag2334">
                                      {" "}
                                      <h5 className="ml-1">Start Year</h5>
                                      <select
                                        className="form-select "
                                        disabled={!ifEdit}
                                        value={x.schoolStartYear}
                                        onChange={(e) => handleEduChange(e, i)}
                                        name="schoolStartYear"
                                      >
                                        <option value="">Select Year</option>
                                        {years.map((year) => (
                                          <option key={year} value={year}>
                                            {year}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="col-lg-6 tag2334">
                                      {" "}
                                      <h5 className="ml-1">End Year</h5>
                                      <select
                                        className="form-select"
                                        disabled={!ifEdit}
                                        value={x.schoolEndYear}
                                        name="schoolEndYear"
                                        onChange={(e) => handleEduChange(e, i)}
                                      >
                                        <option value="">Select Year</option>
                                        <option value={"Present"}>Present</option>
                                        {yearsForEnd.map((year) => (
                                          <option key={year} value={year}>
                                            {year}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {inputList.length < 3 && (
                      <div className="textend">
                        <span onClick={handleAddClick} disabled={!ifEdit}>
                          <i class="fa-solid fa-plus"></i> Add More
                        </span>
                      </div>
                    )}

                    {/* Save Button */}
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="form-label "></label>
                  {WorkExpList.map((x, i) => (
                    <div>
                      <label htmlFor="" className="form-label">
                        <h3> Work Experience Details {i + 1}</h3>
                      </label>

                      <div className="form-control tag43763 ">
                        {WorkExpList.length > 1 && (
                          <span
                            className="tag928"
                            onClick={() => handleWorkExpRemoveClick(i)}
                          >
                            <i class="fa-regular fa-trash-can"></i>
                          </span>
                        )}
                        <div className="row">
                          <div className="col-lg-6">
                            <h5>Company Name </h5>
                            <input
                              name="mentee_workexp_CompanyName"
                              className="form-control MentorProfile-BorderColor"
                              placeholder="Eg., Business Analyst, Data Scientist..."
                              value={x.mentee_workexp_CompanyName}
                              onChange={(e) => handleWorkExpChange(e, i)}
                              disabled={!ifEdit}
                            />
                          </div>
                          <div className="col-lg-6">
                            <h5>Role </h5>
                            <input
                              name="mentee_workexp_Role"
                              className="form-control MentorProfile-BorderColor"
                              placeholder="Eg., Business Analyst, Data Scientist..."
                              value={x.mentee_workexp_Role}
                              onChange={(e) => handleWorkExpChange(e, i)}
                              disabled={!ifEdit}
                            />
                          </div>
                        </div>
                        <div className="position-relative col-lg-12 pb-3 mt-1">
                          <label htmlFor="" className="form-label">
                            Description
                          </label>

                          <textarea
                            name="mentee_workexp_Desc"
                            className="form-control MentorProfile-BorderColor"
                            style={{ height: "80px" }}
                            placeholder="Write something about the Work Experience"
                            value={x.mentee_workexp_Desc}
                            onChange={(e) => handleWorkExpChange(e, i)}
                            disabled={!ifEdit}
                          ></textarea>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 mt-2 ">
                            <h5 className="ml-1">Location</h5>
                            <input
                              type="type"
                              name="mentee_workexp_Location"
                              className="form-control MentorProfile-BorderColor"
                              value={x.mentee_workexp_Location}
                              onChange={(e) => handleWorkExpChange(e, i)}
                              disabled={!ifEdit}
                            />
                          </div>
                          <div className="col-lg-6 mt-2 ">
                            <div className="row">
                              <div className="col-lg-6 tag26636">
                                <h5 className="ml-1">Start Date</h5>

                                <select
                                  name="mentee_workexp_Start_Year"
                                  value={x.mentee_workexp_Start_Year}
                                  onChange={(e) => handleWorkExpChange(e, i)}
                                  disabled={!ifEdit}
                                  className="form-select "
                                >
                                  <option value="">Select Year</option>
                                  {years.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-lg-6 tag26636 ">
                                <h5 className="ml-1">End Date</h5>

                                <select
                                  name="mentee_workexp_End_Year"
                                  value={x.mentee_workexp_End_Year}
                                  onChange={(e) => handleWorkExpChange(e, i)}
                                  disabled={!ifEdit}
                                  className="form-select "
                                >
                                  <option value="">Select Year</option>
                                  <option value={"Present"}>Present</option>
                                  {yearsForEnd.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {WorkExpList.length < 3 && (
                    <div className="textend">
                      <span onClick={handleWorkExpAddClick}>
                        <i class="fa-solid fa-plus"></i>Add More
                      </span>
                    </div>
                  )}
                </div>
                <div className=" pb-3" id="skill-tag">
                  <div>
                    {CertificationList.map((x, i) => (
                      <div key={i}>
                        <label htmlFor="" className="form-label">
                          <h3> Certificate {i + 1}</h3>
                        </label>
                        <div className="form-control tag43763">
                          {CertificationList.length > 1 && (
                            <span
                              className="tag928"
                              onClick={() => handleCertificateRemoveClick(i)}
                            >
                              <i class="fa-regular fa-trash-can"></i>
                            </span>
                          )}
                          <div className="row">
                            <div className="col-lg-6">
                              <h5> Certificate Name </h5>
                              <input
                                className="form-control MentorProfile-BorderColor"
                                name="mentee_Certificate_Name"
                                disabled={!ifEdit}
                                value={x.mentee_Certificate_Name}
                                onChange={(e) => handleCertificateChange(e, i)}
                                // onChange={(e) =>
                                //   handleInputChangeForCertificate(index, e)
                                // }
                                placeholder="Enter Certificate Name ..."
                              />
                            </div>
                            <div className="col-lg-6">
                              <h5>Certificate level </h5>
                              <select
                                name="mentee_Certificate_level"
                                className="form-select "
                                value={x.mentee_Certificate_level}
                                onChange={(e) => handleCertificateChange(e, i)}
                                disabled={!ifEdit}

                                // onChange={(e) =>
                                //   handleInputChangeForCertificate(index, e)
                                // }
                              >
                                <option value="">Select Level</option>
                                <option value="Entry-Level">Entry-Level</option>
                                <option value="Intermediate">
                                  Intermediate
                                </option>
                                <option value="Advanced">Advanced</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-12 pb-3 ">
                            <label htmlFor="" className="form-label">
                              Description
                            </label>
                            <textarea
                              name="mentee_Certificate_Desc"
                              className="form-control MentorProfile-BorderColor"
                              onChange={(e) => handleCertificateChange(e, i)}
                              style={{ height: "60px" }}
                              placeholder="Write something about the certificate"
                              value={x.mentee_Certificate_Desc}
                              // onChange={(e) =>
                              //   handleInputChangeForCertificate(index, e)
                              // }
                              disabled={!ifEdit}
                            ></textarea>
                          </div>

                          <div className="col-lg-6 mt-2">
                            <div className="row">
                              <div className="col-lg-6 tag2334">
                                <h5 className="ml-1">Start Date</h5>

                                <select
                                  name="mentee_Certificate_Start_Year"
                                  value={x.mentee_Certificate_Start_Year}
                                  onChange={(e) =>
                                    handleCertificateChange(e, i)
                                  }
                                  disabled={!ifEdit}
                                  className="form-select"
                                >
                                  <option value="">Select Year</option>
                                  {years.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-lg-6 tag2334">
                                <h5 className="ml-1">End Date</h5>

                                <select
                                  name="mentee_Certificate_End_Year"
                                  value={x.mentee_Certificate_End_Year}
                                  onChange={(e) =>
                                    handleCertificateChange(e, i)
                                  }
                                  disabled={!ifEdit}
                                  className="form-select "
                                >
                                  <option value="">Select Year</option>
                                  <option value={"Present"}>Present</option>
                                  {yearsForEnd.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {CertificationList.length < 3 && (
                    <div className="textend">
                      <span onClick={handleCertificateAddClick}>
                        <i class="fa-solid fa-plus"></i>Add More
                      </span>
                    </div>
                  )}
                </div>
                <div className=" pb-3" id="skill-tag">
                  {" "}
                  {additionalText.map((x, i) => (
                    <div>
                      {" "}
                      <label htmlFor="" className="form-label">
                        <h3> Additional Details {i + 1}</h3>
                      </label>
                      <div className="form-control tag43763 mt-2">
                        {additionalText.length > 1 && (
                          <span
                            className="tag928"
                            onClick={() => handleadditionlTextRemoveClick(i)}
                          >
                            <i class="fa-regular fa-trash-can"></i>
                          </span>
                        )}
                        <div className="tag2456">
                          <input
                            type="text"
                            value={x.additionalHeadline}
                            name="additionalHeadline"
                            disabled={!ifEdit}
                            className="form-control MentorProfile-BorderColor"
                            placeholder="Add Headline"
                            onChange={(e) => handleadditionlTextChange(e, i)}
                          />

                          <textarea
                            name="additionalDec"
                            value={x.additionalDec}
                            className="form-control mt-2 MentorProfile-BorderColor"
                            style={{ height: "150px" }}
                            placeholder="Write something about the related to headline"
                            onChange={(e) => handleadditionlTextChange(e, i)}
                            disabled={!ifEdit}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                  {additionalText.length < 3 && (
                    <div className="textend">
                      <span onClick={handleadditionlText}>
                        <i class="fa-solid fa-plus"></i>Add More
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {ifEdit && (
            <div className="d-flex justify-content-between m-4">
              <button
                type="button"
                onClick={handleEditClick}
                className="btn juybeubrer_btn btn-primary"
              >
                Close
              </button>
              <button
                onClick={handleSavechanges}
                type="button"
                className="btn juybeubrer_btn btn-primary"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenteeProfileEduWorkexpDetails;
