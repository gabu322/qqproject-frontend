
import axios from "axios";
import { MDBBtn } from "mdb-react-ui-kit";
import React, { Fragment, useEffect, useState } from "react";

const Notifications = (props) => {
    const notificationData = props.notification
    const [notificationForm, setNotificationForm] = useState({
        employeeId: notificationData.employeeId,
        sentDate: notificationData.sentDate,
        state: notificationData.state,
        text: notificationData.text
    })

    function readNotification() {
        notificationForm.state = "Read"
        setNotificationForm({...notificationForm, state: "Read"})
        axios.put("http://localhost:3001/notification/" + notificationData.id, notificationForm)
    }
    return (
        <Fragment>
            <div className="notificationComponent ">
                {props.notification.text}
                <MDBBtn onClick={readNotification}>Marcar como lido</MDBBtn>
            </div>
        </Fragment>
    );
}

export default Notifications;
