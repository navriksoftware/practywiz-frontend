import axios from "axios";
import React from "react";
import { ApiURL } from "../../../../Utils/ApiURL";
import { toast } from "react-toastify";

const MenteeNotifications = ({ singleMentee, user, token }) => {
  const url = ApiURL();
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
    const response = await axios.post(
      `${url}api/v1/mentee/dashboard/notification/mark-all-read`,
      { userId: user?.user_id }
    );
    if (response.data.success) {
      toast.success("Marked all messages as read successfully");
    }
    if (response.data.error) {
      toast.success("There is some error while reading the messages");
    }
  };
  const MarkAsSingleReadHandler = async (notificationId) => {
    const response = await axios.post(
      `${url}api/v1/mentee/dashboard/notification/mark-single-read`,
      { userId: user?.user_id, notificationId: notificationId }
    );
    if (response.data.success) {
      toast.success("Marked message as read successfully");
    }
    if (response.data.error) {
      toast.success("There is some error while reading the message");
    }
  };
  return (
    <div className="col-lg-10 ps-0">
      <div className="difuhtre_content">
        <div className="huygggfhfg">
          <div className="container-fluid px-5">
            <div className="nfhgfg">
              <h4>NOTIFICATION</h4>
              <p onClick={MarkAllAsReadNotHandler}>Mark all as Read</p>
            </div>
            <div className="nxhjfdffgf5548">
              {JSON?.parse(singleMentee[0]?.notification_list)?.map(
                (notification) => {
                  return (
                    <div
                      className="dbhfhdfgfgf"
                      style={
                        notification.notification_is_read !== true
                          ? { backgroundColor: "#f2f2f2" }
                          : { backgroundColor: "" }
                      }
                    >
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="hfgdfgfdf53564">
                            <div className="fhjgf">
                              {notification.notification_type === "Success" && (
                                <i
                                  className="fa-solid fa-circle-check fa-2xl"
                                  style={{ color: "#03a96c", fontSize: "40px" }}
                                ></i>
                              )}
                              {notification.notification_type === "Info" && (
                                <i
                                  className="fa-solid fa-circle-exclamation"
                                  style={{ color: "#00cfc8", fontSize: "40px" }}
                                ></i>
                              )}
                              {notification.notification_type === "Warning" && (
                                <i
                                  className="fa-solid fa-circle-exclamation"
                                  style={{ color: "#f00f0f" }}
                                ></i>
                              )}
                              {notification.notification_type === "Error" && (
                                <i
                                  className="fa-solid fa-circle-exclamation"
                                  color={{ color: "#f92f2f" }}
                                ></i>
                              )}
                            </div>
                            <div className="gkfhjg5559">
                              {/* success notification */}
                              {notification.notification_type === "Success" && (
                                <>
                                  <button className="btnhd22">
                                    {notification.notification_type}
                                  </button>
                                </>
                              )}
                              {/* warning notification */}
                              {notification.notification_type === "Warning" && (
                                <button className="btnhd22a">
                                  {notification.notification_type}
                                </button>
                              )}
                              {/* warning notification */}
                              {notification.notification_type === "Info" && (
                                <button className="btnhd22b">
                                  {notification.notification_type}
                                </button>
                              )}
                              {notification.notification_type === "Error" && (
                                <button className="btnhd22c">
                                  {notification.notification_type}
                                </button>
                              )}
                              <h5>{notification.notification_heading}</h5>
                              <p>{notification.notification_message}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="dfghjdfdf">
                            {notification.notification_is_read !== true && (
                              <p
                                onClick={() => {
                                  MarkAsSingleReadHandler(
                                    notification.notification_dtls_id
                                  );
                                }}
                              >
                                Mark as read.
                              </p>
                            )}
                            <p className="dateText">
                              <i className="fa-regular fa-clock"></i>
                              {formatDateToIST(
                                notification.notification_created_at
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeNotifications;
