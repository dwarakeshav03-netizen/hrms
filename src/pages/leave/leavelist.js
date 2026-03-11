import "../leave/leave.css";
import { useState, useMemo } from "react";

const LeaveList = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      empId: "EMP001",
      type: "Casual Leave",
      duration: "15 Jun – 17 Jun",
      days: 3,
      reason: "Family function",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      empId: "EMP002",
      type: "Sick Leave",
      duration: "20 Jun – 21 Jun",
      days: 2,
      reason: "Not feeling well",
      status: "Approved",
    },
  ]);

  /* =========================
     FILTER STATES (NEW)
  ========================= */
  const [filterEmpId, setFilterEmpId] = useState("");
  const [filterEmpName, setFilterEmpName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  /* =========================
     AUTO FILL EMP NAME
  ========================= */
  useMemo(() => {
    const emp = leaveRequests.find(
      e => e.empId.toLowerCase() === filterEmpId.toLowerCase()
    );
    if (emp) setFilterEmpName(emp.name);
    else setFilterEmpName("");
  }, [filterEmpId, leaveRequests]);

  /* =========================
     FILTER LOGIC
  ========================= */
  const filteredLeaves = useMemo(() => {
    return leaveRequests.filter(item => {
      return (
        (!filterEmpId ||
          item.empId.toLowerCase().includes(filterEmpId.toLowerCase())) &&
        (!filterEmpName ||
          item.name.toLowerCase().includes(filterEmpName.toLowerCase())) &&
        (!filterType || item.type === filterType) &&
        (!filterStatus || item.status === filterStatus) &&
        (!filterDate || item.duration.includes(filterDate))
      );
    });
  }, [
    leaveRequests,
    filterEmpId,
    filterEmpName,
    filterType,
    filterStatus,
    filterDate,
  ]);

  /* =========================
     PAGINATION
  ========================= */
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredLeaves.length / ITEMS_PER_PAGE);

  const paginatedLeaves = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLeaves.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLeaves, currentPage]);

  const updateStatus = (id, newStatus) => {
    setLeaveRequests(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="leave-page">
      {/* HEADER */}
      <div className="leave-header">
        <div>
          <h2>Leave Management</h2>
          <p>Apply, track, and manage employee leave requests</p>
        </div>

        <button className="apply-btn" onClick={() => setShowApplyModal(true)}>
          Apply for Leave
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="leave-stats">
        <div className="leave-card">
          <p className="card-label">Casual Leave</p>
          <h2 className="card-value">9</h2>
          <span className="card-meta">Used: 3 / Total: 12</span>
        </div>

        <div className="leave-card">
          <p className="card-label">Sick Leave</p>
          <h2 className="card-value">8</h2>
          <span className="card-meta">Used: 2 / Total: 10</span>
        </div>

        <div className="leave-card">
          <p className="card-label">Earned Leave</p>
          <h2 className="card-value">15</h2>
          <span className="card-meta">Used: 0 / Total: 15</span>
        </div>

        <div className="leave-card">
          <p className="card-label">Compensatory Off</p>
          <h2 className="card-value">0</h2>
          <span className="card-meta">Used: 0 / Total: 0</span>
        </div>
      </div>

      {/* TABS */}
      <div className="leave-tabs">
        <button className="tab active">Leave Requests</button>
        <button className="tab">Leave History</button>
      </div>

      {/* TABLE */}
      <div className="leave-table-card">
        <h3>Leave Requests</h3>
        <p className="sub-text">
          Manage pending and recent leave applications
        </p>

        {/* ================= FILTER BAR ================= */}
        <div className="leave-filter-bar">
          <input
            placeholder="Employee ID"
            value={filterEmpId}
            onChange={e => setFilterEmpId(e.target.value)}
          />

          <input placeholder="Employee Name" value={filterEmpName} readOnly />

          <select value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">All Leave</option>
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Earned Leave</option>
          </select>

          <input
            type="text"
            placeholder="Date (eg: 15 Jun)"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Pending</option>
          </select>
        </div>
        {/* ================================================= */}

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Duration</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedLeaves.map(req => (
              <tr key={req.id}>
                <td>
                  <strong>{req.name}</strong>
                  <div className="emp-id">{req.empId}</div>
                </td>
                <td>{req.type}</td>
                <td>{req.duration}</td>
                <td>{req.days}</td>
                <td>{req.reason}</td>
                <td>
                  <span
                    className={`status ${
                      req.status === "Pending"
                        ? "pending"
                        : req.status === "Approved"
                        ? "approved"
                        : "rejected"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="actions">
                  {req.status === "Pending" ? (
                    <>
                      <button
                        className="approve"
                        onClick={() => updateStatus(req.id, "Approved")}
                      >
                        ✓
                      </button>
                      <button
                        className="reject"
                        onClick={() => updateStatus(req.id, "Rejected")}
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <button className="view">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="leave-pagination">
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

      {/* MODAL (UNCHANGED) */}
      {showApplyModal && (
        <div className="modal-wrapper">
          <div className="modal-container">
            <button
              className="modal-close"
              onClick={() => setShowApplyModal(false)}
            >
              ✕
            </button>

            <h2>Apply for Leave</h2>
            <p className="sub-text">
              Fill in the details to submit your leave request.
            </p>

            <div className="modal-row">
              <label>Leave Type</label>
              <select>
                <option>Select leave type</option>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
              </select>
            </div>

            <div className="modal-row">
              <label>Start Date</label>
              <input type="date" />
            </div>

            <div className="modal-row">
              <label>End Date</label>
              <input type="date" />
            </div>

            <div className="modal-row">
              <label>Reason</label>
              <textarea />
            </div>

            <div className="modal-footer">
              <button
                className="btn-outline"
                onClick={() => setShowApplyModal(false)}
              >
                Cancel
              </button>
              <button className="btn-primary">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveList;
