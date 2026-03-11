import { useState, useEffect } from "react";
import "../payrollAdmin.css";

const AdminPayrollDashboard = () => {

  /* =====================================================
     STATE
  ===================================================== */
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     FETCH DATA (SIMULATED API)
  ===================================================== */
  useEffect(() => {

    // pretend backend response
    const mockPayroll = [
      { id: 1, empId: "EMP001", name: "John", status: "PROCESSED", netPay: 45000 },
      { id: 2, empId: "EMP002", name: "Kumar", status: "PROCESSED", netPay: 52000 },
      { id: 3, empId: "EMP003", name: "Priya", status: "PENDING", netPay: 38000 },
      { id: 4, empId: "EMP004", name: "Arun", status: "PROCESSED", netPay: 60000 },
      { id: 5, empId: "EMP005", name: "Divya", status: "PENDING", netPay: 42000 }
    ];

    setTimeout(() => {
      setPayrollData(mockPayroll);
      setLoading(false);
    }, 600);

  }, []);

  /* =====================================================
     DERIVED VALUES (AUTO CALCULATED)
  ===================================================== */
  const totalEmployees = payrollData.length;

  const processedCount = payrollData.filter(
    (p) => p.status === "PROCESSED"
  ).length;

  const pendingCount = payrollData.filter(
    (p) => p.status === "PENDING"
  ).length;

  const netPayout = payrollData.reduce(
    (sum, p) => sum + p.netPay,
    0
  );

  /* =====================================================
     TOGGLE PAYROLL STATUS (REAL ERP BEHAVIOR)
  ===================================================== */
  const toggleStatus = (id) => {

    const updated = payrollData.map((emp) =>
      emp.id === id
        ? {
            ...emp,
            status: emp.status === "PROCESSED" ? "PENDING" : "PROCESSED"
          }
        : emp
    );

    setPayrollData(updated);
  };

  if (loading) return <p style={{ padding: 20 }}>Loading payroll data...</p>;

  /* =====================================================
     UI
  ===================================================== */
  return (
    <div className="payroll-admin-container">

      <h1 className="payroll-title">Payroll Dashboard</h1>

      {/* =======================
          KPI STATS
      ======================== */}
      <div className="payroll-grid">

        <div className="payroll-stat">
          <h4>Total Employees</h4>
          <p>{totalEmployees}</p>
        </div>

        <div className="payroll-stat success">
          <h4>Processed</h4>
          <p>{processedCount}</p>
        </div>

        <div className="payroll-stat warning">
          <h4>Pending</h4>
          <p>{pendingCount}</p>
        </div>

        <div className="payroll-stat highlight">
          <h4>Net Payout</h4>
          <p>₹ {netPayout.toLocaleString()}</p>
        </div>

      </div>

      {/* =======================
          PAYROLL TABLE
      ======================== */}
      <div className="payroll-section">

        <h3>Employee Payroll Status</h3>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Net Pay</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payrollData.map((emp) => (
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
                <td>
                  <button
                    className="toggle-btn"
                    onClick={() => toggleStatus(emp.id)}
                  >
                    Toggle Status
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

export default AdminPayrollDashboard;
