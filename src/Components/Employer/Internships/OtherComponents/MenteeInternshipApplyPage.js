// import React from "react";
// import "../InternshipCss/MenteeInternshipApplyPage.css";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// const MenteeInternshipApplyPage = () => {
//   const singleMentee = useSelector((state) => state.mentee.singleMentee[0]);
//   console.log(singleMentee);

//   const navigate = useNavigate();
//   const handlenextpage = () => {

//     toast.success("Data Base not connected ");
//     window.close();
//     navigate("/mentee/dashboard")
//   };

//   const handlebackpage = () => {
//     navigate(-1);
//   };

//   return (
//     <>
//       <div className="resume">
//         <div className="tag3847">
//           {" "}
//           <h1>
//             {singleMentee?.mentee_firstname} {singleMentee?.mentee_lastname}
//           </h1>
//           <p>
//             {singleMentee?.mentee_email} | {singleMentee?.mentee_phone_number} |
//             {/* {singleMentee.address} */}
//           </p>
//         </div>
//         <div>
//           {" "}
//           <h2>Education</h2>
//           <ul>
//             {singleMentee.education?.map((edu, index) => (
//               <li key={index} className="education">
//                 {edu.educationType === "college" ? (
//                   <>
//                     <strong>{edu?.collage_name}</strong> (
//                     {edu?.mentee_institute_Start_Year} -{" "}
//                     {edu?.mentee_institute_End_Year})
//                     <div className="Internapplypage-row">
//                       <p>{edu.mentee_courseName}</p>
//                       <p>Percentage: {edu?.mentee_institute_Percentage}%</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <strong>{edu?.school_name}</strong> ({edu?.schoolStartYear}{" "}
//                     - {edu?.schoolEndYear})
//                     <div className="Internapplypage-row">
//                       <p> {edu?.schoolBoard}</p>
//                       <p>Percentage: {edu?.school_Percentage}%</p>
//                     </div>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//           <h2>Skills</h2>
//           <ul className="skills">
//             {singleMentee?.skills?.map((skill, index) => (
//               <li key={index} className="skill">
//                 {skill?.label}
//               </li>
//             ))}
//           </ul>
//           <h2>Certificates</h2>
//           <ul>
//             {singleMentee.certificates?.map((certificate, index) => (
//               <li key={index} className="certificate">
//                 <strong>{certificate?.mentee_Certificate_Name}</strong> (
//                 {certificate?.mentee_Certificate_Start_Year} -{" "}
//                 {certificate?.mentee_Certificate_End_Year})
//                 <p>Level: {certificate?.mentee_Certificate_level}</p>
//                 <p>{certificate?.mentee_Certificate_Desc}</p>
//               </li>
//             ))}
//           </ul>
//           <h2>Work Experience</h2>
//           <ul>
//             {singleMentee.workExperience?.map((job, index) => (
//               <li key={index} className="work-experience">
//                 <strong>{job?.mentee_workexp_Role}</strong> at{" "}
//                 {job?.mentee_workexp_CompanyName} -{" "}
//                 {job?.mentee_workexp_Location}
//                 <span>
//                   ({job?.mentee_workexp_Start_Year} -{" "}
//                   {job?.mentee_workexp_End_Year})
//                 </span>
//                 <p>{job?.mentee_workexp_Desc}</p>
//               </li>
//             ))}
//           </ul>
//           <ul>
//             {singleMentee.additionalDetails?.map((Additional, index) => (
//               <li key={index} className="work-experience">
//                 <h2> {Additional?.additionalHeadline}</h2>
//                 <p>{Additional?.additionalDec}</p>
//               </li>
//             ))}
//           </ul>
//           <h2>Language</h2>
//           <ul className="skills">
//             {singleMentee.mentee_language?.map((language, index) => (
//               <li key={index} className="skill">
//                 {language?.label}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="d-flex justify-content-between m-4">
//           <button
//             type="button"
//             onClick={handlebackpage}
//             className="btn juybeubrer_btn btn-primary"
//           >
//             Back
//           </button>
//           <button
//             onClick={handlenextpage}
//             type="button"
//             className="btn juybeubrer_btn btn-primary"
//           >
//             Apply
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MenteeInternshipApplyPage;

import React from "react";
import "../InternshipCss/MenteeInternshipApplyPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MenteeInternshipApplyPage = () => {
  // Parse the stringified JSON data
  const singleMentee = useSelector((state) => {
    const menteeData = state.mentee.singleMentee[0];
    return {
      ...menteeData,
      education: JSON.parse(menteeData.mentee_institute_details || "[]"),
      skills: JSON.parse(menteeData.mentee_skills || "[]").map((skill) => ({
        label: skill,
      })),
      certificates: JSON.parse(menteeData.mentee_certificate_details || "[]"),
      workExperience: JSON.parse(menteeData.mentee_experience_details || "[]"),
      additionalDetails: JSON.parse(
        menteeData.mentee_additional_details || "[]"
      ),
      mentee_language: JSON.parse(menteeData.mentee_language || "[]"),
    };
  });

  const navigate = useNavigate();

  const handlenextpage = () => {
    toast.success("Data Base not connected ");
    window.close();
    navigate("/mentee/dashboard");
  };

  const handlebackpage = () => {
    navigate(-1);
  };

  console.log("Parsed Mentee Data:", singleMentee);

  return (
    <>
      <div className="resume">
        <div className="tag3847">
          <h1>
            {singleMentee?.mentee_firstname} {singleMentee?.mentee_lastname}
          </h1>
          <p>
            {singleMentee?.mentee_email} | {singleMentee?.mentee_phone_number}
          </p>
        </div>
        <div>
          <h2>Education</h2>
          <ul>
            {singleMentee.education?.map((edu, index) => (
              <li key={index} className="education">
                {edu.educationType === "college" ? (
                  <>
                    <strong>
                      {edu?.collage_name || edu?.mentee_instituteName}
                    </strong>{" "}
                    ({edu?.mentee_institute_Start_Year} -{" "}
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
            {singleMentee.skills?.map((skill, index) => (
              <li key={index} className="skill">
                {skill?.label || skill}
              </li>
            ))}
          </ul>

          <h2>Certificates</h2>
          <ul>
            {singleMentee.certificates?.map((certificate, index) => (
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
            {singleMentee.workExperience?.map((job, index) => (
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
            {singleMentee.additionalDetails?.map((Additional, index) => (
              <li key={index} className="work-experience">
                <h2>{Additional?.additionalHeadline}</h2>
                <p>{Additional?.additionalDec}</p>
              </li>
            ))}
          </ul>

          <h2>Language</h2>
          <ul className="skills">
            {singleMentee.mentee_language?.map((language, index) => (
              <li key={index} className="skill">
                {language?.label || language}
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
