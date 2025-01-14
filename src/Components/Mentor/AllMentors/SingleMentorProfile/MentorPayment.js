import React from "react";
import "./paymentmentor.css";

import Payment from "../../../../Images/Courses/vb4.jpg";
import Paypal from "../../../../Images/Courses/paypal1.png";
import Stripe from "../../../../Images/Courses/stripe1.png";
import MasterCard from "../../../../Images/Courses/MasterCard_Logo.svg.png";
import Visa from "../../../../Images/Courses/visa1.png";
const MentorPayment = () => {
  return (
    <>
      <div className="gnhvgfdfgfdgfd">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="gdfzghfghgfh">
                <div className="gdfgfg">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="fhghfg">
                        <img src="./images/qqq1.webp" alt="qqq1" />
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="nhjvfgfg">
                        <div className="ghvfvdfgg">
                          <div className="gjnjfghg">
                            <h2>Tarun Gautam</h2>
                          </div>
                        </div>

                        <div className="hfuydfgftgh">
                          <div className="gjfhg">
                            <img src="./images/ee1.png" alt="sa" />
                          </div>
                          <p>Business Analyst</p>
                        </div>

                        <div className="hfuydfgftgh">
                          <div className="gjfhg">
                            <img src="./images/ee2.png" alt="" />
                          </div>
                          <div className="fdjdfg">
                            <p>
                              {" "}
                              <span className="span121">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                              </span>
                              <span>(3 Reviews)</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fbghdfgdfg">
                  <h3>Skills</h3>
                  <div className="fhfbfghg">
                    <button>Decision-Making</button>
                    <button>Communication</button>
                    <button>Adaptability</button>
                    <button>Emotional Intelligence</button>
                    <button>Critical and Analytical Thinking</button>
                  </div>
                </div>

                <div className="dfbdfgfdf">
                  <h4>Work Experience</h4>

                  <div className="ndfhjgdfrgdfgfd">
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="njhfd2">
                          <img src="./images/kom1.png" alt="" />
                        </div>
                      </div>
                      <div className="col-lg-9">
                        <div className="lfjguifhgftgh">
                          <h6>Product Supply Manager</h6>
                          <span>
                            <p>Wipro Technologies</p>
                          </span>
                          <p>2021 - present</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="gnhdfgfdgf sticky-top">
                <div className="kgfd">
                  <h4>Payment</h4>
                </div>
                <div className="fgjffghfg">
                  <h6>Select Payment Method</h6>
                  <div className="nghjfbgfgf">
                    <label className="img-btn">
                      <input type="radio" name="country-flags" checked />
                      <img src={Paypal} alt="Paypal" />
                    </label>

                    <label className="img-btn">
                      <input type="radio" name="country-flags" />
                      <img src={Stripe} alt="Stripe" />
                    </label>

                    <label className="img-btn">
                      <input type="radio" name="country-flags" />
                      <img src={MasterCard} alt="Master Card" />
                    </label>

                    <label className="img-btn">
                      <input type="radio" name="country-flags" />
                      <img src={Visa} alt="Visa" />
                    </label>
                  </div>
                  <div className="gjggfhfgh">
                    <form action="">
                      <div className="gjdfhu545">
                        <label for="">Card Holder Name</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Arain Malitya"
                        />
                      </div>
                    </form>

                    <div className="dfkjghjdffg">
                      <h6>Subtotal</h6>
                      <p>16000</p>
                    </div>
                    <div className="dfkjghjdffg mt-2">
                      <h6>Tax</h6>
                      <p>16000</p>
                    </div>
                    <hr className="hrgfg" />
                    <div className="dfkjghjdffg mt-3">
                      <h6>Tax</h6>
                      <p>16000</p>
                    </div>

                    <div className="dfvbdfdf">
                      <div className="row">
                        <div className="col-lg-5">
                          <div className="khfdfgvf">
                            <button className="btn254">
                              <i className="fa-solid fa-angle-left"></i> BACK
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-7">
                          <div className="kgfhbgfhfg">
                            <button className="btynh58">
                              Pay <i className="fa-solid fa-check"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorPayment;
