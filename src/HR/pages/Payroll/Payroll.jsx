import { useState, useMemo } from "react";
import "../Payroll/payroll.css";

/* ===============================
   HELPER: AUTO MONTHS
=============================== */
const getPayrollMonths = (count = 6) => {
  const months = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(
      date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })
    );
  }
  return months;
};

const HRPayroll = () => {

  const payrollMonths = getPayrollMonths(6);
  const [month, setMonth] = useState(payrollMonths[0]);
  const [previewStatus, setPreviewStatus] = useState("DRAFT");

  /* ===============================
     HR PAYROLL DATA (PREVIEW MODE)
     HR handles salary breakup here
  =============================== */
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      department: "Engineering",
      basic: 40000,
      hra: 12000,
      da: 8000,
      allowance: 5000,
      pf: 4800,
      leaveSalary: 1500,
      status: "READY",
    },
    {
      id: "EMP014",
      name: "Priya Sharma",
      department: "HR",
      basic: 30000,
      hra: 9000,
      da: 6000,
      allowance: 4000,
      pf: 3600,
      leaveSalary: 1000,
      status: "PENDING",
    },
  ]);

  /* ===============================
     HR SUMMARY
  =============================== */
  const summary = useMemo(() => {
    const totalEmployees = employees.length;

    const totalGross = employees.reduce(
      (s, e) =>
        s + (e.basic + e.hra + e.da + e.allowance),
      0
    );

    const totalLeave = employees.reduce(
      (s, e) => s + e.leaveSalary,
      0
    );

    return {
      totalEmployees,
      totalGross,
      totalLeave,
    };
  }, [employees]);

  /* ===============================
     HR ACTIONS
  =============================== */
  const updateLeaveSalary = (id, value) => {
    const safe = Math.max(0, Number(value) || 0);
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, leaveSalary: safe } : e
      )
    );
  };

  const markReady = () => {
    setPreviewStatus("READY_FOR_ADMIN");
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="payroll-container">

      <div className="payroll-header">
        <h1>HR Payroll Preparation</h1>
        <p>Salary structure & leave deduction preview</p>
      </div>

      {/* CONTROLS */}
      <div className="card payroll-controls">
        <div>
          <label>Payroll Month</label>
          <select value={month} onChange={(e)=>setMonth(e.target.value)}>
            {payrollMonths.map((m)=>(
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Status</label>
          <span className={`status-badge ${previewStatus.toLowerCase()}`}>
            {previewStatus}
          </span>
        </div>

        <div className="actions">
          <button className="btn primary" onClick={markReady}>
            Submit to Admin
          </button>
        </div>
      </div>

      {/* SUMMARY */}
     <div className="payroll-summary">

  <div className="summary-card">
    <h3>Total Employees</h3>
    <p>{employees.length}</p>
  </div>

  <div className="summary-card success">
    <h3>Ready for Payroll</h3>
    <p>
      {employees.filter(e => e.status === "PROCESSED").length}
    </p>
  </div>

  <div className="summary-card warning">
    <h3>Pending Adjustments</h3>
    <p>
      {employees.filter(e => e.status === "PENDING").length}
    </p>
  </div>

  <div className="summary-card">
    <h3>Total Gross Preview</h3>
    <p>
      ₹ {employees
        .reduce((s,e)=>s+(e.basic+e.hra+e.allowance),0)
        .toLocaleString()}
    </p>
  </div>

  <div className="summary-card warning">
    <h3>Total Leave Deductions</h3>
    <p>
      ₹ {employees
        .reduce((s,e)=>s+e.leaveSalary,0)
        .toLocaleString()}
    </p>
  </div>

</div>


      {/* TABLE */}
      <div className="card">
        <h2>Payroll Preview (HR)</h2>

        <table className="payroll-table">
          <thead>
  <tr>
    <th>Emp ID</th>
    <th>Name</th>
    <th>Department</th>
    <th>Basic</th>
    <th>HRA</th>
    <th>Allowance</th>
    <th>PF</th>
    <th>Leave Salary</th>
    <th>Deductions</th>
    <th>Net</th>
    <th>Status</th>
  </tr>
</thead>

<tbody>
  {employees.map((e) => {
    const gross = e.basic + e.hra + e.allowance;

    const net =
      gross - (e.pf + e.leaveSalary + e.deductions);

    return (
      <tr key={e.id}>
        <td>{e.id}</td>
        <td>{e.name}</td>
        <td>{e.department}</td>

        <td>₹ {e.basic.toLocaleString()}</td>
        <td>₹ {e.hra.toLocaleString()}</td>
        <td>₹ {e.allowance.toLocaleString()}</td>
        <td>₹ {e.pf.toLocaleString()}</td>

        <td>
          <input
            type="number"
            value={e.leaveSalary}
            onChange={(ev) =>
              setEmployees((prev) =>
                prev.map((emp) =>
                  emp.id === e.id
                    ? { ...emp, leaveSalary: Number(ev.target.value) }
                    : emp
                )
              )
            }
          />
        </td>

        <td>
          <input
            type="number"
            value={e.deductions}
            onChange={(ev) =>
              setEmployees((prev) =>
                prev.map((emp) =>
                  emp.id === e.id
                    ? { ...emp, deductions: Number(ev.target.value) }
                    : emp
                )
              )
            }
          />
        </td>

        <td>₹ {net.toLocaleString()}</td>

        <td>
          <select
            value={e.status}
            onChange={(ev) =>
              setEmployees((prev) =>
                prev.map((emp) =>
                  emp.id === e.id
                    ? { ...emp, status: ev.target.value }
                    : emp
                )
              )
            }
          >
            <option value="PENDING">Pending</option>
            <option value="PROCESSED">Processed</option>
          </select>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>

    </div>
  );
};

export default HRPayroll;
