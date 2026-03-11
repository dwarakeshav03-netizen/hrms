import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const MarkAttendance = ({ onClose, onSave }) => {
  const [employee, setEmployee] = useState("");
  const [status, setStatus] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!employee || !status) {
      alert("Please select employee and status");
      return;
    }

    const newAttendance = {
      id: employee === "John Doe" ? "EMP004" : "EMP005",
      name: employee,
      department: "Engineering",
      date: new Date().toISOString().split("T")[0],
      checkIn: checkIn || "-",
      checkOut: checkOut || "-",
      status,
      workHours: "-",
      overtime: "-",
      notes: notes || "-"
    };

    onSave(newAttendance);   // ✅ SEND TO PARENT
    onClose();               // ✅ CLOSE MODAL
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">

        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <h3 className="modal-title">Mark Attendance</h3>
        <p className="modal-subtitle">Mark attendance for an employee</p>

        <div className="modal-form">
          <div className="modal-row">
            <label>Employee</label>
            <select value={employee} onChange={(e) => setEmployee(e.target.value)}>
              <option value="">Select employee</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
              <option>Mike Johnson</option>
            </select>
          </div>

          <div className="modal-row">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select status</option>
              <option>Present</option>
              <option>Absent</option>
              <option>Late</option>
            </select>
          </div>

          <div className="modal-row">
            <label>Check In</label>
            <input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>

          <div className="modal-row">
            <label>Check Out</label>
            <input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>

          <div className="modal-row">
            <label>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;
