import React from "react";
import "../InternshipCss/MenteeInternshipApplyPage.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MenteeInternshipApplyPage = () => {
  const storedData = localStorage.getItem("menteeData1");
  const otherdata = localStorage.getItem("menteeData2");
  const menteeData = JSON.parse(storedData);
  const menteeDataEduDetails = JSON.parse(otherdata);

  const navigate = useNavigate();
  const handlenextpage = () => {
    localStorage.removeItem("menteeData1");
    localStorage.removeItem("menteeData2");
    toast.success("Data Base not connected ");
    window.close();
    // navigate("/mentee/dashboard")
  };

  const handlebackpage = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="resume">
        <div className="tag3847">
          {" "}
          <h1>
            {menteeData?.mentee_firstname} {menteeData?.mentee_lastname}
          </h1>
          <p>
            {menteeData?.mentee_email} | {menteeData?.mentee_phone_number} |
            {/* {menteeData.address} */}
          </p>
        </div>
        <div>
          {" "}
          <h2>Education</h2>
          <ul>
            {menteeDataEduDetails.education?.map((edu, index) => (
              <li key={index} className="education">
                {edu.educationType === "college" ? (
                  <>
                    <strong>{edu?.collage_name}</strong> (
                    {edu?.mentee_institute_Start_Year} -{" "}
                    {edu?.mentee_institute_End_Year})
                    <div className="Internapplypage-row">
                      <p>{edu.mentee_courseName}</p>
                      <p>Percentage: {edu?.mentee_institute_Percentage}%</p>
                    </div>
                  </>
                ) : (
                  <>
                    <strong>{edu?.school_name}</strong> ({edu?.schoolStartYear}{" "}
                    - {edu?.schoolEndYear})
                    <div className="Internapplypage-row">
                      <p> {edu?.schoolBoard}</p>
                      <p>Percentage: {edu?.school_Percentage}%</p>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          <h2>Skills</h2>
          <ul className="skills">
            {menteeDataEduDetails?.skills?.map((skill, index) => (
              <li key={index} className="skill">
                {skill?.label}
              </li>
            ))}
          </ul>
          <h2>Certificates</h2>
          <ul>
            {menteeDataEduDetails.certificates?.map((certificate, index) => (
              <li key={index} className="certificate">
                <strong>{certificate?.mentee_Certificate_Name}</strong> (
                {certificate?.mentee_Certificate_Start_Year} -{" "}
                {certificate?.mentee_Certificate_End_Year})
                <p>Level: {certificate?.mentee_Certificate_level}</p>
                <p>{certificate?.mentee_Certificate_Desc}</p>
              </li>
            ))}
          </ul>
          <h2>Work Experience</h2>
          <ul>
            {menteeDataEduDetails.workExperience?.map((job, index) => (
              <li key={index} className="work-experience">
                <strong>{job?.mentee_workexp_Role}</strong> at{" "}
                {job?.mentee_workexp_CompanyName} -{" "}
                {job?.mentee_workexp_Location}
                <span>
                  ({job?.mentee_workexp_Start_Year} -{" "}
                  {job?.mentee_workexp_End_Year})
                </span>
                <p>{job?.mentee_workexp_Desc}</p>
              </li>
            ))}
          </ul>
          <ul>
            {menteeDataEduDetails.additionalDetails?.map(
              (Additional, index) => (
                <li key={index} className="work-experience">
                  <h2> {Additional?.additionalHeadline}</h2>
                  <p>{Additional?.additionalDec}</p>
                </li>
              )
            )}
          </ul>
          <h2>Language</h2>
          <ul className="skills">
            {menteeData.mentee_language?.map((language, index) => (
              <li key={index} className="skill">
                {language?.label}
              </li>
            ))}
          </ul>
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
            Apply
          </button>
        </div>
      </div>
    </>
  );
};

export default MenteeInternshipApplyPage;
