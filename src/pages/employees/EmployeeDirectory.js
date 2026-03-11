import React, { useState, useMemo } from "react";
import "./employeeDirectory.css";
import AddEmployee from "./addemployee";

function EmployeeDirectory() {
  /* ========================
     MODAL STATE
  ======================== */
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  /* ========================
     FILTER STATES
  ======================== */
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [designation, setDesignation] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* ========================
     PAGINATION STATE
  ======================== */
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  /* ========================
     EMPLOYEE DATA (BACKEND SIMULATION)
  ======================== */
  const employees = useMemo(
    () => [
      {
        empId: "EMP001",
        name: "John Doe",
        position: "john.doe@crestclimbers.com",
        department: "IT",
        designation: "Senior Developer",
        status: "Active",
        joinDate: "2023-01-15",
        salary: 80000,
      },
      {
        empId: "EMP002",
        name: "Emily Davis",
        position: "+91 9876543210",
        department: "Finance",
        designation: "Finance Executive",
        status: "On leave",
        joinDate: "2023-04-05",
        salary: 60000,
      },
      // 👉 imagine 100+ employees here from backend
    ],
    []
  );

  /* ========================
     FILTERED EMPLOYEES
  ======================== */
  const filteredEmployees = employees.filter((emp) => {
    const join = new Date(emp.joinDate);

    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      department === "All" || emp.department === department;

    const matchesStatus =
      statusFilter === "All" || emp.status === statusFilter;

    const matchesDesignation =
      designation === "All" || emp.designation === designation;

    const matchesFromDate = fromDate ? join >= new Date(fromDate) : true;
    const matchesToDate = toDate ? join <= new Date(toDate) : true;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesStatus &&
      matchesDesignation &&
      matchesFromDate &&
      matchesToDate
    );
  });

  /* ========================
     PAGINATED DATA
  ======================== */
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ========================
     STATS
  ======================== */
  const stats = useMemo(() => {
    return {
      totalEmployees: employees.length,
      activeEmployees: employees.filter((e) => e.status === "Active").length,
      totalPayroll: employees.reduce((sum, e) => sum + e.salary, 0),
      departments: new Set(employees.map((e) => e.department)).size,
    };
  }, [employees]);

  return (
    <div className="employee-page">
      {/* ================= HEADER ================= */}
      <div className="employee-header">
        <h2>Employee Management</h2>
        {/* <button className="add-btn" onClick={() => setShowAddEmployee(true)}>
          + Add Employee
        </button> */}
      </div>

      {/* ================= STATS ================= */}
      <div className="stats-gridd">
        <div className="stat-card">
          <p>Total Employees</p>
          <h2>{stats.totalEmployees}</h2>
        </div>
        <div className="stat-card">
          <p>Active Employees</p>
          <h2>{stats.activeEmployees}</h2>
        </div>
        <div className="stat-card">
          <p>Total Payroll</p>
          <h2>₹{stats.totalPayroll.toLocaleString()}</h2>
        </div>
        <div className="stat-card">
          <p>Departments</p>
          <h2>{stats.departments}</h2>
        </div>
      </div>

      {/* ================= ERP FILTER BAR ================= */}
      <div className="erp-filter-bar">
        <input
          className="erp-search"
          placeholder="Search by name, email, EMP ID"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="erp-segment">
          {["All", "Active", "On leave"].map((status) => (
            <button
              key={status}
              className={`segment-btn ${
                statusFilter === status ? "active" : ""
              }`}
              onClick={() => {
                setStatusFilter(status);
                setCurrentPage(1);
              }}
            >
              {status}
            </button>
          ))}
        </div>

        <select
          className="erp-select dept"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Depts</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
        </select>

        <select
          className="erp-select role"
          value={designation}
          onChange={(e) => {
            setDesignation(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Roles</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Finance Executive">Finance Executive</option>
        </select>

        <div className="erp-date-wrapper">
          <label className="erp-filter-label">Joined Date</label>
          <div className="erp-date-group">
            <input
              type="date"
              className="erp-date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setCurrentPage(1);
              }}
            />
            <span className="date-separator">to</span>
            <input
              type="date"
              className="erp-date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>EMP ID</th>
              <th>EMPLOYEE</th>
              <th>POSITION</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>STATUS</th>
              <th>JOIN DATE</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((emp) => (
              <tr key={emp.empId}>
                <td className="emp-id">{emp.empId}</td>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>
                  <span
                    className={`status ${
                      emp.status === "Active" ? "active" : "leave"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td>{emp.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= PAGINATION ================= */}
        <div className="pagination-bar">
          <span className="page-info">
            Showing{" "}
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              filteredEmployees.length
            )}{" "}
            of {filteredEmployees.length}
          </span>

          <div className="page-actions">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showAddEmployee && (
        <AddEmployee onClose={() => setShowAddEmployee(false)} />
      )}
    </div>
  );
}

export default EmployeeDirectory;
