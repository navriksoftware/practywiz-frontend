import React from "react";
import D21 from "../../Images/Courses/download (21).webp";
const JobCard = () => {
  return (
    <div className="col-lg-12 mb-4">
      <div className="kjdhhjgd p-3">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12 mb-4">
            <div className="hjgfdfg">
              <img src={D21} alt="" />
            </div>
          </div>

          <div className="col-lg-9 col-md-9 col-sm-12 ps-lg-0 ps-sm-2">
            <div className="kfhgjfgfh mb-2 d-flex align-items-center justify-content-between">
              <div className="jhgjgf">
                <h4 className="mb-0">Sr. PHP Developer</h4>
              </div>

              <div className="jhgjgf1">
                <div className="mhgf position-relative text-center">
                  <i className="fa-regular fa-bookmark position-absolute"></i>
                </div>
              </div>
            </div>

            <div className="nfhjdfghfdghf mb-3">
              <button className="rlknjhgjfg ps-0 btn btn-transparent">
                <p className="mb-0">
                  <i className="fa-solid fa-location-arrow me-1"></i>{" "}
                  Newtown,kolkata
                </p>
              </button>

              <button className="rlknjhgjfg ps-0 btn btn-transparent">
                <p className="mb-0">
                  <i className="fa-solid fa-sack-dollar me-1"></i> $24k-$30k
                </p>
              </button>

              <button className="rlknjhgjfg ps-0 btn btn-transparent">
                <p className="mb-0">
                  <i className="fa-solid fa-bag-shopping me-1"></i> 4yr. Exp.
                </p>
              </button>

              <button className="rlknjhgjfg1 oidefrgtry px-2 py-1">
                Full Time
              </button>
            </div>

            <div className="hjgfjgfgf">
              <button>PHP</button>

              <button>Java</button>

              <button>Magento</button>

              <button>Laravel</button>

              <button>Photoshop</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
