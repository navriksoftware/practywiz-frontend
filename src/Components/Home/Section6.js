import React from "react";
import Amy from "../../Images/Home/amy-hirschi-K0c8ko3e6AA-unsplash.jpg";
import "./Home.css";
const Section6 = () => {
  return (
    <>
      <div className="section6 section-hor-gap pb-5">
        <div className="container py-5">
          <div className="hjgvydfgfmiddle">
            <div className="jnhfgj">
              <div className="diherrr_content text-center mt-4">
                <h3>News & Blogs</h3>
              </div>

              <h2 className="mb-0 mt-4">Read Our Latest News & Blogs</h2>
            </div>

            <div className="duiherer_iuopjerr mt-5">
              <div className="row">
                <div className="col-lg-4 mb-4">
                  <div className="iduherr_box bg-white">
                    <img src={Amy} alt="amy" style={{ width: "100%" }} />

                    <div className="deirorner_content p-3">
                      <div className="csdghkeetr d-flex align-items-center">
                        <i className="fa-regular fa-clock me-2"></i>

                        <p className="mb-0">20 Feb, 2024</p>
                      </div>

                      <h4 className="my-3">
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                      </h4>

                      <p>
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum
                      </p>

                      <button className="btn btn-main px-0">
                        Read More{" "}
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 mb-4">
                  <div className="iduherr_box bg-white">
                    <img src={Amy} alt="amy" style={{ width: "100%" }} />

                    <div className="deirorner_content p-3">
                      <div className="csdghkeetr d-flex align-items-center">
                        <i className="fa-regular fa-clock me-2"></i>

                        <p className="mb-0">20 Feb, 2024</p>
                      </div>

                      <h4 className="my-3">
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                      </h4>

                      <p>
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum
                      </p>

                      <button className="btn btn-main px-0">
                        Read More{" "}
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 mb-4">
                  <div className="iduherr_box bg-white">
                    <img src={Amy} alt="amy" style={{ width: "100%" }} />

                    <div className="deirorner_content p-3">
                      <div className="csdghkeetr d-flex align-items-center">
                        <i className="fa-regular fa-clock me-2"></i>

                        <p className="mb-0">20 Feb, 2024</p>
                      </div>

                      <h4 className="my-3">
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                      </h4>

                      <p>
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum
                      </p>

                      <button className="btn btn-main px-0">
                        Read More
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="btn btn-main mt-4">View All Blogs</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section6;
