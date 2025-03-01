import React, { useState, useEffect } from "react";
import "./EmailPopup.css";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import {
  showLoadingHandler,
  hideLoadingHandler,
} from "../../Redux/loadingRedux";
import { ApiURL } from "../../Utils/ApiURL";
import axios from "axios";

const content = `Hi,
I'm interested in authoring a case from my corporate experience.
The case consultant to connect with me on the below contact details.`;
const EmailPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [validation, setValidation] = useState({
    name: true,
    email: true,
    phone: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const url = ApiURL();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);

    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length >= 2;
      case "email":
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(value).toLowerCase());
      case "phone":
        // For international phone numbers, we'll just check if it has at least 6 digits
        // This is a basic validation - the PhoneInput component handles most validation
        return value && value.replace(/\D/g, "").length >= 6;
      default:
        return true;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidation({
      ...validation,
      [name]: true, // Reset validation on change
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
    setValidation({
      ...validation,
      phone: true, // Reset validation on change
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const nameValid = validateField("name", formData.name);
    const emailValid = validateField("email", formData.email);
    const phoneValid = validateField("phone", formData.phone);

    setValidation({
      name: nameValid,
      email: emailValid,
      phone: phoneValid,
    });

    // If any validation fails, stop submission
    if (!nameValid || !emailValid || !phoneValid) {
      return;
    }

    try {
      setIsSubmitting(true);
      dispatch(showLoadingHandler());

      // This is where you'll connect to your backend later
      // For now, we'll just simulate a successful submission
      const response = await axios.post(
        `${url}api/v1/case-studies/connect-with-consultant`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }
      );

      // Simulate network delay
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulated success
      toast.success("Thank you! Our case consultant will connect with you.", {
        position: "top-right",
        autoClose: 5000,
      });
      setFormData({ name: "", email: "", phone: "" });
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
        {
          position: "top-right",
        }
      );
    } finally {
      setIsSubmitting(false);
      dispatch(hideLoadingHandler());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="email-popup-backdrop">
      <div className="email-popup-container">
        <div className="email-popup-header">
          <h3>Connect with a case consultant</h3>
          <button className="email-popup-close" onClick={onClose}>
            <i className="fa-solid fa-close"></i>
          </button>
        </div>
        <div className="email-popup-content">
          <p style={{ whiteSpace: "pre-line" }}>{content}</p>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="email-input-container">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name *"
                className={!validation.name ? "email-input-error" : ""}
                disabled={isSubmitting}
                autoFocus
                required
              />
              {!validation.name && (
                <p className="error-message">
                  Please enter your name (minimum 2 characters)
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="email-input-container">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email address *"
                className={!validation.email ? "email-input-error" : ""}
                disabled={isSubmitting}
                required
              />
              {!validation.email && (
                <p className="error-message">
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="email-input-container">
              <div className={!validation.phone ? "phone-input-error" : ""}>
                <PhoneInput
                  country="in"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Your phone number *"
                  inputProps={{
                    name: "phone",
                    required: true,
                    disabled: isSubmitting,
                  }}
                  countryCodeEditable={false}
                />
              </div>
              {!validation.phone && (
                <p className="error-message">
                  Please enter a valid phone number
                </p>
              )}
            </div>

            <div className="email-popup-actions">
              <button
                type="button"
                onClick={onClose}
                className="cancel-button"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
          <div className="email-popup-branding">
            PractyWiz — Join The Knowledge Revolution
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;
