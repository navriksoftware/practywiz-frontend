import React from "react";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import "../InternshipCss/Postinternship.css";
import Select from "react-select";
import { option_fro_timezone } from "../../../data/Timezones.js";
import { allSkills } from "../../../data/Skills.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { toast } from "react-toastify";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import { ApiURL } from "../../../../Utils/ApiURL";
import { useDispatch } from "react-redux";

const EditInternshipPost = ({
  user,
  token,
  employerDetails,
  internPostData,
  internshipPostId,
}) => {
  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      internshipProfile: internPostData.employer_internship_post_position,
      internshipType: internPostData.employer_internship_post_type.trim(),
      internshipOpening: internPostData.employer_internship_post_openings,
      partFullTime: internPostData.employer_internship_post_part_full_time,
      InternshipLocation: internPostData.employer_internship_post_location,
      internshipStart:
        internPostData.employer_internship_post_internship_start.trim(),
      internshipDuration: internPostData.employer_internship_post_duration,
      internshipPostTimezone: internPostData.employer_internship_post_timezone,
      internshipRequirementsDeatils:
        internPostData.employer_internship_post_req,
      internshipResponsibilities: internPostData.employer_internship_post_res,
      internshipStipendType:
        internPostData.employer_internship_post_stipend_type,
      stipendAmount: internPostData.employer_internship_post_stipend_amount,
      internshipPPOcheckbox: internPostData.employer_internship_post_ppo,
      internshipPerks: JSON.parse(
        internPostData.employer_internship_post_perks
      ),
      taskCategory: internPostData?.employer_internship_post_support,
      businessObjective: internPostData?.employer_internship_post_project,
      projectPlan: internPostData?.employer_internship_post_contribution,
      StartTimeFrom:
        internPostData?.employer_internship_post_coll_hours?.split("-")[0] ||
        "",
      endTimeTo:
        internPostData?.employer_internship_post_coll_hours?.split("-")[1] ||
        "",
      internshipPostTimezone: internPostData?.employer_internship_post_timezone,
    },
  });

  // Initial state setup with more robust default handling
  const [formData, setFormData] = useState({
    internshipDomain: internPostData.employer_internship_post_domain,
  });

  const dispatch = useDispatch();
  const url = ApiURL();
  const [amountShow, setamountShow] = useState(true);
  const [negotiableAmount, setnegotiableAmount] = useState(false);
  const [performanceBased, setperformanceBased] = useState(false);
  const [showInternshipStartDate, setshowInternshipStartDate] = useState(false);
  const [selected, setSelected] = useState("Pending");
  const [internshipModuleType, setInternshipModuleType] = useState(
    internPostData.employer_internship_post_supervision_type
  );

  // for Domain
  const [selectedDomain, setSelectedDomain] = useState(() => {
    try {
      return JSON.parse(internPostData?.employer_internship_post_domain) || [];
    } catch (error) {
      console.error("Error parsing mentee_language:", error);
      return [];
    }
  });

  // Language change handler
  const handleDomainChange = (selectedOption) => {
    setSelectedDomain(typeof JSON.stringify(selectedOption));
    setValue("internshipDomain", selectedOption);
    setFormData((prev) => ({
      ...prev,
      internshipDomain: selectedOption,
    }));
  };

  const internshipSkills = JSON.parse(
    internPostData.employer_internship_post_skills
  );

  const [skillList, setSkillList] = useState(internshipSkills);
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
    if (skillList?.length >= 0) {
      setValue("internshipSkills", skillList);
    }
  }, [skillList]);

  const [supervisionType, setSupervisionType] = useState(internshipModuleType);
  // console.log("superviosonType", supervisionType);

  // Quill modules configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
  ];

  const timeslot = [
    "5:00PM",
    "6:00PM",
    "7:00PM",
    "8:00PM",
    "9:00PM",
    "10:00PM",
    "11:00PM",
    "6:00AM",
    "7:00AM",
    "8:00AM",
    "9:00AM",
    "10:00AM",
    "11:00AM",
  ];

  const HandleAmountShow = (e) => {
    let check = e.target.value; // Corrected "targert" to "target"
    if (check === "Unpaid") {
      setamountShow(false);
      setperformanceBased(false);
      setnegotiableAmount(false);
      clearErrors(["stipendAmount", "stipendAmountMax", "stipendAmountMin"]);
    } else if (check === "Negotiable") {
      setnegotiableAmount(true);
      setperformanceBased(false);
      setamountShow(false);
      clearErrors(["stipendAmount"]);
    } else if (check === "Performance-based") {
      setperformanceBased(true);
      setamountShow(false);
      setnegotiableAmount(false);
      clearErrors(["stipendAmount", "stipendAmountMax", "stipendAmountMin"]);
    } else if (check === "Fixed") {
      clearErrors(["stipendAmountMin", "stipendAmountMax"]);
      setamountShow(true);
      setperformanceBased(false);
      setnegotiableAmount(false);
    }
  };
  const HandleInternshipStartDate = (e) => {
    let INsatrt = e.target.value;
    if (INsatrt === "Later") {
      setshowInternshipStartDate(true);
    } else {
      setshowInternshipStartDate(false);
      clearErrors("internshipStart");
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      supervisionType,
    };
    try {
      dispatch(showLoadingHandler());
      const response = await axios.put(
        `${url}api/v1/employer/internship/edit-internship-post`,
        {
          payload: payload,
          internshipPostId: internshipPostId,
          employerUserDtlsId: user.user_id,
          internshipSkills: JSON.stringify(payload.internshipSkills),
          internshipPerks: JSON.stringify(payload.internshipPerks),
          employerOrgDtlsId: employerDetails[0]?.employer_organization_dtls_id,
          internshipDomain: formData?.internshipDomain,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      dispatch(hideLoadingHandler());
      if (response.status === 200) {
        toast.success("Internship post updated successfully");
        // redirecthere
      }
    } catch (error) {
      dispatch(hideLoadingHandler());
      toast.error("Failed to update internship post");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <div className="container">
            <div style={{ textAlign: "center" }} className="mb-4">
              <h2>Post Internship</h2>
            </div>

            <div className="postinternAling">
              <div className="toggle-container">
                <div
                  className={`toggle-button ${
                    supervisionType === "Self Manage" ? "active" : "inactive"
                  }`}
                  onClick={() => {
                    setSelected("Pending");
                    setSupervisionType("Self Manage");
                  }}
                  title="This is additional information that appears when you hover."
                >
                  Self Manage internship
                </div>
                <div
                  className={`toggle-button ${
                    supervisionType === "Guided" ? "active" : "inactive"
                  }`}
                  onClick={() => {
                    setSelected("Completed");
                    setSupervisionType("Guided");
                    setValue("internshipStipendType", "Fixed");
                    setamountShow(true);
                    setperformanceBased(false);
                    setnegotiableAmount(false);
                  }}
                  title="This is additional information that appears when you hover."
                >
                  Guided Internship
                </div>
              </div>
            </div>

            <div className="doiherner_wrapper">
              <div
                className="ihduwfr_form_wrapper p-0"
                style={{ height: "auto" }}
              >
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <label htmlFor="mentor_job_title" className="form-label">
                      <b>
                        Internship Position{" "}
                        <span className="RedColorStarMark">*</span>
                      </b>
                    </label>
                    <input
                      onKeyUp={() => {
                        trigger("internshipProfile");
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Specify the role (e.g., Software Development Intern)."
                      {...register("internshipProfile", {
                        required: "Please enter thr post ",
                      })}
                    />
                    {errors.internshipProfile && (
                      <p className="Error-meg-login-register">
                        {errors.internshipProfile.message}
                      </p>
                    )}
                  </div>

                  <div className="col-lg-6">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label mb-0"
                    >
                      <b>
                        Internship type
                        <span className="RedColorStarMark">*</span>
                      </b>
                    </label>
                    <div className="PostintershipTypecss">
                      <div className="dkjiherer moideuirer_list hello">
                        <ul className="ps-0 mb-0">
                          <li>
                            <input
                              onKeyUp={() => {
                                trigger("internshipType");
                              }}
                              type="radio"
                              id="check_11"
                              name="internshipType"
                              value="On Premises"
                              className="d-none"
                              {...register("internshipType", {
                                required: "Please select internship type",
                              })}
                            />
                            <label htmlFor="check_11">On Premises</label>
                          </li>
                          <li>
                            <input
                              onKeyUp={() => {
                                trigger("internshipType");
                              }}
                              type="radio"
                              id="check_20"
                              name="internshipType"
                              value="Hybrid"
                              className="d-none"
                              {...register("internshipType", {
                                required: "Please select internship type",
                              })}
                            />
                            <label htmlFor="check_20"> Hybrid</label>
                          </li>
                          <li>
                            <input
                              onKeyUp={() => {
                                trigger("internshipType");
                              }}
                              type="radio"
                              id="check_30"
                              name="internshipType"
                              value="Remote"
                              className="d-none"
                              {...register("internshipType", {
                                required: "Please select internship type",
                              })}
                            />
                            <label htmlFor="check_30">Remote</label>
                          </li>
                        </ul>
                      </div>
                      <div>
                        {errors.internshipType && (
                          <p
                            className="Error-meg-login-register"
                            style={{
                              top: errors.internshipType && "52px",
                            }}
                          >
                            {errors.internshipType.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-4">
                    <label htmlFor="mentor_company_name" className="form-label">
                      <b>
                        Number of opening{" "}
                        <span className="RedColorStarMark">*</span>
                      </b>
                    </label>
                    <input
                      onKeyUp={() => {
                        trigger("internshipOpening");
                      }}
                      type="number"
                      className="form-control"
                      placeholder="Example. 2"
                      {...register("internshipOpening", {
                        required: "Please enter the number of opening",
                      })}
                    />
                    {errors.internshipOpening && (
                      <p className="Error-meg-login-register">
                        {errors.internshipOpening.message}
                      </p>
                    )}
                  </div>
                  <div className="col-lg-6 mb-4">
                    <label htmlFor="mentor_domain" className="form-label mb-0">
                      <b>
                        Employment Type
                        <span className="RedColorStarMark">*</span>
                      </b>
                    </label>
                    <div className="dkjiherer moideuirer_list hello">
                      <ul className="ps-0 mb-0">
                        <li>
                          <input
                            onKeyUp={() => {
                              trigger("partFullTime");
                            }}
                            type="radio"
                            id="check_1"
                            name="partFullTime"
                            value="Part Time"
                            className="d-none"
                            {...register("partFullTime", {
                              required: "Please select ",
                            })}
                          />
                          <label htmlFor="check_1">Part Time</label>
                        </li>
                        <li>
                          <input
                            onKeyUp={() => {
                              trigger("partFullTime");
                            }}
                            type="radio"
                            id="check_2"
                            name="partFullTime"
                            value="Full Time"
                            className="d-none"
                            {...register("partFullTime", {
                              required: "Please select  ",
                            })}
                          />
                          <label htmlFor="check_2">Full Time</label>
                        </li>
                      </ul>
                    </div>
                    <div
                      style={{
                        position: errors.partFullTime ? "absolute" : "",
                      }}
                    >
                      {errors.partFullTime && (
                        <p
                          className="Error-meg-login-register"
                          style={{
                            position: errors.partFullTime && "relative",
                            top: errors.partFullTime && "52px",
                          }}
                        >
                          {errors.partFullTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <label htmlFor="mentor_company_name" className="form-label">
                      <b>
                        Working Hours
                        <span className="RedColorStarMark"></span>
                      </b>
                    </label>
                    <div className="dhjwwdk">
                      <select
                        className="form-select intershipWidth"
                        {...register("StartTimeFrom", {
                          required: "required",
                        })}
                      >
                        <option defaultValue="">start time</option>{" "}
                        {timeslot.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <span className="SpantopMagine">to</span>
                      <select
                        className="form-select intershipWidth"
                        {...register("endTimeTo", {
                          required: "required",
                        })} //1
                      >
                        <option defaultValue="">End time</option>{" "}
                        {timeslot.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        className="form-select"
                        // onChange={option_fro_timezone}
                        {...register("internshipPostTimezone", {
                          required: "required",
                        })} //1
                      >
                        <option
                          defaultValue={
                            "UTC+05:30: Indian Standard Time (IST), Sri Lanka Time (SLT)"
                          }
                        >
                          {" "}
                          UTC+05:30: Indian Standard Time (IST), Sri Lanka Time
                          (SLT)
                        </option>
                        {option_fro_timezone.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <label htmlFor="mentor_job_title" className="form-label">
                      <b>
                        Location
                        <span className="RedColorStarMark">*</span>
                      </b>
                    </label>
                    <input
                      onKeyUp={() => {
                        trigger("Internship_Location");
                      }}
                      type="text"
                      className="form-control"
                      placeholder=" Location..."
                      {...register("InternshipLocation", {
                        required: "Location  is required",
                        pattern: {
                          value: /^[a-zA-Z\s]+$/,
                          message: " please enter the valide location name",
                        },
                      })}
                    />
                    {errors.InternshipLocation && (
                      <p className="Error-meg-login-register">
                        {errors.InternshipLocation.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row ">
                  <div className="col-lg-6 mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      <b>
                        Internship Start Date
                        <span className="RedColorStarMark">*</span>
                      </b>
                    </label>{" "}
                    <div className="dkjiherer moideuirer_list hello">
                      <ul className="ps-0 mb-0">
                        <li>
                          <input
                            onKeyUp={() => {
                              trigger("internshipStart");
                            }}
                            type="radio"
                            id="check_internshipStart1"
                            defaultChecked
                            name="internshipStart"
                            onClick={HandleInternshipStartDate}
                            value=" Immediately"
                            className="d-none"
                            {...register("internshipStart", {
                              required:
                                "Please select your academic qualification",
                            })}
                          />
                          <label htmlFor="check_internshipStart1">
                            Immediately (within next 30 days)
                          </label>
                        </li>
                        <li>
                          <input
                            onKeyUp={() => {
                              trigger("internshipStart");
                            }}
                            type="radio"
                            id="check_internshipStart2"
                            onClick={HandleInternshipStartDate}
                            name="internshipStart"
                            value="Later"
                            className="d-none"
                            {...register("internshipStart", {
                              required:
                                "Please select your academic qualification",
                            })}
                          />

                          <label htmlFor="check_internshipStart2">Later</label>
                        </li>
                      </ul>
                      {showInternshipStartDate && (
                        <div className="dwdyjw">
                          {" "}
                          <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            className="form-control intershipPostdate"
                            {...register("internshipSatrtBy", {
                              required:
                                "Please select  internship starting date",
                            })}
                          />
                          {errors.internshipSatrtBy && (
                            <p className="Error-meg-login-register">
                              {errors.internshipSatrtBy.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      <b>
                        Internship Duration
                        <span className="RedColorStarMark">*</span>
                      </b>
                    </label>{" "}
                    <select
                      name=""
                      id=""
                      className="form-select"
                      {...register("internshipDuration", {
                        required: "Please select  internship Duration",
                      })}
                    >
                      <option value="">select duration of internship </option>
                      <option value="2">2 months</option>
                      <option value="3">3 months</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                    </select>
                    {errors.internshipDuration && (
                      <p className="Error-meg-login-register">
                        {errors.internshipDuration.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-lg-6 mb-4">
                  <label htmlFor="internshipDomain" className="form-label">
                    <b>
                      Internship Domain/Type{" "}
                      <span className="RedColorStarMark">*</span>
                    </b>
                  </label>
                  <Controller
                    name="internshipDomain"
                    control={control}
                    rules={{ required: "Please select an internship domain" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { value: "Engineering", label: "Engineering" },
                          { value: "Management", label: "Management" },
                          { value: "Marketing", label: "Marketing" },
                          { value: "Design", label: "Design" },
                          { value: "Sales", label: "Sales" },
                          {
                            value: "Human Resources",
                            label: "Human Resources",
                          },
                          { value: "Finance", label: "Finance" },
                          { value: "Operations", label: "Operations" },
                          { value: "Research", label: "Research" },
                          { value: "Other", label: "Other" },
                        ]}
                        value={selectedDomain}
                        onChange={handleDomainChange}
                        placeholder="Select Internship Domain"
                      />
                    )}
                  />
                  {errors.internshipDomain && (
                    <p className="Error-meg-login-register">
                      {errors.internshipDomain.message}
                    </p>
                  )}
                </div>

                <div
                  className="col-lg-12 mb-4"
                  style={{
                    position: "relative",
                  }}
                >
                  <label htmlFor="mentorJobTitle" className="form-label">
                    <b>
                      Skills Required
                      {/* <span className="RedColorStarMark">*</span> */}
                    </b>
                    {/* <i
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
  )} */}
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Type skills and press Enter"
                      value={skills}
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
                          // disabled={!isEditing}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      <b>Requirements</b>
                    </label>
                    <Controller
                      name="internshipRequirementsDeatils"
                      control={control}
                      rules={{
                        required: "Please enter the Requirements",
                        validate: (value) =>
                          value.trim() !== "<p><br></p>" ||
                          "Please enter the Requirements",
                      }}
                      render={({ field }) => (
                        <ReactQuill
                          theme="snow"
                          modules={quillModules}
                          formats={quillFormats}
                          {...field}
                          placeholder="Enter internship requirements..."
                          onChange={(content) => {
                            field.onChange(content);
                            trigger("internshipRequirementsDeatils");
                          }}
                        />
                      )}
                    />
                    {errors.internshipRequirementsDeatils && (
                      <p className="Error-meg-login-register">
                        {errors.internshipRequirementsDeatils.message}
                      </p>
                    )}
                  </div>

                  <div className="col-lg-6 mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      <b>Responsibilities for intern's</b>
                    </label>
                    <Controller
                      name="internshipResponsibilities"
                      control={control}
                      rules={{
                        required: "Please enter intern Responsibilities",
                        validate: (value) =>
                          value.trim() !== "<p><br></p>" ||
                          "Please enter intern Responsibilities",
                      }}
                      render={({ field }) => (
                        <ReactQuill
                          theme="snow"
                          modules={quillModules}
                          formats={quillFormats}
                          {...field}
                          placeholder="Enter internship responsibilities..."
                          onChange={(content) => {
                            field.onChange(content);
                            trigger("internshipResponsibilities");
                          }}
                        />
                      )}
                    />
                    {errors.internshipResponsibilities && (
                      <p className="Error-meg-login-register">
                        {errors.internshipResponsibilities.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="doiherner_wrapper">
                  <div
                    className="ihduwfr_form_wrapper p-0 d-flex"
                    style={{ height: "100%", flexWrap: "wrap" }}
                  >
                    <div className="col-lg-6 mb-4">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label mb-0"
                      >
                        <b>
                          Stipend Type
                          <span className="RedColorStarMark">*</span>
                        </b>
                      </label>
                      <div className="jkejd">
                        {" "}
                        <div className="dkjiherer moideuirer_list hello">
                          <ul className="ps-0 mb-0">
                            <li>
                              <input
                                onKeyUp={() => {
                                  trigger("internshipStipendType");
                                }}
                                type="radio"
                                id="internshipStipendType1"
                                name="internshipStipendType"
                                defaultChecked
                                value="Fixed"
                                onClick={HandleAmountShow}
                                className="d-none"
                                {...register("internshipStipendType", {
                                  required:
                                    "Please select your academic qualification",
                                })}
                              />
                              <label htmlFor="internshipStipendType1">
                                Fixed
                              </label>
                            </li>

                            {selected === "Pending" && (
                              <li>
                                <input
                                  onKeyUp={() => {
                                    trigger("internshipStipendType");
                                  }}
                                  type="radio"
                                  id="internshipStipendType2"
                                  name="internshipStipendType"
                                  value="Unpaid"
                                  onClick={HandleAmountShow}
                                  className="d-none"
                                  {...register("internshipStipendType", {
                                    required:
                                      "Please select your academic qualification",
                                  })}
                                />
                                <label htmlFor="internshipStipendType2">
                                  {" "}
                                  Unpaid
                                </label>
                              </li>
                            )}

                            {/* <li>
                              <input
                                onKeyUp={() => {
                                  trigger("internshipStipendType");
                                }}
                                type="radio"
                                id="internshipStipendType3"
                                name="internshipStipendType"
                                value="Performance-based"
                                onClick={HandleAmountShow}
                                className="d-none"
                                {...register("internshipStipendType", {
                                  required:
                                    "Please select your academic qualification",
                                })}
                              />
                              <label htmlFor="internshipStipendType3">
                                Performance based
                              </label>
                            </li>
                            <li>
                              <input
                                onKeyUp={() => {
                                  trigger("internshipStipendType");
                                }}
                                type="radio"
                                id="internshipStipendType4"
                                name="internshipStipendType"
                                value="Negotiable"
                                onClick={HandleAmountShow}
                                className="d-none"
                                {...register("internshipStipendType", {
                                  required:
                                    "Please select your academic qualification",
                                })}
                              />
                              <label htmlFor="internshipStipendType4">
                                Negotiable
                              </label>
                            </li> */}
                          </ul>
                        </div>
                        {amountShow && (
                          <div className="dwdyjw">
                            <select
                              className="form-select"
                              {...register("stipendCurrencyType")}
                            >
                              <option value="INR">INR</option>
                              <option value="USD">USD</option>
                              <option value="CAD">CAD</option>
                              <option value="GBP">GBP</option>
                              <option value="AUD">AUD</option>
                            </select>
                            <input
                              onKeyUp={() => {
                                trigger("stipendAmount");
                              }}
                              type="number"
                              className="form-control"
                              placeholder="Amount..."
                              {...register("stipendAmount", {
                                required: "Please enter the Amount",
                              })}
                            />

                            <select
                              className="form-select"
                              {...register("stipendTime")}
                            >
                              <option value="month">per month</option>
                              <option value="lump-sum">lump-sum</option>
                            </select>
                          </div>
                        )}
                        {performanceBased && (
                          <>
                            <div className="yehdggf">
                              <div>
                                Fixed amount{" "}
                                <span className="RedColorStarMark">*</span>
                              </div>
                              <div className="dwdyjw">
                                <select
                                  className="form-select"
                                  {...register("stipendCurrencyType")}
                                >
                                  <option value="INR">INR</option>
                                  <option value="USD">USD</option>
                                  <option value="CAD">CAD</option>
                                  <option value="GBP">GBP</option>
                                  <option value="AUD">AUD</option>
                                </select>
                                <input
                                  onKeyUp={() => {
                                    trigger("stipendAmount");
                                  }}
                                  type="number"
                                  className="form-control"
                                  placeholder="Amount..."
                                  {...register("stipendAmount", {
                                    required: "Please enter the Amount",
                                  })}
                                />

                                <select
                                  className="form-select"
                                  {...register("stipendTime")}
                                >
                                  <option value="per_month">per month</option>
                                  <option value="lump-sum">lump-sum</option>
                                </select>
                              </div>
                            </div>
                            <div className="yehdggf">
                              <div>
                                Incentive{" "}
                                <span className="RedColorStarMark">*</span>
                              </div>
                              <div className="dwdyjw">
                                {/* <select
                                  className="form-select"
                                  {...register("stipendCurrencyType")}
                                >
                                  <option value="INR">INR</option>
                                  <option value="USD">USD</option>
                                  <option value="CAD">CAD</option>
                                  <option value="GBP">GBP</option>
                                  <option value="AUD">AUD</option>
                                </select> */}
                                <input
                                  onKeyUp={() => {
                                    trigger("stipendAmount");
                                  }}
                                  type="number"
                                  className="form-control"
                                  placeholder="Amount..."
                                  {...register("stipendAmount", {
                                    required: "Please enter the Amount",
                                  })}
                                />

                                <select
                                  className="form-select"
                                  {...register("stipendTime")}
                                >
                                  <option value="per_month">per month</option>
                                  <option value="lump-sum">lump-sum</option>
                                </select>
                              </div>
                            </div>
                          </>
                        )}
                        {negotiableAmount && (
                          <div className="dwdyfdwjw">
                            <select
                              className="form-select"
                              {...register("stipendCurrencyType", {
                                required: "Job title is required",
                              })}
                            >
                              <option value="INR">INR</option>
                              <option value="USD">USD</option>
                              <option value="CAD">CAD</option>
                              <option value="GBP">GBP</option>
                              <option value="AUD">AUD</option>
                            </select>
                            <input
                              onKeyUp={() => {
                                trigger("stipendAmountMin");
                              }}
                              type="number"
                              className="form-control"
                              placeholder="Amount..."
                              {...register("stipendAmountMin", {
                                required: "Please enter minimum Amount",
                              })}
                            />
                            <span>to</span>
                            <input
                              onKeyUp={() => {
                                trigger("stipendAmountMax");
                              }}
                              type="number"
                              className="form-control"
                              placeholder="Amount..."
                              {...register("stipendAmountMax", {
                                required: "Please enter Maximun amount",
                              })}
                            />

                            <select
                              className="form-select"
                              {...register("stipendTime")}
                            >
                              <option value="per_month">per month</option>
                              <option value="lump-sum">lump-sum</option>
                            </select>
                          </div>
                        )}
                        <div>
                          {errors.stipendAmount && (
                            <p className="Error-meg-login-register">
                              {errors.stipendAmount.message}
                            </p>
                          )}
                        </div>
                        <div>
                          {errors.stipendAmountMin && (
                            <p className="Error-meg-login-register">
                              {errors.stipendAmountMin.message}
                            </p>
                          )}
                        </div>
                        <div>
                          {errors.stipendAmountMax && (
                            <p className="Error-meg-login-register">
                              {errors.stipendAmountMax.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          position: errors.academic_qualification
                            ? "absolute"
                            : "",
                        }}
                      >
                        {errors.academic_qualification && (
                          <p
                            className="Error-meg-login-register"
                            style={{
                              position:
                                errors.academic_qualification && "relative",
                              top: errors.academic_qualification && "52px",
                            }}
                          >
                            {errors.academic_qualification.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6 mb-4 postintern-perk ">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label mb-0"
                      >
                        <b>
                          Perks and Benefits
                          <span className="RedColorStarMark"></span>
                        </b>
                      </label>

                      <div className="dkjiherer moideuirer_list hello">
                        <ul className="ps-0 mb-0">
                          <li>
                            <input
                              onKeyUp={() => {
                                trigger("internshipPerks");
                              }}
                              type="checkbox"
                              id="internshipPerks1"
                              name="internshipPerks"
                              value="Certificate"
                              className="d-none"
                              {...register("internshipPerks", {
                                // required:
                                //   "Please select your academic qualification",
                              })}
                            />
                            <label htmlFor="internshipPerks1">
                              Certificate
                            </label>
                          </li>
                          <li>
                            <input
                              onKeyUp={() => {
                                trigger("internshipPerks");
                              }}
                              type="checkbox"
                              id="internshipPerks2"
                              name="internshipPerks"
                              value="Flexible work hours"
                              className="d-none"
                              {...register("internshipPerks", {
                                // required:
                                //   "Please select your academic qualification",
                              })}
                            />
                            <label htmlFor="internshipPerks2">
                              {" "}
                              Flexible work hours
                            </label>
                          </li>
                          <li>
                            <input
                              onKeyUp={() => {
                                trigger("internshipPerks");
                              }}
                              type="checkbox"
                              id="internshipPerks3"
                              name="internshipPerks"
                              value="5 days a week"
                              className="d-none"
                              {...register("internshipPerks", {
                                // required:
                                //   "Please select your academic qualification",
                              })}
                            />
                            <label htmlFor="internshipPerks3">
                              5 days a week
                            </label>
                          </li>
                          <li>
                            <input
                              onKeyUp={() => {
                                trigger("internshipPerks");
                              }}
                              type="checkbox"
                              id="internshipPerks4"
                              name="internshipPerks"
                              value=" Letter of recommendation"
                              className="d-none"
                              {...register("internshipPerks", {
                                // required:
                                //   "Please select your academic qualification",
                              })}
                            />
                            <label htmlFor="internshipPerks4">
                              Letter of recommendation
                            </label>
                          </li>
                          <li>
                            <input
                              onKeyUp={() => {
                                trigger("internshipPerks");
                              }}
                              type="checkbox"
                              id="internshipPerks5"
                              name="internshipPerks"
                              value="Informal dress code"
                              className="d-none"
                              {...register("internshipPerks", {
                                // required:
                                //   "Please select your academic qualification",
                              })}
                            />
                            <label htmlFor="internshipPerks5">
                              Informal dress code
                            </label>
                          </li>
                          <li>
                            <input
                              onKeyUp={() => {
                                trigger("internshipPerks");
                              }}
                              type="checkbox"
                              id="internshipPerks6"
                              name="internshipPerks"
                              value=" Free snacks & beverages"
                              className="d-none"
                              {...register("internshipPerks", {
                                // required:
                                //   "Please select your academic qualification",
                              })}
                            />
                            <label htmlFor="internshipPerks6">
                              {" "}
                              Free snacks & beverages
                            </label>
                          </li>
                        </ul>
                      </div>
                      {/* <div
                        style={{
                          position: errors.academic_qualification
                            ? "absolute"
                            : "",
                        }}
                      >
                        {errors.academic_qualification && (
                          <p
                            className="Error-meg-login-register"
                            style={{
                              position:
                                errors.academic_qualification && "relative",
                              top: errors.academic_qualification && "52px",
                            }}
                          >
                            {errors.academic_qualification.message}
                          </p>
                        )}
                      </div> */}
                    </div>
                    <div className="thdyefbfe mb-4">
                      <h5>
                        this internship offers a pre-placement offer (PPO) based
                        on performance.
                      </h5>{" "}
                      <input
                        type="checkbox"
                        className="internshipCheckBox"
                        {...register("internshipPPOcheckbox")}
                      />
                    </div>
                  </div>
                </div>
                <p className="internal-description">
                  This section is for internal company planning and will not be
                  visible on the public job posting
                </p>
                <div className="form-container">
                  <div className="form-group">
                    <label className="form-label">
                      Select the task category applicable to this internship
                      role:
                    </label>
                    <select
                      className={`form-select ${
                        errors.taskCategory ? "error-input" : ""
                      }`}
                      {...register("taskCategory", {
                        // required: "Please select a task category",
                      })}
                      onKeyUp={() => trigger("taskCategory")}
                    >
                      <option value="">Select task category</option>
                      <option value="project">Project</option>
                      <option value="daily-operations">Daily Operations</option>
                      <option value="ceos-office">CEO's Office</option>
                      <option value="field-work">Field-work</option>
                      <option value="to-be-planned">To be planned</option>
                    </select>
                    {errors.taskCategory && (
                      <span className="error-message">
                        {errors.taskCategory.message}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      What is the expected business objective?
                    </label>
                    <select
                      className={`form-select ${
                        errors.businessObjective ? "error-input" : ""
                      }`}
                      {...register("businessObjective", {
                        // required: "Please select a business objective",
                      })}
                      onKeyUp={() => trigger("businessObjective")}
                    >
                      <option value="">Select business objective</option>
                      <option value="expedite-project">
                        Expedite The Project
                      </option>
                      <option value="process-improvement">
                        Process Improvement
                      </option>
                      <option value="revenue-generation">
                        Revenue Generation
                      </option>
                      <option value="sales">Sales</option>
                    </select>
                    {errors.businessObjective && (
                      <span className="error-message">
                        {errors.businessObjective.message}
                      </span>
                    )}
                  </div>

                  {/* <div className="form-group">
                    <label className="form-label">
                      Do you have a project plan in place?
                    </label>
                    <textarea
                      className={`form-textarea ${
                        errors.projectPlan ? "error-input" : ""
                      }`}
                      {...register("projectPlan", {
                        minLength: {
                          value: 50,
                          message:
                            "Project plan should be at least 50 characters long",
                        },
                      })}
                      onKeyUp={() => trigger("projectPlan")}
                      placeholder="Please enter the project plan"
                    />
                    {errors.projectPlan && (
                      <span className="error-message">
                        {errors.projectPlan.message}
                      </span>
                    )}
                  </div> */}
                  <div className="form-group">
                    <label htmlFor="projectPlan" className="form-label">
                      Do you have a project plan in place?
                    </label>
                    <select
                      id="projectPlan"
                      className="form-select"
                      {...register("projectPlan")}
                    >
                      <option value="">Select an option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="doiherner_wrapper ">
              <div
                className=" p-0 d-flex"
                style={{ height: "100px", flexWrap: "wrap" }}
              >
                <div className="bjuerirr_btn diuher  mt-4 htbjsjg">
                  <button
                    type="submit"
                    className="btn juybeubrer_btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditInternshipPost;
