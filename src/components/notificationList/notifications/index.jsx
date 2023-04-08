
import { MDBBtn } from "mdb-react-ui-kit";
import React, { Fragment, useEffect, useState } from "react";

const Notifications = (props) => {

    return (
        <Fragment>
            <div className="notificationComponent ">
                {props.notification.text}
                <MDBBtn onClick={() => console.log(props.notification)}>Marcar como lido</MDBBtn>
            </div>
        </Fragment>
    );
}

export default Notifications;
