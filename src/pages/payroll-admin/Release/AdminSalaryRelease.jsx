import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminSalaryRelease = () => {

  /* =====================================================
     STATE
  ===================================================== */

  const [paymentDate, setPaymentDate] = useState("2026-02-28");

  const [salaryData, setSalaryData] = useState([
    { id: "EMP001", name: "John", netPay: 45000, status: "PENDING" },
    { id: "EMP014", name: "Priya", netPay: 52000, status: "PAID" },
    { id: "EMP021", name: "Arun", netPay: 39000, status: "PENDING" },
    { id: "EMP030", name: "Divya", netPay: 61000, status: "PENDING" }
  ]);

  /* =====================================================
     DERIVED VALUES (ZOHO KPI CARDS)
  ===================================================== */

  const totalCount = salaryData.length;

  const paidCount = useMemo(
    () => salaryData.filter(e => e.status === "PAID").length,
    [salaryData]
  );

  const pendingCount = totalCount - paidCount;

  const totalPayout = useMemo(
    () => salaryData.reduce((sum, e) => sum + e.netPay, 0),
    [salaryData]
  );

  /* =====================================================
     ACTIONS
  ===================================================== */

  // Mark all salary paid
  const markSalaryPaid = () => {
    const updated = salaryData.map(emp => ({
      ...emp,
      status: "PAID"
    }));
    setSalaryData(updated);
  };

  // Toggle single employee payment
  const togglePayment = (id) => {
    const updated = salaryData.map(emp =>
      emp.id === id
        ? {
            ...emp,
            status: emp.status === "PAID" ? "PENDING" : "PAID"
          }
        : emp
    );
    setSalaryData(updated);
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="payroll-admin-container">

      <h1 className="payroll-title">Salary Release</h1>

      {/* ============================
          KPI SUMMARY (ZOHO STYLE)
      ============================ */}
      <div className="payroll-grid">

        <div className="payroll-stat">
          <h4>Total Employees</h4>
          <p>{totalCount}</p>
        </div>

        <div className="payroll-stat success">
          <h4>Paid</h4>
          <p>{paidCount}</p>
        </div>

        <div className="payroll-stat warning">
          <h4>Pending</h4>
          <p>{pendingCount}</p>
        </div>

        <div className="payroll-stat highlight">
          <h4>Total Payout</h4>
          <p>₹ {totalPayout.toLocaleString()}</p>
        </div>

      </div>

      {/* ============================
          PAYMENT CONTROL PANEL
      ============================ */}
      <div className="payroll-card">

        <div className="salary-controls">

          <div className="date-control">
            <label>Payment Date:</label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>

          <button
            className="payroll-btn"
            onClick={markSalaryPaid}
          >
            Mark Salary Paid
          </button>

        </div>

      </div>

      {/* ============================
          SALARY TABLE
      ============================ */}
      <div className="payroll-section">

        <h3>Salary Release List</h3>

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
            {salaryData.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>

                <td>
                  <span
                    className={
                      emp.status === "PAID"
                        ? "status-pill status-approved"
                        : "status-pill status-pending"
                    }
                  >
                    {emp.status}
                  </span>
                </td>

                <td>₹ {emp.netPay.toLocaleString()}</td>

                <td>
                  <button
                    className="payroll-btn"
                    onClick={() => togglePayment(emp.id)}
                  >
                    Toggle
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

export default AdminSalaryRelease;
