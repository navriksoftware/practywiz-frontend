import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import GoToTop from "../../../../Utils/GoToTop";
import CoreSkill from "../../../data/CoreSkill.json";
import PassionSkill from "../../../data/PassionSkills.json";
import { toast } from "react-toastify";
const MentorForm2 = () => {
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
  } = useFormContext();
  const [statefordata, setstatefordata] = useState();
  // setValue("ForSkillValidation","No")
  const [items, setItems] = useState(PassionSkill);
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    setTimeout(() => {
      e.target.classList.add("hide");
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("hide");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropInContainer = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    setItems(
      items.map((item) => (item.id === id ? { ...item, inside: true } : item))
    );
    updateFormData1();
  };

  const handleDropOutside = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    setItems(
      items.map((item) => (item.id === id ? { ...item, inside: false } : item))
    );
    updateFormData1();
  };

  const handleDelete = (id) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, inside: false } : item))
    );
    updateFormData1();
  };
  const updateFormData1 = () => {
    setValue("passionate_about", items);
  };

  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedSubOptions, setSelectedSubOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleExpertiseChange = (e) => {
    const expertiseId = parseInt(e.target.value);
    const expertise = CoreSkill.find((item) => item.id === expertiseId);
    if (expertise) {
      setSelectedExpertise((prev) =>
        prev.includes(expertise)
          ? prev.filter((item) => item.id !== expertiseId)
          : [...prev, expertise]
      );
      updateFormData();
    }
  };

  const handleSubOptionChange = (subOptionId) => {
    const subOption = selectedExpertise
      .flatMap((exp) => exp.sub_options)
      .find((option) => option.id === subOptionId);

    if (subOption) {
      setSelectedSubOptions((prev) =>
        prev.includes(subOption)
          ? prev.filter((item) => item.id !== subOptionId)
          : [...prev, subOption]
      );
      updateFormData();
    }
  };

  const handleSkillChange = (skillId) => {
    const skill = selectedSubOptions
      .flatMap((subOption) => subOption.skills)
      .find((s) => s.id === skillId);

    if (skill) {
      setSelectedSkills((prev) =>
        prev.includes(skill)
          ? prev.filter((item) => item.id !== skillId)
          : [...prev, skill]
      );
      updateFormData();
    }
  };

  const [error, setError] = useState(""); // State to store error messages
  const updateFormData = () => {
    const selectedData = {
      expertise: selectedExpertise.map((exp) => ({
        id: exp.id,
        name: exp.name,
        subOptions: exp.sub_options
          .filter((sub) => selectedSubOptions.includes(sub))
          .map((sub) => ({
            id: sub.id,
            name: sub.name,
            skills: sub.skills.filter((skill) =>
              selectedSkills.includes(skill)
            ),
          })),
      })),
    };
    setstatefordata(selectedData);

    // setValue("Core_Skills", selectedData);
  };

  const handleDeleteExpertise = (expertiseToDelete) => {
    setSelectedExpertise(
      selectedExpertise.filter(
        (expertise) => expertise.id !== expertiseToDelete.id
      )
    );
    setSelectedSubOptions([]); // Clear sub-options when expertise is removed
    setSelectedSkills([]); // Clear skills when expertise is removed
    updateFormData();
  };

  const handleDeleteSubOption = (subOptionToDelete) => {
    setSelectedSubOptions(
      selectedSubOptions.filter(
        (subOption) => subOption.id !== subOptionToDelete.id
      )
    );
    setSelectedSkills(
      selectedSkills.filter(
        (skill) => skill.subOptionId !== subOptionToDelete.id
      )
    ); // Clear skills associated with the removed sub-option
    updateFormData();
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill.id !== skillToDelete.id)
    );
    updateFormData();
  };

  const handleSave = () => {
    // Clear any previous errors
    setError("");

    // Validation: Check if at least one Core Skill is selected
    if (selectedExpertise.length === 0) {
      setError("Please select at least one Core Skill.");
      return;
    }

    // Validation: Check if for every selected Core Skill, at least one Sub-option is selected
    const coreSkillsWithoutSubOptions = selectedExpertise.filter((exp) => {
      const subOptionsForExp = exp.sub_options.filter((subOption) =>
        selectedSubOptions.includes(subOption)
      );
      return subOptionsForExp.length === 0; // Return true if no sub-options are selected for this core skill
    });

    if (coreSkillsWithoutSubOptions.length > 0) {
      setError(
        "Please select at least one Sub-option for each selected Core Skill."
      );
      return;
    }

    // Check if for each selected Sub-option, at least one Skill is selected
    const subOptionsWithoutSkills = selectedSubOptions.filter((subOption) => {
      const skillsForSubOption = subOption.skills.filter((skill) =>
        selectedSkills.includes(skill)
      );
      return skillsForSubOption.length === 0; // Return true if no skills are selected for this sub-option
    });

    if (subOptionsWithoutSkills.length > 0) {
      setError(
        "Please select at least one Skill for each selected Sub-option."
      );
      return;
    }

    toast.success("😊 Success! Your Field Saved.", {
      position: "top-right", // Directly specifying the position
    });

    // console.log(statefordata);
    setValue("Core_Skills", statefordata);
    setValue("ForSkillValidation", "ok");
  };

  return (
    <>
      <div className="doiherner_wrapper">
        <div className="ihduwfr_form_wrapper p-0" style={{ height: "auto" }}>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <label htmlFor="mentor_job_title" className="form-label">
                <b>
                  Your Job Title <span className="RedColorStarMark">*</span>
                </b>
              </label>
              <input
                onKeyUp={() => {
                  trigger("mentor_job_title");
                }}
                type="text"
                className="form-control"
                placeholder="Type Your Job Title....."
                {...register("mentor_job_title", {
                  required: "Job title is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Job Title should contain only letters",
                  },
                })}
              />
              {errors.mentor_job_title && (
                <p className="Error-meg-login-register">
                  {errors.mentor_job_title.message}
                </p>
              )}
            </div>

            <div className="col-lg-6 mb-4">
              <label htmlFor="years_of_experience" className="form-label">
                <b>
                  Years of Experience{" "}
                  <span className="RedColorStarMark">*</span>
                </b>
              </label>
              <input
                onKeyUp={() => {
                  trigger("years_of_experience");
                }}
                type="number"
                className="form-control"
                placeholder="Your Experience"
                {...register("years_of_experience", {
                  required: "Years of Experience is required",
                  min: {
                    value: 5,
                    message: "Minimum experience should be 5 years",
                  },
                  max: {
                    value: 99,
                    message: "Maximum experience should be 99 years",
                  },
                })}
              />

              {errors.years_of_experience && (
                <p className="Error-meg-login-register">
                  {errors.years_of_experience.message}
                </p>
              )}
            </div>

            <div className="col-lg-6 mb-4">
              <label htmlFor="mentor_domain" className="form-label">
                <b>
                  Domain <span className="RedColorStarMark">*</span>
                </b>
              </label>
              <input
                onKeyUp={() => {
                  trigger("Mentor_Domain");
                }}
                type="text"
                className="form-control"
                placeholder="Eg:Banking, Manufacturing, IT, Telecom...."
                {...register("Mentor_Domain", {
                  required: "Your Domain is required",
                  minLength: { value: 2 },
                })}
              />
              {errors.Mentor_Domain && (
                <p className="Error-meg-login-register">
                  {errors.Mentor_Domain.message}
                </p>
              )}
            </div>

            <div className="col-lg-6 mb-4">
              <label htmlFor="mentor_company_name" className="form-label">
                <b>
                  Company <span className="RedColorStarMark">*</span>
                </b>
              </label>
              <input
                onKeyUp={() => {
                  trigger("mentor_company_name");
                }}
                type="text"
                className="form-control"
                placeholder="Type Your Company/Freelancer Name"
                {...register("mentor_company_name", {
                  required: "Company name is required",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Company Name should contain only letters",
                  },
                })}
              />
              {errors.mentor_company_name && (
                <p className="Error-meg-login-register">
                  {errors.mentor_company_name.message}
                </p>
              )}
            </div>

            <div className="col-lg-6 mb-4">
              <label htmlFor="core_skill" className="form-label">
                <b>
                  Core Skill <span className="RedColorStarMark">*</span>
                </b>
              </label>
              {selectedExpertise.length > 0 && (
                <div className="Optionshow">
                  {selectedExpertise.map((expertise) => (
                    <span key={expertise.id} className="optionbox">
                      {expertise.name}
                      <button
                        onClick={() => handleDeleteExpertise(expertise)}
                        className="optionDispaly"
                      >
                        <span className="OptionCross">&#10006;</span>
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <select
                required
                onChange={handleExpertiseChange}
                defaultValue=""
                className="form-select"
              >
                <option value="" disabled>
                  Select an Area
                </option>
                {CoreSkill.map((expertise) => (
                  <option key={expertise.id} value={expertise.id}>
                    {expertise.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-lg-6 mb-4">
              <label htmlFor="sub_options" className="form-label">
                <b>
                  Sub-options: <span className="RedColorStarMark">*</span>
                </b>
              </label>
              {selectedSubOptions.length > 0 && (
                <div className="Optionshow">
                  {selectedSubOptions.map((subOption) => (
                    <span key={subOption.id} className="optionbox">
                      {subOption.name}
                      <button
                        onClick={() => handleDeleteSubOption(subOption)}
                        className="optionDispaly"
                      >
                        <span className="OptionCross">&#10006;</span>
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <select
                onChange={(e) =>
                  handleSubOptionChange(parseInt(e.target.value))
                }
                defaultValue=""
                className="form-select"
                disabled={selectedExpertise.length === 0}
              >
                <option value="" disabled>
                  {selectedExpertise.length === 0
                    ? "Select an Area of Expertise first"
                    : "Select a Sub-option"}
                </option>
                {selectedExpertise
                  .flatMap((exp) => exp.sub_options)
                  .map((subOption) => (
                    <option key={subOption.id} value={subOption.id}>
                      {subOption.name}
                    </option>
                  ))}
              </select>
            </div>

            {selectedSubOptions.length > 0 && (
              <div className="row">
                <label htmlFor="exampleInputEmail1" className="form-label mb-0">
                  <b>
                    Areas of Expertise{" "}
                    <span className="RedColorStarMark">*</span>
                  </b>
                </label>
                <div className="col-lg-12 mb-4 moideuirer_list areaofint">
                  <ul className="ps-0 mb-0">
                    {selectedSubOptions
                      .flatMap((subOption) => subOption.skills)
                      .map((skill) => (
                        <li key={skill.id}>
                          <input
                            type="checkbox"
                            id={`skill-${skill.id}`}
                            checked={selectedSkills.includes(skill)}
                            onChange={() => handleSkillChange(skill.id)}
                          />
                          <label htmlFor={`skill-${skill.id}`}>
                            {skill.name}
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-primary djssjbfe"
                    onClick={handleSave}
                  >
                    Save data
                  </button>
                </div>
              </div>
            )}
            {error && <p className="text-danger">{error}</p>}

            <div className="row align-items-center">
              <div className="col-lg-6 mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <b>Passionate About!</b> (Select max of 4 options)
                </label>
                <div
                  type=""
                  id="container"
                  className="bg-white"
                  onDragOver={handleDragOver}
                  onDrop={handleDropInContainer}
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "200px",
                  }}
                >
                  {items
                    .filter((item) => item.inside)
                    .map((item) => (
                      <div
                        key={item.id}
                        id={item.id}
                        className="draggable inside"
                        // className="draggable"
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        onDragEnd={handleDragEnd}
                      >
                        {item.inside && (
                          <span
                            className="close-btn"
                            onClick={() => handleDelete(item.id)}
                          >
                            &times;
                          </span>
                        )}
                        {item.text}
                      </div>
                    ))}
                </div>

                <p className=" mb-0 ghhduenee">
                  (*Drag and drop the most suitable option in the box*)
                </p>
              </div>

              <div
                className="col-lg-6 mb-4"
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  height: "200px",
                }}
              >
                <div
                  id="outside-container"
                  onDragOver={handleDragOver}
                  onDrop={handleDropOutside}
                >
                  {items
                    .filter((item) => !item.inside)
                    .map((item) => (
                      <div
                        key={item.id}
                        id={item.id}
                        className="draggable"
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        onDragEnd={handleDragEnd}
                      >
                        {item.text}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="col-lg-12 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>
                  Your Recommended Area of Mentorship{" "}
                  <span className="RedColorStarMark">*</span>
                </b>
              </label>{" "}
              <input
                onKeyUp={() => {
                  trigger("recommended_area_of_mentorship");
                }}
                type="text"
                className="form-control"
                // id="exampleInputEmail1"
                placeholder="Eg:I will give the mentorship about the react development, communication skills, and resume building"
                aria-describedby="emailHelp"
                {...register("recommended_area_of_mentorship", {
                  required: "Your area of mentorship is required",
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
              {errors.recommended_area_of_mentorship && (
                <p className="Error-meg-login-register">
                  {errors.recommended_area_of_mentorship.message}
                </p>
              )}
            </div>
            <div className="col-lg-12 mb-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <b>Your Super Power</b>
              </label>
              <textarea
                onKeyUp={() => {
                  trigger("mentor_Headline");
                }}
                className="form-control"
                placeholder="My superpower is problem-solving. I excel at breaking down complex challenges into manageable steps and finding innovative solutions, whether it's troubleshooting technical issues or resolving conflicts in a team."
                style={{ height: "100px" }}
                {...register("mentor_Headline", {
                  minLength: {
                    value: 100,
                    message: "Must be greater than 150 characters.",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Must be less than 250 characters.",
                  },
                })}
              ></textarea>

              <p className=" mb-0 ghhduenee">
                (*Give a good headline, This help us to understand the mentor
                overview*)
              </p>
              {errors.mentor_Headline && (
                <p className="Error-meg-login-register">
                  {errors.mentor_Headline.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <GoToTop />
      </div>
    </>
  );
};

export default MentorForm2;
