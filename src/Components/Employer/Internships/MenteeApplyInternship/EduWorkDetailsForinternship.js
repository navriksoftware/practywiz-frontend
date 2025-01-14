import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import collegeData from "../../../data/collegesname.json";
import Select from "react-select";
import { skills } from "../../../data/Additionalquestion.js";
import "./MenteeProfileEduWorkExpDetails.css";
import { useNavigate } from "react-router-dom";
import "./MenteeInternshipApply.css";
import Navabar2 from "../../../Navbar/Navabar2.js";
const EduWorkDetailsForinternship = () => {
  const storedData = localStorage.getItem("menteeData2");
  const menteeData = JSON?.parse(storedData);
  const handleEditClick = () => {
    setIfEdit(!ifEdit);
  };

  const [ifEdit, setIfEdit] = useState(false);
  const [Edutype, setEdutype] = useState("");

  const [formData, setFormData] = useState({
    mentee_EduLevel: "college",
    collage_name: "",
    mentee_courseName: "",
    mentee_institute_Percentage: "",
    mentee_institute_Start_Year: "",
    mentee_institute_End_Year: "",

    mentee_Skills: "",

    certificates: "",
  });

  const handleSavechanges = async (event) => {
    console.log("Updated Education type", Edutype);
    console.log("Updated skills type", selectedSkills);
    console.log("Updated Education Data:", inputList);
    console.log("Updated Certificate Data:", CertificationList);
    console.log("Updated Work exp Data:", WorkExpList);
    console.log("Updated additional details:", additionalText);
  };

  const currentYear = new Date().getFullYear(); // Get the current year
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // Generate array of last 10 years
  const yearsForEnd = Array.from({ length: 16 }, (_, i) => currentYear + 5 - i);
  // ---------------------------------------------------------------------------------------------------
  // const [inputList, setInputList] = useState(getInitialInputList("college"));

  // const [searchTerm, setSearchTerm] = useState();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  // Filter colleges based on the search term
  // const filteredColleges = collegeData.filter((item) =>
  //   item["College Name"]?.toLowerCase().includes(searchTerm?.toLowerCase())
  // );
  const [inputList, setInputList] = useState(
    menteeData?.education || [
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

  function getInitialInputList(type) {
    return [
      {
        educationType: type, // Initialize each item with the selected type
      },
    ];
  }

  const handleClearCollege = (index) => {
    const list = [...inputList];
    list[index].collage_name = ""; // Clear the college name for this entry
    list[index].searchTerm = ""; // Reset the search term for this entry
    setInputList(list);
  };
  const handleAddClick = () => {
    if (inputList.length < 3) {
      setInputList([
        ...inputList,
        {
          educationType: "college",
          collage_name: "",
          mentee_courseName: "",
          mentee_institute_Percentage: "",
          mentee_institute_Start_Year: "",
          mentee_institute_End_Year: "",
          searchTerm: "", // Initialize search term for new entry
        },
      ]);
    }
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1); // Remove the specified entry
    setInputList(list);
  };

  const handleEduChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value; // Update the specific field in the entry
    setInputList(list);
  };

  const handleOptionClick = (college, index) => {
    const list = [...inputList];
    list[index].collage_name = college["College Name"]; // Set the selected college name
    console.log(college["College Name"]);
    console.log("hello");
    list[index].searchTerm = " "; // Clear search term after selection
    setInputList(list);
    setOpenDropdownIndex(null); // Close dropdown after selection
  };

  const handleSearchChange = (e, index) => {
    const list = [...inputList];
    list[index].searchTerm = e.target.value; // Update search term for this specific entry
    setInputList(list);
    setOpenDropdownIndex(index); // Open dropdown for the current entry
  };

  const handleEducationTypeChange = (type, index) => {
    const list = [...inputList];
    list[index].educationType = type; // Update the selected type per index
    setInputList(list);
  };

  // --------------------------------------------------------------------------------------------------
  const [CertificationList, setCertificationList] = useState(
    menteeData?.certificates || [
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
    menteeData?.workExperience || [
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
    menteeData?.additionalDetails || [
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

  // State to store the selected values
  const [selectedSkills, setSelectedSkills] = useState(
    menteeData?.skills || []
  );

  // Handle the change event to update the state
  const handleChange = (selectedOption) => {
    setSelectedSkills(selectedOption);
  };

  const [newMenteeData, setnewMenteeData] = useState({});

  const navigate = useNavigate();

  const handlenextpage = () => {
    const updatedData = {
      educationType: Edutype,
      skills: selectedSkills,
      education: inputList,
      certificates: CertificationList,
      workExperience: WorkExpList,
      additionalDetails: additionalText,
    };

    // Update the state with updated data
    setnewMenteeData(updatedData);

    // Save the updated data to local storage
    localStorage.setItem("menteeData2", JSON.stringify(updatedData));

    // Log the updated data immediately
    console.log(updatedData);

    // Navigate to the next page
    navigate("/MenteeApplyInternship");
  };

  const handlebackpage = () => {
    navigate(-1);
  };
  return (
    <>
      <Navabar2 />
      <div className="Edudetails_ApplyInterns">
        {" "}
        <div className="col-lg-10 ps-0">
          <div className="">
            <div className="container">
              <div className="col-lg-10 col-md-12">
                <div className="mentee-prf-settings py-5">
                  <div>
                    <div className="menteeSkills">
                      <div className="ufguirniirtr position-relative mb-4">
                        <label htmlFor="" className="form-label">
                          <h2>Skills</h2>
                        </label>

                        <Select
                          options={skills}
                          isMulti={true}
                          closeMenuOnSelect={false}
                          onChange={handleChange} // Handle the onChange event
                          value={selectedSkills} // Bind the state to the value
                        />
                      </div>
                    </div>
                    <div className="pb-3" id="skill-tag">
                      <div>
                        {inputList.map((x, i) => (
                          <div key={i}>
                            <label htmlFor="" className="form-label">
                              <h2> Education details {i + 1}</h2>
                            </label>{" "}
                            <div className="form-control tag43763" key={i}>
                              <div className="education-type-selection tag3678">
                                <label>
                                  <input
                                    type="radio"
                                    name={`educationType-${i}`} // Unique name per index
                                    value="college"
                                    checked={x.educationType === "college"}
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
                                          className="form-control h-38px"
                                          placeholder="Search for a college..."
                                          onChange={(e) =>
                                            handleEduChange(e, i)
                                          }
                                          value={x.collage_name}
                                          // onChange={(e) =>
                                          //   handleSearchChange(e, i)
                                          // }
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
                                        onClick={() => handleClearCollege(i)}
                                      >
                                        Clear
                                      </button>
                                    )} */}
                                        {/* Filtered colleges based on the specific search term */}
                                        {/* {openDropdownIndex === i &&
                                      x.searchTerm && (
                                        <div className="dropdown-content">
                                          {collegeData
                                            .filter((item) =>
                                              item["College Name"]
                                                ?.toLowerCase()
                                                .includes(
                                                  x.searchTerm.toLowerCase()
                                                )
                                            )
                                            .slice(0, 10)
                                            .map((college, index) => (
                                              <div
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleOptionClick(
                                                    college,
                                                    i
                                                  )
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
                                        className="form-control"
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
                                        className="form-control "
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
                                            onChange={(e) =>
                                              handleEduChange(e, i)
                                            }
                                            name="mentee_institute_Start_Year"
                                          >
                                            <option
                                              defaultValue={
                                                x.mentee_institute_Start_Year
                                              }
                                            >
                                              {x.mentee_institute_Start_Year}
                                            </option>
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
                                            name="mentee_institute_End_Year"
                                            onChange={(e) =>
                                              handleEduChange(e, i)
                                            }
                                          >
                                            <option
                                              defaultValue={
                                                x.mentee_institute_End_Year
                                              }
                                            >
                                              {x.mentee_institute_End_Year}
                                            </option>
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
                                        name="school_name"
                                        className="form-control "
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
                                            name="schoolBoard"
                                            className="form-control"
                                            placeholder="Enter School Board"
                                            value={x.schoolBoard}
                                            onChange={(e) =>
                                              handleEduChange(e, i)
                                            }
                                          />
                                        </div>{" "}
                                        <div className="col-lg-6">
                                          <h5 className="ml-1">Class</h5>
                                          <select
                                            className="form-select "
                                            onChange={(e) =>
                                              handleEduChange(e, i)
                                            }
                                            name="schoolClass"
                                          >
                                            {x.schoolClass ? (
                                              <option
                                                defaultValue={x.schoolClass}
                                              >
                                                {x.schoolClass}
                                              </option>
                                            ) : (
                                              <option value="">
                                                Select Class
                                              </option>
                                            )}

                                            <option value="10">
                                              10th Class
                                            </option>
                                            <option value="12">
                                              12th Class
                                            </option>
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
                                        name="school_Percentage"
                                        className="form-select "
                                        placeholder="Percentage %"
                                        value={x.school_Percentage}
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
                                            onChange={(e) =>
                                              handleEduChange(e, i)
                                            }
                                            name="schoolStartYear"
                                          >
                                            <option
                                              defaultValue={x.schoolStartYear}
                                            >
                                              {x.schoolStartYear}
                                            </option>
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
                                            name="schoolEndYear"
                                            onChange={(e) =>
                                              handleEduChange(e, i)
                                            }
                                          >
                                            <option
                                              defaultValue={x.schoolEndYear}
                                            >
                                              {x.schoolEndYear}
                                            </option>
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
                            <span onClick={handleAddClick}>
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
                            <h2> Work Experience Details {i + 1}</h2>
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
                                  className="form-control"
                                  placeholder="Eg., Business Analyst, Data Scientist..."
                                  value={x.mentee_workexp_CompanyName}
                                  onChange={(e) => handleWorkExpChange(e, i)}
                                />
                              </div>
                              <div className="col-lg-6">
                                <h5>Role </h5>
                                <input
                                  name="mentee_workexp_Role"
                                  className="form-control"
                                  placeholder="Eg., Business Analyst, Data Scientist..."
                                  value={x.mentee_workexp_Role}
                                  onChange={(e) => handleWorkExpChange(e, i)}
                                />
                              </div>
                            </div>
                            <div className="position-relative col-lg-12 pb-3 mt-1">
                              <label htmlFor="" className="form-label">
                                Description
                              </label>

                              <textarea
                                name="mentee_workexp_Desc"
                                className="form-control"
                                style={{ height: "80px" }}
                                placeholder="Write something about the Work Experience"
                                value={x.mentee_workexp_Desc}
                                onChange={(e) => handleWorkExpChange(e, i)}
                              ></textarea>
                            </div>

                            <div className="row">
                              <div className="col-lg-6 mt-2 ">
                                <h5 className="ml-1">Location</h5>
                                <input
                                  type="type"
                                  name="mentee_workexp_Location"
                                  className="form-control"
                                  value={x.mentee_workexp_Location}
                                  onChange={(e) => handleWorkExpChange(e, i)}
                                />
                              </div>
                              <div className="col-lg-6 mt-2 ">
                                <div className="row">
                                  <div className="col-lg-6 tag26636">
                                    <h5 className="ml-1">Start Date</h5>

                                    <select
                                      name="mentee_workexp_Start_Year"
                                      value={x.mentee_workexp_Start_Year}
                                      onChange={(e) =>
                                        handleWorkExpChange(e, i)
                                      }
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
                                      onChange={(e) =>
                                        handleWorkExpChange(e, i)
                                      }
                                      className="form-select "
                                    >
                                      <option value="">Select Year</option>
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
                              <h2> Certificate {i + 1}</h2>
                            </label>
                            <div className="form-control tag43763">
                              {CertificationList.length > 1 && (
                                <span
                                  className="tag928"
                                  onClick={() =>
                                    handleCertificateRemoveClick(i)
                                  }
                                >
                                  <i class="fa-regular fa-trash-can"></i>
                                </span>
                              )}
                              <div className="row">
                                <div className="col-lg-6">
                                  <h5> Certificate Name </h5>
                                  <input
                                    className="form-control"
                                    name="mentee_Certificate_Name"
                                    value={x.mentee_Certificate_Name}
                                    onChange={(e) =>
                                      handleCertificateChange(e, i)
                                    }
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
                                    className="form-select"
                                    value={x.mentee_Certificate_level}
                                    onChange={(e) =>
                                      handleCertificateChange(e, i)
                                    }

                                    // onChange={(e) =>
                                    //   handleInputChangeForCertificate(index, e)
                                    // }
                                  >
                                    <option value="">Select Level</option>
                                    <option value="Entry-Level">
                                      Entry-Level
                                    </option>
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
                                  className="form-control"
                                  onChange={(e) =>
                                    handleCertificateChange(e, i)
                                  }
                                  style={{ height: "60px" }}
                                  placeholder="Write something about the certificate"
                                  value={x.mentee_Certificate_Desc}
                                  // onChange={(e) =>
                                  //   handleInputChangeForCertificate(index, e)
                                  // }
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
                                      className="form-select "
                                    >
                                      <option value="">Select Year</option>
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
                            <h2> Additional Details {i + 1}</h2>
                          </label>
                          <div className="form-control tag43763 mt-2">
                            {additionalText.length > 1 && (
                              <span
                                className="tag928"
                                onClick={() =>
                                  handleadditionlTextRemoveClick(i)
                                }
                              >
                                <i class="fa-regular fa-trash-can"></i>
                              </span>
                            )}
                            <div className="tag2456">
                              <input
                                type="text"
                                value={x.additionalHeadline}
                                name="additionalHeadline"
                                className="form-control"
                                placeholder="Add Headline"
                                onChange={(e) =>
                                  handleadditionlTextChange(e, i)
                                }
                              />

                              <textarea
                                name="additionalDec"
                                value={x.additionalDec}
                                className="form-control mt-2"
                                style={{ height: "150px" }}
                                placeholder="Write something about the related to headline"
                                onChange={(e) =>
                                  handleadditionlTextChange(e, i)
                                }
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

              <div className="d-flex justify-content-between m-4">
                <button
                  type="button"
                  onClick={handlebackpage}
                  className="btn juybeubrer_btn btn-primary"
                >
                  Back
                </button>
                <button
                  onClick={handlenextpage}
                  type="button"
                  className="btn juybeubrer_btn btn-primary"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EduWorkDetailsForinternship;
