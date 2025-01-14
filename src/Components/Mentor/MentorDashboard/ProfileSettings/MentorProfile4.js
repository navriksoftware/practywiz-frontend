import React, { useState, useEffect } from "react";
import { CURRENCY_CONFIG } from "../../../data/Currency_Convertion.js";

import Select from "react-select";
import { LanguageMulti } from "../../../data/Languages.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  hideLoadingHandler,
  showLoadingHandler,
} from "../../../../Redux/loadingRedux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ApiURL } from "../../../../Utils/ApiURL";

const MentorProfile4 = ({ profiledata, user, token }) => {
  const dispatch = useDispatch();
  const url = ApiURL();
  const customStyles = {
    control: (base, state) => ({
      ...base,
      display: "flex",
      width: "100%",
      // padding: "0.375rem 2.25rem 0.375rem 0.75rem",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#212529",
      // backgroundColor: "#fff",
      border: "1px solid #acaeaf",
      borderRadius: "0.25rem",
      transition:
        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
      appearance: "none",
      // Adjust border color on focus
      boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0,123,255,.25)" : "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  // Initial state setup with more robust default handling
  const [formData, setFormData] = useState({
    mentor_sessions_free_of_charge:
      profiledata?.mentor_sessions_free_of_charge || "",
    mentor_guest_lectures_interest:
      profiledata?.mentor_guest_lectures_interest || "",
    mentor_curating_case_studies_interest:
      profiledata?.mentor_curating_case_studies_interest || "",
    mentor_timezone: profiledata?.mentor_timezone || "",
    mentor_language: profiledata?.mentor_language,
    mentor_currency_type: profiledata?.mentor_currency_type || "USD",
    mentor_session_price: profiledata?.mentor_session_price || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    formData.mentor_currency_type
  );

  const [selectedSkills, setSelectedSkills] = useState(() => {
    try {
      return JSON.parse(profiledata?.mentor_language) || [];
    } catch (error) {
      console.error("Error parsing mentee_language:", error);
      return [];
    }
  });

  const [priceError, setPriceError] = useState("");

  // Get current currency configuration
  const getCurrentCurrencyConfig = () =>
    CURRENCY_CONFIG[selectedCurrency] || CURRENCY_CONFIG.USD;

  // Handle currency change with more robust logic
  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    const currencyConfig = CURRENCY_CONFIG[newCurrency];

    // Update form data and selected currency
    setFormData((prev) => ({
      ...prev,
      mentor_currency_type: newCurrency,
      mentor_session_price: "", // Reset price when currency changes
    }));
    setSelectedCurrency(newCurrency);
    setPriceError(""); // Clear any previous price errors
  };

  // Price change handler with comprehensive validation
  const handlePriceChange = (e) => {
    const value = e.target.value;
    const currencyConfig = getCurrentCurrencyConfig();

    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");

    // Check if empty
    if (numericValue === "") {
      setFormData((prev) => ({
        ...prev,
        mentor_session_price: "",
      }));
      setPriceError("");
      return;
    }

    const numericPrice = parseFloat(numericValue);

    // Validate price
    if (isNaN(numericPrice)) {
      setPriceError("Please enter a valid number");
      return;
    }

    // Check price range
    if (
      numericPrice < currencyConfig.range.min ||
      numericPrice > currencyConfig.range.max
    ) {
      setPriceError(
        `Price must be between ${currencyConfig.symbol}${currencyConfig.range.min} and ${currencyConfig.symbol}${currencyConfig.range.max}`
      );
      setFormData((prev) => ({
        ...prev,
        mentor_session_price: numericValue,
      }));
      return;
    }

    // Clear any previous errors
    setPriceError("");

    // Update form data
    setFormData((prev) => ({
      ...prev,
      mentor_session_price: numericValue,
    }));
  };

  // Language change handler
  const handleLanguageChange = (selectedOption) => {
    setSelectedSkills(selectedOption);
    setFormData((prev) => ({
      ...prev,
      mentor_language: selectedOption,
    }));
  };

  // Generic input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Comprehensive form validation
  const validateForm = () => {
    const requiredFields = [
      "mentor_sessions_free_of_charge",
      "mentor_guest_lectures_interest",
      "mentor_curating_case_studies_interest",
      "mentor_language",
      "mentor_session_price",
    ];

    // Check for empty required fields
    for (let field of requiredFields) {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        toast.error(`Please fill in all required fields`);
        return false;
      }
    }

    // Additional price validation
    const currencyConfig = getCurrentCurrencyConfig();
    const price = parseFloat(formData.mentor_session_price);
    if (
      isNaN(price) ||
      price < currencyConfig.range.min ||
      price > currencyConfig.range.max
    ) {
      toast.error(
        `Price must be between ${currencyConfig.symbol}${currencyConfig.range.min} and ${currencyConfig.symbol}${currencyConfig.range.max}`
      );
      return false;
    }

    return true;
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        dispatch(showLoadingHandler());

        const res = await axios.post(
          `${url}api/v1/mentor/dashboard/update/profile-4`,
          {
            formData,
            mentorUserDtlsId: user.user_id,
            mentor_email: profiledata?.mentor_email,
            mentorPhoneNumber: profiledata?.mentor_phone_number,
          },
          {
            headers: { authorization: "Bearer " + token },
          }
        );

        if (res.data.success) {
          toast.success("Profile Details updated successfully");
          setIsEditing(false);
        } else {
          toast.error(res.data.error || "Update failed");
        }
      } catch (error) {
        toast.error("Error updating profile details");
      } finally {
        dispatch(hideLoadingHandler());
      }
    }
  };

  return (
    <div className="doiherner_wrapper">
      <div className="ihduwfr_form_wrapper p-0" style={{ height: "auto" }}>
        {!isEditing && (
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              type="button"
              className="btn juybeubrer_btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
        <div className="row">
          {/* Currency Dropdown */}
          <div className="col-lg-6">
            <div className="mb-4">
              <label className="form-label">
                <b>Currency</b>
                <span className="RedColorStarMark">*</span>
              </label>
              <select
                className="form-select"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                disabled={!isEditing}
              >
                {Object.keys(CURRENCY_CONFIG).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing Input */}
          <div className="col-lg-6">
            <div className="mb-4">
              <label className="form-label">
                <b>Pricing</b> <span className="RedColorStarMark">*</span>
                <span className="text-muted">
                  (Range: {getCurrentCurrencyConfig().symbol}
                  {getCurrentCurrencyConfig().range.min} -
                  {getCurrentCurrencyConfig().symbol}
                  {getCurrentCurrencyConfig().range.max})
                </span>
              </label>
              <input
                type="text"
                className={`form-control ${priceError ? "is-invalid" : ""}`}
                value={formData.mentor_session_price}
                onChange={handlePriceChange}
                disabled={!isEditing}
                placeholder={`Enter price in ${selectedCurrency}`}
              />
              {priceError && (
                <div className="invalid-feedback">{priceError}</div>
              )}
            </div>
          </div>

          {/* Rest of the form remains the same as in previous implementation */}
          {/* Language Selection */}
          <div className="col-lg-6">
            <div className="mb-4">
              <label className="form-label">
                <b>Language</b>
                <span className="RedColorStarMark"></span>(Multiple)
              </label>
              <Select
                options={LanguageMulti}
                isMulti
                closeMenuOnSelect={false}
                styles={customStyles}
                onChange={handleLanguageChange}
                value={selectedSkills}
                isDisabled={!isEditing}
              />
            </div>
          </div>

          {/* Free Sessions Dropdown */}
          <div className="col-lg-6">
            <div className="mb-4">
              <label className="form-label">
                <b>Free Sessions for Alums</b>
                <span className="RedColorStarMark">*</span>
              </label>
              <select
                className="form-select"
                name="mentor_sessions_free_of_charge"
                value={formData.mentor_sessions_free_of_charge}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Guest Lectures Interest */}
          <div className="col-lg-6">
            <div className="mb-4">
              <label className="form-label">
                <b>Guest Lectures Interest</b>
                <span className="RedColorStarMark">*</span>
              </label>
              <select
                className="form-select"
                name="mentor_guest_lectures_interest"
                value={formData.mentor_guest_lectures_interest}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Case Studies Interest */}
          <div className="col-lg-6">
            <div className="mb-4">
              <label className="form-label">
                <b>Case Studies Interest</b>
                <span className="RedColorStarMark">*</span>
              </label>
              <select
                className="form-select"
                name="mentor_curating_case_studies_interest"
                value={formData.mentor_curating_case_studies_interest}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Edit/Save Buttons */}
        {isEditing && (
          <div className="d-flex justify-content-between m-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn juybeubrer_btn btn-primary"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn juybeubrer_btn btn-primary"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorProfile4;
