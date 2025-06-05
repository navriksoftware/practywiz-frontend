import axios from "axios";
import React, { useState, useEffect } from "react";
import { ApiURL } from "../../../../../Utils/ApiURL";
import { toast } from "react-toastify";

const Notification = ({ data: initialData, userId, token }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  // Update component data when props change
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const url = ApiURL();

  // Function to refresh notifications from server
  const refreshNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${url}api/v1/mentor/dashboard/notifications/${userId}`
      );
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error refreshing notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateToIST = (dateString) => {
    const date = new Date(dateString);
    // Convert the date to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istDate = new Date(date.getTime() + istOffset);

    // Format the date
    const formattedDate = istDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Format the time
    const formattedTime = istDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  const MarkAllAsReadNotHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}api/v1/mentor/dashboard/notification/mark-all-read`,
        { userId: userId }
      );
      if (response.data.success) {
        toast.success("Marked all messages as read successfully");
        // Update local state to reflect changes
        const updatedData = [...data];
        if (updatedData[0]?.notification_list) {
          const notificationList = JSON.parse(updatedData[0].notification_list);
          const updatedList = notificationList.map((notification) => ({
            ...notification,
            notification_is_read: true,
          }));
          updatedData[0].notification_list = JSON.stringify(updatedList);
          setData(updatedData);
        }
        // Refresh notifications to ensure sync with server
        await refreshNotifications();
      } else if (response.data.error) {
        toast.error("There is some error while reading the messages");
      }
    } catch (error) {
      toast.error("Failed to mark messages as read");
    } finally {
      setLoading(false);
    }
  };

  const MarkAsSingleReadHandler = async (notificationId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}api/v1/mentor/dashboard/notification/mark-single-read`,
        { userId: userId, notificationId: notificationId }
      );
      if (response.data.success) {
        toast.success("Marked message as read successfully");
        // Update local state to reflect changes
        const updatedData = [...data];
        if (updatedData[0]?.notification_list) {
          const notificationList = JSON.parse(updatedData[0].notification_list);
          const updatedList = notificationList.map((notification) =>
            notification.notification_dtls_id === notificationId
              ? { ...notification, notification_is_read: true }
              : notification
          );
          updatedData[0].notification_list = JSON.stringify(updatedList);
          setData(updatedData);
        }
        // Refresh notifications to ensure sync with server
        await refreshNotifications();
      } else if (response.data.error) {
        toast.error("There is some error while reading the message");
      }
    } catch (error) {
      toast.error("Failed to mark message as read");
    } finally {
      setLoading(false);
    }
  };

  // Determine if there are any notifications
  const hasNotifications =
    data &&
    data[0]?.notification_list &&
    JSON.parse(data[0]?.notification_list)?.length > 0;

  const notifications = hasNotifications
    ? JSON.parse(data[0]?.notification_list)
    : [];
  return (
    <div className="col-lg-10 col-md-12 ps-0">
      <div className="faculty-notification-wrapper">
        <div className="faculty-notification-container">
          <style>
            {`
              .faculty-notification-wrapper {
                width: 100%;
              }
              
              .faculty-notification-container {
                max-width: 1300px;
                padding: 20px;
                margin: 0 auto;
                background-color: #ffffff;
                transition: all 0.3s ease;
                position: relative;
              }
              
              .faculty-notification-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 28px;
                padding-bottom: 18px;
                border-bottom: 1px solid #f0f4f8;
              }
              
              .faculty-notification-title {
                font-size: 22px;
                font-weight: 700;
                color: #1a202c;
                margin: 0;
                letter-spacing: 0.5px;
                position: relative;
              }
              
              .faculty-notification-title:after {
                content: "";
                position: absolute;
                left: 0;
                bottom: -8px;
                width: 40px;
                height: 3px;
                background: linear-gradient(90deg, #4f7df9, #7293ff);
                border-radius: 10px;
              }
              
              .faculty-notification-mark-all {
                background: linear-gradient(90deg, #4f7df9, #6384fa);
                border: none;
                color: #ffffff;
                font-size: 14px;
                cursor: pointer;
                padding: 10px 18px;
                border-radius: 8px;
                transition: all 0.2s ease;
                font-weight: 500;
                box-shadow: 0 4px 10px rgba(79, 125, 249, 0.2);
              }
              
              .faculty-notification-mark-all:hover {
                background: linear-gradient(90deg, #3d6bf8, #5275f9);
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(79, 125, 249, 0.3);
              }
              
              .faculty-notification-mark-all:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
                box-shadow: none;
              }
              
              .faculty-notification-list {
                display: flex;
                flex-direction: column;
                gap: 20px;
              }
              
              .faculty-notification-item {
                padding: 20px;
                border-radius: 14px;
                background-color: #fff;
                box-shadow: 0 4px 15px rgba(0,0,0,0.03);
                transition: all 0.3s ease;
                border-left: 4px solid transparent;
                position: relative;
                overflow: hidden;
              }
              
              .faculty-notification-item:hover {
                box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                transform: translateY(-3px);
              }
              
              .faculty-notification-item-unread {
                background-color: #f8faff;
                border-left: 4px solid #4f7df9;
              }
              
              .faculty-notification-item-unread::before {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                width: 12px;
                height: 12px;
                background: linear-gradient(135deg, #4f7df9, #6384fa);
                border-radius: 50%;
                margin: 12px;
              }
              
              .faculty-notification-content {
                display: flex;
                gap: 22px;
                align-items: flex-start;
              }
              
              .faculty-notification-icon {
                width: 40px;
                height: 40px;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px;
                background-color: #f7fafc;
                font-size: 22px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 10px rgba(0,0,0,0.03);
              }
              
              .faculty-notification-info {
                flex-grow: 1;
                padding-right: 10px;
              }
              
              .faculty-notification-type {
                display: inline-block;
                padding: 6px 14px;
                border-radius: 50px;
                font-size: 12px;
                font-weight: 600;
                margin-bottom: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.04);
              }
              
              .faculty-notification-type-success {
                background: linear-gradient(45deg, rgba(3, 169, 108, 0.1), rgba(3, 169, 108, 0.2));
                color: #03a96c;
              }
              
              .faculty-notification-type-info {
                background: linear-gradient(45deg, rgba(0, 158, 219, 0.1), rgba(0, 158, 219, 0.2));
                color: #009edb;
              }
              
              .faculty-notification-type-warning {
                background: linear-gradient(45deg, rgba(255, 153, 0, 0.1), rgba(255, 153, 0, 0.2));
                color: #ff9900;
              }
              
              .faculty-notification-type-error {
                background: linear-gradient(45deg, rgba(249, 47, 47, 0.1), rgba(249, 47, 47, 0.2));
                color: #f92f2f;
              }
              
              .faculty-notification-heading {
                margin: 0;
                font-size: 17px;
                font-weight: 600;
                color: #1a202c;
                line-height: 1.4;
              }
              
              .faculty-notification-message {
                margin: 0;
                font-size: 15px;
                color: #4a5568;
                line-height: 1.6;
              }
              
              .faculty-notification-actions {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 12px;
                min-width: 160px;
              }
              
              .faculty-notification-mark-read {
                background-color: transparent;
                border: none;
                color: #4f7df9;
                font-size: 14px;
                cursor: pointer;
                padding: 6px 10px;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 6px;
                border-radius: 6px;
                transition: all 0.2s ease;
              }
              
              .faculty-notification-mark-read:hover {
                color: #ffffff;
                text-decoration: none;
                background: linear-gradient(90deg, #4f7df9, #6384fa);
                box-shadow: 0 2px 8px rgba(79, 125, 249, 0.3);
              }
              
              .faculty-notification-date {
                font-size: 13px;
                color: #718096;
                display: flex;
                align-items: center;
                gap: 6px;
                background-color: #f8faff;
                padding: 5px 10px;
                border-radius: 6px;
              }
              
              .faculty-notification-empty {
                padding: 70px 30px;
                text-align: center;
                color: #718096;
                font-size: 16px;
                background: linear-gradient(135deg, #f9fafc, #f4f7fe);
                border-radius: 12px;
                border: 1px dashed #d0daf0;
              }
              
              .faculty-notification-empty i {
                display: block;
                font-size: 50px;
                margin-bottom: 20px;
                color: #a0aec0;
                opacity: 0.7;
              }
              
              .faculty-notification-loading {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.8);
                backdrop-filter: blur(3px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
                border-radius: 12px;
              }

              .faculty-notification-loading-spinner {
                width: 45px;
                height: 45px;
                border: 3px solid rgba(79, 125, 249, 0.15);
                border-top-color: #4f7df9;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
              }

              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
              
              @media (max-width: 992px) {
                .faculty-notification-content {
                  flex-direction: column;
                }
                
                .faculty-notification-actions {
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: center;
                  min-width: 100%;
                  margin-top: 18px;
                  padding-top: 15px;
                  border-top: 1px solid #edf2f7;
                }
                
                .faculty-notification-icon {
                  margin-bottom: 10px;
                }
                
                .faculty-notification-container {
                  padding: 20px;
                }
                
                .faculty-notification-title:after {
                  width: 30px;
                }
              }
              
              /* Additional responsiveness for smaller devices */
              @media (max-width: 768px) {
                .col-lg-10.ps-0 {
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                  width: 100%;
                  max-width: 100%;
                  flex: 0 0 100%;
                }
                
                .faculty-notification-container {
                  padding: 15px;
                }
                
                .faculty-notification-item {
                  padding: 15px;
                }
                
                .faculty-notification-header {
                  // flex-direction: column;
                  align-items: flex-start;
                  gap: 15px;
                  margin-bottom: 20px;
                  padding-bottom: 15px;
                }
                
                .faculty-notification-mark-all {
                  width: 100%;
                  text-align: center;
                  justify-content: center;
                  font-size: 13px;
                  padding: 8px 12px;
                }
                
                .faculty-notification-title {
                  font-size: 18px !important;
                }
                
                .faculty-notification-heading {
                  font-size: 15px;
                }
                
                .faculty-notification-message {
                  font-size: 14px;
                }
                
                .faculty-notification-actions {
                  gap: 8px;
                }
                
                .faculty-notification-mark-read {
                  font-size: 13px;
                  padding: 5px 8px;
                }
                
                .faculty-notification-date {
                  font-size: 12px;
                  padding: 4px 8px;
                }
              }
                @media (max-width: 480px) {
                .faculty-notification-container {
                  padding: 12px;
                }
                
                .faculty-notification-item {
                  padding: 12px;
                  gap: 15px;
                  border-radius: 10px;
                }
                
                .faculty-notification-content {
                  gap: 15px;
                }
                
                .faculty-notification-empty {
                  padding: 40px 20px;
                  font-size: 14px;
                }
                
                .faculty-notification-empty i {
                  font-size: 40px;
                  margin-bottom: 15px;
                }
                
                .faculty-notification-icon {
                  width: 32px;
                  height: 32px;
                  font-size: 18px;
                }
                
                .faculty-notification-actions {
                  flex-direction: column;
                }
                
                .faculty-notification-mark-read,
                .faculty-notification-date {
                  width: 100%;
                  justify-content: center;
                }
                
                .faculty-notification-mark-all {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 7px;
                }
                
                .faculty-notification-mark-all .button-text {
                  display: inline-block;
                }
              }
                /* Fix for mobile-specific height/overflow issues */
              @media (max-width: 380px) {
                .faculty-notification-wrapper {
                  overflow-x: hidden;
                }
                
                .faculty-notification-actions {
                  align-items: stretch;
                }
                
                .faculty-notification-list {
                  gap: 15px;
                }
                
                .faculty-notification-heading {
                  font-size: 14px;
                }
                
                .faculty-notification-message {
                  font-size: 13px;
                }
                
                .faculty-notification-mark-read {
                  font-size: 12px;
                }
                
                .faculty-notification-date {
                  font-size: 11px;
                }
                
                .faculty-notification-mark-all {
                  padding: 8px 10px;
                  font-size: 12px;
                }
              }
            `}
          </style>{" "}
          {loading && (
            <div className="faculty-notification-loading">
              <div className="faculty-notification-loading-spinner"></div>
              <p
                style={{
                  marginTop: "15px",
                  fontSize: "14px",
                  color: "#4f7df9",
                  fontWeight: "500",
                  textAlign: "center",
                  padding: "0 10px",
                }}
              >
                Loading...
              </p>
            </div>
          )}
          <div className="faculty-notification-header">
            <h4 className="faculty-notification-title">NOTIFICATIONS</h4>
            {hasNotifications && (
              <button
                className="faculty-notification-mark-all"
                onClick={MarkAllAsReadNotHandler}
                disabled={
                  loading ||
                  notifications.every((n) => n.notification_is_read === true)
                }
              >
                <i className="fa-regular fa-check-circle"></i>{" "}
                <span className="button-text">Mark all as read</span>
              </button>
            )}
          </div>
          <div className="faculty-notification-list">
            {!hasNotifications ? (
              <div className="faculty-notification-empty">
                <i className="fa-solid fa-bell-slash"></i>
                <p>No notifications available at this time.</p>
              </div>
            ) : (
              notifications.map((notification, index) => {
                const isUnread = notification.notification_is_read !== true;
                let iconColor, iconClass, bgColor, gradientColors;

                switch (notification.notification_type) {
                  case "Success":
                    iconColor = "#03a96c";
                    iconClass = "fa-solid fa-circle-check";
                    bgColor = "rgba(3, 169, 108, 0.08)";
                    gradientColors =
                      "rgba(3, 169, 108, 0.05), rgba(3, 169, 108, 0.15)";
                    break;
                  case "Info":
                    iconColor = "#009edb";
                    iconClass = "fa-solid fa-circle-info";
                    bgColor = "rgba(0, 158, 219, 0.08)";
                    gradientColors =
                      "rgba(0, 158, 219, 0.05), rgba(0, 158, 219, 0.15)";
                    break;
                  case "Warning":
                    iconColor = "#ff9900";
                    iconClass = "fa-solid fa-triangle-exclamation";
                    bgColor = "rgba(255, 153, 0, 0.08)";
                    gradientColors =
                      "rgba(255, 153, 0, 0.05), rgba(255, 153, 0, 0.15)";
                    break;
                  case "Error":
                    iconColor = "#f92f2f";
                    iconClass = "fa-solid fa-circle-exclamation";
                    bgColor = "rgba(249, 47, 47, 0.08)";
                    gradientColors =
                      "rgba(249, 47, 47, 0.05), rgba(249, 47, 47, 0.15)";
                    break;
                  default:
                    iconColor = "#718096";
                    iconClass = "fa-solid fa-bell";
                    bgColor = "rgba(113, 128, 150, 0.08)";
                    gradientColors =
                      "rgba(113, 128, 150, 0.05), rgba(113, 128, 150, 0.15)";
                }

                return (
                  <div
                    key={index}
                    className={`faculty-notification-item ${
                      isUnread ? "faculty-notification-item-unread" : ""
                    }`}
                    style={{
                      borderLeft: isUnread
                        ? `4px solid ${iconColor}`
                        : "4px solid transparent",
                      background: isUnread
                        ? `linear-gradient(to right, ${gradientColors}, transparent)`
                        : "#ffffff",
                    }}
                  >
                    <div className="faculty-notification-content">
                      <div
                        className="faculty-notification-icon"
                        style={{
                          color: iconColor,
                          background: `linear-gradient(135deg, ${bgColor}, ${bgColor.replace(
                            "0.08",
                            "0.15"
                          )})`,
                          boxShadow: `0 4px 10px ${bgColor}`,
                        }}
                      >
                        <i className={iconClass}></i>
                      </div>

                      <div className="faculty-notification-info">
                        {/* <span
                          className={`faculty-notification-type faculty-notification-type-${notification.notification_type.toLowerCase()}`}
                        >
                          {notification.notification_type}
                        </span> */}
                        <h5 className="faculty-notification-heading">
                          {notification.notification_heading}
                        </h5>
                        <p className="faculty-notification-message">
                          {notification.notification_message}
                        </p>
                      </div>

                      <div className="faculty-notification-actions">
                        {isUnread && (
                          <button
                            className="faculty-notification-mark-read"
                            onClick={() =>
                              MarkAsSingleReadHandler(
                                notification.notification_dtls_id
                              )
                            }
                            disabled={loading}
                          >
                            <i className="fa-regular fa-circle-check"></i> Mark
                            as read
                          </button>
                        )}
                        <span className="faculty-notification-date">
                          <i className="fa-regular fa-clock"></i>
                          {formatDateToIST(
                            notification.notification_created_at
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
