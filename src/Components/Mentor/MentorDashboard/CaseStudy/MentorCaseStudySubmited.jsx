import React from "react";

const MentorCaseStudySubmited = ({ user, token, data }) => {
  return (
    <div className="submitted-case-container">
      <h3>Your submitted case Studies</h3>
      {data[0].case_studies_list !== null &&
        JSON.parse(data[0].case_studies_list).map((case_study) => {
          return <p>{case_study.case_study_dtls_topic_category}</p>;
        })}
    </div>
  );
};

export default MentorCaseStudySubmited;
