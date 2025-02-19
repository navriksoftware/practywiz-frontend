import React from "react";

import { useSelector } from "react-redux";
import MenteeProfilePersonalDetails from "../OtherComponents/MenteeProfilePersonalDetails";
import MenteeProfileEduWorkexpDetails from "../OtherComponents/MenteeProfileEduWorkExpDetails";
import MenteeProfileSettings from "../OtherComponents/MenteeProfileSettings";

const InternshipProfile = ({ singleMentee, user, token }) => {
  return (
    <div>
      <MenteeProfileSettings
        singleMentee={singleMentee}
        user={user}
        token={token}
      />
    </div>
  );
};

export default InternshipProfile;
