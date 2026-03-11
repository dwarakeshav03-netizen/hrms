import { useState } from "react";
import "../AddEmployee/hrForms.css";

const RunPayroll = ({ onClose }) => {
  const [month, setMonth] = useState("January 2026");
  const [scope, setScope] = useState("ALL");
  const [attendanceMode, setAttendanceMode] = useState("ATTENDANCE");
  const [includeBonus, setIncludeBonus] = useState(true);
  const [includeOvertime, setIncludeOvertime] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleRunPayroll = () => {
    const payload = {
      payrollMonth: month,
      employeeScope: scope,
      attendanceMode,
      includeBonus,
      includeOvertime,
    };

    console.log("Running Payroll with config:", payload);

    // ✅ show success message
    setSuccess(true);

  };

  return (
    <>
      <h2 className="form-title">Run Payroll</h2>
      <p className="form-subtitle">
        Review settings and process salary for selected period
      </p>

      
      {/* SUMMARY */}
      <div className="info-box">
        <p><b>Employees:</b> 128</p>
        <p><b>Payroll Month:</b> {month}</p>
      </div>

      {/* PAYROLL OPTIONS */}
      <div className="form-grid">
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option>January 2026</option>
          <option>February 2026</option>
          <option>March 2026</option>
        </select>

        <select value={scope} onChange={(e) => setScope(e.target.value)}>
          <option value="ALL">All Active Employees</option>
          <option value="DEPARTMENT">Department Wise</option>
          <option value="SELECTED">Selected Employees</option>
        </select>

        <select
          value={attendanceMode}
          onChange={(e) => setAttendanceMode(e.target.value)}
        >
          <option value="ATTENDANCE">Use Attendance</option>
          <option value="FIXED">Fixed Salary (Ignore Attendance)</option>
          <option value="MANUAL">Manual Override</option>
        </select>
      </div>

      {/* SALARY COMPONENT TOGGLES */}
      <div className="info-box">
        <p><b>Salary Components</b></p>

        <label>
          <input
            type="checkbox"
            checked={includeBonus}
            onChange={() => setIncludeBonus(!includeBonus)}
          />{" "}
          Include Bonus / Incentives
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={includeOvertime}
            onChange={() => setIncludeOvertime(!includeOvertime)}
          />{" "}
          Include Overtime
        </label>
      </div>

      {/* REQUIRED PAYROLL COLUMNS */}
      <div className="info-box">
        <p><b>Payroll will calculate using:</b></p>
        <ul>
          <li>Basic Salary</li>
          <li>HRA & Allowances</li>
          <li>PF, Professional Tax, TDS</li>
          <li>Leave / LOP Deductions</li>
          <li>Net Pay = Gross − Deductions</li>
        </ul>
      </div>
      {/* ✅ SUCCESS MESSAGE */}
      {success && (
        <div className="success-box">
          ✅ Payroll processed successfully!
        </div>
      )}


      {/* FOOTER ACTIONS */}
      <div className="form-footer">
        <button
          type="button"
          className="btn-outline"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn-primary"
          onClick={handleRunPayroll}
        >
          Run Payroll
        </button>
      </div>
    </>
  );
};

export default RunPayroll;
