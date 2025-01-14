import React from "react";
import MenteeCompCourseCard from "./MenteeCompCourseCard";

const MenteeCompletedCourses = () => {
  return (
    <>
      <div className="col-lg-10 ps-0">
        <div className="difuhtre_content">
          <div className="flkhgjfgf">
            <div className="fgfdg">
              <h2>Your Completed Courses</h2>
            </div>
            <div className="row">
              <MenteeCompCourseCard />
              <MenteeCompCourseCard /> <MenteeCompCourseCard />{" "}
              <MenteeCompCourseCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteeCompletedCourses;
