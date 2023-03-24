import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const SidebarScreen = () => {
    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    );
};

export default SidebarScreen;
