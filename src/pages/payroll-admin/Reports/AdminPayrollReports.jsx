import { useState, useMemo } from "react";
import "../payrollAdmin.css"; 

const AdminPayrollReports = () => {
  /* ================= STATE ================= */
  const [reportPeriod, setReportPeriod] = useState("2026-02");
  const [department, setDepartment] = useState("All Departments");
  const [reportType, setReportType] = useState("Summary Report");
  const [format, setFormat] = useState("PDF");
  const [activeTab, setActiveTab] = useState("Overview");
  const [showFilters, setShowFilters] = useState(true);

  /* ================= CALCULATIONS (KPIs) ================= */
  const totalPayroll = 260000; 
  const totalNetPay = 207000;   
  const totalEmployees = 4;
  const averageSalary = 65000;

  return (
    <div className="payroll-admin-container">
      {/* HEADER SECTION */}
      <div className="payroll-reports-header">
        <h1 className="payroll-title" style={{ color: '#000', fontWeight: '700' }}>Payroll Reports</h1>
        <p className="subtitle" style={{ color: '#222', fontSize: '14px', fontWeight: '500' }}>
          Comprehensive payroll analytics & insights
        </p>
        
        <div className="action-btns" style={{ marginBottom: '20px', marginTop: '10px' }}>
          <button className="btn-outline" onClick={() => setShowFilters(!showFilters)} style={{ marginRight: '10px' }}>
            Advanced Filters
          </button>
          <button className="btn-primary" style={{ backgroundColor: '#3b82f6' }}>
            Export Report
          </button>
        </div>
      </div>

      {/* REPORT CONFIGURATION CARD */}
      {showFilters && (
        <div className="payroll-card" style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#fff' }}>
          <h3 style={{ marginTop: 0, fontSize: '18px', color: '#000' }}>Report Configuration</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '15px' }}>
            <div>
              <label style={labelStyle}>Report Period</label>
              <input type="month" value={reportPeriod} onChange={(e) => setReportPeriod(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Department</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)} style={inputStyle}>
                <option>All Departments</option>
                <option>Engineering</option>
                <option>HR</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Report Type</label>
              <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={inputStyle}>
                <option>Summary Report</option>
                <option>Detailed Report</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Format</label>
              <select value={format} onChange={(e) => setFormat(e.target.value)} style={inputStyle}>
                <option>PDF</option>
                <option>Excel</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* QUICK GENERATE CARDS (TEXT UPDATED TO BLACK) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px' }}>
        {[
          "Monthly Payroll Summary",
          "Department-wise Analysis",
          "Tax Deduction Report",
          "Employee Cost Analysis"
        ].map((item, idx) => (
          <div key={idx} className="payroll-card" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
            {/* 🔥 UPDATED COLOR TO BLACK (#000) AND FONT WEIGHT */}
            <span style={{ fontSize: '14px', color: '#000', fontWeight: '600' }}>{item}</span>
            <button style={generateBtnStyle}>Generate</button>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {["Overview", "Departments", "Deductions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              backgroundColor: activeTab === tab ? '#3b82f6' : '#fff',
              color: activeTab === tab ? '#fff' : '#000', // Black for inactive tabs
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <div className="payroll-card" style={kpiCardStyle}>
          <p style={kpiLabelStyle}>Total Payroll</p>
          <h3 style={kpiValueStyle}>₹ {totalPayroll.toLocaleString()}</h3>
        </div>
        <div className="payroll-card" style={kpiCardStyle}>
          <p style={kpiLabelStyle}>Total Net Pay</p>
          <h3 style={kpiValueStyle}>₹ {totalNetPay.toLocaleString()}</h3>
        </div>
        <div className="payroll-card" style={kpiCardStyle}>
          <p style={kpiLabelStyle}>Total Employees</p>
          <h3 style={kpiValueStyle}>{totalEmployees}</h3>
        </div>
        <div className="payroll-card" style={kpiCardStyle}>
          <p style={kpiLabelStyle}>Average Salary</p>
          <h3 style={kpiValueStyle}>₹ {averageSalary.toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */
// Label colors updated to darker shade for better visibility
const labelStyle = { display: 'block', fontSize: '13px', color: '#111', marginBottom: '5px', fontWeight: '600' };
const inputStyle = { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', color: '#000' };
const generateBtnStyle = { backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' };
const kpiCardStyle = { padding: '20px', textAlign: 'left', backgroundColor: '#fff' };
const kpiLabelStyle = { margin: 0, fontSize: '14px', color: '#000', fontWeight: '700' };
const kpiValueStyle = { margin: '10px 0 0 0', fontSize: '24px', color: '#1a3353', fontWeight: 'bold' };

export default AdminPayrollReports;