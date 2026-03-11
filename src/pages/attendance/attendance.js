import React, { useState, useMemo } from "react";
import "./attendance.css";
import MarkAttendance from "./MarkAttendance";

const Attendance = () => {

  /* =========================
     DATA STATE
  ========================= */
  const [attendanceData, setAttendanceData] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      department: "Engineering",
      date: "2024-01-15",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
      workHours: "9h 0m",
      overtime: "0h 0m",
      notes: "-"
    }
  ]);

  /* =========================
     MODAL STATE
  ========================= */
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);

  /* =========================
     FILTER STATE
  ========================= */
  const [searchEmpId, setSearchEmpId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  /* =========================
     PAGINATION
  ========================= */
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  /* =========================
     DATE FORMATTER (CALENDAR STYLE)
  ========================= */
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric"
    };

    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  /* =========================
     FILTER LOGIC
  ========================= */
  const filteredAttendance = useMemo(() => {
    return attendanceData.filter(item => {
      return (
        item.id.toLowerCase().includes(searchEmpId.toLowerCase()) &&
        item.name.toLowerCase().includes(searchName.toLowerCase()) &&
        item.date.includes(searchDate) &&
        item.status.toLowerCase().includes(searchStatus.toLowerCase())
      );
    });
  }, [attendanceData, searchEmpId, searchName, searchDate, searchStatus]);

  const totalPages = Math.ceil(filteredAttendance.length / ITEMS_PER_PAGE);

  const paginatedAttendance = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAttendance.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAttendance, currentPage]);

  /* =========================
     SAVE HANDLER
  ========================= */
  const handleSaveAttendance = (newRecord) => {
    setAttendanceData(prev => [...prev, newRecord]);
  };

  return (
    <div className="attendance-page">

      {/* HEADER */}
      <div className="attendance-header">
        <div>
          <h2>Employee Attendance</h2>
          <p>Track and manage employee attendance</p>
        </div>

        <div className="attendance-actions">
          <button
            className="primary-btn"
            onClick={() => setShowMarkAttendance(true)}
          >
            + Mark Attendance
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="table-card">
        <h3>Attendance Records</h3>
        {/* FILTER BAR */}
<div className="attendance-filter-bar">

  <div className="attendance-filter-item">
    <label></label>
    <input
      type="text"
      placeholder="Search Emp ID"
      value={searchEmpId}
      onChange={(e) => {
        setSearchEmpId(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>

  <div className="attendance-filter-item">
    <label></label>
    <input
      type="text"
      placeholder="Search Name"
      value={searchName}
      onChange={(e) => {
        setSearchName(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>

  <div className="attendance-filter-item">
    <label></label>
    <input
      type="date"
      value={searchDate}
      onChange={(e) => {
        setSearchDate(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>

  <div className="attendance-filter-item">
    <label></label>
    <select
      value={searchStatus}
      onChange={(e) => {
        setSearchStatus(e.target.value);
        setCurrentPage(1);
      }}
    >
      <option value="">All</option>
      <option value="Present">Present</option>
      <option value="Absent">Absent</option>
      <option value="Leave">Leave</option>
    </select>
  </div>

</div>

        {/* =========================
            TABLE
        ========================= */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>NOTES</th>
            </tr>
          </thead>

          <tbody>
            {paginatedAttendance.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>

                {/* FORMATTED CALENDAR DATE */}
                <td>{formatDate(item.date)}</td>

                <td>
                  <span className={`badge ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>

                <td>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* =========================
            PAGINATION
        ========================= */}
        <div className="attendance-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showMarkAttendance && (
        <MarkAttendance
          onClose={() => setShowMarkAttendance(false)}
          onSave={handleSaveAttendance}
        />
      )}
    </div>
  );
};

export default Attendance;
