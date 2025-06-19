import React, { useState, useRef } from "react";
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
import "../DashboardCSS/mobileMenteeProfile.css";
import { useEffect } from "react";

const Menteeprofile3 = ({ singleMentee, user, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const url = ApiURL();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);
  const [singleMenteeDetails, setSingleMenteeDetails] = useState([]);
  const menteeDtlsId = user?.user_id;

  const getMenteeImageUrl = async () => {
    try {
      const response = await axios.post(
        `${url}api/v1/mentee/dashboard/fetch-single-details/${menteeDtlsId}`,
        { userId: menteeDtlsId }
      );

      if (response.data.success) {
        setSingleMenteeDetails(response.data.success[0]);
      }
    } catch (error) {
      console.error("Error fetching mentee details:", error);
    }
  };
  useEffect(() => {
    getMenteeImageUrl();
  }, []);

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
      formData1.append("menteeUserDtlsId", user?.user_id); // Append user ID to the form data
      try {
        dispatch(showLoadingHandler());
        const response = await Promise.race([
          axios.post(
            `${url}api/v1/mentee/dashboard/profile/profile-picture`,
            formData1,
            {
              headers: {
                authorization: "Bearer " + token,
                // No need to set "Content-Type" header explicitly; Axios does this automatically
              },
            }
          ),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 45000)
          ),
        ]);
        if (response.data.success) {
          getMenteeImageUrl();
          dispatch(hideLoadingHandler());
          toast.success("Profile picture updated successfully.");
        } else if (response.data.error) {
          dispatch(hideLoadingHandler());
          toast.error("Error updating profile picture. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the profile picture.");
        dispatch(hideLoadingHandler());
      } finally {
        dispatch(hideLoadingHandler());
        setIsEditing(false);
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
            <div className="d-flex py-4 align-items-center justify-content space-evenly mob-column">
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
              src={singleMenteeDetails?.mentee_profile_pic_url || ""}
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

export default Menteeprofile3;
