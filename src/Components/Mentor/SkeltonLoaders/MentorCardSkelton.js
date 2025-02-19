import React from "react";
import "./SkeltonLoadingStyles.css";
const MentorCardSkelton = () => {
  return (
    <>
      <div className="mentorDiv " style={{ width: "250px" }}>
        <div className="mentorDownDiv">
          <div className="mentorImage skeleton"
          style={{ width: "50%", marginTop: "12px" }}>
            
            
            </div>
          <h3
            className="mentorName skeleton"
            style={{ width: "50%", margin: "10px auto" }}
          >
            <div className="skelton-text"></div>
          </h3>
          <div
            className="mentorDescP skeleton"
            style={{ width: "80%", margin: "0 auto 10px auto" }}
          >
            <div className="skelton-text"></div>
          </div>
          <div
            className="mentorDescP skeleton"
            style={{ width: "40%", margin: "0 auto 10px auto" }}
          >
            <div className="skelton-text"></div>
          </div>
          <div
            className="mentorDescP skeleton"
            style={{ width: "50%", margin: "0 auto 10px auto" }}
          >
            <div className="skelton-text"></div>
          </div>
          <div className="bookNowButtonDiv">
            <div
              className="mentorName skeleton"
              style={{ width: "50%", margin: "auto" }}
            >
              <div className="skelton-text"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorCardSkelton;
