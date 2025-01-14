import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import "./Test.css";
const CircularImageUploader = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);

  // Handle image input change
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cropping
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas({
        width: 300, // Adjust canvas size for the cropped image
        height: 300, // Square output, suitable for a circle
      });
      setCroppedImage(canvas.toDataURL()); // Preview the cropped image
    }
  };

  // Submit the image as FormData to the backend
  const handleSubmit = async () => {
    if (croppedImage) {
      const blob = await fetch(croppedImage).then((res) => res.blob());
      const formData = new FormData();
      formData.append("file", blob, "croppedCircleImage.png");

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Image uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  const ProgressBar = ({ progress }) => {
    const progressBarStyles = {
      height: "20px",
      width: "100%",
      backgroundColor: "#e0e0de",
      borderRadius: "5px",
      overflow: "hidden",
      margin: "20px 0",
    };

    const fillerStyles = {
      height: "100%",
      width: `${progress}%`,
      backgroundColor: progress < 50 ? "#f44336" : "#4caf50", // Red if < 50, Green if >= 50
      borderRadius: "inherit",
      textAlign: "right",
      transition: "width 0.5s ease-in-out",
    };

    const labelStyles = {
      padding: "5px",
      color: "white",
      fontWeight: "bold",
    };

    return (
      <div style={progressBarStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${progress}%`}</span>
        </div>
      </div>
    );
  };

  const timeslots = [
    { id: 1, start: "00:00", end: "00:30", label: "12:00 AM - 12:30 AM" },
    { id: 2, start: "00:30", end: "01:00", label: "12:30 AM - 01:00 AM" },
    { id: 3, start: "01:00", end: "01:30", label: "01:00 AM - 01:30 AM" },
    { id: 4, start: "01:30", end: "02:00", label: "01:30 AM - 02:00 AM" },
    { id: 5, start: "02:00", end: "02:30", label: "02:00 AM - 02:30 AM" },
    { id: 6, start: "02:30", end: "03:00", label: "02:30 AM - 03:00 AM" },
    { id: 7, start: "03:00", end: "03:30", label: "03:00 AM - 03:30 AM" },
    { id: 8, start: "03:30", end: "04:00", label: "03:30 AM - 04:00 AM" },
    { id: 9, start: "04:00", end: "04:30", label: "04:00 AM - 04:30 AM" },
    { id: 10, start: "04:30", end: "05:00", label: "04:30 AM - 05:00 AM" },
    { id: 11, start: "05:00", end: "05:30", label: "05:00 AM - 05:30 AM" },
    { id: 12, start: "05:30", end: "06:00", label: "05:30 AM - 06:00 AM" },
    { id: 13, start: "06:00", end: "06:30", label: "06:00 AM - 06:30 AM" },
    { id: 14, start: "06:30", end: "07:00", label: "06:30 AM - 07:00 AM" },
    { id: 15, start: "07:00", end: "07:30", label: "07:00 AM - 07:30 AM" },
    { id: 16, start: "07:30", end: "08:00", label: "07:30 AM - 08:00 AM" },
    { id: 17, start: "08:00", end: "08:30", label: "08:00 AM - 08:30 AM" },
    { id: 18, start: "08:30", end: "09:00", label: "08:30 AM - 09:00 AM" },
    { id: 19, start: "09:00", end: "09:30", label: "09:00 AM - 09:30 AM" },
    { id: 20, start: "09:30", end: "10:00", label: "09:30 AM - 10:00 AM" },
    { id: 21, start: "10:00", end: "10:30", label: "10:00 AM - 10:30 AM" },
    { id: 22, start: "10:30", end: "11:00", label: "10:30 AM - 11:00 AM" },
    { id: 23, start: "11:00", end: "11:30", label: "11:00 AM - 11:30 AM" },
    { id: 24, start: "11:30", end: "12:00", label: "11:30 AM - 12:00 PM" },
    { id: 25, start: "12:00", end: "12:30", label: "12:00 PM - 12:30 PM" },
    { id: 26, start: "12:30", end: "13:00", label: "12:30 PM - 01:00 PM" },
    { id: 27, start: "13:00", end: "13:30", label: "01:00 PM - 01:30 PM" },
    { id: 28, start: "13:30", end: "14:00", label: "01:30 PM - 02:00 PM" },
    { id: 29, start: "14:00", end: "14:30", label: "02:00 PM - 02:30 PM" },
    { id: 30, start: "14:30", end: "15:00", label: "02:30 PM - 03:00 PM" },
    { id: 31, start: "15:00", end: "15:30", label: "03:00 PM - 03:30 PM" },
    { id: 32, start: "15:30", end: "16:00", label: "03:30 PM - 04:00 PM" },
    { id: 33, start: "16:00", end: "16:30", label: "04:00 PM - 04:30 PM" },
    { id: 34, start: "16:30", end: "17:00", label: "04:30 PM - 05:00 PM" },
    { id: 35, start: "17:00", end: "17:30", label: "05:00 PM - 05:30 PM" },
    { id: 36, start: "17:30", end: "18:00", label: "05:30 PM - 06:00 PM" },
    { id: 37, start: "18:00", end: "18:30", label: "06:00 PM - 06:30 PM" },
    { id: 38, start: "18:30", end: "19:00", label: "06:30 PM - 07:00 PM" },
    { id: 39, start: "19:00", end: "19:30", label: "07:00 PM - 07:30 PM" },
    { id: 40, start: "19:30", end: "20:00", label: "07:30 PM - 08:00 PM" },
    { id: 41, start: "20:00", end: "20:30", label: "08:00 PM - 08:30 PM" },
    { id: 42, start: "20:30", end: "21:00", label: "08:30 PM - 09:00 PM" },
    { id: 43, start: "21:00", end: "21:30", label: "09:00 PM - 09:30 PM" },
    { id: 44, start: "21:30", end: "22:00", label: "09:30 PM - 10:00 PM" },
    { id: 45, start: "22:00", end: "22:30", label: "10:00 PM - 10:30 PM" },
    { id: 46, start: "22:30", end: "23:00", label: "10:30 PM - 11:00 PM" },
    { id: 47, start: "23:00", end: "23:30", label: "11:00 PM - 11:30 PM" },
    { id: 48, start: "23:30", end: "00:00", label: "11:30 PM - 12:00 AM" },
  ];

  return (
    <>
      <h2>Progress Bar Example</h2>
      <ProgressBar progress={40} />{" "}
      <select name="" id="">
        {timeslots.map((slot) => {
          return <option value={slot.label}>{slot.label}</option>;
        })}
      </select>
    </>
  );
};

export default CircularImageUploader;
