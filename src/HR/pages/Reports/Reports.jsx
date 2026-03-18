import React, { useState, useEffect } from "react";
import "./reports.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const initialData = [
  {
    id: "EMP001",
    name: "Arun Kumar",
    dept: "IT",
    attendance: 96,
    performance: 4.5,
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    dept: "HR",
    attendance: 92,
    performance: 4.2,
    status: "Active",
  },
  {
    id: "EMP003",
    name: "Rahul Verma",
    dept: "Finance",
    attendance: 85,
    performance: 3.8,
    status: "Inactive",
  },
  {
    id: "EMP004",
    name: "Kiran Raj",
    dept: "IT",
    attendance: 88,
    performance: 4.0,
    status: "Active",
  },
];

const Reports = () => {
  const [data] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [dept, setDept] = useState("All");
  const [search, setSearch] = useState("");

  // 🔍 Filter Logic
  const filterData = () => {
    let result = [...data];

    if (dept !== "All") {
      result = result.filter((emp) => emp.dept === dept);
    }

    if (search.trim() !== "") {
      const keyword = search.toLowerCase();

      result = result.filter(
        (emp) =>
          emp.id.toLowerCase().includes(keyword) ||
          emp.name.toLowerCase().includes(keyword) ||
          emp.dept.toLowerCase().includes(keyword) ||
          emp.status.toLowerCase().includes(keyword) ||
          emp.attendance.toString().includes(keyword) ||
          emp.performance.toString().includes(keyword),
      );
    }

    setFilteredData(result);
  };

  // Auto filter
  useEffect(() => {
    filterData();
  }, [search, dept]);

  // 🔄 Reset
  const handleReset = () => {
    setDept("All");
    setSearch("");
    setFilteredData(data);
  };

  // 📥 Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "HR Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(dataBlob, "HR_Report.xlsx");
  };

  // KPI
  const total = filteredData.length;
  const active = filteredData.filter((e) => e.status === "Active").length;
  const avgAttendance =
    filteredData.reduce((sum, e) => sum + e.attendance, 0) / total || 0;

  return (
    <div className="reports-page">
      {/* Header */}
      <div className="reports-header">
        <h2>HR Reports</h2>

        <div className="filters">
          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="All">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>

          <input
            type="text"
            placeholder="Search (name, id, numbers...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="secondary-btn" onClick={handleReset}>
            Reset
          </button>

          <button className="export-btn" onClick={exportToExcel}>
            Download Excel
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="kpi-row">
        <div className="kpi-box">
          <p>Total Employees</p>
          <h3>{total}</h3>
        </div>

        <div className="kpi-box">
          <p>Active Employees</p>
          <h3>{active}</h3>
        </div>

        <div className="kpi-box">
          <p>Avg Attendance</p>
          <h3>{avgAttendance.toFixed(1)}%</h3>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Dept</th>
              <th>Attendance</th>
              <th>Performance</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.dept}</td>
                <td>{emp.attendance}%</td>
                <td>{emp.performance}</td>
                <td>
                  <span
                    className={emp.status === "Active" ? "active" : "inactive"}
                  >
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <p className="no-data">No records found</p>
        )}
      </div>
    </div>
  );
};

export default Reports;