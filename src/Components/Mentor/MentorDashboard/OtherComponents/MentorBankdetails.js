import React, { useState } from "react";
import axios from "axios";
import "../DashboardCSS/institutemessage.css";
import "../DashboardCSS/BankDetails.css";
import { ApiURL } from "../../../../Utils/ApiURL";
import { toast } from "react-toastify";

const MentorBankdetails = ({ data, user, token }) => {
  const url = ApiURL();
  const mentorUserDtlsId = user?.user_id;
  const mentorDtlsId = data[0].mentor_dtls_id;
  const [formData, setFormData] = useState({
    accountHolderName: "",
    ifscCode: "",
    bankName: "",
    branch: "",
    swift: "",
    bankAddress: "",
    accountType: "",
    accountNumber: "",
    reenterAccountNumber: "",
    panNumber: "",
  });

  const [errors, setErrors] = useState({
    accountNumber: "",
    ifscCode: "",
    panNumber: "",
    accountHolderName: "",
    reenterAccountNumber: "",
    accountType: "",
  });
  const [bankDetailsError, setBankDetailsError] = useState("");
  const handleChange = async (e) => {
    const { name, value } = e.target;

    let processedValue =
      name === "accountHolderName" ? value : value.replace(/\s+/g, "");

    if (name === "panNumber") {
      if (processedValue.length > 10) {
        setFormData({
          ...formData,
          [name]: processedValue.slice(0, 10),
        });
      } else {
        setFormData({
          ...formData,
          [name]: processedValue.toUpperCase(),
        });
      }

      if (processedValue.length === 10) {
        validateField(name, processedValue);
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    } else if (name === "accountNumber" || name === "reenterAccountNumber") {
      if (/^\d*$/.test(processedValue) && processedValue.length <= 16) {
        setFormData({
          ...formData,
          [name]: processedValue,
        });
      }
      validateField(name, processedValue);
    } else if (name === "ifscCode") {
      const ifscPattern = /^[A-Z]{0,4}0?\d{0,6}$/;
      if (ifscPattern.test(processedValue.toUpperCase())) {
        setFormData({
          ...formData,
          [name]: processedValue.toUpperCase(),
        });

        if (processedValue.length === 11) {
          try {
            const response = await axios.get(
              `https://ifsc.razorpay.com/${processedValue.toUpperCase()}`
            );
            const { BANK, BRANCH, STATE, ADDRESS, SWIFT } = response.data;

            setFormData((prevData) => ({
              ...prevData,
              bankName: BANK,
              branch: BRANCH,
              swift: SWIFT || "N/A", // SWIFT code might not be available for some banks
              bankAddress: `${ADDRESS}, ${STATE}`,
            }));

            setBankDetailsError("");
          } catch (error) {
            setFormData((prevData) => ({
              ...prevData,
              bankName: "",
              branch: "",
              swift: "",
              bankAddress: "",
            }));
            setBankDetailsError(
              "Failed to fetch bank details. Please check the IFSC code."
            );
            console.error("Failed to fetch bank details:", error);
          }
        } else {
          setFormData((prevData) => ({
            ...prevData,
            bankName: "",
            branch: "",
            swift: "",
            bankAddress: "",
          }));
        }
      }
    } else {
      setFormData({
        ...formData,
        [name]: processedValue,
      });
    }

    validateField(name, processedValue);
  };

  const validateField = (name, value) => {
    let error = "";

    if (value.trim() !== "") {
      switch (name) {
        case "panNumber":
          const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
          if (value.length === 10 && !panPattern.test(value)) {
            error =
              "Invalid PAN number format. Please enter in AAAAA9999A format.";
          }
          break;
        case "accountNumber":
        case "reenterAccountNumber":
          if (value.length < 11 || value.length > 16) {
            error = "Account number must be between 11 and 16 digits";
          } else if (
            name === "reenterAccountNumber" &&
            value !== formData.accountNumber
          ) {
            error = "Account numbers do not match";
          }
          break;
        case "ifscCode":
          const ifscPattern = /^[A-Z]{4}0\d{6}$/;
          if (value.length < 11 && !ifscPattern.test(value)) {
            error =
              "Invalid IFSC code format. Please enter in [AAAA 0 111111] format.";
          }
          break;
        case "accountHolderName":
          if (value.trim() === "") {
            error = "Account Holder Name is required";
          }
          break;
        case "accountType":
          if (value === "") {
            error = "Account Type is required";
          }
          break;
        default:
          break;
      }
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((field) =>
      validateField(field, formData[field])
    );
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      return;
    }
    try {
      const response = await axios.post(
        `${url}api/v1/mentor/dashboard/bank-details`,
        {
          userId: mentorUserDtlsId,
          mentorDtlsId: mentorDtlsId,
          formData: formData,
        }
      );
      if (response.data.success) {
        // eslint-disable-next-line no-sequences
        return toast.success(response.data.success), handleReset();
      }
      if (response.data.error) {
        // eslint-disable-next-line no-sequences
        return toast.error(response.data.error), handleReset();
      }
      handleReset();
      setErrors({
        panNumber: "",
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
        reenterAccountNumber: "",
        accountType: "",
      });
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const handleReset = () => {
    setFormData({
      ifscCode: "",
      accountHolderName: "",
      bankName: "",
      branch: "",
      swift: "",
      bankAddress: "",
      accountType: "",
      accountNumber: "",
      reenterAccountNumber: "",
      panNumber: "",
    });
    setBankDetailsError("");

    setErrors({
      accountNumber: "",
      ifscCode: "",
      panNumber: "",
      accountHolderName: "",
      reenterAccountNumber: "",
      accountType: "",
    });
  };
  return (
    <div className="col-lg-10 ps-0">
      <div className="mentor_dash_msge">
        <div id="">
          <div className="bank-details-container">
            {data[0]?.banking_dtls_list === null ? (
              <>
                <h3 style={{ margin: "0 auto 16px auto", textAlign: "center" }}>
                  Bank Details Entry Form
                </h3>
                <form onSubmit={handleSubmit} className="bank-details-form">
                  <div className="form-group">
                    <label htmlFor="accountHolderName">
                      Account Holder Name:
                    </label>
                    <input
                      type="text"
                      id="accountHolderName"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      required
                    />
                    {errors.accountHolderName && (
                      <div className="error">{errors.accountHolderName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="ifscCode">IFSC Code:</label>
                    <input
                      type="text"
                      id="ifscCode"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      required
                      pattern="^[A-Z]{4}0\d{6}$"
                      style={{ textTransform: "uppercase" }}
                    />
                    {errors.ifscCode && (
                      <div className="error">{errors.ifscCode}</div>
                    )}
                    {bankDetailsError && (
                      <div className="error">{bankDetailsError}</div>
                    )}
                  </div>
                  {formData.bankName && (
                    <>
                      <div className="form-group">
                        <label htmlFor="bankName">Bank Name:</label>
                        <input
                          type="text"
                          id="bankName"
                          name="bankName"
                          value={formData.bankName}
                          readOnly
                          style={{
                            backgroundColor: "#e9ecef",
                            color: "#007bff",
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="branch">Branch:</label>
                        <input
                          type="text"
                          id="branch"
                          name="branch"
                          value={formData.branch}
                          readOnly
                          style={{
                            backgroundColor: "#e9ecef",
                            color: "#007bff",
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="swift">SWIFT Code:</label>
                        <input
                          type="text"
                          id="swift"
                          name="swift"
                          value={formData.swift}
                          readOnly
                          style={{
                            backgroundColor: "#e9ecef",
                            color: "#007bff",
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="bankAddress">Bank Address:</label>
                        <input
                          type="text"
                          id="bankAddress"
                          name="bankAddress"
                          value={formData.bankAddress}
                          readOnly
                          style={{
                            backgroundColor: "#e9ecef",
                            color: "#007bff",
                          }}
                        />
                      </div>
                    </>
                  )}
                  <div className="form-group">
                    <label htmlFor="accountType">Account Type:</label>
                    <select
                      id="accountType"
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Account Type</option>
                      <option value="saving">Saving Account</option>
                      <option value="current">Current Account</option>
                    </select>
                    {errors.accountType && (
                      <div className="error">{errors.accountType}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="accountNumber">Account Number:</label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      required
                    />
                    {errors.accountNumber && (
                      <div className="error">{errors.accountNumber}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="reenterAccountNumber">
                      Re-enter Account Number:
                    </label>
                    <input
                      type="text"
                      id="reenterAccountNumber"
                      name="reenterAccountNumber"
                      value={formData.reenterAccountNumber}
                      onChange={handleChange}
                      required
                    />
                    {errors.reenterAccountNumber && (
                      <div className="error">{errors.reenterAccountNumber}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="panNumber">PAN Number:</label>
                    <input
                      type="text"
                      id="panNumber"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      onBlur={(e) =>
                        validateField(e.target.name, e.target.value)
                      }
                      required
                      style={{ textTransform: "uppercase" }}
                    />
                    {errors.panNumber && (
                      <div className="error">{errors.panNumber}</div>
                    )}
                  </div>
                  <div className="btnContainer">
                    <button
                      type="submit"
                      className="btn1 btn-main me-3 btn_bank_details"
                    >
                      Add Bank Account
                    </button>
                    <button
                      type="button"
                      className="btn1 btn-main me-3 btn_bank_details"
                      onClick={handleReset}
                    >
                      Clear All
                    </button>
                  </div>
                  <p className="text-danger">
                    (*Once you submitted the Bank details it can not edited. You
                    need to contact <b>Practywiz</b> admin for the correction of
                    bank details*)
                  </p>
                </form>
                <br />
              </>
            ) : (
              JSON?.parse(data[0]?.banking_dtls_list).map((bank) => {
                return (
                  <>
                    <h3
                      key={bank.mentor_bank_dtls_id}
                      style={{
                        margin: "0 auto 16px auto",
                        textAlign: "center",
                      }}
                    >
                      Your Bank Details
                    </h3>
                    <form className="bank-details-form">
                      <div className="form-group">
                        <label htmlFor="accountHolderName">
                          Account Holder Name:
                          {" " + bank.mentor_bank_account_holder_name}
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="ifscCode">
                          IFSC Code:
                          {" " + bank.mentor_bank_account_ifsc_code}
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="bankName">
                          Bank Name:
                          {" " + bank.mentor_bank_name}
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="branch">
                          Branch: {" " + bank.mentor_bank_branch}
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="swift">
                          SWIFT Code:
                          {" " + bank.mentor_bank_swift_code}
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="bankAddress">
                          Bank Address:
                          {" " + bank.mentor_bank_address}
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="accountType">
                          Account Type:
                          {" " + bank.mentor_bank_account_type}
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="accountNumber">
                          Account Number:
                          {" " + bank.mentor_bank_account_number}
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="panNumber">
                          PAN Number:
                          {" " + bank.mentor_bank_pan_number}
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="panNumber">
                          You updated the bank details on :
                          {" " +
                            new Date(
                              bank.mentor_bank_cr_date
                            ).toLocaleDateString()}
                        </label>
                      </div>
                      <p className="text-danger">
                        (*Once you submitted the Bank details it can not edited.
                        You need to contact <b>Practywiz</b> admin for the
                        correction of bank details*)
                      </p>
                    </form>

                    <br />
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorBankdetails;
