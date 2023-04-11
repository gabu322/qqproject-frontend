import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { Fragment, useEffect, useState } from "react";
import Notifications from "./notifications";

const NotificationBase = () => {
    const [employee, setEmployee] = useState(JSON.parse(sessionStorage.user))
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/notification/" + employee.id).then((response) => {
            setNotifications(response.data.map((notification) => {
                return notification.state === "Unread" ? <Notifications notification={notification} /> : null
            }))
        })
        console.log(notifications)
    }, [])
    const [notificationList, setNotificationList] = useState(false)

    return (
        <Fragment>
            <div className="bellComponent ">
                <MDBIcon fas icon="bell" size="3x" onClick={() => setNotificationList(!notificationList)} />
                <div className={"notificationList shadow " + (notificationList ? "isShown" : '')} >
                    {notifications.length === 0 || notifications[0] === null ? <div className="noNotification">Nenhuma notificação no momento</div> : notifications}
                </div>

            </div>
        </Fragment>
    );
}

export default NotificationBase;
