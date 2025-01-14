import React, { useState } from "react";
import CustomDatePicker from "./CustomDatePicker";

const MainComponent = () => {
  const timeslotList = JSON.parse(`[
    {
      "mentor_timeslot_id":1,
      "mentor_dtls_id":14,
      "mentor_timeslot_day":"Sat",
      "mentor_timeslot_from":"05:00PM",
      "mentor_timeslot_to":"05:30PM",
      "mentor_timeslot_rec_indicator":"Daily",
      "mentor_timeslot_rec_end_timeframe":"2024-08-17",
      "mentor_timeslot_rec_cr_date":"2024-08-08",
      "mentor_timeslot_booking_status":"No"
    },
    {
      "mentor_timeslot_id":2,
      "mentor_dtls_id":14,
      "mentor_timeslot_day":"Mon",
      "mentor_timeslot_from":"06:00PM",
      "mentor_timeslot_to":"06:30PM",
      "mentor_timeslot_rec_indicator":"Daily",
      "mentor_timeslot_rec_end_timeframe":"2024-11-25",
      "mentor_timeslot_rec_cr_date":"2024-08-08",
      "mentor_timeslot_booking_status":"Yes"
    },
    {
      "mentor_timeslot_id":3,
      "mentor_dtls_id":14,
      "mentor_timeslot_day":"Mon",
      "mentor_timeslot_from":"03:00PM",
      "mentor_timeslot_to":"03:30PM",
      "mentor_timeslot_rec_indicator":"Daily",
      "mentor_timeslot_rec_end_timeframe":"2024-11-25",
      "mentor_timeslot_rec_cr_date":"2024-08-08",
      "mentor_timeslot_booking_status":"No"
    },
    {
      "mentor_timeslot_id":4,
      "mentor_dtls_id":14,
      "mentor_timeslot_day":"Tue",
      "mentor_timeslot_from":"06:00PM",
      "mentor_timeslot_to":"06:30PM",
      "mentor_timeslot_rec_indicator":"Weekly",
      "mentor_timeslot_rec_end_timeframe":"2024-11-17",
      "mentor_timeslot_rec_cr_date":"2024-08-08",
      "mentor_timeslot_booking_status":"Yes"
    }
  ]`);

  const bookingDetails = JSON.parse(
    `[{"mentor_dtls_id":14,"mentor_session_booking_date":"2024-08-24","mentor_booked_date":"2024-08-22","mentor_booking_starts_time":"05:00PM","mentor_booking_end_time":"05:30PM","mentor_booking_time":"05:00PM-05:30PM","mentor_booking_confirmed":"Yes","mentor_session_status":"upcoming"}]`
  );

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTimeslotId, setSelectedTimeslotId] = useState(null);

  const handleDateSlotSelect = (date, slot, timeslotId) => {
    setSelectedDate(date);
    setSelectedSlot(slot);
    setSelectedTimeslotId(timeslotId); // Store the timeslot ID
  };

  return (
    <div>
      <h1>Mentor Booking</h1>
      <CustomDatePicker
        timeslotList={timeslotList}
        bookingDetails={bookingDetails}
        onDateSlotSelect={handleDateSlotSelect}
      />
      {selectedDate && selectedSlot && (
        <div>
          <h3>Selected Date and Slot</h3>
          <p>Date: {selectedDate.toDateString()}</p>
          <p>
            Time Slot: {selectedSlot.mentor_timeslot_from} -{" "}
            {selectedSlot.mentor_timeslot_to}
          </p>
          <p>Time Slot ID: {selectedTimeslotId}</p>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
