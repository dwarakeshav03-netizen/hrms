import { useState, useMemo } from "react";
import "./payrollAdmin.css";

const AdminSalaryStructure = () => {

  /* =====================================================
     STATE
  ===================================================== */

  const [earnings, setEarnings] = useState([
    { id:1, name:"Basic Salary", amount:30000, type:"FIXED" },
    { id:2, name:"HRA", percent:40, basedOn:"Basic Salary", type:"PERCENT" }
  ]);

  const [deductions, setDeductions] = useState([
    { id:3, name:"PF", percent:12, basedOn:"Basic Salary", type:"PERCENT" }
  ]);

  const [componentName,setComponentName] = useState("");
  const [componentAmount,setComponentAmount] = useState("");
  const [type,setType] = useState("EARNING");

  /* =====================================================
     HELPER - SINGLE PAYROLL CALCULATION ENGINE
  ===================================================== */

  const getComponentValue = (item,list) => {

    if(item.type === "FIXED"){
      return Number(item.amount || 0);
    }

    const base = list.find(e=>e.name === item.basedOn);
    const baseAmount = base?.amount || 0;

    return (baseAmount * (item.percent || 0)) / 100;
  };

  /* =====================================================
     CALCULATED PAYROLL ENGINE
  ===================================================== */

  const calculatedEarnings = useMemo(()=>{
    return earnings.map(e=>({
      ...e,
      amount:getComponentValue(e,earnings)
    }));
  },[earnings]);

  const calculatedDeductions = useMemo(()=>{
    const combined = [...earnings,...deductions];

    return deductions.map(d=>({
      ...d,
      amount:getComponentValue(d,combined)
    }));
  },[deductions,earnings]);

  /* =====================================================
     TOTALS
  ===================================================== */

  const totalEarnings = useMemo(
    () => calculatedEarnings.reduce((sum,e)=>sum+Number(e.amount),0),
    [calculatedEarnings]
  );

  const totalDeductions = useMemo(
    () => calculatedDeductions.reduce((sum,d)=>sum+Number(d.amount),0),
    [calculatedDeductions]
  );

  const netSalary = totalEarnings - totalDeductions;

  /* =====================================================
     ACTIONS
  ===================================================== */

  const addComponent = () => {

    if(!componentName || !componentAmount) return;

    const newItem = {
      id: Date.now(),
      name: componentName,
      amount:Number(componentAmount),
      type:"FIXED"
    };

    if(type === "EARNING"){
      setEarnings([...earnings,newItem]);
    }else{
      setDeductions([...deductions,newItem]);
    }

    setComponentName("");
    setComponentAmount("");
  };

  const removeItem = (id,category) => {
    if(category==="EARNING"){
      setEarnings(earnings.filter(e=>e.id!==id));
    }else{
      setDeductions(deductions.filter(d=>d.id!==id));
    }
  };

  /* =====================================================
     UPDATE BASIC SALARY
  ===================================================== */

  const updateBasic = (value)=>{
    setEarnings(prev =>
      prev.map(e =>
        e.name==="Basic Salary"
          ? {...e,amount:Number(value)}
          : e
      )
    );
  };

  /* =====================================================
     UI
  ===================================================== */

  return(
    <div className="payroll-admin-container">

      <h1 className="payroll-title">Salary Structure</h1>

      {/* SUMMARY */}
      <div className="payroll-grid">

        <div className="payroll-stat">
          <h4>Total Earnings</h4>
          <p>₹ {totalEarnings.toLocaleString()}</p>
        </div>

        <div className="payroll-stat warning">
          <h4>Total Deductions</h4>
          <p>₹ {totalDeductions.toLocaleString()}</p>
        </div>

        <div className="payroll-stat highlight">
          <h4>Net Salary</h4>
          <p>₹ {netSalary.toLocaleString()}</p>
        </div>

      </div>

      {/* ADD COMPONENT */}
      <div className="payroll-card">

        <div className="salary-controls">

          <input
            placeholder="Component Name"
            value={componentName}
            onChange={(e)=>setComponentName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={componentAmount}
            onChange={(e)=>setComponentAmount(e.target.value)}
          />

          <select
            value={type}
            onChange={(e)=>setType(e.target.value)}
          >
            <option value="EARNING">Earning</option>
            <option value="DEDUCTION">Deduction</option>
          </select>

          <button className="payroll-btn" onClick={addComponent}>
            Add Component
          </button>

        </div>

      </div>

      {/* TABLES */}
      <div className="payroll-section">

        <h3>Earnings</h3>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {calculatedEarnings.map(e=>(
              <tr key={e.id}>
                <td>{e.name}</td>

                <td>
                  {e.name === "Basic Salary" ? (
                    <input
                      type="number"
                      value={e.amount}
                      onChange={(ev)=>updateBasic(ev.target.value)}
                    />
                  ) : (
                    `₹ ${Math.round(e.amount).toLocaleString()}`
                  )}
                </td>

                <td>
                  <button
                    className="reject-btn"
                    onClick={()=>removeItem(e.id,"EARNING")}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{marginTop:"20px"}}>Deductions</h3>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {calculatedDeductions.map(d=>(
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>₹ {Math.round(d.amount).toLocaleString()}</td>
                <td>
                  <button
                    className="reject-btn"
                    onClick={()=>removeItem(d.id,"DEDUCTION")}
                  >
                    Remove
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

export default AdminSalaryStructure;
