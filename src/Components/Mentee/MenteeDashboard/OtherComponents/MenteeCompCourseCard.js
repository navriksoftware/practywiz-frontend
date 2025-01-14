import React from "react";
import Vb1 from "../../../../Images/Mentee/vb1.png";
const MenteeCompCourseCard = () => {
  return (
    <div className="col-lg-4">
      <div className="drhuydgfth">
        <div className="jgfg">
          <img src={Vb1} alt="" />
        </div>
        <div className="ngdfhgfdg">
          <span className="spn55">ALL LEVELS</span>
          <h4>Jumpstart To It Business Analyst</h4>
          <p>
            {" "}
            <span className="span121">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </span>
            <span className="spn12">(5.0/3 Rating)</span>
          </p>
          <h3>$39</h3>
          <div className="kjhgdfgfd">
            <span>
              <p>
                <i className="fa-solid fa-layer-group"></i> 11 Lessons
              </p>
            </span>
            <p className="pl-3">
              <i className="fa-solid fa-user"></i> 107 Students
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeCompCourseCard;
