import React from "react";
import "../InternshipCss/SingleApplicantProfile.css";

const data = {
  applicant_Twitter_link: null,
  applicant_aboutyouself:
    "I am a software engineer with 5 years of experience in web development. I have worked on various projects in React.js and Node.js, focusing on building scalable and user-friendly applications.",
  applicant_email: "gaganv958@gmail.com",
  applicant_firstname: "Gagan",
  applicant_gender: "Male",
  applicant_instagram_link: null,
  applicant_language: "English",
  applicant_lastname: "Verma",
  applicant_linkedin_link: "https://www.linkedin.com/in/gagancodee/",
  applicant_phone_number: "911212121212",
  applicant_profile_photo:
    "https://practiwizstorage.blob.core.windows.net/practiwizcontainer/blue-circle-with-white-user_78370-4707.webp",
  education: [
    {
      collage_name: "Indira Gandhi Degree College",
      educationType: "college",
      applicant_courseName: "MCA",
      applicant_institute_End_Year: "2024",
      applicant_institute_Percentage: "80",
      applicant_institute_Start_Year: "2023",
    },
    {
      collage_name: "Abhinav Institute of Management & Technology",
      educationType: "college",
      applicant_courseName: "BCA",
      applicant_institute_End_Year: "2022",
      applicant_institute_Percentage: "61",
      applicant_institute_Start_Year: "2019",
    },
    {
      educationType: "school",
      schoolBoard: "CBSE",
      schoolClass: "12",
      schoolEndYear: "2019",
      schoolStartYear: "2018",
      school_Percentage: "64",
      school_name: "SGtb khalsa Boys School Dev nagar",
    },
  ],
  certificates: [
    {
      applicant_Certificate_Desc: "React js development project-based learning",
      applicant_Certificate_End_Year: "2024",
      applicant_Certificate_Name: "React js",
      applicant_Certificate_Start_Year: "2022",
      applicant_Certificate_level: "Intermediate",
    },
  ],
  workExperience: [
    {
      applicant_workexp_CompanyName: "Navrik Software Solution",
      applicant_workexp_Desc:
        "Contributed to the frontend development of an education platform using React.js, focusing on building responsive and user-friendly interfaces.",
      applicant_workexp_End_Year: "2029",
      applicant_workexp_Location: "New Delhi",
      applicant_workexp_Role: "Software Engineer",
      applicant_workexp_Start_Year: "2024",
    },
    {
      applicant_workexp_CompanyName: "Home Tutor",
      applicant_workexp_Desc: "I like to teach Maths & Science",
      applicant_workexp_End_Year: "2024",
      applicant_workexp_Location: "New Delhi",
      applicant_workexp_Role: "Maths and Science Tutor",
      applicant_workexp_Start_Year: "2019",
    },
  ],
  additionalDetails: [
    {
      additionalDec:
        "I built the academic project titled 'Quick Shop' for e-commerce, focusing on a responsive shopping experience.",
      additionalHeadline: "Project",
    },
    {
      additionalDec:
        "Worked on various academic and personal projects in web development.",
      additionalHeadline: "Personal Projects",
    },
  ],
  skills: ["React.js", "Node.js", "JavaScript", "HTML", "CSS"],
};

const ApplicantProfile = () => {
  const formatDate = (year) => {
    if (!year) return "";
    return new Date(year).getFullYear();
  };

  const SectionHeader = ({ icon, children }) => (
    <div className="applicant-section-header">
      <i className={`fa-solid ${icon} applicant-section-icon`}></i>
      {children}
    </div>
  );

  const hasValidData = (array) => {
    return Array.isArray(array) && array.length > 0;
  };

  return (
    <div className="applicant-profile-container">
      <header className="applicant-header">
        <div className="applicant-header-content">
          <div className="applicant-header-wrapper">
            {data.applicant_profile_photo && (
              <div className="applicant-profile-image-container">
                <img
                  src={data.applicant_profile_photo}
                  alt={`${data.applicant_firstname} ${data.applicant_lastname}`}
                  className="applicant-profile-image"
                />
                <div className="applicant-online-status"></div>
              </div>
            )}

            <div className="applicant-info-container">
              {(data.applicant_firstname || data.applicant_lastname) && (
                <h1 className="applicant-name">
                  {[data.applicant_firstname, data.applicant_lastname]
                    .filter(Boolean)
                    .join(" ")}
                </h1>
              )}

              {data.workExperience?.[0]?.applicant_workexp_Role && (
                <p className="applicant-role">
                  {data.workExperience[0].applicant_workexp_Role}
                </p>
              )}

              {data.workExperience?.[0]?.applicant_workexp_Location && (
                <p className="applicant-location">
                  <i className="fa-solid fa-building"></i>
                  {data.workExperience[0].applicant_workexp_Location}
                </p>
              )}

              <div className="applicant-contact-info">
                {data.applicant_email && (
                  <a
                    href={`mailto:${data.applicant_email}`}
                    className="applicant-contact-link"
                  >
                    <i className="fa-solid fa-envelope"></i>
                    <span>{data.applicant_email}</span>
                  </a>
                )}

                {data.applicant_phone_number && (
                  <a
                    href={`tel:${data.applicant_phone_number}`}
                    className="applicant-contact-link"
                  >
                    <i className="fa-solid fa-phone"></i>
                    <span>{data.applicant_phone_number}</span>
                  </a>
                )}

                {data.applicant_linkedin_link && (
                  <a
                    href={data.applicant_linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="applicant-contact-link applicant-linkedin-link"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            <div className="applicant-action-buttons">
              <button className="applicant-button applicant-button-primary">
                <i className="fa-solid fa-user-check"></i>
                Shortlist
              </button>
              <button className="applicant-button applicant-button-secondary">
                <i className="fa-solid fa-download"></i>
                Download CV
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="applicant-main-content">
        <div className="applicant-grid-container">
          <div>
            {data.applicant_aboutyouself && (
              <section className="applicant-section">
                <SectionHeader icon="fa-user">About</SectionHeader>
                <p className="applicant-about-text">
                  {data.applicant_aboutyouself}
                </p>
              </section>
            )}

            {hasValidData(data.education) && (
              <section className="applicant-section">
                <SectionHeader icon="fa-graduation-cap">
                  Education
                </SectionHeader>
                <div>
                  {data.education.map((edu, index) => (
                    <div key={index} className="applicant-education-item">
                      {(edu.applicant_courseName || edu.schoolClass) && (
                        <h3 className="applicant-education-title">
                          {edu.applicant_courseName ||
                            `Class ${edu.schoolClass}`}
                        </h3>
                      )}
                      {(edu.collage_name || edu.school_name) && (
                        <p className="applicant-education-institute">
                          {edu.collage_name || edu.school_name}
                        </p>
                      )}
                      <div className="applicant-education-details">
                        {(edu.applicant_institute_Start_Year ||
                          edu.schoolStartYear ||
                          edu.applicant_institute_End_Year ||
                          edu.schoolEndYear) && (
                          <span>
                            {edu.applicant_institute_Start_Year ||
                              edu.schoolStartYear}{" "}
                            -{" "}
                            {edu.applicant_institute_End_Year ||
                              edu.schoolEndYear}
                          </span>
                        )}
                        {(edu.applicant_institute_Percentage ||
                          edu.school_Percentage) && (
                          <span>
                            {edu.applicant_institute_Percentage ||
                              edu.school_Percentage}
                            %
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {hasValidData(data.workExperience) && (
              <section className="applicant-section">
                <SectionHeader icon="fa-building">
                  Work Experience
                </SectionHeader>
                <div>
                  {data.workExperience.map((work, index) => (
                    <div key={index} className="applicant-experience-item">
                      <div className="applicant-experience-header">
                        {work.applicant_workexp_Role && (
                          <h3 className="applicant-experience-role">
                            {work.applicant_workexp_Role}
                          </h3>
                        )}
                        {work.applicant_workexp_CompanyName && (
                          <p className="applicant-experience-company">
                            {work.applicant_workexp_CompanyName}
                          </p>
                        )}
                      </div>
                      {(work.applicant_workexp_Start_Year ||
                        work.applicant_workexp_End_Year) && (
                        <span className="applicant-experience-date">
                          {formatDate(work.applicant_workexp_Start_Year)} -{" "}
                          {formatDate(work.applicant_workexp_End_Year)}
                        </span>
                      )}
                      {work.applicant_workexp_Desc && (
                        <p className="applicant-experience-description">
                          {work.applicant_workexp_Desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {hasValidData(data.additionalDetails) && (
              <section className="applicant-section">
                <SectionHeader icon="fa-award">
                  Additional Details
                </SectionHeader>
                <div>
                  {data.additionalDetails.map((detail, index) => (
                    <div key={index} className="applicant-experience-item">
                      {detail.additionalHeadline && (
                        <h3 className="applicant-experience-role">
                          {detail.additionalHeadline}
                        </h3>
                      )}
                      {detail.additionalDec && (
                        <p className="applicant-experience-description">
                          {detail.additionalDec}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div>
            {hasValidData(data.skills) && (
              <section className="applicant-section">
                <SectionHeader icon="fa-code">Skills</SectionHeader>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="applicant-skill">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {hasValidData(data.certificates) && (
              <section className="applicant-section">
                <SectionHeader icon="fa-award">Certifications</SectionHeader>
                <div>
                  {data.certificates.map((cert, index) => (
                    <div key={index} className="applicant-education-item">
                      {cert.applicant_Certificate_Name && (
                        <h3 className="applicant-education-title">
                          {cert.applicant_Certificate_Name}
                        </h3>
                      )}
                      {cert.applicant_Certificate_Desc && (
                        <p className="applicant-education-description">
                          {cert.applicant_Certificate_Desc}
                        </p>
                      )}
                      <div className="applicant-education-details">
                        {(cert.applicant_Certificate_Start_Year ||
                          cert.applicant_Certificate_End_Year) && (
                          <span>
                            {cert.applicant_Certificate_Start_Year} -{" "}
                            {cert.applicant_Certificate_End_Year}
                          </span>
                        )}
                        {cert.applicant_Certificate_level && (
                          <span className="applicant-certificate-level">
                            {cert.applicant_Certificate_level}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(data.applicant_gender || data.applicant_language) && (
              <section className="applicant-section">
                <SectionHeader icon="fa-user">
                  Personal Information
                </SectionHeader>
                <div>
                  {data.applicant_gender && (
                    <div className="applicant-personal-info-item">
                      <span className="applicant-personal-info-label">
                        Gender
                      </span>
                      <span className="applicant-personal-info-value">
                        {data.applicant_gender}
                      </span>
                    </div>
                  )}
                  {data.applicant_language && (
                    <div className="applicant-personal-info-item">
                      <span className="applicant-personal-info-label">
                        Language
                      </span>
                      <span className="applicant-personal-info-value">
                        {data.applicant_language}
                      </span>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicantProfile;
