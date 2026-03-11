import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminProcessPayroll = () => {

  /* ===================================================
     STATE
  =================================================== */

  const [isLocked, setIsLocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [employees, setEmployees] = useState([
    { id: 1, empId: "EMP001", name: "John", status: "PENDING", netPay: 45000 },
    { id: 2, empId: "EMP002", name: "Kumar", status: "PENDING", netPay: 52000 },
    { id: 3, empId: "EMP003", name: "Priya", status: "PROCESSED", netPay: 38000 },
    { id: 4, empId: "EMP004", name: "Arun", status: "PENDING", netPay: 60000 }
  ]);

  /* ===================================================
     DERIVED VALUES
  =================================================== */

  const processedCount = useMemo(
    () => employees.filter(e => e.status === "PROCESSED").length,
    [employees]
  );

  const progressPercent = useMemo(() => {
    if (!employees.length) return 0;
    return Math.round((processedCount / employees.length) * 100);
  }, [processedCount, employees]);

  /* ===================================================
     ACTIONS (ZOHO STYLE BEHAVIOR)
  =================================================== */

  // RUN PAYROLL
  const runPayroll = () => {
    if (isLocked) return;

    setIsProcessing(true);

    setTimeout(() => {
      const updated = employees.map(emp => ({
        ...emp,
        status: "PROCESSED"
      }));
      setEmployees(updated);
      setIsProcessing(false);
    }, 900);
  };

  // RECALCULATE
  const recalculatePayroll = () => {
    if (isLocked) return;

    const updated = employees.map(emp => ({
      ...emp,
      netPay: emp.netPay + 500 // simulate recalculation
    }));

    setEmployees(updated);
  };

  // LOCK PAYROLL
  const lockPayroll = () => {
    setIsLocked(true);
  };

  /* ===================================================
     UI
  =================================================== */

  return (
    <div className="payroll-admin-container">

      <h1 className="payroll-title">Process Payroll</h1>

      {/* ==========================
          PAYROLL STATUS CARD
      =========================== */}
      <div className="payroll-card">

        <div className="payroll-status-row">
          <h4>Status:</h4>
          <span className={`status-badge ${isLocked ? "locked" : "active"}`}>
            {isLocked ? "LOCKED" : "ACTIVE"}
          </span>
        </div>

        <div className="progress-box">
          <p>Processing Progress: {progressPercent}%</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="payroll-actions">
          <button
            className="payroll-btn"
            onClick={runPayroll}
            disabled={isLocked || isProcessing}
          >
            {isProcessing ? "Running..." : "Run Payroll"}
          </button>

          <button
            className="payroll-btn"
            onClick={recalculatePayroll}
            disabled={isLocked}
          >
            Recalculate
          </button>

          <button
            className="payroll-btn danger"
            onClick={lockPayroll}
            disabled={isLocked}
          >
            Lock Payroll
          </button>
        </div>

      </div>

      {/* ==========================
          EMPLOYEE PAYROLL TABLE
      =========================== */}
      <div className="payroll-section">

        <h3>Payroll Employees</h3>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Net Pay</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.empId}</td>
                <td>{emp.name}</td>
                <td>
                  <span
                    className={
                      emp.status === "PROCESSED"
                        ? "status processed"
                        : "status pending"
                    }
                  >
                    {emp.status}
                  </span>
                </td>
                <td>₹ {emp.netPay.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default AdminProcessPayroll;
