import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import HRTopbar from "./HRTopbar";
import HRFooter from "./HRFooter";
import "./hrLayout.css";

const HRLayout = () => {
  // Simple Wrapper State to share data across HR pages
  const [hrContextData, setHrContextData] = useState({
    userRole: "HR_Admin",
    loading: false,
    employeeList: []
  });

  useEffect(() => {
    console.log("HR Layout Initialized");
  }, []);

  return (
    <div className="hr-layout-container">
      {/* LEFT SIDEBAR */}
      <HRSidebar />

      {/* RIGHT SIDE */}
      <div className="hr-layout-right">
        <HRTopbar />

        <div className="hr-layout-content">
          {/* Outlet renders the children (Dashboard, Employees, etc.) */}
          <Outlet context={[hrContextData, setHrContextData]} />
        </div>

        <HRFooter />
      </div>
    </div>
  );
};

export default HRLayout;