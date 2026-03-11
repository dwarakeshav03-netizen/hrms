import React from "react";
import "./EmployeePayroll.css";

const EmployeePayroll = () => {
  const salary = {
    basic: 30000,
    hra: 8000,
    allowance: 5000,
    pf: 1800,
    esi: 500,
    tax: 1200,
  };

  const gross = salary.basic + salary.hra + salary.allowance;
  const deductions = salary.pf + salary.esi + salary.tax;
  const net = gross - deductions;

  return (
    <div className="payroll-container">
      <h2 className="payroll-title">My Payroll</h2>

      {/* SUMMARY CARDS */}
      <div className="payroll-summary">
        <div className="summary-card">
          <p>Gross Salary</p>
          <h3>₹{gross}</h3>
        </div>

        <div className="summary-card">
          <p>Total Deductions</p>
          <h3>₹{deductions}</h3>
        </div>

        <div className="summary-card highlight">
          <p>Net Salary</p>
          <h3>₹{net}</h3>
        </div>
      </div>

      {/* SALARY BREAKDOWN */}
      <div className="payroll-card">
        <h3>Salary Breakdown (This Month)</h3>

        <div className="breakdown-grid">
          <div>
            <h4>Earnings</h4>
            <p>Basic Salary: ₹{salary.basic}</p>
            <p>HRA: ₹{salary.hra}</p>
            <p>Special Allowance: ₹{salary.allowance}</p>
          </div>

          <div>
            <h4>Deductions</h4>
            <p>Provident Fund (PF): ₹{salary.pf}</p>
            <p>ESI: ₹{salary.esi}</p>
            <p>Professional Tax: ₹{salary.tax}</p>
          </div>
        </div>
      </div>

      {/* PAYSLIP HISTORY */}
      <div className="payroll-card">
        <h3>Payslip History</h3>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>January 2026</td>
              <td>₹39400</td>
              <td>
                <span className="status credited">Credited</span>
              </td>
              <td>
                <button className="download-btn">Download</button>
              </td>
            </tr>

            <tr>
              <td>December 2025</td>
              <td>₹39000</td>
              <td>
                <span className="status credited">Credited</span>
              </td>
              <td>
                <button className="download-btn">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePayroll;
