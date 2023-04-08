import axios from "axios";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React, { Fragment, useEffect, useState } from "react";
import Notifications from "./notifications";

const NotificationBase = () => {
    const [employee, setEmployee] = useState(JSON.parse(sessionStorage.user))
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/notification/" + employee.id).then((response) => {
            setNotifications(response.data.map((notification) => {
                return <Notifications notification={notification}></Notifications>
            }))
        })
    }, [])
    const [notificationList, setNotificationList] = useState(false)

    return (
        <Fragment>
            <div className="bellComponent ">
                <MDBIcon fas icon="bell" size="3x" onClick={() => setNotificationList(!notificationList)} />

                    <div className={"notificationList shadow " + (notificationList ? "isShown" : '')} >
                        {notifications}
                    </div>

            </div>
        </Fragment>
    );
}

export default NotificationBase;
