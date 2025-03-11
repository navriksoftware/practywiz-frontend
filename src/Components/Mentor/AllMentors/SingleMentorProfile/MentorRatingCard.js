import React from "react";
import StarRating from "../../../../Utils/StartRating";

const MentorRatingCard = ({ feedbackCount, feedback_details }) => {

  if (feedbackCount === 0) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0", backgroundColor: "#fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <h4 style={{ color: "#6b7280", fontSize: "18px", fontWeight: "600" }}>No reviews found</h4>
      </div>
    );
  }
  return (
    <div style={{ padding: "16px", backgroundColor: "#fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
      {feedbackCount === 0 ? (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <h4 style={{ color: "#6b7280", fontSize: "18px", fontWeight: "600" }}>No reviews found</h4>
        </div>
      ) : (
        feedback_details &&
        feedbackCount > 0 &&
        JSON.parse(feedback_details).map((feedback, index) => {
          return (
            <div key={index} style={{ borderBottom: "1px solid #d1d5db", padding: "16px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <img
                  src={feedback.mentee_profile_pic_url}
                  alt={`${feedback.mentee_firstname} ${feedback.mentee_lastname}`}
                  style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", border: "1px solid #d1d5db" }}
                />
                <div>
                  <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#374151", textTransform: "capitalize" }}>
                    {feedback.mentee_firstname} {feedback.mentee_lastname}
                  </h4>
                  <div style={{ display: "flex", alignItems: "center", color: "#6b7280", fontSize: "14px" }}>
                    <StarRating rating={feedback.mentor_feedback_session_overall_rating} />
                    <p>{new Date(feedback.mentor_feedback_dtls_cr_date).toDateString()}</p>
                  </div>
                </div>
              </div>
              <p style={{ marginTop: "12px", color: "#4b5563", fontSize: "14px" }}>{feedback.mentor_feedback_detailed_fb}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MentorRatingCard;
