import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminPayrollApprovals = () => {

  /* ======================================================
      STATE
  ====================================================== */
  const [filter, setFilter] = useState("ALL");
  const [selectedIds, setSelectedIds] = useState([]); 

  const [approvals, setApprovals] = useState([
    { id: "EMP001", name: "John", status: "PENDING", netPay: 45000 },
    { id: "EMP014", name: "Priya", status: "APPROVED", netPay: 52000 },
    { id: "EMP021", name: "Arun", status: "PENDING", netPay: 39000 },
    { id: "EMP030", name: "Divya", status: "PENDING", netPay: 61000 }
  ]);

  /* ======================================================
      DERIVED VALUES
  ====================================================== */
  const totalCount = approvals.length;

  const approvedCount = useMemo(
    () => approvals.filter(a => a.status === "APPROVED").length,
    [approvals]
  );

  const pendingCount = useMemo(
    () => approvals.filter(a => a.status === "PENDING").length,
    [approvals]
  );

  const filteredData = useMemo(() => {
    if (filter === "ALL") return approvals;
    return approvals.filter(a => a.status === filter);
  }, [approvals, filter]);

  /* ======================================================
      SELECTION LOGIC
  ====================================================== */
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map(emp => emp.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  /* ======================================================
      ACTIONS
  ====================================================== */
  const approvePayroll = (id) => {
    const updated = approvals.map(emp =>
      emp.id === id ? { ...emp, status: "APPROVED" } : emp
    );
    setApprovals(updated);
  };

  const rejectPayroll = (id) => {
    const updated = approvals.map(emp =>
      emp.id === id ? { ...emp, status: "REJECTED" } : emp
    );
    setApprovals(updated);
  };

  const handleBulkAction = (newStatus) => {
    const updated = approvals.map(emp => 
      selectedIds.includes(emp.id) ? { ...emp, status: newStatus } : emp
    );
    setApprovals(updated);
    setSelectedIds([]); 
  };

  return (
    <div className="payroll-admin-container">
      <h1 className="payroll-title">Payroll Approvals</h1>

      <div className="payroll-grid">
        <div className="payroll-stat">
          <h4>Total Requests</h4>
          <p>{totalCount}</p>
        </div>
        <div className="payroll-stat success">
          <h4>Approved</h4>
          <p>{approvedCount}</p>
        </div>
        <div className="payroll-stat warning">
          <h4>Pending</h4>
          <p>{pendingCount}</p>
        </div>
      </div>

      <div className="approval-filters">
        <button className={filter === "ALL" ? "active" : ""} onClick={() => {setFilter("ALL"); setSelectedIds([]);}}>All</button>
        <button className={filter === "PENDING" ? "active" : ""} onClick={() => {setFilter("PENDING"); setSelectedIds([]);}}>Pending</button>
        <button className={filter === "APPROVED" ? "active" : ""} onClick={() => {setFilter("APPROVED"); setSelectedIds([]);}}>Approved</button>
      </div>

      {/* FLOATING BULK PROMPT */}
      <div className={`bulk-action-float ${selectedIds.length > 0 ? "show" : ""}`}>
         <span>{selectedIds.length} employees selected</span>
         <div className="bulk-btn-group">
            <button className="bulk-approve-btn" onClick={() => handleBulkAction("APPROVED")}>Approve All</button>
            <button className="bulk-reject-btn" onClick={() => handleBulkAction("REJECTED")}>Reject All</button>
            <button className="bulk-close-btn" onClick={() => setSelectedIds([])}>Cancel</button>
         </div>
      </div>

      <table className="payroll-table">
        <thead>
          <tr>
            <th className="select-column">
              <input 
                type="checkbox" 
                onChange={handleSelectAll}
                checked={selectedIds.length === filteredData.length && filteredData.length > 0}
              />
            </th>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Net Pay</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map(e => (
            <tr key={e.id} className={selectedIds.includes(e.id) ? "row-selected" : ""}>
              <td className="select-column">
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(e.id)}
                  onChange={() => toggleSelect(e.id)}
                />
              </td>

              <td>{e.id}</td>
              <td>{e.name}</td>

              <td>
                <span className={`status-pill 
                    ${e.status === "APPROVED" ? "status-approved" : ""}
                    ${e.status === "PENDING" ? "status-pending" : ""}
                    ${e.status === "REJECTED" ? "status-rejected" : ""}
                `}>
                  {e.status}
                </span>
              </td>

              <td>₹ {e.netPay.toLocaleString()}</td>

              <td className="approval-actions">
                {selectedIds.length === 0 ? (
                  <>
                    <button className="approve-btn" onClick={() => approvePayroll(e.id)}>Approve</button>
                    <button className="reject-btn" onClick={() => rejectPayroll(e.id)}>Reject</button>
                  </>
                ) : (
                  <span className="action-placeholder">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayrollApprovals;