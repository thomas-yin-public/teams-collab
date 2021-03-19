import React, { useState, useEffect, useContext } from "react";
import { UserTokenContext } from "../../App";
import { requestUserNotification } from "../../request/requestFunction";

function HomePlugin() {
  const userToken = useContext(UserTokenContext);
  const [notificationList, setNotificationList] = useState({});

  useEffect(() => {
    const getUserNotification = () => {
      requestUserNotification(userToken).then((res) => {
        setNotificationList(res.notification);
      });
    };
    getUserNotification();
  }, []);

  const weekdays = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <div className="p-3 vh-100 w-100">
      <h2>Welcome back! </h2>
      <div className="row p-3">
        <div className="col-md-2 blue-grad-bg text-white border more-rounded p-3 shadow-sm">
          <div className="display-6 text-center">{weekdays[new Date().getDay()]}</div>
          <div className="display-1 text-center">{new Date().getDate()}</div>
        </div>
        <div className="col-md ">
        {Object.keys(notificationList).map((noti, index) => (
          <div
            key={index}
            className="w-100 my-1 bg-white p-3 border more-rounded shadow-sm"
          >{`There are ${notificationList[noti]} new notification from ${noti}`}</div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default HomePlugin;
