import { Outlet } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import HRTopbar from "./HRTopbar";
import HRFooter from "./HRFooter";
import "./hrLayout.css";

const HRLayout = () => {
  return (
    <div className="hr-layout-container">
      {/* LEFT SIDEBAR */}
      <HRSidebar />

      {/* RIGHT SIDE */}
      <div className="hr-layout-right">
        <HRTopbar />

        <div className="hr-layout-content">
          <Outlet />
        </div>

        <HRFooter />
      </div>
    </div>
  );
};

export default HRLayout;
