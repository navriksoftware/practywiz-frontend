import React from 'react'
import menteeRegPage from "../../../../Images/Mentee/Group video-amico.svg";
const MenteeFormLeftSidetext = () => {
    return (
        <div className="col-lg-6 mb-4 dooneed">
            <div className="iuhieiuihaw_left sticky-top">
                <img
                    style={{ width: "22rem" }}
                    src={menteeRegPage}
                    alt="img"
                />
                <h4 className="mt-4 testsize">Register as a Mentee to start your Practywizard journey</h4>

                <ul className="ps-0 mt-3">
                    <li className="mb-3">
                        <div className="d-flex align-items-center">
                            <i className="fa-solid fa-circle-check"></i>

                            <p className="mb-0">Access to thousands of Industry Mentors</p>
                        </div>
                    </li>

                    <li className="mb-3">
                        <div className="d-flex align-items-center">
                            <i className="fa-solid fa-circle-check"></i>

                            <p className="mb-0">Internships with Corporates</p>
                        </div>
                    </li>

                    <li className="mb-3">
                        <div className="d-flex align-items-center">
                            <i className="fa-solid fa-circle-check"></i>

                            <p className="mb-0">
                                Learn from real-world case studies
                            </p>
                        </div>
                    </li>

                    <li className="mb-3">
                        <div className="d-flex align-items-center">
                            <i className="fa-solid fa-circle-check"></i>

                            <p className="mb-0">Access to Avega, AI based Case assessment tool</p>
                        </div>
                    </li>

                    <li className="mb-3">
                        <div className="d-flex align-items-center">
                            <i className="fa-solid fa-circle-check"></i>

                            <p className="mb-0">
                                <p>Hands-on Experiential Training Programs</p>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenteeFormLeftSidetext
