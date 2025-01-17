import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../CustomeDatepciker.css";

const CustomDatePicker = ({
  timeslotList,
  bookingDetails,
  onDateSlotSelect,
  mentorTimeSlotDuration, // Prop: User-selected duration (30 or 60 minutes)
}) => {
  const [startDate, setStartDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const getDayIndex = (day) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days.indexOf(day);
  };

  const isDateSelectable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return false;

    return timeslotList.some((slot) => {
      const slotDay = getDayIndex(slot.mentor_timeslot_day);
      const startDate = new Date(slot.mentor_timeslot_rec_start_timeframe);
      const endDate = new Date(slot.mentor_timeslot_rec_end_timeframe);
      return date.getDay() === slotDay && date >= startDate && date <= endDate;
    });
  };

  const splitSlots = (fromTime, toTime, duration) => {
    const slots = [];
    const [fromHours, fromMinutes] = fromTime.split(/:|(?=[APM])/);
    const [toHours, toMinutes] = toTime.split(/:|(?=[APM])/);

    let start = new Date();
    start.setHours(
      (fromHours % 12) + (fromTime.includes("PM") ? 12 : 0),
      parseInt(fromMinutes, 10),
      0,
      0
    );

    const end = new Date();
    end.setHours(
      (toHours % 12) + (toTime.includes("PM") ? 12 : 0),
      parseInt(toMinutes, 10),
      0,
      0
    );

    while (start < end) {
      const nextSlot = new Date(start.getTime() + duration * 60000);
      slots.push({
        from: start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        to: nextSlot.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      start = nextSlot;
    }

    return slots;
  };

  const getSlotsForDate = (date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    const relevantSlots = timeslotList.filter(
      (slot) =>
        slot.mentor_timeslot_day === dayName &&
        (slot.mentor_timeslot_duration.substring(0, 2) ===
          mentorTimeSlotDuration.toString() ||
          slot.mentor_timeslot_duration === "Both") &&
        new Date(slot.mentor_timeslot_rec_start_timeframe) <= date &&
        new Date(slot.mentor_timeslot_rec_end_timeframe) >= date
    );
    return relevantSlots.flatMap((slot) =>
      splitSlots(
        slot.mentor_timeslot_from,
        slot.mentor_timeslot_to,
        mentorTimeSlotDuration
      )
    );
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    const slots = getSlotsForDate(date);
    setAvailableSlots(slots);
    setSelectedSlot(null);
    onDateSlotSelect(date, null);
  };

  const isSlotUnavailable = (date, slot) => {
    const now = new Date(); // Current date and time
    const slotDate = new Date(date);
    const [slotHours, slotMinutes] = slot.from.split(/:|(?=[APM])/);
    slotDate.setHours(
      (slotHours % 12) + (slot.from.includes("PM") ? 12 : 0),
      parseInt(slotMinutes, 10),
      0,
      0
    );

    // Slot is unavailable if it's booked or if it's in the past
    return (
      now > slotDate ||
      bookingDetails?.some((booking) => {
        const bookingDate = new Date(booking.mentor_session_booking_date);
        bookingDate.setHours(0, 0, 0, 0);
        return (
          bookingDate.getTime() === date.getTime() &&
          booking.mentor_booking_starts_time === slot.from &&
          booking.mentor_booking_end_time === slot.to
        );
      })
    );
  };

  const handleSlotSelection = (slot) => {
    if (!isSlotUnavailable(startDate, slot)) {
      setSelectedSlot(slot);
      onDateSlotSelect(startDate, slot, slot.mentor_timeslot_id);
    }
  };

  useEffect(() => {
    setStartDate(null);
    setAvailableSlots([]);
    setSelectedSlot(null);
    onDateSlotSelect(null, null);
  }, [mentorTimeSlotDuration]);

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        filterDate={isDateSelectable}
        inline
      />
      {availableSlots.length > 0 && (
        <div>
          <p className="selected-timeslotP">Select a Time Slot:</p>
          <ul className="unorderlist">
            {availableSlots.map((slot, index) => {
              const unavailable = isSlotUnavailable(startDate, slot);
              return (
                <li
                  key={index}
                  className={`slot-item ${
                    selectedSlot === slot ? "selected-slot" : ""
                  }`}
                  onClick={() => !unavailable && handleSlotSelection(slot)}
                  style={{
                    cursor: unavailable ? "not-allowed" : "pointer",
                    backgroundColor: unavailable ? "#FFCDD2" : "",
                    borderColor: selectedSlot === slot ? "#007BFF" : "",
                  }}
                >
                  {slot.from} - {slot.to}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {startDate && availableSlots.length === 0 && (
        <p className="selected-timeslotP">
          No slots available for this duration. Select another date.
        </p>
      )}
      {!startDate && (
        <p className="selected-timeslotP">
          Please select a date to see available slots.
        </p>
      )}
      {selectedSlot && (
        <div>
          <p className="selected-timeslotP">You have chosen this slot:</p>
          <p className="selected-timeslot">
            {startDate?.toDateString()} Time: {selectedSlot.from} -{" "}
            {selectedSlot.to}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
