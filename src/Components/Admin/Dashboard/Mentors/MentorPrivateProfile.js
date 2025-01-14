import React, { useEffect, useState } from "react";
import CustomDatePicker from "../../../Mentor/AllMentors/CustomDatepicker/CustomDatePicker";
import { useParams } from "react-router-dom";
import StarRating from "../../../../Utils/StartRating";
import SingleMentorProfilePageSkelton from "../../../Mentor/AllMentors/SingleMentorProfile/Skelton/SingleMentorProfilePageSkelton";
import axios from "axios";
import { ApiURL } from "../../../../Utils/ApiURL";
import Ee1 from "../../../../Images/Mentors/ee1.png";
import Ee2 from "../../../../Images/Mentors/ee2.png";
import Tickmark from "../../../../Images/Mentors/tick-mark (1).png";
import Qw1 from "../../../../Images/Mentors/qw1 (1).png";
import Qw2 from "../../../../Images/Mentors/qw1 (2).png";
import DCdc1 from "../../../../Images/Mentors/Mentor_session.jpg";
import "../../../Mentor/AllMentors/AllMentors.css";
import MentorRatingCard from "../../../Mentor/AllMentors/SingleMentorProfile/MentorRatingCard";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
const MentorPrivateProfile = ({ user, token }) => {
  const url = ApiURL();
  const params = useParams();
  const mentorDtlsId = params.id;
  const dispatch = useDispatch();
  const [showRating, setShowRating] = useState(null);
  const [singleMentor, setSingleMentor] = useState([]);
  const [mentorTimeSlotDuration, setMentorTimeSlotDuration] = useState("30");
  const [showLessText, setShowLessText] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showAreaOfExpertise, setShowAreaOfExpertise] = useState(true);
  const RatingShowHandler = () => {
    return setShowRating(!showRating), setShowAreaOfExpertise(false);
  };
  const AreaOfExpertiseShowHandler = () => {
    return setShowRating(false), setShowAreaOfExpertise(!showAreaOfExpertise);
  };
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      const response = await axios.get(
        `${url}api/v1/admin/dashboard/mentors/private-profile/${mentorDtlsId}`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      setLoading(false);
      if (response.data.success) {
        setLoading(false);
        setSingleMentor(response.data.success);
      }
      if (response.data.error) {
        setLoading(false);
        setSingleMentor(null);
      }
    };
    fetchMentors();
  }, [mentorDtlsId, url]);

  const MentorApproveHandler = async (id, email, mentorName, userId) => {
    dispatch(showLoadingHandler());
    const response = await axios.post(
      `${url}api/v1/admin/dashboard/mentors/update/approve`,
      {
        mentorDtlsId: id,
        mentorEmail: email,
        mentorName: mentorName,
        userId: userId,
      },
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    setLoading(false);
    dispatch(hideLoadingHandler());
    if (response.data.success) {
      return (
        toast.success("Mentor approved successfully"),
        setLoading(false),
        dispatch(hideLoadingHandler())
      );
    }
    if (response.data.error) {
      return (
        toast.error("There is some error while approving the mentor"),
        setLoading(false),
        dispatch(hideLoadingHandler())
      );
    }
  };

  const MentorDisApproveHandler = async (id, email, mentorName, userId) => {
    dispatch(showLoadingHandler());
    const response = await axios.post(
      `${url}api/v1/admin/dashboard/mentors/update/not-approve`,
      {
        mentorDtlsId: id,
        mentorEmail: email,
        mentorName: mentorName,
        userId: userId,
      },
      {
        headers: { authorization: "Bearer " + token },
      }
    );
    setLoading(false);
    dispatch(hideLoadingHandler());
    if (response.data.success) {
      return (
        toast.success("Mentor disapproved successfully"),
        setLoading(false),
        dispatch(hideLoadingHandler())
      );
    }
    if (response.data.error) {
      return (
        toast.error("There is some error while approving the mentor"),
        setLoading(false),
        dispatch(hideLoadingHandler())
      );
    }
  };
  const MentorTimeSlotDurationHandler = (e) => {
    setMentorTimeSlotDuration(e.target.value);
  };
  const handleDateSlotSelect = (date, slot, timeSlotId) => {};
  return (
    <>
      {loading ? (
        <>
          <SingleMentorProfilePageSkelton />
        </>
      ) : (
        <>
          {singleMentor?.map((sMentor) => {
            return (
              <>
                <div
                  key={sMentor.user_dtls_id}
                  className="duiegrer_bck position-relative mb-3"
                  id="singleMentorCoverPicture"
                >
                  <div className="container">
                    <div className="csdpeijf d-flex justify-content-between">
                      <div className="ihuerorktrt position-relative">
                        <div className="iijieirr_left2 overflow-hidden">
                          <img
                            src={sMentor.mentor_profile_photo}
                            width="100%"
                            alt={
                              sMentor.mentor_firstname +
                              " " +
                              sMentor.mentor_lastname
                            }
                          />
                        </div>
                      </div>
                      <div className="ihurtf_btn">
                        {sMentor.mentor_approved_status === "No" ? (
                          <button
                            className="btn btn-main approve-button"
                            onClick={() => {
                              MentorApproveHandler(
                                sMentor.mentor_dtls_id,
                                sMentor.mentor_email,
                                sMentor.mentor_firstname +
                                  " " +
                                  sMentor.mentor_lastname,
                                sMentor.user_dtls_id
                              );
                            }}
                          >
                            Approve Now
                          </button>
                        ) : (
                          <button
                            className="btn btn-main disapprove-button"
                            onClick={() => {
                              MentorDisApproveHandler(
                                sMentor.mentor_dtls_id,
                                sMentor.mentor_email,
                                sMentor.mentor_firstname +
                                  " " +
                                  sMentor.mentor_lastname,
                                sMentor.user_dtls_id
                              );
                            }}
                          >
                            DisApprove Now
                          </button>
                        )}

                        {/* <button className="btn btn-main">
                          <i className="fa-solid pe-2 fa-share"></i> Share
                          Profile
                        </button> */}
                      </div>
                      {/* <div className="ljrfhf">
                        <i className="fa-solid fa-upload"></i>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="lndfhjfvgdvbfgfghgf py-5">
                  <div className="container">
                    <div className="skhfdfdfg">
                      <div className="row justify-content-between">
                        <div className="col-lg-6">
                          <div className="dfnjghjggh">
                            <div className="ghvfvdfgg">
                              <div className="gjnjfghg">
                                <h2>
                                  {sMentor?.mentor_firstname?.toUpperCase() +
                                    " " +
                                    sMentor?.mentor_lastname?.toUpperCase()}
                                </h2>{" "}
                              </div>
                              <div className="njfgfghf">
                                <i className="fa-brands fa-linkedin-in"></i>
                                <i className="fa-brands fa-x-twitter"></i>
                              </div>
                            </div>

                            <div className="hfuydfgftgh">
                              <div className="gjfhg">
                                <img src={Ee1} alt="" />
                              </div>
                              <p>
                                <b>
                                  {sMentor.mentor_job_title.toUpperCase() + " "}
                                </b>
                                at
                                <b>
                                  {" " +
                                    sMentor.mentor_company_name.toUpperCase()}
                                </b>
                              </p>
                            </div>

                            <div className="hfuydfgftgh">
                              <div className="gjfhg">
                                <img src={Ee2} alt="" />
                              </div>
                              <div className="fdjdfg">
                                <p>
                                  Average rating :
                                  <span className="span121">
                                    <StarRating
                                      rating={sMentor.avg_mentor_rating}
                                    />
                                  </span>
                                  <span>
                                    ({sMentor.feedback_count} Reviews)
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className="hfuydfgftgh">
                              <div className="gjfhg">
                                <img
                                  src={Tickmark}
                                  style={{ width: "25px" }}
                                  alt=""
                                />
                              </div>
                              <div className="fdjdfg">
                                <p>
                                  {!showLessText
                                    ? sMentor.mentor_headline.slice(0, 120) +
                                      " "
                                    : sMentor.mentor_headline}
                                  <span
                                    className="spnn45"
                                    onClick={() =>
                                      setShowLessText(!showLessText)
                                    }
                                  >
                                    {!showLessText ? "Show More" : "Show Less"}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="fkjhgdfbghh">
                              <ul className="tabs">
                                <li
                                  className="tab-link current"
                                  data-tab="tab-9"
                                >
                                  Overview
                                </li>
                              </ul>
                              <div id="tab-9" className="tab-content current">
                                <div className="dfgbfgd">
                                  {/* <div className="dfkjhgufgfgh">
                                    <div className="row">
                                      <div className="col-lg-1">
                                        <div className="lgkgg">
                                          <img src={Qw1} alt="" />
                                        </div>
                                      </div>
                                      <div className="col-lg-11">
                                        <div className="djbghdrfgfgh">
                                          <h6>Professional Experience</h6>
                                          <p>{sMentor.mentor_headline}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div> */}

                                  <div className="dfkjhgufgfgh">
                                    <div className="row">
                                      <div className="col-lg-1">
                                        <div className="lgkgg">
                                          <img src={Qw2} alt="" />
                                        </div>
                                      </div>
                                      <div className="col-lg-11">
                                        <div className="djbghdrfgfgh">
                                          <h6>Expertise In</h6>
                                          <p>
                                            {
                                              sMentor.mentor_recommended_area_of_mentorship
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* key skills and expertise starts here. */}

                            {/* area of expertise and rating starts */}
                            <div className="fkjhgdfbghh">
                              <ul className="tabs">
                                <li
                                  className={
                                    showAreaOfExpertise
                                      ? "tab-link current"
                                      : "tab-link "
                                  }
                                  data-tab="tab-9"
                                  onClick={() => AreaOfExpertiseShowHandler()}
                                >
                                  Area of Expertise
                                </li>
                                <li
                                  className={
                                    showRating
                                      ? "tab-link current"
                                      : "tab-link "
                                  }
                                  data-tab="tab-10"
                                  onClick={() => RatingShowHandler()}
                                >
                                  Rating & Reviews
                                </li>
                              </ul>
                              {showAreaOfExpertise && (
                                <div className="options-container">
                                  {JSON.parse(
                                    sMentor.mentor_area_expertise
                                  ).map((option) => (
                                    <div
                                      key={option.id}
                                      className="main-option box"
                                    >
                                      <h2 className="optionH2">
                                        {option.name}
                                      </h2>
                                      {option.subOptions.length > 0 &&
                                        option.subOptions.map((subOption) => (
                                          <div
                                            key={subOption.id}
                                            className="sub-option"
                                          >
                                            <h3>{subOption.name}</h3>
                                            {subOption.skills.length > 0 && (
                                              <div className="fhfbfghg">
                                                {subOption.skills.map(
                                                  (skill) => (
                                                    <button key={skill.id}>
                                                      {skill.name}
                                                    </button>
                                                  )
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {showRating && (
                                <div id="tab-10" className="">
                                  <div className="jfgghghhghkgkhjg">
                                    <div className="jhdfgfjgg">
                                      <MentorRatingCard
                                        feedbackCount={sMentor.feedback_count}
                                        feedback_details={
                                          sMentor.feedback_details
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4 ColSize">
                          <div className="hgkfgkjfgfghgfg sticky-top mob-t0">
                            <h3 style={{ width: "auto" }}>Domain</h3>
                            <div className="fhfbfghg">
                              <div className="mentorSkillFlex">
                                {sMentor.mentor_domain !== "[]" &&
                                  JSON.parse(sMentor?.mentor_domain)?.map(
                                    (domain) => {
                                      return (
                                        <>
                                          <button>{domain.label}</button>
                                        </>
                                      );
                                    }
                                  )}
                              </div>
                            </div>
                            <h3 style={{ width: "auto", marginTop: "20px" }}>
                              Skills
                            </h3>
                            <div className="fhfbfghg">
                              <div className="mentorSkillFlex">
                                {JSON.parse(sMentor.mentor_passion_dtls).map(
                                  (passion) => {
                                    return (
                                      <>
                                        {passion.inside === true && (
                                          <button>{passion.text}</button>
                                        )}
                                      </>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                            <div className="fkjbghdfgfghghjygh p-4">
                              <div className="heightofdiv">
                                <span>
                                  <div className="dkjiherer moideuirer_list hello">
                                    <ul className="ps-0 mb-0">
                                      <li>
                                        <input
                                          value={"30"}
                                          type="radio"
                                          name="MentorPrice_Min"
                                          id="check_11"
                                          defaultChecked
                                          className="d-none"
                                          onChange={
                                            MentorTimeSlotDurationHandler
                                          }
                                        />
                                        <label htmlFor="check_11">
                                          <span className="MarginR">
                                            30 Minutes
                                          </span>
                                          <span>
                                            ₹
                                            {" " +
                                              sMentor.mentor_session_price / 2}
                                          </span>
                                        </label>
                                      </li>

                                      <li>
                                        <input
                                          type="radio"
                                          id="check_30"
                                          name="MentorPrice_Min"
                                          value={"60"}
                                          className="d-none"
                                          onChange={
                                            MentorTimeSlotDurationHandler
                                          }
                                        />
                                        <label htmlFor="check_30">
                                          <span className="MarginR">
                                            60 Minutes
                                          </span>
                                          <span>
                                            ₹
                                            {" " + sMentor.mentor_session_price}
                                          </span>
                                        </label>
                                      </li>
                                    </ul>
                                  </div>
                                </span>
                              </div>
                              <div className="fjbgfg">
                                <h4 className="mt-3 mb-4">
                                  Mentor Availability
                                </h4>
                                <CustomDatePicker
                                  onDateSlotSelect={handleDateSlotSelect}
                                  mentorTimeSlotDuration={
                                    mentorTimeSlotDuration
                                  }
                                  timeslotList={JSON.parse(
                                    sMentor.timeslot_list
                                  )}
                                  bookingDetails={JSON.parse(
                                    sMentor?.booking_dtls_list
                                  )}
                                />
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
          })}
        </>
      )}
    </>
  );
};

export default MentorPrivateProfile;
