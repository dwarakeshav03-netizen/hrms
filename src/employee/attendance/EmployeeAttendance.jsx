import React, { useState } from "react";
import "./EmployeeAttendance.css";

const EmployeeAttendance = () => {
  const [attendanceData] = useState([
    {
      date: "01 Feb 2026",
      checkIn: "09:02 AM",
      checkOut: "06:01 PM",
      status: "Present",
      workHours: "8h 59m",
    },
    {
      date: "02 Feb 2026",
      checkIn: "09:30 AM",
      checkOut: "06:05 PM",
      status: "Late",
      workHours: "8h 35m",
    },
    {
      date: "03 Feb 2026",
      checkIn: "-",
      checkOut: "-",
      status: "Absent",
      workHours: "-",
    },
    {
      date: "04 Feb 2026",
      checkIn: "-",
      checkOut: "-",
      status: "Leave",
      workHours: "-",
    },
  ]);

  return (
    <div className="attendance-wrapper">
      {/* HEADER */}
      <div className="attendance-header">
        <h2>My Attendance</h2>
        <button className="regularize-btn">Request Regularization</button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="attendance-summary">
        <div className="summary-card">
          <p>Present Days</p>
          <h3>18</h3>
        </div>

        <div className="summary-card">
          <p>Absent Days</p>
          <h3>2</h3>
        </div>

        <div className="summary-card">
          <p>Late Marks</p>
          <h3>3</h3>
        </div>

        <div className="summary-card">
          <p>Attendance %</p>
          <h3>92%</h3>
        </div>
      </div>

      {/* ATTENDANCE TABLE */}
      <div className="attendance-card">
        <h3>Attendance Log</h3>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Work Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.checkIn}</td>
                  <td>{item.checkOut}</td>
                  <td>{item.workHours}</td>
                  <td>
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
