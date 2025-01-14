import React from "react";
import "./paymentcourse.css";
import Payment from "../../../Images/Courses/vb4.jpg";
import Paypal from "../../../Images/Courses/paypal1.png";
import Stripe from "../../../Images/Courses/stripe1.png";
import MasterCard from "../../../Images/Courses/MasterCard_Logo.svg.png";
import Visa from "../../../Images/Courses/visa1.png";
const CoursePayment = () => {
  return (
    <>
      <div className="khgdfyhjgdfgfhftg854">
        <div className="container">
          <div className="fbghfgfg">
            <div className="row">
              <div className="col-lg-5">
                <div className="dfjhgzdgdf">
                  <div className="gfgfgg">
                    <h4>Jumpstart To It Business Analyst</h4>
                    <div className="jhbfdf">
                      <img src={Payment} alt="" />
                    </div>
                    <div className="nfhjgf2">
                      <h6>Course Details:</h6>
                      <p>
                        Contrary to popular belief, Lorem Ipsum is not simply
                        random text. It has roots in a piece of classical Latin
                        literature from 45 BC, making it over 2000 years old.
                      </p>
                    </div>

                    <div className="hjcbghfg2">
                      <h6>
                        {" "}
                        <i className="fa-solid fa-graduation-cap"></i> Course
                        Duration
                      </h6>
                      <p>6 Months</p>
                    </div>

                    <div className="hjcbghfg2">
                      <h6>
                        {" "}
                        <i className="fa-solid fa-sack-dollar"></i> Course Price
                      </h6>
                      <p>$ 20k</p>
                    </div>

                    <div className="hjcbghfg2">
                      <h6>
                        {" "}
                        <i className="fa-solid fa-money-bill"></i> GST
                      </h6>
                      <p>$ 1k</p>
                    </div>
                    <hr className="hrnm28" />
                    <div className="hjcbghfg2">
                      <h6>
                        {" "}
                        <i className="fa-solid fa-money-bill"></i> Total Price
                      </h6>
                      <p>$ 21k</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-6">
                <div className="gnhdfgfdgf">
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
                        <img src={Visa} alt="visa" />
                      </label>
                    </div>
                    <div className="gjggfhfgh">
                      <form action="">
                        <div className="gfgfggf">
                          <label for="">Card Holder Name</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Arain Malitya"
                          />
                        </div>
                        <div className="gfgfggf">
                          <label for="">Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="xxxx xxxx xxxx"
                          />
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="gfgfggf">
                              <label for="">Exp. Date</label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="xxxx xxxx xxxx"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="gfgfggf">
                              <label for="">CVV Number</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="xxxx xxxx xxxx"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
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
                                CONFIRM <i className="fa-solid fa-check"></i>
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
      </div>
    </>
  );
};

export default CoursePayment;
