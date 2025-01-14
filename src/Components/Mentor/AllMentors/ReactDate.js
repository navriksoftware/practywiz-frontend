import React, { useState } from "react";
import TestDatePicker from "./TestDatePicker";
const ReactDate = () => {
  const [slotDetails, setSlotDetails] = useState({});
  const timeslotList = JSON.parse(
    `[{"mentor_timeslot_id":12,"mentor_dtls_id":14,"mentor_timeslot_day":"Sat","mentor_timeslot_from":"05:00PM","mentor_timeslot_to":"05:30PM","mentor_timeslot_rec_indicator":"Daily","mentor_timeslot_rec_end_timeframe":"2024-09-21","mentor_timeslot_rec_cr_date":"2024-08-08","mentor_timeslot_booking_status":"No"},{"mentor_timeslot_id":13,"mentor_dtls_id":14,"mentor_timeslot_day":"Mon","mentor_timeslot_from":"04:00PM","mentor_timeslot_to":"04:30PM","mentor_timeslot_rec_indicator":"Daily","mentor_timeslot_rec_end_timeframe":"2024-09-21","mentor_timeslot_rec_cr_date":"2024-08-09","mentor_timeslot_booking_status":"No"}]`
  );
  const bookingDetails = JSON.parse(
    `[{"mentor_dtls_id":14,"mentor_session_booking_date":"2024-08-19","mentor_booked_date":"2024-08-19","mentor_booking_starts_time":"04:00PM","mentor_booking_end_time":"04:30PM","mentor_booking_time":"04:00PM-04:30PM","mentor_booking_confirmed":"Yes","mentor_session_status":"upcoming"},{"mentor_dtls_id":14,"mentor_session_booking_date":"2024-08-24","mentor_booked_date":"2024-08-19","mentor_booking_starts_time":"05:00PM","mentor_booking_end_time":"05:30PM","mentor_booking_time":"05:00PM-05:30PM","mentor_booking_confirmed":"Yes","mentor_session_status":"pending"}]`
  );
  const HandleTimeSlotDetails = (data) => {
    console.log(data)
    setSlotDetails(data);
  };
  return (
    <TestDatePicker
      HandleTimeSlotDetails={HandleTimeSlotDetails}
      timeslotList={timeslotList}
      bookingDetails={bookingDetails}
    />
  );
};

export default ReactDate;
