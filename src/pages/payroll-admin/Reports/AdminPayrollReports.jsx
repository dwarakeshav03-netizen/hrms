import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminPayrollReports = () => {

  /* =====================================================
     STATE
  ===================================================== */

  const [selectedMonth, setSelectedMonth] = useState("Feb 2026");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");

  const reportData = [
    { id: "EMP001", name: "John", dept: "IT", netPay: 45000, pf: 1800 },
    { id: "EMP014", name: "Priya", dept: "HR", netPay: 52000, pf: 2100 },
    { id: "EMP021", name: "Arun", dept: "Finance", netPay: 39000, pf: 1600 },
    { id: "EMP030", name: "Divya", dept: "IT", netPay: 61000, pf: 2400 }
  ];

  /* =====================================================
     FILTERED DATA
  ===================================================== */

  const filteredData = useMemo(() => {
    if (departmentFilter === "ALL") return reportData;
    return reportData.filter(r => r.dept === departmentFilter);
  }, [departmentFilter]);

  /* =====================================================
     DERIVED REPORT VALUES (ZOHO KPI STYLE)
  ===================================================== */

  const totalEmployees = filteredData.length;

  const totalCost = useMemo(
    () => filteredData.reduce((sum, r) => sum + r.netPay, 0),
    [filteredData]
  );

  const totalPF = useMemo(
    () => filteredData.reduce((sum, r) => sum + r.pf, 0),
    [filteredData]
  );

  /* =====================================================
     ACTIONS (DOWNLOAD MOCK)
  ===================================================== */

  const downloadCSV = () => {
    alert("Downloading Payroll CSV...");
  };

  const downloadPF = () => {
    alert("Generating PF Report...");
  };

  const downloadDeptCost = () => {
    alert("Generating Department Cost Report...");
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="payroll-admin-container">

      <h1 className="payroll-title">Payroll Reports</h1>

      {/* ============================
          KPI SUMMARY (ZOHO STYLE)
      ============================ */}
      <div className="payroll-grid">

        <div className="payroll-stat">
          <h4>Total Employees</h4>
          <p>{totalEmployees}</p>
        </div>

        <div className="payroll-stat highlight">
          <h4>Total Salary Cost</h4>
          <p>₹ {totalCost.toLocaleString()}</p>
        </div>

        <div className="payroll-stat success">
          <h4>Total PF</h4>
          <p>₹ {totalPF.toLocaleString()}</p>
        </div>

      </div>

      {/* ============================
          REPORT FILTER PANEL
      ============================ */}
      <div className="payroll-card">

        <div className="report-controls">

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="month-select"
          >
            <option>Feb 2026</option>
            <option>Jan 2026</option>
            <option>Dec 2025</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="dept-select"
          >
            <option value="ALL">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>

          <button
            className="payroll-btn"
            onClick={downloadCSV}
          >
            Download Payroll CSV
          </button>

          <button
            className="payroll-btn"
            onClick={downloadPF}
          >
            PF Report
          </button>

          <button
            className="payroll-btn"
            onClick={downloadDeptCost}
          >
            Department Cost Report
          </button>

        </div>

      </div>

      {/* ============================
          REPORT TABLE
      ============================ */}
      <div className="payroll-section">

        <h3>{selectedMonth} Report</h3>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Net Pay</th>
              <th>PF</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.dept}</td>
                <td>₹ {emp.netPay.toLocaleString()}</td>
                <td>₹ {emp.pf.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminPayrollReports;
