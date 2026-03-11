import { useState } from "react";
import StatCard from "../../components/StateCard";
import "./leave.css";

const LeaveDashboard = () => {
  /* =============================
     STATE: LEAVE REQUESTS
  ============================= */

  const [pendingLeaves, setPendingLeaves] = useState([
    {
      id: 1,
      empId: "EMP001",
      name: "John Doe",
      department: "Engineering",
      type: "Casual Leave",
      from: "2026-02-18",
      to: "2026-02-19",
      days: 2,
      reason: "Personal work",
    },
    {
      id: 2,
      empId: "EMP003",
      name: "Meena S",
      department: "Finance",
      type: "Sick Leave",
      from: "2026-02-20",
      to: "2026-02-20",
      days: 1,
      reason: "Fever",
    },
  ]);

  /* =============================
     STATE: COUNTS
  ============================= */

  const [approvedCount, setApprovedCount] = useState(18);
  const [rejectedCount, setRejectedCount] = useState(3);

  /* =============================
     STATE: LEAVE BALANCE
  ============================= */

  const [leaveBalances, setLeaveBalances] = useState([
    {
      empId: "EMP001",
      name: "John Doe",
      casual: 8,
      sick: 6,
      earned: 12,
    },
    {
      empId: "EMP002",
      name: "Priya Sharma",
      casual: 4,
      sick: 5,
      earned: 10,
    },
    {
      empId: "EMP003",
      name: "Meena S",
      casual: 6,
      sick: 4,
      earned: 9,
    },
  ]);

  const totalLeaves =
    approvedCount + rejectedCount + pendingLeaves.length;

  /* =============================
     ACTION HANDLERS
  ============================= */

  const approveLeave = (leave) => {
    // remove from pending
    setPendingLeaves((prev) =>
      prev.filter((l) => l.id !== leave.id)
    );

    // increment approved count
    setApprovedCount((prev) => prev + 1);

    // deduct leave balance
    setLeaveBalances((prev) =>
      prev.map((emp) => {
        if (emp.empId !== leave.empId) return emp;

        if (leave.type === "Casual Leave") {
          return { ...emp, casual: emp.casual - leave.days };
        }

        if (leave.type === "Sick Leave") {
          return { ...emp, sick: emp.sick - leave.days };
        }

        return emp;
      })
    );
  };

  const rejectLeave = (leave) => {
    setPendingLeaves((prev) =>
      prev.filter((l) => l.id !== leave.id)
    );
    setRejectedCount((prev) => prev + 1);
  };

  return (
    <div className="leave-page">
      <h1 className="page-title">Leave Management</h1>

      {/* =============================
          SUMMARY CARDS (REAL TIME)
      ============================= */}
      <div className="stats">
        <StatCard title="Pending Requests" value={pendingLeaves.length} />
        <StatCard title="Approved" value={approvedCount} />
        <StatCard title="Rejected" value={rejectedCount} />
        <StatCard title="Total Leaves" value={totalLeaves} />
      </div>

      {/* =============================
    LEAVE FILTER BAR (UI ONLY)
============================= */}
<div className="leave-filter-bar">
  <div className="filter-item">
    <label>Select Date</label>
    <input type="date" />
  </div>

  <input
    type="text"
    className="filter-search"
    placeholder="Search Employee Name..."
  />

  <select className="filter-select">
    <option>All Departments</option>
    <option>Engineering</option>
    <option>Finance</option>
    <option>HR</option>
  </select>

  <select className="filter-select">
    <option>All Status</option>
    <option>Approved</option>
    <option>Pending</option>
    <option>Rejected</option>
  </select>
</div>

      {/* =============================
          PENDING LEAVE REQUESTS
      ============================= */}
      <div className="card leave-section">
        <h2>Pending Leave Requests</h2>

        {pendingLeaves.length === 0 ? (
          <p className="muted-text">No pending requests</p>
        ) : (
          <table className="leave-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Leave Type</th>
                <th>Dates</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {pendingLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td>
                    <strong>{leave.name}</strong>
                    <br />
                    <span className="muted-text">{leave.empId}</span>
                  </td>
                  <td>{leave.department}</td>
                  <td>{leave.type}</td>
                  <td>
                    {leave.from} → {leave.to}
                  </td>
                  <td>{leave.days}</td>
                  <td>{leave.reason}</td>
                  <td>
  <div className="action-cell">
    <button
      className="btn-primary"
      onClick={() => approveLeave(leave)}
    >
      Approve
    </button>

    <button
      className="btn-danger"
      onClick={() => rejectLeave(leave)}
    >
      Reject
    </button>
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* =============================
          LEAVE BALANCE OVERVIEW
      ============================= */}
      <div className="card leave-section">
        <h2>Leave Balance Overview</h2>

        <table className="leave-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Casual Leave</th>
              <th>Sick Leave</th>
              <th>Earned Leave</th>
            </tr>
          </thead>

          <tbody>
            {leaveBalances.map((emp) => (
              <tr key={emp.empId}>
                <td>
                  <strong>{emp.name}</strong>
                  <br />
                  <span className="muted-text">{emp.empId}</span>
                </td>
                <td>{emp.casual}</td>
                <td>{emp.sick}</td>
                <td>{emp.earned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveDashboard;
