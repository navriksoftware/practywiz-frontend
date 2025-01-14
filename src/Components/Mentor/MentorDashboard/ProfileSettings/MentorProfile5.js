import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const Mentorprofile5 = ({ profiledata, user, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const url = ApiURL();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);

  // Handle image input change
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setCroppedImage(null); // Reset croppedImage when a new image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cropping
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas({
        width: 400, // Adjust canvas size for the cropped image
        height: 400, // Square output, suitable for a circle
      });
      setCroppedImage(canvas.toDataURL()); // Automatically update the preview
    }
  };

  // Submit cropped image to backend
  const handleCropSubmit = async () => {
    if (croppedImage) {
      const blob = await fetch(croppedImage).then((res) => res.blob());
      const formData1 = new FormData();
      formData1.append("image", blob);
      formData1.append("mentorUserDtlsId", user?.user_id);
      formData1.append("mentorEmail", profiledata?.mentor_email);
      formData1.append("mentorPhoneNumber", profiledata?.mentor_phone_number);

      try {
        dispatch(showLoadingHandler());
        const response = await axios.post(
          `${url}api/v1/mentor/dashboard/update/profile-picture`,
          formData1,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.success) {
          dispatch(hideLoadingHandler());
          toast.success("Profile picture updated successfully.");
          setIsEditing(false);
        } else {
          toast.error("Error updating profile picture.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the profile picture.");
      } finally {
        dispatch(hideLoadingHandler());
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <main>
      {!isEditing ? (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEditClick}
          >
            Close
          </button>
        </div>
      )}
      <div className="">
        {isEditing ? (
          <div>
            <h4>Update your profile picture</h4>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div className="d-flex py-4 align-items-center justify-content space-evenly">
              {image ? (
                <div>
                  <h3>Adjust your image:</h3>
                  <Cropper
                    src={image}
                    style={{
                      height: 300,
                      width: 300,
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginBottom: "10px",
                    }}
                    aspectRatio={1}
                    guides={false}
                    viewMode={1}
                    ref={cropperRef}
                    background={false}
                    zoomable={true}
                    crop={handleCrop} // Call handleCrop whenever user adjusts the image
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: "350px",
                    height: "350px",
                    border: "2px dashed #ccc", // Dashed border to indicate the placeholder
                    borderRadius: "50%", // Makes it circular
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc", // Light gray color for text
                    fontSize: "18px", // Font size for placeholder text
                    textAlign: "center",
                  }}
                >
                  Please select the file and Adjust it.
                </div>
              )}

              {croppedImage ? (
                <div>
                  <h3>Profile Picture Preview:</h3>
                  <div
                    style={{
                      width: 300,
                      height: 300,
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      src={croppedImage}
                      alt="Cropped"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleCropSubmit}
                    className="btn btn-main"
                  >
                    UPDATE PROFILE PICTURE
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      width: "350px",
                      height: "350px",
                      border: "2px dashed #ccc", // Dashed border to indicate the placeholder
                      borderRadius: "50%", // Makes it circular
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ccc", // Light gray color for text
                      fontSize: "18px", // Font size for placeholder text
                      textAlign: "center",
                    }}
                  >
                    No Image Available
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="position-relative overflow-hidden">
            <h4>Update your profile picture</h4>
            <img
              src={profiledata?.mentor_profile_photo}
              alt="Profile"
              style={{
                width: "300px",
                maxHeight: "300px",
                borderRadius: "50%",
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Mentorprofile5;
