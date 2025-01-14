import React, { useEffect, useState } from "react";
import "../DashboardCSS/menteecompletesession.css";
import MenteeCompletedSessionCard from "./MenteeCompletedSessionCard";
import { useSelector } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";
import axios from "axios";
import SessionCardSkeleton from "../../../Mentor/MentorDashboard/SkeltonLoaders/SessionCardSkeleton";
import { toast } from "react-toastify";

const MenteeCompletedSessions = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.currentUser);
  const [allCompletedBookingSessions, setAllCompletedBookingSessions] =
    useState([]);
  const url = ApiURL();
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);

        const response = await Promise.race([
          axios.post(`${url}api/v1/mentee/dashboard/appointments/completed`, {
            userDtlsId: user?.user_id,
          }),
          new Promise(
            (_, reject) =>
              setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
          ),
        ]);

        if (response.data.success) {
          setAllCompletedBookingSessions(response.data.success);
        } else if (response.data.error) {
          setAllCompletedBookingSessions([]);
        }
      } catch (error) {
        setAllCompletedBookingSessions([]);
        if (error.message === "Request timed out") {
          toast.error("Request timed out. Please try again.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false); // Ensure loading is stopped in all cases
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
          <div className="oidieoiejrer_filter">
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
          </div>

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
            {!loading && allCompletedBookingSessions?.length === 0 && (
              <div className="error-box-green">
                There are no completed session found
              </div>
            )}
            {allCompletedBookingSessions?.length > 0 && (
              <MenteeCompletedSessionCard
                user={user}
                allCompletedBookingSessions={allCompletedBookingSessions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeCompletedSessions;
