import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminSalaryRelease = () => {
  /* ================= STATE ================= */
  const [showModal, setShowModal] = useState(false);
  const [revisionPercent, setRevisionPercent] = useState("");

  const [salaryData, setSalaryData] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      dept: "Engineering",
      basic: 75000,
      allowances: 33500,
      deductions: 22700,
      status: "Active",
    },
    {
      id: "EMP002",
      name: "Sarah Wilson",
      dept: "Marketing",
      basic: 65000,
      allowances: 29500,
      deductions: 18700,
      status: "Active",
    },
    {
      id: "EMP003",
      name: "New Employee",
      dept: "Finance",
      basic: 50000,
      allowances: 20000,
      deductions: 10000,
      status: "Active",
    },
  ]);

  /* ================= CALCULATIONS (KPIs) ================= */
  const totalEmployees = salaryData.length;

  const totalPayroll = useMemo(() => {
    return salaryData.reduce((sum, emp) => {
      const gross = emp.basic + emp.allowances;
      return sum + (gross - emp.deductions);
    }, 0);
  }, [salaryData]);

  const avgSalary =
    totalEmployees > 0 ? Math.floor(totalPayroll / totalEmployees) : 0;

  /* ================= ACTIONS ================= */
  const exportCSV = () => {
    const headers = ["ID", "Name", "Department", "Basic", "Allowances", "Deductions", "Net"];
    const rows = salaryData.map((emp) => [
      emp.id, emp.name, emp.dept, emp.basic, emp.allowances, emp.deductions, (emp.basic + emp.allowances - emp.deductions)
    ]);
    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "salary-master.csv";
    link.click();
  };

  const importMock = () => {
    const nextId = "EMP00" + (salaryData.length + 1);
    const newEmployee = {
      id: nextId,
      name: "New Hire",
      dept: "Operations",
      basic: 55000,
      allowances: 15000,
      deductions: 8000,
      status: "Active",
    };
    setSalaryData((prev) => [...prev, newEmployee]);
  };

  const applyRevision = () => {
    if (!revisionPercent) return;
    const percent = Number(revisionPercent);
    const updated = salaryData.map((emp) => ({
      ...emp,
      basic: Math.floor(emp.basic * (1 + percent / 100)),
    }));
    setSalaryData(updated);
    setRevisionPercent("");
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEmployee = {
      id: form.id.value,
      name: form.name.value,
      dept: form.dept.value,
      basic: Number(form.basic.value),
      allowances: Number(form.allowances.value),
      deductions: Number(form.deductions.value),
      status: "Active",
    };
    setSalaryData((prev) => [...prev, newEmployee]);
    setShowModal(false);
  };

  return (
    <div className="payroll-admin-container">
      {/* HEADER SECTION */}
      <div className="payroll-reports-header">
        <div>
          <h1 className="payroll-title">Salary Master</h1>
          <p className="subtitle">Manage employee salary structures</p>
        </div>

        <div className="action-btns" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="btn-outline" onClick={importMock}>Import</button>
          <button className="btn-outline" onClick={exportCSV}>Export</button>
          
          <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
            <input
              type="number"
              placeholder="% Revision"
              value={revisionPercent}
              onChange={(e) => setRevisionPercent(e.target.value)}
              style={{ padding: '8px', border: 'none', width: '100px', outline: 'none' }}
            />
            <button 
              onClick={applyRevision}
              style={{ padding: '8px 12px', border: 'none', backgroundColor: '#f8f9fa', cursor: 'pointer', borderLeft: '1px solid #ddd' }}
            >
              Apply Revision
            </button>
          </div>

          <button className="btn-primary" style={{ backgroundColor: '#2563eb' }} onClick={() => setShowModal(true)}>
            + Add Employee Salary
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="payroll-grid" style={{ marginTop: '20px' }}>
        <div className="payroll-stat">
          <h4 style={{ color: '#64748b' }}>Total Employees</h4>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>{totalEmployees}</p>
        </div>

        <div className="payroll-stat">
          <h4 style={{ color: '#64748b' }}>Total Payroll</h4>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>₹ {totalPayroll.toLocaleString()}</p>
        </div>

        <div className="payroll-stat">
          <h4 style={{ color: '#64748b' }}>Average Salary</h4>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>₹ {avgSalary.toLocaleString()}</p>
        </div>

        <div className="payroll-stat">
          <h4 style={{ color: '#64748b' }}>Pending Revisions</h4>
          <p style={{ fontSize: '24px', fontWeight: '700' }}>0</p>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="payroll-section" style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '20px' }}>Employee Salary Master</h3>

        <table className="payroll-table">
          <thead style={{ backgroundColor: '#f8fafc' }}>
            <tr>
              <th style={{ textAlign: 'left' }}>EMPLOYEE</th>
              <th>DEPARTMENT</th>
              <th>BASIC</th>
              <th>ALLOWANCES</th>
              <th>GROSS</th>
              <th>DEDUCTIONS</th>
              <th>NET</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {salaryData.map((emp) => {
              const gross = emp.basic + emp.allowances;
              const net = gross - emp.deductions;

              return (
                <tr key={emp.id}>
                  <td>
                    <div style={{ textAlign: 'left' }}>
                      <strong style={{ display: 'block', color: '#1e293b' }}>{emp.name}</strong>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{emp.id}</span>
                    </div>
                  </td>
                  <td>{emp.dept}</td>
                  <td>₹ {emp.basic.toLocaleString()}</td>
                  <td>₹ {emp.allowances.toLocaleString()}</td>
                  <td>₹ {gross.toLocaleString()}</td>
                  <td>₹ {emp.deductions.toLocaleString()}</td>
                  <td>
                    <span style={{ fontWeight: '600', color: '#16a34a' }}>
                      ₹ {net.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge active" style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔥 MODAL FIX: Height set to auto to remove empty space at bottom 🔥 */}
      {showModal && (
        <>
          <div className="dashboard-overlay" onClick={() => setShowModal(false)} />
          <div className="dashboard-modal" style={{ 
            maxWidth: '600px', 
            height: 'auto', // Corrects the empty space
            minHeight: 'unset', // Removes forced long height
            paddingBottom: '30px' 
          }}>
            <div className="modal-header">
              <h3>Add Employee Salary Structure</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddEmployee} className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Employee ID</label>
                  <input name="id" placeholder="e.g. EMP004" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input name="name" placeholder="e.g. Arun Kumar" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Department</label>
                  <input name="dept" placeholder="e.g. Engineering" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Basic Salary (₹)</label>
                  <input name="basic" type="number" placeholder="0" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Allowances (₹)</label>
                  <input name="allowances" type="number" placeholder="0" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Deductions (₹)</label>
                  <input name="deductions" type="number" placeholder="0" style={inputStyle} required />
                </div>
              </div>
              <div className="form-footer" style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <button type="button" className="btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ marginLeft: '10px' }}>Save Structure</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

/* Internal Styles for Labels and Layout */
const labelStyle = { 
  display: 'block', 
  marginBottom: '8px', 
  fontSize: '13px', 
  fontWeight: '600', 
  color: '#475569' 
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  width: '100%',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box'
};

export default AdminSalaryRelease;