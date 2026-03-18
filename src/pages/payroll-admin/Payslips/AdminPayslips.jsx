import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import "../payrollAdmin.css";

const AdminSalaryStructure = () => {
  const payslipRef = useRef();

  const [employeeInfo, setEmployeeInfo] = useState({
    empId: "", name: "", department: "", designation: "",
    bankName: "", accNo: "", paidDays: "30", grossSalaryInput: ""
  });

  const [components, setComponents] = useState([]);
  const [newComp, setNewComp] = useState({ name: "", amount: "", type: "Earning" });
  const [totals, setTotals] = useState({ earnings: 0, deductions: 0, net: 0 });

  // --- AUTO CALCULATION LOGIC (Initial Setup based on Gross) ---
  useEffect(() => {
    const gross = parseFloat(employeeInfo.grossSalaryInput) || 0;
    if (gross > 0) {
      const basic = Math.round(gross * 0.4);
      const hra = Math.round(basic * 0.5);
      const pf = Math.min(Math.round(basic * 0.12), 1800);
      const profTax = gross > 15000 ? 200 : 0;
      const specialAllowance = gross - (basic + hra);

      setComponents([
        { id: 'c1', name: "Basic Salary", amount: basic, type: "Earning" },
        { id: 'c2', name: "HRA", amount: hra, type: "Earning" },
        { id: 'c3', name: "Special Allowance", amount: specialAllowance, type: "Earning" },
        { id: 'c4', name: "Provident Fund", amount: pf, type: "Deduction" },
        { id: 'c5', name: "Professional Tax", amount: profTax, type: "Deduction" },
      ]);
    } else {
      setComponents([]);
    }
  }, [employeeInfo.grossSalaryInput]);

  // --- TOTALS CALCULATION ---
  useEffect(() => {
    const earnings = components
      .filter(c => c.type === "Earning")
      .reduce((sum, c) => sum + parseFloat(c.amount || 0), 0);
    
    const deductions = components
      .filter(c => c.type === "Deduction")
      .reduce((sum, c) => sum + parseFloat(c.amount || 0), 0);

    setTotals({ earnings, deductions, net: earnings - deductions });
  }, [components]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo(prev => ({ ...prev, [name]: value }));
  };

  // --- ADD MANUAL COMPONENT ---
  const addComponent = () => {
    if (newComp.name && newComp.amount) {
      setComponents([...components, { ...newComp, id: Date.now() }]);
      setNewComp({ name: "", amount: "", type: "Earning" });
    }
  };

  const removeComponent = (id) => setComponents(components.filter(c => c.id !== id));

  const handleGeneratePDF = () => {
    const element = payslipRef.current;
    html2pdf().from(element).save(`Salary_Structure_${employeeInfo.name || 'EMP'}.pdf`);
  };

  return (
    <div className="payroll-admin-container" style={{ padding: '24px', background: '#f4f7fa' }}>
      <h2 style={{ marginBottom: '20px', color: '#1a3353' }}>Salary Structure Management</h2>

      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
        <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3182ce' }}>
          <span style={{ fontSize: '14px', color: '#718096' }}>Total Earnings</span>
          <h3 style={{ margin: '8px 0 0' }}>₹ {totals.earnings.toLocaleString()}</h3>
        </div>
        <div style={{ flex: 1, background: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #e53e3e' }}>
          <span style={{ fontSize: '14px', color: '#718096' }}>Total Deductions</span>
          <h3 style={{ margin: '8px 0 0' }}>₹ {totals.deductions.toLocaleString()}</h3>
        </div>
        <div style={{ flex: 1, background: '#1a3353', padding: '20px', borderRadius: '8px', color: '#fff' }}>
          <span style={{ fontSize: '14px', opacity: 0.8 }}>Net Take-Home</span>
          <h3 style={{ margin: '8px 0 0' }}>₹ {totals.net.toLocaleString()}</h3>
        </div>
      </div>

      {/* INPUTS SECTION */}
      <div className="payroll-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: '#4a5568' }}>EMP details</h4>
            <input name="name" style={inputStyle} placeholder="Employee Name" onChange={handleInfoChange} />
            <input name="empId" style={inputStyle} placeholder="Employee ID" onChange={handleInfoChange} />
            <input name="department" style={inputStyle} placeholder="Department" onChange={handleInfoChange} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: '#4a5568' }}>Main Salary Input</h4>
            <input 
              name="grossSalaryInput" 
              style={{...inputStyle, border: '2px solid #3182ce', fontWeight: 'bold'}} 
              placeholder="Enter Gross Salary" 
              type="number" 
              onChange={handleInfoChange} 
            />
            <input name="bankName" style={inputStyle} placeholder="Bank Name" onChange={handleInfoChange} />
            <input name="accNo" style={inputStyle} placeholder="Account Number" onChange={handleInfoChange} />
          </div>
        </div>
      </div>

      {/* MANUAL COMPONENT ADDER */}
      <div className="payroll-card" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '15px' }}>Add Extra Component Manually</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            style={{ flex: 2, padding: '10px', border: '1px solid #ddd' }} 
            placeholder="e.g. Bonus, Overtime" 
            value={newComp.name} 
            onChange={(e)=>setNewComp({...newComp, name: e.target.value})} 
          />
          <input 
            style={{ flex: 1, padding: '10px', border: '1px solid #ddd' }} 
            type="number" 
            placeholder="Amount" 
            value={newComp.amount} 
            onChange={(e)=>setNewComp({...newComp, amount: e.target.value})} 
          />
          <select 
            style={{ flex: 1, padding: '10px', border: '1px solid #ddd' }} 
            value={newComp.type} 
            onChange={(e)=>setNewComp({...newComp, type: e.target.value})}
          >
            <option value="Earning">Earning</option>
            <option value="Deduction">Deduction</option>
          </select>
          <button 
            style={{ flex: 1, background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }} 
            onClick={addComponent}
          >
            Add Component
          </button>
        </div>
      </div>

      {/* TABLE BREAKDOWN */}
      <div className="payroll-card" style={{ background: '#fff', borderRadius: '8px', padding: '24px' }}>
        <h4 style={{ marginBottom: '16px' }}>Earnings Breakdown</h4>
        <table style={tableStyle}>
          <thead style={{ background: '#f8fafc' }}>
            <tr>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>AMOUNT</th>
              <th style={{...thStyle, textAlign: 'right'}}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {components.filter(c => c.type === "Earning").map(c => (
              <tr key={c.id}>
                <td style={tdStyle}>{c.name}</td>
                <td style={tdStyle}>₹ {parseFloat(c.amount).toLocaleString()}</td>
                <td style={{...tdStyle, textAlign: 'right'}}>
                  <button onClick={() => removeComponent(c.id)} style={removeBtnStyle}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 style={{ margin: '24px 0 16px' }}>Deductions</h4>
        <table style={tableStyle}>
          <thead style={{ background: '#f8fafc' }}>
            <tr>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>AMOUNT</th>
              <th style={{...thStyle, textAlign: 'right'}}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {components.filter(c => c.type === "Deduction").map(c => (
              <tr key={c.id}>
                <td style={tdStyle}>{c.name}</td>
                <td style={tdStyle}>₹ {parseFloat(c.amount).toLocaleString()}</td>
                <td style={{...tdStyle, textAlign: 'right'}}>
                  <button onClick={() => removeComponent(c.id)} style={removeBtnStyle}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button className="save-btn" onClick={handleGeneratePDF} style={{ padding: '12px 40px', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Download Salary Annexure PDF
        </button>
      </div>

      {/* Hidden PDF Preview Container */}
      <div style={{ display: 'none' }}>
        <div ref={payslipRef} style={{ padding: '40px', background: '#fff' }}>
           <h2 style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px' }}>OFFICIAL SALARY STRUCTURE</h2>
           <div style={{ margin: '20px 0', fontSize: '14px' }}>
              <p><strong>Name:</strong> {employeeInfo.name || 'N/A'}</p>
              <p><strong>Employee ID:</strong> {employeeInfo.empId || 'N/A'}</p>
              <p><strong>Department:</strong> {employeeInfo.department || 'N/A'}</p>
           </div>
           <hr />
           <h3>Net Monthly Take-Home: ₹ {totals.net.toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );
};

// Internal styles
const inputStyle = { padding: '10px', border: '1px solid #e2e8f0', borderRadius: '4px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const thStyle = { textAlign: 'left', padding: '12px', borderBottom: '1px solid #edf2f7', fontSize: '13px', color: '#718096' };
const tdStyle = { padding: '12px', borderBottom: '1px solid #edf2f7', fontSize: '14px' };
const removeBtnStyle = { background: '#feb2b2', color: '#c53030', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' };

export default AdminSalaryStructure;