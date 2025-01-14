import React from "react";
import Skeleton from "react-loading-skeleton";
import "swiper/css";
import "swiper/css/navigation";
import "./Home.css";

function SkeletonOfSection2() {
  return (
    <>
      <div style={{ width: "400px", height: "500px", margin: "0px 20px" }}>
        <div className="item">
          <div className="iheroijr_inner bg-white text-center overflow-hidden position-relative">
            <div className="diegrher overflow-hidden">
              <br />
              <Skeleton circle={true} width={240} height={300} />
            </div>
            <div className="doiuher_content">
              <h4 className="mb-0">
                <Skeleton width={150} height={35} />
              </h4>
              <p className="profession">
                <Skeleton width={250} height={25} />
              </p>
              <p className="rating mb-0">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonOfSection2;
