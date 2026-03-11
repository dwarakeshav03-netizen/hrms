import { useState, useMemo } from "react";
import "./onboarding.css";

const Onboarding = () => {

  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "Arun Kumar",
      role: "Frontend Developer",
      doj: "2026-02-12",
      status: "Pending",
      documents: "Not Uploaded",
    },
    {
      id: "EMP002",
      name: "Sneha R",
      role: "HR Executive",
      doj: "2026-02-15",
      status: "Completed",
      documents: "Verified",
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  /* =========================
     FILTER STATES (NEW)
  ========================= */
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchDoj, setSearchDoj] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  /* ===== STATS (REAL-TIME) ===== */
  const total = employees.length;
  const pending = employees.filter(e => e.status === "Pending").length;
  const completed = employees.filter(e => e.status === "Completed").length;

  /* =========================
     FILTER LOGIC
  ========================= */
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      return (
        emp.id.toLowerCase().includes(searchId.toLowerCase()) &&
        emp.name.toLowerCase().includes(searchName.toLowerCase()) &&
        emp.role.toLowerCase().includes(searchRole.toLowerCase()) &&
        emp.doj.includes(searchDoj) &&
        (searchStatus === "" || emp.status === searchStatus)
      );
    });
  }, [employees, searchId, searchName, searchRole, searchDoj, searchStatus]);

  /* ===== UPDATE EMPLOYEE ===== */
  const handleUpdate = () => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === selectedEmployee.id ? selectedEmployee : emp
      )
    );
    setSelectedEmployee(null);
  };

  return (
    <div className="onboarding-page">
      <h1>Employee Onboarding</h1>

      {/* ===== STATS ===== */}
      <div className="onboarding-stats">
        <div className="card">
          <p>Total New Joinees</p>
          <h2>{total}</h2>
        </div>
        <div className="card">
          <p>Pending Onboarding</p>
          <h2>{pending}</h2>
        </div>
        <div className="card">
          <p>Completed</p>
          <h2>{completed}</h2>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="card table-card">
        <h2>Onboarding List</h2>

        {/* =========================
            FILTER BAR
        ========================= */}
        <div className="onboarding-filter-bar">

          <div className="onboarding-filter-item">
            <label>Employee ID</label>
            <input
              value={searchId}
              onChange={(e)=>setSearchId(e.target.value)}
            />
          </div>

          <div className="onboarding-filter-item">
            <label>Name</label>
            <input
              value={searchName}
              onChange={(e)=>setSearchName(e.target.value)}
            />
          </div>

          <div className="onboarding-filter-item">
            <label>Role</label>
            <input
              value={searchRole}
              onChange={(e)=>setSearchRole(e.target.value)}
            />
          </div>

          <div className="onboarding-filter-item">
            <label>Date of Joining</label>
            <input
              type="date"
              value={searchDoj}
              onChange={(e)=>setSearchDoj(e.target.value)}
            />
          </div>

          <div className="onboarding-filter-item">
            <label>Status</label>
            <select
              value={searchStatus}
              onChange={(e)=>setSearchStatus(e.target.value)}
            >
              <option value="">All</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>

        </div>

        <table className="onboarding-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Date of Joining</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.doj}</td>
                <td>
                  <span className={`status ${emp.status.toLowerCase()}`}>
                    {emp.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-primary"
                    onClick={() => setSelectedEmployee({ ...emp })}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== DETAIL MODAL ===== */}
      {selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Onboarding Details</h2>

            <label>Employee ID</label>
            <input value={selectedEmployee.id} disabled />

            <label>Name</label>
            <input
              value={selectedEmployee.name}
              onChange={(e) =>
                setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
              }
            />

            <label>Role</label>
            <input
              value={selectedEmployee.role}
              onChange={(e) =>
                setSelectedEmployee({ ...selectedEmployee, role: e.target.value })
              }
            />

            <label>Date of Joining</label>
            <input
              type="date"
              value={selectedEmployee.doj}
              onChange={(e) =>
                setSelectedEmployee({ ...selectedEmployee, doj: e.target.value })
              }
            />

            <label>Status</label>
            <select
              value={selectedEmployee.status}
              onChange={(e) =>
                setSelectedEmployee({ ...selectedEmployee, status: e.target.value })
              }
            >
              <option>Pending</option>
              <option>Completed</option>
            </select>

            <label>Documents</label>
            <select
              value={selectedEmployee.documents}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  documents: e.target.value,
                })
              }
            >
              <option>Not Uploaded</option>
              <option>Uploaded</option>
              <option>Verified</option>
            </select>

            <div className="modal-actions">
              <button
                className="btn-outline"
                onClick={() => setSelectedEmployee(null)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
