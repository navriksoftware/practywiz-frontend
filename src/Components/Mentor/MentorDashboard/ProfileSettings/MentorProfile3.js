import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../MentorRegProgress/MentorForm3.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { option_fro_timezone } from "../../../data/Timezones";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";
import "./MentorProfileSet.css"
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";

const MentorProfile4 = ({ profiledata, user, token }) => {
  const dispatch = useDispatch();
  const url = ApiURL();
  const { setValue, register } = useForm();
  const today = new Date(); // Get today's date
  // Load saved data or initialize with default
  const loadSavedData = () => {
    const savedData = profiledata?.mentor_timeslots_json;

    return savedData
      ? JSON.parse(savedData)
      : [
          {
            days: [],
            startHour: "12",
            startMinute: "00",
            startPeriod: "AM",
            endHour: "12",
            endMinute: "00",
            endPeriod: "PM",
            fromDate: "",
            toDate: "",
            duration: "60 min",
          },
        ];
  };

  const [slots, setSlots] = useState(loadSavedData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    Array(slots.length).fill(false)
  );

  const toggleDropdown = (index) => {
    const updatedDropdownState = [...isDropdownOpen];
    updatedDropdownState[index] = !updatedDropdownState[index];
    setIsDropdownOpen(updatedDropdownState);
  };

  const toggleDropdownforClose = (index) => {
    const updatedDropdownState = [...isDropdownOpen];
    updatedDropdownState[index] = false;
    setIsDropdownOpen(updatedDropdownState);
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const durations = ["30", "60", "Both"];
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = ["00", "30"];
  const periods = ["AM", "PM"];

  // Convert time to minutes since midnight for easier comparison
  const convertTo24Hour = (hour, minute, period) => {
    let hours24 = parseInt(hour);
    if (period === "PM" && hours24 !== 12) hours24 += 12;
    if (period === "AM" && hours24 === 12) hours24 = 0;
    return hours24 * 60 + parseInt(minute);
  };

  // Check if two time ranges overlap
  const doTimesOverlap = (start1, end1, start2, end2) => {
    return start1 < end2 && start2 < end1;
  };

  // Check if dates overlap
  const doDateRangesOverlap = (start1, end1, start2, end2) => {
    const s1 = new Date(start1);
    const e1 = new Date(end1);
    const s2 = new Date(start2);
    const e2 = new Date(end2);
    return s1 <= e2 && s2 <= e1;
  };
  const handleSave = async () => {
    const dataGroup = JSON.stringify(slots);
    console.log(dataGroup);
console.log(user)
    try {
      dispatch(showLoadingHandler());
      const res = await Promise.race([
        axios.post(
          `${url}api/v1/mentor/dashboard/update/profile-3`,
          {dataGroup,
            userDtlsId: user.user_id,
          formData},

          {
            headers: { authorization: "Bearer " + token },
          }
        ),
        new Promise(
          (_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000) // 45 seconds timeout
        ),
      ]);
      if (res.data.success) {
        toast.success("Time slots Details updated successfully");
      } else if (res.data.error) {
        toast.error(res.data.error);
      }
    } catch (error) {
      if (error.message === "Request timed out") {
        toast.error("Update failed due to a timeout. Please try again.");
      } else {
        toast.error(
          "Error in updating the Time slots details, please try again!"
        );
      }
    } finally {
      dispatch(hideLoadingHandler());
    }
  };
  const [formData, setFormData] = useState({
    mentor_timezone: profiledata?.mentor_timezone || "",
  });
  const handleInputChangeTimeslot = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Find overlapping slots
  // const findOverlappingSlots = (currentSlot, currentIndex) => {
  //   const currentStartTime = convertTo24Hour(
  //     currentSlot.startHour,
  //     currentSlot.startMinute,
  //     currentSlot.startPeriod
  //   );
  //   const currentEndTime = convertTo24Hour(
  //     currentSlot.endHour,
  //     currentSlot.endMinute,
  //     currentSlot.endPeriod
  //   );

  //   return slots.reduce((overlaps, slot, index) => {
  //     if (index === currentIndex) return overlaps;

  //     const startTime = convertTo24Hour(
  //       slot.startHour,
  //       slot.startMinute,
  //       slot.startPeriod
  //     );
  //     const endTime = convertTo24Hour(
  //       slot.endHour,
  //       slot.endMinute,
  //       slot.endPeriod
  //     );

  //     // Check if dates overlap
  //     const datesOverlap = doDateRangesOverlap(
  //       currentSlot.fromDate,
  //       currentSlot.toDate,
  //       slot.fromDate,
  //       slot.toDate
  //     );

  //     // Check if times overlap
  //     const timesOverlap = doTimesOverlap(
  //       currentStartTime,
  //       currentEndTime,
  //       startTime,
  //       endTime
  //     );

  //     // Check if there are common days between the slots
  //     const hasCommonDays = currentSlot.days.some((day) =>
  //       slot.days.includes(day)
  //     );

  //     if (datesOverlap && timesOverlap && hasCommonDays) {
  //       overlaps.push({
  //         slotIndex: index + 1,
  //         days: slot.days.filter((day) => currentSlot.days.includes(day)),
  //       });
  //     }

  //     return overlaps;
  //   }, []);
  // };

  // Save slots to localStorage
  const saveToLocalStorage = (updatedSlots) => {
    localStorage.setItem("slots", JSON.stringify(updatedSlots));
  };

  // Handle day selection logic
  const handleDayChange = (index, day) => {
    const updatedSlots = [...slots];
    const isSelected = updatedSlots[index].days.includes(day);

    if (isSelected) {
      updatedSlots[index].days = updatedSlots[index].days.filter(
        (selectedDay) => selectedDay !== day
      );
    } else {
      updatedSlots[index].days = [...updatedSlots[index].days, day];
    }

    setSlots(updatedSlots);
    saveToLocalStorage(updatedSlots);
  };

  // Handle input change for specific fields
  const handleInputChange = (index, field, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);
    saveToLocalStorage(updatedSlots);
    const updatedSaveStatus = [...isSaved];
    updatedSaveStatus[index] = false; // Revert the save status
    setIsSaved(updatedSaveStatus);
  };

  // Add a new slot
  const addSlot = () => {
    const newSlot = {
      days: [],
      startHour: "12",
      startMinute: "00",
      startPeriod: "AM",
      endHour: "12",
      endMinute: "00",
      endPeriod: "PM",
      fromDate: "",
      toDate: "",
      duration: "60",
    };
    const updatedSlots = [...slots, newSlot];
    setSlots(updatedSlots);
    saveToLocalStorage(updatedSlots);
  };

  // Select all days
  const handleSelectAllDays = (index) => {
    const updatedSlots = [...slots];
    updatedSlots[index].days =
      updatedSlots[index].days.length === days.length ? [] : [...days];
    setSlots(updatedSlots);
    saveToLocalStorage(updatedSlots);
  };

  // Select weekdays
  const handleSelectWeekdays = (index) => {
    const updatedSlots = [...slots];
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    updatedSlots[index].days = weekdays.every((day) =>
      updatedSlots[index].days.includes(day)
    )
      ? []
      : weekdays;
    setSlots(updatedSlots);
    saveToLocalStorage(updatedSlots);
  };

  // Select weekends
  const handleSelectWeekends = (index) => {
    const updatedSlots = [...slots];
    const weekends = ["Saturday", "Sunday"];
    updatedSlots[index].days = weekends.every((day) =>
      updatedSlots[index].days.includes(day)
    )
      ? []
      : weekends;
    setSlots(updatedSlots);
    saveToLocalStorage(updatedSlots);
  };

  // Remove a slot
  const removeSlot = (index) => {
    const updatedSlots = slots.filter((_, slotIndex) => slotIndex !== index);
    setSlots(updatedSlots);
    saveToLocalStorage(updatedSlots);
    setValue("mentorAvailability", updatedSlots);
  };

  // Validate slot
  const validateSlot = (slot, index) => {
    let errors = {};
    const startTime = convertTo24Hour(
      slot.startHour,
      slot.startMinute,
      slot.startPeriod
    );
    const endTime = convertTo24Hour(
      slot.endHour,
      slot.endMinute,
      slot.endPeriod
    );

    // Basic validations
    if (!slot.days.length) errors.days = "Days must be selected.";
    if (!slot.fromDate) errors.fromDate = "Start date is required.";
    if (!slot.toDate) errors.toDate = "End date is required.";

    // Time validations
    if (startTime === endTime) {
      errors.timeMismatch = "Start and end times cannot be the same.";
    }
    if (endTime <= startTime) {
      errors.invalidTimeOrder = "End time must be later than start time.";
    }

    // Date validations
    const fromDate = new Date(slot.fromDate);
    const toDate = new Date(slot.toDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (fromDate < today) {
      errors.pastDate = "Start date cannot be in the past.";
    }
    if (toDate < fromDate) {
      errors.invalidDateOrder = "End date must be later than start date.";
    }

    // Check for overlapping slots with more detailed validation
    const overlappingSlots = slots.reduce((overlaps, otherSlot, otherIndex) => {
      if (otherIndex === index) return overlaps;

      const otherStartTime = convertTo24Hour(
        otherSlot.startHour,
        otherSlot.startMinute,
        otherSlot.startPeriod
      );
      const otherEndTime = convertTo24Hour(
        otherSlot.endHour,
        otherSlot.endMinute,
        otherSlot.endPeriod
      );

      const datesOverlap = doDateRangesOverlap(
        slot.fromDate,
        slot.toDate,
        otherSlot.fromDate,
        otherSlot.toDate
      );

      const timesOverlap = doTimesOverlap(
        startTime,
        endTime,
        otherStartTime,
        otherEndTime
      );

      const commonDays = slot.days.filter((day) =>
        otherSlot.days.includes(day)
      );

      if (datesOverlap && timesOverlap && commonDays.length > 0) {
        overlaps.push({
          slotIndex: otherIndex + 1,
          days: commonDays,
          times: `${otherSlot.startHour}:${otherSlot.startMinute} ${otherSlot.startPeriod} - ${otherSlot.endHour}:${otherSlot.endMinute} ${otherSlot.endPeriod}`,
        });
      }

      return overlaps;
    }, []);

    if (overlappingSlots.length > 0) {
      const overlappingDetails = overlappingSlots
        .map(
          (overlap) =>
            `Slot ${overlap.slotIndex} (${overlap.days.join(", ")}) at ${
              overlap.times
            }`
        )
        .join("\n");

      errors.overlap = `Time slot overlaps with:\n${overlappingDetails}`;
    }

    // Duration validation
    if (slot.duration === "Both") {
      // Calculate time difference in minutes
      const timeDiff = endTime - startTime;
      if (timeDiff < 60) {
        errors.duration =
          "Time slot must be at least 1 hour when 'Both' durations are selected.";
      }
    } else {
      const requestedDuration = parseInt(slot.duration);
      const timeDiff = endTime - startTime;
      if (timeDiff < requestedDuration) {
        errors.duration = `Time slot must be at least ${requestedDuration} minutes for the selected duration.`;
      }
    }

    return errors;
  };
  const [isSaved, setIsSaved] = useState(Array(slots.length).fill(false));

  // Save slot
  const saveSlotForIndex = (index) => {
    const slot = slots[index];
    const errors = validateSlot(slot, index);

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.entries(errors)
        .map(([key, value]) => value)
        .join("\n");
      alert(`Error in Slot ${index + 1}:\n${errorMessages}`);
      return false;
    }

    const updatedSlots = [...slots];
    updatedSlots[index] = slot;
    setSlots(updatedSlots);
    saveToLocalStorage(updatedSlots);
    setValue("mentorAvailability", updatedSlots);
    alert(`Slot ${index + 1} saved successfully!`);
    const updatedSaveStatus = [...isSaved];
    updatedSaveStatus[index] = true; // Mark the slot as saved
    setIsSaved(updatedSaveStatus);
    return true;
  };

  // useEffect(() => {
  //   const savedSlots = localStorage.getItem("slots");
  //   if (savedSlots) {
  //     try {
  //       const parsedData = JSON.parse(savedSlots);
  //       setValue("mentorAvailability", parsedData);
  //     } catch (error) {
  //       console.error("Error parsing saved slots:", error);
  //     }
  //   }
  // }, []);

  return (
    <div className="MentorProfileDispalySize">
      <div className="col-lg-12">
        <div className="mb-4">
          <label htmlFor="exampleInputEmail1" className="form-label">
            <b>
              Your Timezone <span className="RedColorStarMark">*</span>
            </b>
          </label>

          <select
            className="form-select"
            name="mentorTimezone"
            onChange={handleInputChangeTimeslot}
          >
            <option
              defaultValue={
                "UTC+05:30: Indian Standard Time (IST), Sri Lanka Time (SLT)"
              }
            >
              {" "}
              UTC+05:30: Indian Standard Time (IST), Sri Lanka Time (SLT)
            </option>
            {option_fro_timezone?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        {slots.map((slot, index) => {
          const errors = validateSlot(slot, index);
          return (
            <div key={index} className="AvailabilityMainContainer">
              <div
                className="Availability-container"
                onClick={() => toggleDropdownforClose(index)}
              >
                <h3>Slot {index + 1}</h3>
                <div
                  onClick={() => removeSlot(index)}
                  style={{ marginLeft: "10px" }}
                >
                  <i className="fa-solid fa-xmark cross-btn"></i>
                </div>
              </div>

              <div className="slot-container1">
                <div className="">
                  <div className="availability-day">
                    <label>Days:</label>
                    <div className="custom-dropdown">
                      <div
                        onClick={() => toggleDropdown(index)}
                        className="dropdown-header"
                      >
                        {slot.days.length === 0 ? (
                          <div className="dropdownDayBox">
                            <div>Select Days</div>
                            <div>
                              <i className="fa-solid fa-chevron-down"></i>
                            </div>
                          </div>
                        ) : slot.days.length === days.length ? (
                          "All Days"
                        ) : (
                          slot.days.join(", ")
                        )}
                      </div>
                      {isDropdownOpen[index] && (
                        <div className="dropdownDay">
                          <div className="dropdown-actions">
                            <div>
                              <button
                                type="button"
                                className="dropdownDayOption btnDays"
                                onClick={() => handleSelectAllDays(index)}
                              >
                                {slot.days.length === days.length
                                  ? "Clear All"
                                  : "Select All"}
                              </button>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="dropdownDayOption btnDays"
                                onClick={() => handleSelectWeekdays(index)}
                              >
                                Weekdays
                              </button>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="dropdownDayOption btnDays"
                                onClick={() => handleSelectWeekends(index)}
                              >
                                Weekends
                              </button>
                            </div>
                          </div>
                          {days.map((day) => (
                            <div key={day} className="checkbox-item">
                              <input
                                type="checkbox"
                                id={`${index}-${day}`}
                                checked={slot.days.includes(day)}
                                onChange={() => handleDayChange(index, day)}
                              />
                              <label htmlFor={`${index}-${day}`}>{day}</label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.days && (
                      <p style={{ color: "red" }}>{errors.days}</p>
                    )}
                  </div>
                </div>
                <div onClick={() => toggleDropdownforClose(index)}>
                  <label>Start Time:</label>
                  <div className="timeslot">
                    <select
                      value={slot.startHour}
                      onChange={(e) =>
                        handleInputChange(index, "startHour", e.target.value)
                      }
                    >
                      {hours.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    <select
                      value={slot.startMinute}
                      onChange={(e) =>
                        handleInputChange(index, "startMinute", e.target.value)
                      }
                    >
                      {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>
                    <select
                      value={slot.startPeriod}
                      onChange={(e) =>
                        handleInputChange(index, "startPeriod", e.target.value)
                      }
                    >
                      {periods.map((period) => (
                        <option key={period} value={period}>
                          {period}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.timeMismatch && (
                    <p style={{ color: "red" }} className="errorfont">
                      {errors.timeMismatch}
                    </p>
                  )}
                </div>
                <div onClick={() => toggleDropdownforClose(index)}>
                  <label>End Time:</label>
                  <div className="timeslot">
                    <select
                      value={slot.endHour}
                      onChange={(e) =>
                        handleInputChange(index, "endHour", e.target.value)
                      }
                    >
                      {hours.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    <select
                      value={slot.endMinute}
                      onChange={(e) =>
                        handleInputChange(index, "endMinute", e.target.value)
                      }
                    >
                      {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>
                    <select
                      value={slot.endPeriod}
                      onChange={(e) =>
                        handleInputChange(index, "endPeriod", e.target.value)
                      }
                    >
                      {periods.map((period) => (
                        <option key={period} value={period}>
                          {period}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.invalidTimeOrder && (
                    <p style={{ color: "red" }} className="errorfont">
                      {errors.invalidTimeOrder}
                    </p>
                  )}
                </div>
                <div className="dateAvialbility">
                  <label>Start Date:</label>
                  <DatePicker
                    selected={slot.fromDate ? new Date(slot.fromDate) : null}
                    onChange={(date) =>
                      handleInputChange(index, "fromDate", date)
                    }
                    dateFormat="yyyy-MM-dd"
                    minDate={today}
                    className="date-picker"
                  />
                  {errors.fromDate && (
                    <p style={{ color: "red" }} className="errorfont">
                      {errors.fromDate}
                    </p>
                  )}
                </div>
                <div className="dateAvialbility">
                  <label>End Date:</label>
                  <DatePicker
                    selected={slot.toDate ? new Date(slot.toDate) : null}
                    onChange={(date) =>
                      handleInputChange(index, "toDate", date)
                    }
                    dateFormat="yyyy-MM-dd"
                    minDate={today}
                    className="date-picker"
                  />
                  {errors.toDate && (
                    <p style={{ color: "red" }} className="errorfont">
                      {errors.toDate}
                    </p>
                  )}
                  {errors.invalidDateOrder && (
                    <p style={{ color: "red" }} className="errorfont">
                      {errors.invalidDateOrder}
                    </p>
                  )}
                </div>
                <div
                  className="availability-duration"
                  onClick={() => toggleDropdownforClose(index)}
                >
                  <label>Duration:</label>
                  <select
                    value={slot.duration}
                    onChange={(e) =>
                      handleInputChange(index, "duration", e.target.value)
                    }
                  >
                    {durations.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                className="availability-saveDiv"
                onClick={() => toggleDropdownforClose(index)}
              >
                {/* <button
                  type="button"
                  onClick={() => saveSlotForIndex(index)}
                  className="save-btn"
                >
                  Save Slot
                </button> */}
                <div>
                  {errors.overlap && (
                    <p style={{ color: "red" }} className="errorfont">
                      {errors.overlap}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => saveSlotForIndex(index)}
                  style={{
                    backgroundColor: isSaved[index] ? "green" : "#0255ca",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  {isSaved[index] ? "Saved" : "Save Slot"}
                </button>
              </div>
            </div>
          );
        })}
        <div className="addBtnAvailability">
          <button type="button" onClick={addSlot} className="add-slot-btn">
            Add Slot
          </button>
        </div>
      </div>
        {/* Save Button at the Bottom */}
        <div className="save-button-container">
        <button
          type="button"
          onClick={handleSave}
          className="btn juybeubrer_btn btn-primary"
        >
          Save
        </button>
      </div>
    </div>

  );
};

export default MentorProfile4;
