import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import NotificationBase from "../components/notificationList";

const ScreenBase = () => {
    return (
        <>
            <NotificationBase />
            <Sidebar />
            <Outlet />
        </>
    );
};

export default ScreenBase;
