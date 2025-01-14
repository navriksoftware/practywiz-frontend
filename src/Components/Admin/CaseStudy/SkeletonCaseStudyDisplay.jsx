import React from "react";
import Skeleton from "react-loading-skeleton";
import "./AdminCaseStudyDisplay.css";

function SkeletonCaseStudyDisplay(count) {
  const style = {
    width: "75%",
    margin: "30px auto",
    height: "50%",
  };
  return (
    <>
      <div className="case-study-card" style={style}>
        <h2>
          <Skeleton width={"40%"} height={40} />
        </h2>
        <hr style={{ border: "1px solid #000000" }} />
        <p>
          <Skeleton width={"60%"} height={20} />
        </p>
        <p>
          <Skeleton width={"70%"} height={20} />
        </p>
        <p>
          <Skeleton width={"80%"} height={20} />
        </p>
        <div>
          <Skeleton width={"20%"} height={40} />

          <ul>
            <li>
              <Skeleton width={"10%"} height={20} />
            </li>
            <li>
              <Skeleton width={"20%"} height={20} />
            </li>
            <li>
              <Skeleton width={"30%"} height={20} />
            </li>
          </ul>
        </div>
        <p>
          <Skeleton width={"100%"} height={20} />
        </p>
        <p>
          <Skeleton width={"100%"} height={20} />
        </p>
        <Skeleton className="read-more-btn" width={120} height={50} />
      </div>
    </>
  );
}

export default SkeletonCaseStudyDisplay;
