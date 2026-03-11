import { useState, useMemo } from "react";
import Table from "../../components/Table";
import "../EmployeeManagement/employee.css";

const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    department: "Engineering",
    designation: "Software Engineer",
    status: "Active",
    projects: ["HRMS Revamp", "Payroll Automation"],
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    department: "HR",
    designation: "HR Executive",
    status: "Exited",
    projects: [],
  },
];

const EmployeeList = () => {

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  /* =========================
     FILTER STATES (NEW)
  ========================= */
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDept, setSearchDept] = useState("");
  const [searchDesg, setSearchDesg] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  /* =========================
     FILTER LOGIC
  ========================= */
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      return (
        emp.id.toLowerCase().includes(searchId.toLowerCase()) &&
        emp.name.toLowerCase().includes(searchName.toLowerCase()) &&
        emp.department.toLowerCase().includes(searchDept.toLowerCase()) &&
        emp.designation.toLowerCase().includes(searchDesg.toLowerCase()) &&
        (searchStatus === "" || emp.status === searchStatus)
      );
    });
  }, [searchId, searchName, searchDept, searchDesg, searchStatus]);

  return (
    <div className="employee-page">

      {/* PAGE TITLE */}
      <h1 className="page-title">Employee Directory</h1>

      {/* =========================
          FILTER BAR
      ========================= */}
      <div className="employee-filter-bar">

        <div className="employee-filter-item">
          <label>Employee ID</label>
          <input
            type="text"
            value={searchId}
            onChange={(e)=>setSearchId(e.target.value)}
          />
        </div>

        <div className="employee-filter-item">
          <label>Employee Name</label>
          <input
            type="text"
            value={searchName}
            onChange={(e)=>setSearchName(e.target.value)}
          />
        </div>

        <div className="employee-filter-item">
          <label>Department</label>
          <input
            type="text"
            value={searchDept}
            onChange={(e)=>setSearchDept(e.target.value)}
          />
        </div>

        <div className="employee-filter-item">
          <label>Designation</label>
          <input
            type="text"
            value={searchDesg}
            onChange={(e)=>setSearchDesg(e.target.value)}
          />
        </div>

        <div className="employee-filter-item">
          <label>Status</label>
          <select
            value={searchStatus}
            onChange={(e)=>setSearchStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Exited">Exited</option>
          </select>
        </div>

      </div>

      {/* TABLE CARD */}
      <div className="employee-table-card">
        <Table
          columns={[
            "Employee ID",
            "Employee Name",
            "Department",
            "Designation",
            "Status",
            "Actions",
          ]}
        >
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>
                <span
                  className={`status ${
                    emp.status === "Active" ? "approved" : "denied"
                  }`}
                >
                  {emp.status}
                </span>
              </td>
              <td>
                <button
                  className="btn-outline"
                  disabled={emp.status === "Exited"}
                  onClick={() => setSelectedEmployee(emp)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* EMPLOYEE DETAIL MODAL */}
      {selectedEmployee && (
        <>
          <div
            className="dashboard-overlay"
            onClick={() => setSelectedEmployee(null)}
          />

          <div className="dashboard-modal">
            <div className="modal-header">
              <h3>Employee Details</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedEmployee(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p><strong>Employee ID:</strong> {selectedEmployee.id}</p>
              <p><strong>Name:</strong> {selectedEmployee.name}</p>
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <p><strong>Designation:</strong> {selectedEmployee.designation}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`status ${
                    selectedEmployee.status === "Active"
                      ? "approved"
                      : "denied"
                  }`}
                >
                  {selectedEmployee.status}
                </span>
              </p>

              <div className="info-box">
                <p><strong>Projects Assigned</strong></p>

                {selectedEmployee.projects.length > 0 ? (
                  <ul>
                    {selectedEmployee.projects.map((project, index) => (
                      <li key={index}>{project}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="danger-text">No active projects assigned</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
