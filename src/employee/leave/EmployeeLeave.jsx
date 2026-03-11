import { useState } from "react";
import "./EmployeeLeave.css";

const EmployeeLeave = () => {
  /* =============================
     EMPLOYEE LEAVE BALANCE
  ============================= */
  const [leaveBalance] = useState({
    casual: 8,
    sick: 6,
    earned: 12,
  });

  /* =============================
     MY LEAVE REQUESTS
  ============================= */
  const [myLeaves, setMyLeaves] = useState([
    {
      id: 1,
      type: "Casual Leave",
      from: "2026-02-18",
      to: "2026-02-19",
      days: 2,
      reason: "Personal work",
      status: "Pending",
    },
    {
      id: 2,
      type: "Sick Leave",
      from: "2026-01-10",
      to: "2026-01-10",
      days: 1,
      reason: "Fever",
      status: "Approved",
    },
    {
      id: 3,
      type: "Earned Leave",
      from: "2025-12-02",
      to: "2025-12-04",
      days: 3,
      reason: "Vacation",
      status: "Rejected",
    },
  ]);

  /* =============================
     CANCEL LEAVE
  ============================= */
  const cancelLeave = (id) => {
    setMyLeaves((prev) => prev.filter((leave) => leave.id !== id));
  };

  return (
    <div className="leave-container">
      {/* HEADER */}
      <div className="leave-header">
        <h2>My Leave Dashboard</h2>
        <button className="apply-btn">+ Apply Leave</button>
      </div>

      {/* LEAVE SUMMARY */}
      <div className="leave-summary">
        <div className="leave-card-box">
          <h4>Casual Leave</h4>
          <div className="leave-progress">
            <div
              className="progress-bar"
              style={{ width: `${(8 - leaveBalance.casual) * 10}%` }}
            ></div>
          </div>
          <p>{leaveBalance.casual} Days Remaining</p>
        </div>

        <div className="leave-card-box">
          <h4>Sick Leave</h4>
          <div className="leave-progress">
            <div
              className="progress-bar green"
              style={{ width: `${(10 - leaveBalance.sick) * 10}%` }}
            ></div>
          </div>
          <p>{leaveBalance.sick} Days Remaining</p>
        </div>

        <div className="leave-card-box">
          <h4>Earned Leave</h4>
          <div className="leave-progress">
            <div
              className="progress-bar orange"
              style={{ width: `${(15 - leaveBalance.earned) * 6}%` }}
            ></div>
          </div>
          <p>{leaveBalance.earned} Days Remaining</p>
        </div>
      </div>

      {/* LEAVE HISTORY */}
      <div className="leave-history-card">
        <h3>My Leave Requests</h3>

        <table className="leave-table">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Dates</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {myLeaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.type}</td>
                <td>
                  {leave.from} → {leave.to}
                </td>
                <td>{leave.days}</td>
                <td>{leave.reason}</td>
                <td>
                  <span className={`status ${leave.status.toLowerCase()}`}>
                    {leave.status}
                  </span>
                </td>
                <td>
                  {leave.status === "Pending" && (
                    <button
                      className="cancel-btn"
                      onClick={() => cancelLeave(leave.id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeLeave;
