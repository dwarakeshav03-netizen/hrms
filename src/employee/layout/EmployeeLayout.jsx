import React from "react";
import { Outlet } from "react-router-dom";
import EmployeeNavbar from "./EmployeeNavbar";
import EmployeeSidebar from "./EmployeeSidebar";
import "./EmployeeLayout.css";

const EmployeeLayout = () => {
  return (
    <div className="employee-layout">
      {/* Top Navbar */}
      <EmployeeNavbar />

      {/* Body */}
      <div className="employee-body">
        {/* Left Sidebar */}
        <EmployeeSidebar />

        {/* Right Content */}
        <div className="employee-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;
