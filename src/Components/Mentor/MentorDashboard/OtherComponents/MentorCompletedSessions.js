import React, { useEffect, useState } from "react";
import "../DashboardCSS/mentorcompletesession.css";
import MentorCompletedSessionCard from "./MentorCompletedSessionCard";
import { ApiURL } from "../../../../Utils/ApiURL";
import axios from "axios";
import SessionCardSkeleton from "../SkeltonLoaders/SessionCardSkeleton";

const MentorCompletedSessions = ({ user, token }) => {
  const [loading, setLoading] = useState(false);
  const [
    allMentorCompletedBookingSessions,
    setAllMentorCompletedBookingSessions,
  ] = useState([]);
  const url = ApiURL();
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      const response = await axios.post(
        `${url}api/v1/mentor/booking/appointment/completed`,
        { userDtlsId: user?.user_id }
      );
      setLoading(false);
      if (response.data.success) {
        setAllMentorCompletedBookingSessions(response.data.success);
        setLoading(false);
      }
      if (response.data.error) {
        setAllMentorCompletedBookingSessions([]);
        setLoading(false);
      }
    };
    fetchMentors();
  }, [url, user?.user_id]);
  return (
    <div className="col-lg-10 ps-0">
      <div className="difuhtre_content bkjihinewrewr">
        <div className="flkhgjfgf">
          <div className="fgfdg">
            <h2>Your Completed Sessions</h2>
          </div>

          {/* <div className="oidieoiejrer_filter">
            <div className="row justify-content-between">
              <div className="col-lg-3 mb-2">
                <div className="oidheknrier">
                  <h5>
                    <b>Sort By</b>
                  </h5>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Year</option>
                    <option value="1">2021</option>
                    <option value="2">2022</option>
                    <option value="3">2023</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3 mb-2">
                <div className="oidheknrier">
                  <h5>
                    <b>Sort By</b>
                  </h5>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Mentor Name</option>
                    <option value="1">Tarun Gautam</option>
                    <option value="2">Tarun Gautam</option>
                    <option value="3">Tarun Gautam</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3 mb-2">
                <div className="oidheknrier">
                  <h5>
                    <b>Sort By</b>
                  </h5>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Sort By</option>
                    <option value="1">11:15 am</option>
                    <option value="2">1:15 am</option>
                    <option value="3">12:15 am</option>
                  </select>
                </div>
              </div>
            </div>
          </div> */}
          
          <div className="row mt-4">
            {loading && (
              <>
                <SessionCardSkeleton />
                <SessionCardSkeleton />
                <SessionCardSkeleton />
                <SessionCardSkeleton />
                <SessionCardSkeleton />
                <SessionCardSkeleton />
                <SessionCardSkeleton />
                <SessionCardSkeleton />
              </>
            )}
            {allMentorCompletedBookingSessions.length > 0 ? (
              <MentorCompletedSessionCard
                user={user}
                token={token}
                allMentorCompletedBookingSessions={
                  allMentorCompletedBookingSessions
                }
              />
            ) : (
              <div className="error-box-green" style={{ width: "400px" }}>
                You have not completed any mentor session{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCompletedSessions;
