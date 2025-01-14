import React from "react";
import "./contact.css";

function ContactUs() {
  return (
    <div className="contactuss">
      <div className="container">
        <div className="fhjgfgfg">
          <div className="row">
            <div className="col-lg-6">
              <div className="nhjfbdfgfh55">
                <div className="dfhgjdfgg">
                  <h2>Get In Touch</h2>
                  <p>
                    Our success in creating business solutions is due in large
                    part specially to talented and highly committed team.
                  </p>
                </div>
                <div className="hgjfgbfg">
                  <div className="dnghjfgdf">
                    <div className="kjnghdfg2">
                      <i className="fa-solid fa-map-location-dot"></i>
                    </div>
                    <div className="kjnghdfg">
                      <p>
                        B 1/5 Safdarjung Enclave Africa Avenue <br /> New Delhi
                        Pin-110029
                      </p>
                    </div>
                  </div>
                  <div className="dnghjfgdf">
                    <div className="kjnghdfg2">
                      <i className="fa-solid fa-envelope-open"></i>
                    </div>
                    <div className="kjnghdfg mt-1">
                      <p>wearepracktiwiz@gmail.com</p>
                    </div>
                  </div>
                  <div className="dnghjfgdf mt-3">
                    <div className="kjnghdfg2">
                      <i className="fa-solid fa-phone-volume"></i>
                    </div>
                    <div className="kjnghdfg mt-1">
                      <p>+(0238)8976546</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mkjdfbhfbgfdfg">
                <div className="dfhgjdfgg">
                  <h2>Fill Up The Form</h2>
                  <p>
                    Our success in creating business solutions is due in large
                    part specially to talented and highly committed team.
                  </p>
                </div>
                <div className="dfjghfgfd">
                  <form action="">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mjdfkjhgfg">
                          <label className="gfhgf" htmlFor="">
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type your first name"
                          />
                        </div>
                      </div>
                      {/* Add other form fields similarly */}
                      <div className="col-lg-12">
                        <div className="mjdfkjhgfg">
                          <label className="gfhgf" htmlFor="">
                            Your message
                          </label>
                          <textarea
                            className="form-control"
                            name=""
                            id=""
                            cols="3"
                            rows="3"
                            placeholder="Type here..."
                          ></textarea>
                        </div>
                      </div>
                      <div className="ndfhjdf">
                        <button className="btnss">SUBMIT</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleMap() {
  return (
    <div className="dnhghjdfgdfg">
      <iframe
        title="Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.063875055694!2d77.18755731489182!3d28.56784458244348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d86bdb46071%3A0x94ca3faac5c7b753!2sNavrik%20Software%20Solutions!5e0!3m2!1sen!2sin!4v1674540697611!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

function Section7() {
  return (
    <div className="section7 contactUsBg" id="contactUsBg">
      <div className="container-fluid section-hor-gap py-5">
        <div className="duieghrrr_content">
          <div className="dskjdfhgdfgfgfd text-center">
            <h2>
              Breakthrough Your Career <br /> With <span>Knowledgeable</span>{" "}
              Experts
            </h2>
            <p className="mb-0">
              We try to help you boost a secure career with our professional{" "}
              <br /> experts. We are here to work with you on your educational
              journey.
            </p>
          </div>
          <div className="idcuhsewfrsedf mt-5">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-8 col-sm-12">
                <div className="position-relative">
                  <i className="fa-solid fa-envelopes-bulk position-absolute"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <button className="btn btn-main position-absolute">
                    <span>CONNECT FOR FREE</span>{" "}
                    <i className="fa-regular d-none position-absolute fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ContactUs, GoogleMap, Section7 };
