import React, { useState, useEffect, useRef } from "react"; // Added useRef
import html2pdf from "html2pdf.js"; // Added library import
import "../payrollAdmin.css";

const PayslipPortal = () => {
  // Reference to the payslip container for PDF generation
  const payslipRef = useRef();

  const [employeeInfo, setEmployeeInfo] = useState({
    empId: "",
    name: "",
    department: "",
    designation: "",
    bankName: "",
    accNo: "",
    paidDays: 0,
    monthDays: 30,
    grossSalaryInput: 0,
  });

  const [calculations, setCalculations] = useState({
    basic: 0, hra: 0, incentives: 0, bonus: 0, overtime: 0,
    grossSalary: 0, totalEarnings: 0, pf: 0, profTax: 0, tds: 0,
    totalDeductions: 0, netPay: 0,
  });

  useEffect(() => {
    const gross = parseFloat(employeeInfo.grossSalaryInput) || 0;
    const basic = gross * 0.4;
    const hra = basic * 0.5;
    const pf = basic > 0 ? Math.min(basic * 0.12, 1800) : 0;
    const tds = gross > 50000 ? gross * 0.05 : 0;
    const profTax = gross > 15000 ? 200 : 0;

    const totalEarnings = gross + 0 + 0 + 0; 
    const totalDeductions = pf + profTax + tds;

    setCalculations({
      basic, hra, incentives: 0, bonus: 0, overtime: 0,
      grossSalary: gross, totalEarnings, pf, profTax, tds,
      totalDeductions, netPay: totalEarnings - totalDeductions,
    });
  }, [employeeInfo.grossSalaryInput]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo((prev) => ({ ...prev, [name]: value }));
  };

  // --- PDF DOWNLOAD FEATURE ---
  const handleGeneratePayslip = () => {
    const element = payslipRef.current;
    const options = {
      margin: 10,
      filename: `Payslip_${employeeInfo.empId || 'Employee'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="payroll-admin-container">
      <h1 className="payroll-title">Create New Payslip</h1>

      {/* INPUT SECTION */}
      <div className="payroll-card input-main-grid">
        <div className="input-split-column">
          <h3 className="section-header">EMP details</h3>
          <input name="empId" placeholder="Employee ID" value={employeeInfo.empId} onChange={handleChange} />
          <input name="name" placeholder="Employee Name" value={employeeInfo.name} onChange={handleChange} />
          <input name="department" placeholder="Department" value={employeeInfo.department} onChange={handleChange} />
          <input name="designation" placeholder="Designation" value={employeeInfo.designation} onChange={handleChange} />
        </div>

        <div className="input-split-column border-left">
          <h3 className="section-header">BANK details</h3>
          <input name="bankName" placeholder="Bank Name" value={employeeInfo.bankName} onChange={handleChange} />
          <input name="accNo" placeholder="Account Number" value={employeeInfo.accNo} onChange={handleChange} />
          <input name="paidDays" type="number" placeholder="Paid Days" value={employeeInfo.paidDays} onChange={handleChange} />
          <input 
            name="grossSalaryInput" 
            type="number" 
            placeholder="Gross Salary" 
            className="highlight-input"
            onChange={handleChange} 
          />
        </div>
      </div>

      {/* OUTPUT TEMPLATE - Ref attached here to capture this section */}
      <div className="payslip-preview-container" ref={payslipRef} style={{ background: '#fff', padding: '20px' }}>
        <div className="summary-header-grid" style={{ display: 'flex', marginBottom: '20px' }}>
             
        </div>

        <hr className="dark-divider" />

        <div className="financial-grid">
          <div className="fin-column">
            <h4>Earnings</h4>
            <div className="fin-row"><span>Basic</span> <span>{calculations.basic.toFixed(0)}</span></div>
            <div className="fin-row"><span>HRA</span> <span>{calculations.hra.toFixed(0)}</span></div>
            <div className="fin-row"><span>Incentives</span> <span>{calculations.incentives}</span></div>
            <div className="fin-row"><span>Bonus</span> <span>{calculations.bonus}</span></div>
            <div className="fin-row"><span>Overtime Pay</span> <span>{calculations.overtime}</span></div>
            <div className="fin-row total-line"><span>Gross Salary</span> <span>{calculations.grossSalary.toLocaleString()}</span></div>
            <div className="fin-row final-total"><span>Total Earnings</span> <span>{calculations.totalEarnings.toLocaleString()}</span></div>
          </div>
          <div className="fin-column border-left">
            <h4>Deductions</h4>
            <div className="fin-row"><span>Provident Fund</span> <span>{calculations.pf.toFixed(0)}</span></div>
            <div className="fin-row"><span>Professional Tax</span> <span>{calculations.profTax}</span></div>
            <div className="fin-row"><span>TDS</span> <span>{calculations.tds.toFixed(0)}</span></div>
            <div className="fin-row final-total"><span>Total Deductions</span> <span>{calculations.totalDeductions.toLocaleString()}</span></div>
          </div>
        </div>

        <div className="net-pay-footer" style={{ borderTop: '1px solid #ccc', marginTop: '20px', textAlign: 'right' }}>
          <h2>Net Pay: ₹ {calculations.netPay.toLocaleString()}</h2>
        </div>
      </div>

      <button className="save-btn" onClick={handleGeneratePayslip}>
        Save & Generate Payslip
      </button>
    </div>
  );
};

export default PayslipPortal;