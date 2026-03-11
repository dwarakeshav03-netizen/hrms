import { useState, useMemo } from "react";
import "../exit/ExitFormalities.css";

const ExitFormality = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  /* =========================
     FILTER STATES
  ========================= */
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      lastWorkingDate: "2026-01-31",
      relievingDate: "2026-02-01",
      assets: {
        Laptop: false,
        "ID Card": true,
        SIM: false,
        "Access Card": true,
      },
      financeDue: 2500,
      status: "In Progress",
    },
    {
      id: "EMP002",
      name: "Sarah Wilson",
      lastWorkingDate: "2026-01-15",
      relievingDate: "2026-01-16",
      assets: {
        Laptop: true,
        "ID Card": true,
        SIM: true,
        "Access Card": true,
      },
      financeDue: 0,
      status: "Completed",
    },
  ]);

  /* =========================
     PAGINATION
  ========================= */
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  /* =========================
     FILTERED DATA
  ========================= */
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchId = emp.id
        .toLowerCase()
        .includes(searchId.toLowerCase());

      const matchName = emp.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      const matchDate =
        !searchDate || emp.lastWorkingDate === searchDate;

      return matchId && matchName && matchDate;
    });
  }, [employees, searchId, searchName, searchDate]);

  const totalPages = Math.ceil(
    filteredEmployees.length / ITEMS_PER_PAGE
  );

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  /* =========================
     LOGIC (UNCHANGED)
  ========================= */
  const openExitModal = (emp) => {
    setSelectedEmployee({ ...emp });
    setShowExitModal(true);
  };

  const updateEmployee = (updated) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
    setSelectedEmployee(updated);
  };


  const updateDate = (key, value) => {
    updateEmployee({ ...selectedEmployee, [key]: value });
  };

  const allAssetsReturned =
    selectedEmployee &&
    Object.values(selectedEmployee.assets).every(Boolean);

  const financeCleared =
    selectedEmployee && selectedEmployee.financeDue === 0;

  const canClose = allAssetsReturned && financeCleared;

  const closeEmployee = () => {
    if (!canClose) return;
    updateEmployee({ ...selectedEmployee, status: "Completed" });
    setShowExitModal(false);
  };

  return (
    <div className="exit-page">
      <h2 className="blue">Exit Requests</h2>

      {/* FILTER BAR */}
      <div className="exit-filter-bar">
        <input
          type="text"
          placeholder="Search Emp ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search Emp Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <table className="exit-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Last Working Date</th>
            <th>Finance Due</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {paginatedEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>
                {emp.name}
                <div className="emp-id">{emp.id}</div>
              </td>
              <td>{emp.lastWorkingDate}</td>
              <td>₹{emp.financeDue}</td>
              <td>
                <span
                  className={`badge ${
                    emp.status === "Completed" ? "success" : "pending"
                  }`}
                >
                  {emp.status}
                </span>
              </td>
              <td>
                <button className="view" onClick={() => openExitModal(emp)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="exit-pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {showExitModal && selectedEmployee && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <button
              className="modal-close"
              onClick={() => setShowExitModal(false)}
            >
              ✕
            </button>

            <h2 className="modal-title">Exit Clearance</h2>

            <div className="form-row">
              <label>Last Working Date</label>
              <input
                type="date"
                value={selectedEmployee.lastWorkingDate}
                onChange={(e) =>
                  updateDate("lastWorkingDate", e.target.value)
                }
              />
            </div>

            <div className="form-row">
              <label>Relieving Date</label>
              <input
                type="date"
                value={selectedEmployee.relievingDate}
                onChange={(e) =>
                  updateDate("relievingDate", e.target.value)
                }
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn-outline"
                onClick={() => setShowExitModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn-primary"
                disabled={!canClose}
                onClick={closeEmployee}
              >
                Close Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExitFormality;
