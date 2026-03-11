import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaUser,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa";
import "../../assets/styles/sidebar/sidebar.css";

const EmployeeSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      {/* LOGO */}
      <div className="sidebar-header">Crest Climbers</div>

      {/* MENU */}
      <div className="sidebar-menu">
        <Link
          to="/employee/dashboard"
          className={`sidebar-item ${
            isActive("/employee/dashboard") ? "active" : ""
          }`}
        >
          <FaThLarge className="icon" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/employee/profile"
          className={`sidebar-item ${
            isActive("/employee/profile") ? "active" : ""
          }`}
        >
          <FaUser className="icon" />
          <span>My Profile</span>
        </Link>

        <Link
          to="/employee/attendance"
          className={`sidebar-item ${
            isActive("/employee/attendance") ? "active" : ""
          }`}
        >
          <FaCalendarCheck className="icon" />
          <span>Attendance</span>
        </Link>

        <Link
          to="/employee/leave"
          className={`sidebar-item ${
            isActive("/employee/leave") ? "active" : ""
          }`}
        >
          <FaCalendarCheck className="icon" />
          <span>Leave</span>
        </Link>

        <Link
          to="/employee/payroll"
          className={`sidebar-item ${
            isActive("/employee/payroll") ? "active" : ""
          }`}
        >
          <FaMoneyBillWave className="icon" />
          <span>Payroll</span>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
