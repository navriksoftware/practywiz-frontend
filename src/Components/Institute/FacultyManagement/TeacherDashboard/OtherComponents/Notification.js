import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { ApiURL } from "../../../../../Utils/ApiURL";
import "../DashboardCSS/Notification.css";
import { toast } from "react-toastify";

const Notification = ({
  data: initialData,
  userId,
  token,
  setHasUnreadNotifications,
}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  // Update component data when props change
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const url = ApiURL();

  // Function to refresh notifications from server
  const refreshNotifications = useCallback(
    async (showToast = false) => {
      if (!userId) return;

      let updatedData;
      setLoading(true);
      try {
        const response = await axios.get(
          `${url}api/v1/mentor/dashboard/notification/fetch-all/${userId}`
        );

        if (response.data.success) {
          console.log(
            "Notifications fetched successfully:",
            response.data.success
          );
          updatedData = [
            {
              notification_list: JSON.stringify(response.data.success),
            },
          ];
          setData(updatedData);

          // Check for unread notifications after refresh
          const allNotifications = response.data.success?.flat();
          const unreadExists = allNotifications?.some(
            (notification) => !notification.notification_is_read
          );
          // Delay the state update slightly
          setTimeout(() => {
            setHasUnreadNotifications(unreadExists);
          }, 0);

          if (showToast) {
            toast.success("Notifications refreshed successfully");
          }
        } else {
          throw new Error(
            response.data.message || "Failed to fetch notifications"
          );
        }
      } catch (error) {
        console.error("Error refreshing notifications:", error);
        if (showToast) {
          toast.error(
            error.response?.data?.message || "Failed to refresh notifications"
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [userId, url]
  );

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    // const interval = setInterval(() => {
    //   refreshNotifications(false); // Don't show toast for auto-refresh
    // }, 30000); // 30 seconds

    // return () => clearInterval(interval);
    refreshNotifications(false);
  }, [refreshNotifications]);

  // Manual refresh function
  const handleRefresh = () => {
    refreshNotifications(true); // Show toast for manual refresh
  };

  const formatDateToIST = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(date.getTime());

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
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${url}api/v1/mentor/dashboard/notification/mark-all-read`,
        { userId: userId }
      );
      if (response.data.success) {
        toast.success("Marked all messages as read successfully");
        // Refresh notifications to get updated data
        setHasUnreadNotifications(false); // Reset unread notifications state
        await refreshNotifications(false); // Don't show toast for auto-refresh
      } else {
        toast.error(
          response.data.message ||
            "There is some error while reading the messages"
        );
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error(
        error.response?.data?.message || "Failed to mark messages as read"
      );
    } finally {
      setLoading(false);
    }
  };

  const MarkAsSingleReadHandler = async (notificationId) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${url}api/v1/mentor/dashboard/notification/mark-single-read`,
        { userId: userId, notificationId: notificationId }
      );
      if (response.data.success) {
        toast.success("Marked message as read successfully");
        // Refresh notifications to get updated data
        await refreshNotifications(false); // Don't show toast for auto-refresh
      } else {
        toast.error(
          response.data.message ||
            "There is some error while reading the message"
        );
      }
    } catch (error) {
      console.error("Error marking single as read:", error);
      toast.error(
        error.response?.data?.message || "Failed to mark message as read"
      );
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
          {loading && (
            <div className="faculty-notification-loading">
              <div className="faculty-notification-loading-spinner"></div>
              <div className="faculty-notification-loading-text">
                Loading notifications...
              </div>
            </div>
          )}

          <div className="faculty-notification-header">
            <h4 className="faculty-notification-title">NOTIFICATIONS</h4>
            <div className="faculty-notification-actions-header">
              <button
                className="faculty-notification-refresh"
                onClick={handleRefresh}
                disabled={loading}
                title="Refresh notifications"
              >
                <i
                  className={`fa-solid fa-refresh ${loading ? "fa-spin" : ""}`}
                ></i>
                <span>Refresh</span>
              </button>
              {hasNotifications && (
                <button
                  className="faculty-notification-mark-all"
                  onClick={MarkAllAsReadNotHandler}
                  disabled={
                    loading ||
                    notifications.every((n) => n.notification_is_read === true)
                  }
                >
                  <i className="fa-regular fa-check-circle"></i>
                  <span>Mark all as read</span>
                </button>
              )}
            </div>
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
