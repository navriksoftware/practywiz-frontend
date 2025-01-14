import React from "react";
import Logo from "../../Images/Log White.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="section-hor-gap py-5">
      <div className="container pt-4">
        <div className="jfuhygfdgdfrg">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="jdfhgdfg">
                <img src={Logo} alt="2024" />
                <p className="mt-4">
                  Providing solution-oriented guidance through the best mentors
                  who have an immense amount of knowledge and experience in the
                  specific field. We have discovered that the students struggle
                  to gain expertise without proper guidance.
                </p>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="jhdgfvdg">
                <div className="row">
                  <div className="col-lg-3 mb-4">
                    <div className="hjgfgfghghgfh">
                      <div className="fugjfgf mb-4">
                        <h4>Navigation</h4>
                      </div>

                      <div className="nbffg position-relative mb-3">
                        <a href="/">
                          <i className="fa-solid fa-angle-right"></i> Home
                        </a>
                      </div>

                      <div className="nbffg position-relative mb-3">
                        <a href="/mentor-club">
                          <i className="fa-solid fa-angle-right"></i> Mentor
                          Club
                        </a>
                      </div>

                      <div className="nbffg position-relative mb-3">
                        <a href="/case-study">
                          <i className="fa-solid fa-angle-right"></i> Case Study
                        </a>
                      </div>

                      <div className="nbffg position-relative mb-3">
                        <a href="/internships">
                          <i className="fa-solid fa-angle-right"></i>{" "}
                          Internships
                        </a>
                      </div>

                      <div className="nbffg position-relative mb-3">
                        <a href="/jobs">
                          <i className="fa-solid fa-angle-right"></i> Jobs
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 mb-4">
                    <div className="hjgfgfghghgfh">
                      <div className="fugjfgf mb-4">
                        <h4>Useful Links</h4>
                      </div>

                      {/* <div className="nbffg position-relative mb-3">
                        <a href="/">
                          <i className="fa-solid fa-angle-right"></i> Home
                        </a>
                      </div> */}

                      {/* <div className="nbffg position-relative mb-3">
                        <a href="/internships">
                          <i className="fa-solid fa-angle-right"></i> IT
                          Training
                        </a>
                      </div>

                      <div className="nbffg position-relative mb-3">
                        <a href="/internships">
                          <i className="fa-solid fa-angle-right"></i> Business
                          Training
                        </a>
                      </div> */}

                      <div className="nbffg position-relative mb-3">
                        <a href="/aboutus">
                          <i className="fa-solid fa-angle-right"></i> About Us
                        </a>
                      </div>

                      <div className="nbffg position-relative mb-3">
                        <a href="/contact">
                          <i className="fa-solid fa-angle-right"></i> Contact Us
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="hjgfgfghghgfh">
                      <div className="fugjfgf mb-4">
                        <h4>Contact Us</h4>
                      </div>

                      {/* <div className="nbffg2 mb-3">
                        <a href="/" className="d-flex">
                          <i className="fa-solid pe-2 fa-location-arrow"></i>

                          <p className="mb-0">
                            B 1/5 Safdarjung Enclave Africa Avenue New Delhi
                            Pin-110029
                          </p>
                        </a>
                      </div> */}

                      <div className="nbffg2 mb-3">
                        <a href="/" className="d-flex">
                          <i className="fa-solid pe-2 fa-phone"></i>

                          <p className="mb-0">(120) 3569310</p>
                        </a>
                      </div>

                      <div className="nbffg2 mb-4">
                        <a href="/" className="d-flex">
                          <i className="fa-solid pe-2 fa-envelope"></i>

                          <p className="mb-0">wecare@practywiz.com</p>
                        </a>
                      </div>

                      <div className="bghjdfgfdg">
                        <div className="ghfgdfgfgffgfg">
                          <button className="position-relative me-lg-2">
                            <a
                              href="https://www.facebook.com/profile.php?id=61556301203216&mibextid=LQQJ4d"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa-brands position-absolute fa-facebook-f"></i>
                            </a>
                          </button>

                          <button className="position-relative me-lg-2">
                            <a
                              href="https://www.instagram.com/practiwiz?igsh=b3VicXZwNGlrdnpo"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa-brands position-absolute fa-instagram"></i>
                            </a>
                          </button>

                          <button className="position-relative me-lg-2">
                            <a
                              href="https://www.youtube.com/@navriksoftwaresolutions9922"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa-brands position-absolute fa-youtube"></i>
                            </a>
                          </button>

                          <button className="position-relative me-lg-2">
                            <a
                              href="https://www.linkedin.com/company/navrik-software-solutions"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa-brands position-absolute fa-linkedin"></i>
                            </a>
                          </button>

                          <button className="position-relative me-lg-2">
                            <a
                              href="https://x.com/practiwiz"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa-brands position-absolute fa-x-twitter"></i>
                            </a>
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
    </footer>
  );
};

export default Footer;
