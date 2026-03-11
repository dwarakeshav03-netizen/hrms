import React from "react";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  return (
    <div className="employee-dashboard">

      <h2 className="page-title">Welcome, Employee</h2>

      {/* CARDS */}
      <div className="card-grid">
        <div className="info-card">
          <p>Monthly Salary</p>
          <h3>₹45,000</h3>
        </div>

        <div className="info-card">
          <p>Leave Balance</p>
          <h3>8 Days</h3>
        </div>

        <div className="info-card">
          <p>Attendance (This Month)</p>
          <h3>92%</h3>
        </div>

        <div className="info-card">
          <p>Assets Assigned</p>
          <h3>1 Laptop</h3>
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="section">
        <h3>Recent Activities</h3>
        <ul>
          <li>Leave applied (Jan 10)</li>
          <li>December payroll credited</li>
          <li>Laptop assigned</li>
        </ul>
      </div>

    </div>
  );
};

export default EmployeeDashboard;
