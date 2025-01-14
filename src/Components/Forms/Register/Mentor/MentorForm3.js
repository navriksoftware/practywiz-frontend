import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MentorForm3.css";
import { Controller, useFormContext } from "react-hook-form";
import GoToTop from "../../../../Utils/GoToTop";
import { toast } from "react-toastify";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialTime = {
  hours: "00",
  minutes: "00",
  ampm: "PM",
};

const initialDate = {};

const MentorForm3 = () => {
  const [condition, setCondition] = useState(true);

  const defaultShow = () => {
    if (condition) {
      setCondition(false);
    }
  };

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext({
    defaultValues: daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: [
          {
            from: initialTime,
            to: initialTime,
          },
        ],
      }),
      {}
    ),
  });

  const [selectedDays, setSelectedDays] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: false }), {})
  );

  const [timeInputs, setTimeInputs] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          from: initialTime,
          to: initialTime,
          date: initialDate,
          recurring: initialDate,
        },
      }),
      {}
    )
  );

  const [timeSlotTags, setTimeSlotTags] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );

  const handleDaySwitch = (day, checked) => {
    setSelectedDays((prev) => ({ ...prev, [day]: checked }));
    if (!checked) {
      setValue(day, []);
      setTimeSlotTags((prev) => ({ ...prev, [day]: [] }));
    }
  };

  const handleTimeChange = (day, type, value) => {
    if (type === "from") {
      const fromTime = value;
      const fromHours = parseInt(fromTime.hours, 10);
      const toMinutes = parseInt(fromTime.minutes, 10) + 30;
      let toHours = fromHours;
      let toAmPm = fromTime.ampm;

      if (toMinutes >= 60) {
        toHours = (toHours + 1) % 12 || 12;
        toAmPm = toHours === 12 ? (toAmPm === "AM" ? "PM" : "AM") : toAmPm;
      }

      const toTime = {
        hours: toHours.toString().padStart(2, "0"),
        minutes: (toMinutes % 60).toString().padStart(2, "0"),
        ampm: toAmPm,
      };

      setTimeInputs((prev) => ({
        ...prev,
        [day]: { ...prev[day], from: fromTime, to: toTime },
      }));
    } else {
      setTimeInputs((prev) => ({
        ...prev,
        [day]: { ...prev[day], [type]: value },
      }));
    }
  };

  const handleOkClick = (day) => {
    const { from, to, date, recurring } = timeInputs[day];

    // Check if all fields are filled
    if (
      !from.hours ||
      !from.minutes ||
      !from.ampm ||
      !to.hours ||
      !to.minutes ||
      !to.ampm ||
      !date.Mentor_timeslot_rec_end_date ||
      !recurring.mentor_timeslot_rec_indicator
    ) {
      return toast.error(
        "Please fill in all the fields before adding the slot.",
        {
          position: "top-right", // Directly specifying the position
        }
      );
    }

    const timeSlot = { from, to, date, recurring };
    const updatedTags = [...timeSlotTags[day], timeSlot];
    setTimeSlotTags((prev) => ({ ...prev, [day]: updatedTags }));
    setValue(day, updatedTags);
    setTimeInputs((prev) => ({
      ...prev,
      [day]: {
        from: initialTime,
        to: initialTime,
        date: { Mentor_timeslot_rec_end_date: "" },
        recurring: { mentor_timeslot_rec_indicator: "" },
      },
    }));
  };

  const handleRemoveTag = (day, index) => {
    const updatedTags = timeSlotTags[day].filter((_, i) => i !== index);
    setTimeSlotTags((prev) => ({ ...prev, [day]: updatedTags }));
    setValue(day, updatedTags);
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = "" + (d.getMonth() + 1);
    const day = "" + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  };

  return (
    <>
      {/* <div className="line-1"></div> */}
      <div className="whole">
        <div className="doiherner_wrapper">
          <div className="linesepration">
            <div className="line-2">Select Day</div>

            <span className="line-3">
              Choose your preferred time slots for the selected day
              <span className="RedColorStarMark">*</span>
            </span>
          </div>
          <div className="main">
            <div className="dayColumn">
              {daysOfWeek.map((day) => (
                <div key={day} style={styles.dayRow} className="daycolumns">
                  <h6 style={styles.dayLabel}>{day}</h6>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={selectedDays[day]}
                      onChange={(e) => handleDaySwitch(day, e.target.checked)}
                      onClick={defaultShow}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              ))}
            </div>
            <div className="Timecolumn">
              {condition ? (
                <>
                  <div
                    style={{
                      width: "85%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "3px solid #bdbdbd",
                      borderRadius: "3rem",
                      flexDirection: "column",
                      marginLeft: "2.5rem",
                      gap: "1.5rem",
                    }}
                  >
                    <i
                      className="fa-solid fa-calendar-check "
                      style={{ color: " #bdbdbd", fontSize: "200px" }}
                    >
                      {" "}
                    </i>
                    <div className="line-1">Set Your Availability</div>{" "}
                  </div>
                </>
              ) : (
                <>
                  {daysOfWeek.map(
                    (day) =>
                      selectedDays[day] && (
                        <div key={day} className="innertimeslot">
                          <div className="slotrow">
                            <h6>{day}</h6>

                            <div className="timeslots">
                              <CustomTimePicker
                                value={timeInputs[day].from}
                                onChange={(value) =>
                                  handleTimeChange(day, "from", value)
                                }
                              />
                              <span style={styles.toLabel}>to</span>

                              <CustomTimePicker
                                value={timeInputs[day].to}
                                onChange={(value) =>
                                  handleTimeChange(day, "to", value)
                                }
                              />
                            </div>
                            <div className="label-input">
                              <label>Recurring</label>
                              <Controller
                                control={control}
                                name={`${day}.recurring`}
                                render={({ field }) => (
                                  <select
                                    {...field}
                                    value={
                                      timeInputs[day].recurring
                                        .mentor_timeslot_rec_indicator
                                    }
                                    onChange={(e) =>
                                      handleTimeChange(day, "recurring", {
                                        ...timeInputs[day].recurring,
                                        mentor_timeslot_rec_indicator:
                                          e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">None</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                  </select>
                                )}
                              />
                            </div>
                            <div className="label-input">
                              <label>End date</label>
                              <Controller
                                control={control}
                                name={`${day}.date`}
                                render={({ field }) => (
                                  <DatePicker
                                    {...field}
                                    selected={
                                      timeInputs[day].date
                                        .Mentor_timeslot_rec_end_date
                                    }
                                    onChange={(date) =>
                                      handleTimeChange(day, "date", {
                                        ...timeInputs[day].date,
                                        Mentor_timeslot_rec_end_date:
                                          formatDate(date),
                                      })
                                    }
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="End Date"
                                    minDate={new Date()} // Prevent past dates
                                    style={styles.datePicker}
                                  />
                                )}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleOkClick(day)}
                              style={styles.okButton}
                            >
                              ADD
                            </button>
                          </div>

                          {timeSlotTags[day].map((slot, index) => (
                            <div key={index} className="tag">
                              <span>{`${slot.from.hours}:${slot.from.minutes} ${
                                slot.from.ampm
                              } - ${slot.to.hours}:${slot.to.minutes} ${
                                slot.to.ampm
                              }, Recurring: ${
                                slot.recurring.mentor_timeslot_rec_indicator
                              }, End Date: ${
                                slot.date.Mentor_timeslot_rec_end_date || "N/A"
                              }`}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(day, index)}
                                style={styles.removeButton}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <p className="errorMessage">Please add at least one time slot.</p>
      )}
      <GoToTop />
    </>
  );
};

const CustomTimePicker = ({ value, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value: inputValue } = e.target;
    onChange({ ...value, [name]: inputValue });
  };

  const hoursOptions = Array.from({ length: 13 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const minutesOptions = ["00", "15", "30", "45"];

  return (
    <div className="time-picker">
      <select
        name="hours"
        value={value.hours}
        onChange={handleInputChange}
        style={styles.timeSelect}
      >
        {hoursOptions.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      :
      <select
        name="minutes"
        value={value.minutes}
        onChange={handleInputChange}
        style={styles.timeSelect}
      >
        {minutesOptions.map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
      <select
        name="ampm"
        value={value.ampm}
        onChange={handleInputChange}
        style={styles.ampmSelect}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

const styles = {
  dayRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  dayLabel: {
    flexGrow: 1,
  },
  toLabel: {
    margin: "0 10px",
  },
  datePicker: {
    width: "100%",
  },
  timeSelect: {
    width: "50px",
    marginRight: "5px",
  },
  ampmSelect: {
    marginLeft: "5px",
  },
  okButton: {
    display: "block",
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  removeButton: {
    marginLeft: "10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default MentorForm3;
