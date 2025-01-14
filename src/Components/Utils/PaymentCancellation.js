import React from "react";
import "./payment&paymentcancellation.css";
import PaymentError from "../../Images/basic-rgb_605959-395.jpg";
const PaymentCancellation = () => {
  return (
    <div className="dsjujfghdfgdfghf">
      <div className="container-fluid px-5">
        <div className="fgjhfgg">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-5">
              <div className="ihdneirr_image">
                <img src={PaymentError} alt="" />
              </div>
            </div>

            <div className="col-lg-5">
              <div className="mndhjgbghfgh">
                <div className="ui middle aligned center aligned grid">
                  <div className="ui eight wide cstm-wdth">
                    <form className="ui large form">
                      <div className="ui icon negative message">
                        <i className="fa-regular fa-exclamation"></i>
                        <div className="content">
                          <div className="header">Oops! Something went wrong.</div>
                          <p>While trying to reserve money from your account</p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <button className="btn-main">GO TO DASHBOARD</button>
                <button className="btn-main">GO TO HOMEPAGE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancellation;
