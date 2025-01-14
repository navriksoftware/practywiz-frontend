import React, { useEffect, useState } from "react";
import "../DashboardCSS/mentorupcomingsession.css";
import MentorUpcomingSessionCard from "./MentorUpcomingSessionCard";
import { ApiURL } from "../../../../Utils/ApiURL";
import axios from "axios";
import SessionCardSkeleton from "../SkeltonLoaders/SessionCardSkeleton";
const MentorUpcomingSessions = ({ data, user, token }) => {
  const [allBookingSessions, setAllBookingSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = ApiURL();
  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      const response = await axios.post(
        `${url}api/v1/mentor/booking/appointment/upcoming`,
        { userDtlsId: user?.user_id }
      );
      setLoading(false);
      if (response.data.success) {
        setAllBookingSessions(response.data.success);
        setLoading(false);
      }
      if (response.data.error) {
        setAllBookingSessions([]);
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
            <h2>Your Upcoming Mentor Sessions</h2>
          </div>
          <div className="row">
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
            {allBookingSessions.length > 0 ? (
              <MentorUpcomingSessionCard
                user={user}
                token={token}
                allBookingSessions={allBookingSessions}
              />
            ) : (
              <div className="error-box-green" style={{ width: "400px" }}>
                There are no current upcoming bookings
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorUpcomingSessions;
