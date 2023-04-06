import { MDBIcon } from "mdb-react-ui-kit";
import React, { Fragment, useEffect, useState } from "react";

const NotificationBase = () => {
    const [notificationList, setNotificationList] = useState(false)

    return (
        <Fragment>
            <div className="bellComponent ">
                <MDBIcon fas icon="bell" size="3x" onClick={() => setNotificationList(!notificationList)} />

                    <div className={"notificationList shadow " + (notificationList ? "isShown" : '')} >
                        <div className="insideTest"></div>
                    </div>

            </div>
        </Fragment>
    );
}

export default NotificationBase;
