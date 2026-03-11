import React, { useState } from "react";
import AddEmployee from "./addemployee";
import "./employeeDirectory.css";

const EmployeeDetails = () => {

  /* ========================
     MODAL STATE
  ======================== */
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  return (
    <div className="employee-page">

      {/* ================= HEADER ================= */}
      <div className="employee-header">
        <h2>Employee Details</h2>

        <button
          className="add-btn"
          onClick={() => setShowAddEmployee(true)}
        >
          + Add Employee
        </button>
      </div>

      {/* ================= CONTENT PLACEHOLDER ================= */}
      <div className="table-card">
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          Employee detailed information will be shown here.
        </p>
      </div>

      {/* ================= ADD EMPLOYEE MODAL ================= */}
      {showAddEmployee && (
        <AddEmployee onClose={() => setShowAddEmployee(false)} />
      )}

    </div>
  );
};

export default EmployeeDetails;
