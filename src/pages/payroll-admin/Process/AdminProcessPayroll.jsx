import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminProcessPayroll = () => {
  /* ================= STATE ================= */
  const [status, setStatus] = useState("DRAFT");

  const [employees, setEmployees] = useState([
    { id: 1, empId: "EMP001", name: "John", gross: 60000, deductions: 15000, status: "PENDING" },
    { id: 2, empId: "EMP002", name: "Kumar", gross: 75000, deductions: 20000, status: "PENDING" },
    { id: 3, empId: "EMP003", name: "Priya", gross: 50000, deductions: 12000, status: "PROCESSED" },
    { id: 4, empId: "EMP004", name: "Arun", gross: 82000, deductions: 25000, status: "PENDING" },
  ]);

  /* ================= DERIVED VALUES ================= */
  const totalEmployees = employees.length;
  const processedCount = employees.filter((e) => e.status === "PROCESSED").length;
  
  const totalNet = useMemo(() => 
    employees.reduce((sum, emp) => sum + (emp.gross - emp.deductions), 0), 
    [employees]
  );

  /* ================= ACTIONS ================= */
  const updateSalary = (id, field, value) => {
    if (status === "FINALIZED") return;
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, [field]: Number(value) } : emp,
    );
    setEmployees(updated);
  };

  const processEmployee = (id) => {
    if (status === "FINALIZED") return;
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, status: "PROCESSED" } : emp,
    );
    setEmployees(updated);
  };

  const validatePayroll = () => status === "DRAFT" && setStatus("VALIDATED");
  const approvePayroll = () => status === "VALIDATED" && setStatus("APPROVED");
  const finalizePayroll = () => status === "APPROVED" && setStatus("FINALIZED");
  const reopenPayroll = () => setStatus("DRAFT");

  return (
    <div className="payroll-admin-container">
      <h1 className="payroll-title">Payroll Processing Console</h1>

      {/* ================= RUN INFO ================= */}
      <div className="payroll-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: 0 }}>Payroll Run – February 2026</h3>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "5px 0 0 0" }}>
              Run ID: PR-2026-02 | Created By: HR Admin
            </p>
          </div>

          <span 
            className={`status-badge ${status.toLowerCase()}`}
            style={{ 
              backgroundColor: 
                status === "VALIDATED" ? "#3b82f6" : 
                status === "FINALIZED" ? "#ff4d4d" : "", 
              color: (status === "VALIDATED" || status === "FINALIZED") ? "white" : "",
              fontWeight: "bold",
              padding: "6px 15px",
              borderRadius: "4px",
              fontSize: "12px",
              textAlign: "center"
            }}
          >
            {status}
          </span>
        </div>
      </div>

      {/* ================= KPI SUMMARY ================= */}
      <div className="payroll-grid">
        <div className="payroll-stat">
          <h4>Total Employees</h4>
          <p>{totalEmployees}</p>
        </div>

        <div className="payroll-stat success" style={{ borderLeftColor: "#22c55e" }}>
          <h4>Processed Employees</h4>
          <p>{processedCount}</p>
        </div>

        <div className="payroll-stat highlight">
          <h4>Total Net Payroll</h4>
          <p>₹ {totalNet.toLocaleString()}</p>
        </div>
      </div>

      {/* ================= WORKFLOW SECTION ================= */}
      <div className="payroll-card">
        <h3 style={{ marginTop: 0 }}>Payroll Workflow</h3>
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button
            className="payroll-btn"
            style={{ backgroundColor: status === "DRAFT" ? "#3b82f6" : "#cbd5e1", color: status === "DRAFT" ? "white" : "" }}
            onClick={validatePayroll}
            disabled={status !== "DRAFT"}
          >
            Validate
          </button>
          <button
            className="payroll-btn"
            style={{ backgroundColor: status === "VALIDATED" ? "#3b82f6" : "#cbd5e1", color: status === "VALIDATED" ? "white" : "" }}
            onClick={approvePayroll}
            disabled={status !== "VALIDATED"}
          >
            Approve
          </button>
          <button
            className="payroll-btn danger"
            onClick={finalizePayroll}
            disabled={status !== "APPROVED"}
          >
            Finalize & Lock
          </button>

          {status === "FINALIZED" && (
            <button className="payroll-btn" onClick={reopenPayroll}>Reopen</button>
          )}
        </div>
      </div>

      {/* ================= EMPLOYEE TABLE ================= */}
      <div className="payroll-section">
        <h3 style={{ marginBottom: "20px" }}>Employee Salary Management</h3>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>EMP ID</th>
              <th>NAME</th>
              <th>GROSS</th>
              <th>DEDUCTIONS</th>
              <th>NET</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>
                  <input
                    type="number"
                    value={emp.gross}
                    onChange={(e) => updateSalary(emp.id, "gross", e.target.value)}
                    disabled={status === "FINALIZED"}
                    style={{ width: "80px", padding: "5px", border: "1px solid #ddd", borderRadius: "4px" }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={emp.deductions}
                    onChange={(e) => updateSalary(emp.id, "deductions", e.target.value)}
                    disabled={status === "FINALIZED"}
                    style={{ width: "80px", padding: "5px", border: "1px solid #ddd", borderRadius: "4px" }}
                  />
                </td>
                <td style={{ fontWeight: "600" }}>
                  ₹ {(emp.gross - emp.deductions).toLocaleString()}
                </td>
                <td>
                  {/* 🔥 UPDATED: PROCESSED STATUS COLOR TO GREEN 🔥 */}
                  <span 
                    className={`status-badge ${emp.status.toLowerCase()}`}
                    style={{ 
                      backgroundColor: emp.status === "PROCESSED" ? "#dcfce7" : "#fef9c3", 
                      color: emp.status === "PROCESSED" ? "#166534" : "#854d0e",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "600",
                      display: "inline-block"
                    }}
                  >
                    {emp.status}
                  </span>
                </td>
                <td>
                  <button
                    className="payroll-btn"
                    style={{ padding: "5px 15px", fontSize: "12px" }}
                    onClick={() => processEmployee(emp.id)}
                    disabled={emp.status === "PROCESSED" || status === "FINALIZED"}
                  >
                    Process
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProcessPayroll;