import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../CustomeDatepciker.css";
const TimeslotDatepicker = ({
  timeslotList,
  bookingDetails,
  dateTimeHandler,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const getDayIndex = (day) => {
    switch (day) {
      case "Sun":
        return 0;
      case "Mon":
        return 1;
      case "Tue":
        return 2;
      case "Wed":
        return 3;
      case "Thu":
        return 4;
      case "Fri":
        return 5;
      case "Sat":
        return 6;
      default:
        return -1;
    }
  };

  const isDateSelectable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize the time portion to ensure accurate comparison

    if (date < today) return false; // Gray out past dates

    const daySlots = timeslotList.filter((slot) => {
      const slotDay = getDayIndex(slot.mentor_timeslot_day);
      const endDate = new Date(slot.mentor_timeslot_rec_end_timeframe);
      endDate.setHours(0, 0, 0, 0); // Normalize the time portion
      return date.getDay() === slotDay && date <= endDate;
    });

    if (daySlots.length === 0) return false; // Gray out dates with no slots

    const allBooked = daySlots.every((slot) => isSlotBooked(date, slot));
    return (
      !allBooked ||
      date <= new Date(daySlots[0].mentor_timeslot_rec_end_timeframe)
    );
  };

  const getSlotsForDate = (date) => {
    const selectedDay = date.toLocaleDateString("en-US", {
      weekday: "short",
    });
    return timeslotList.filter(
      (slot) =>
        slot.mentor_timeslot_day === selectedDay &&
        new Date(slot.mentor_timeslot_rec_end_timeframe) >= date
    );
  };

  const isSlotBooked = (date, slot) => {
    return bookingDetails?.some((booking) => {
      const bookingDate = new Date(booking.mentor_session_booking_date);
      bookingDate.setHours(0, 0, 0, 0);
      return (
        bookingDate.getTime() === date.getTime() &&
        booking.mentor_booking_confirmed === "Yes" &&
        (booking.mentor_session_status === "pending" ||
          booking.mentor_session_status === "upcoming" ||
          booking.mentor_session_status === "completed") &&
        booking.mentor_booking_starts_time === slot.mentor_timeslot_from &&
        booking.mentor_booking_end_time === slot.mentor_timeslot_to
      );
    });
  };

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);

      const slots = getSlotsForDate(checkDate);
      const isAvailable = slots.some((slot) => !isSlotBooked(checkDate, slot));

      if (isDateSelectable(checkDate) && isAvailable) {
        setStartDate(checkDate);
        setAvailableSlots(slots);
        break;
      }
    }
  }, [timeslotList, bookingDetails]);

  const handleSlotSelection = (slot) => {
    if (!isSlotBooked(startDate, slot)) {
      setSelectedSlot(slot);
      dateTimeHandler({ startDate, slot });
    }
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setAvailableSlots(getSlotsForDate(date));
    setSelectedSlot(null);
    dateTimeHandler(null); // Clear previous slot selection when date changes
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        filterDate={isDateSelectable}
        inline
        dayClassName={(date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (date < today) {
            return "grayed-out"; // Past dates
          }
          const slots = getSlotsForDate(date);
          if (slots.length === 0) return ""; // No slots, leave default (grayed out)
          const allBooked = slots.every((slot) => isSlotBooked(date, slot));
          return allBooked ? "fully-booked" : "";
        }}
      />
      {availableSlots.length > 0 && (
        <div>
          <p className="selected-timeslotP">Select a Time Slot:</p>
          <ul className="unorderlist">
            {availableSlots.map((slot, index) => (
              <li
                key={index}
                className={`slot-item ${
                  isSlotBooked(startDate, slot) ? "booked-slot" : ""
                } ${selectedSlot === slot ? "selected-slot" : ""}`}
                onClick={() => handleSlotSelection(slot)}
                style={{
                  cursor: isSlotBooked(startDate, slot)
                    ? "not-allowed"
                    : "pointer",
                  borderColor: selectedSlot === slot ? "#007BFF" : "", // Highlight selected slot
                }}
              >
                {slot.mentor_timeslot_from} - {slot.mentor_timeslot_to}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedSlot ? (
        <div>
          <p className="selected-timeslotP">You have chosen this slot :</p>
          <p className="selected-timeslot">
            {startDate?.toDateString() +
              " Time :" +
              selectedSlot.mentor_timeslot_from +
              "-" +
              selectedSlot.mentor_timeslot_to}
          </p>
        </div>
      ) : (
        <div>
          <p>Please select the date and timeslot</p>
        </div>
      )}
    </div>
  );
};

export default TimeslotDatepicker;
