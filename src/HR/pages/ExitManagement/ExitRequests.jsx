import { useState } from "react";
import { jsPDF } from "jspdf";
import StatusBadge from "../../components/StatusBadge";
import Table from "../../components/Table";
import "../../AddEmployee/hrForms.css";
import "../EmployeeManagement/employee.css";
import "../../../HR/pages/LeaveManagement/leave.css"; // 🔥 reuse same filter css

const ExitRequests = () => {
  // NEW STATE FOR MODAL
  const [showInitiateModal, setShowInitiateModal] = useState(false);

  const [requests, setRequests] = useState([
    {
      id: 1,
      empId: "EMP001",
      name: "John Doe",
      department: "Engineering",
      designation: "Software Engineer",
      exitType: "Resignation",
      reason: "Personal reasons",
      appliedOn: "10 Jan 2026",
      lastWorkingDay: "31 Jan 2026",
      status: "Pending",
      checklist: {
        handover: false,
        assets: false,
        access: false,
        payroll: false,
      },
    },
  ]);

  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);

  const approveExit = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Approved" } : r
      )
    );

    setTimeout(() => {
      setSelected(null);
    }, 250);
  };

  const rejectExit = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r
      )
    );

    setTimeout(() => {
      setSelected(null);
    }, 2000);
  };

  const completeExit = (req) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    setHistory((prev) => [...prev, { ...req, status: "Completed" }]);
    setSelected(null);
  };

  const toggleChecklist = (key) => {
    setSelected((prev) => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [key]: !prev.checklist[key],
      },
    }));
  };

  const generateRelievingLetter = (emp) => {
    const doc = new jsPDF();

    doc.setFont("Times", "Normal");

    doc.setFontSize(14);
    doc.text("RELIEVING LETTER", 105, 25, { align: "center" });

    doc.setFontSize(11);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);

    doc.text("To Whomsoever It May Concern,", 20, 55);

    doc.text(
      `This is to certify that Mr./Ms. ${emp.name}, holding the position of ${emp.designation},`,
      20,
      70
    );

    doc.text(
      `was employed with Company Name from Joining Date to ${emp.lastWorkingDay}.`,
      20,
      80
    );

    doc.text(
      "During their tenure with the organization, their conduct and performance",
      20,
      95
    );

    doc.text(
      "were found to be satisfactory. They have been relieved from their duties",
      20,
      105
    );

    doc.text(
      "upon acceptance of their resignation and have completed all exit formalities.",
      20,
      115
    );

    doc.text("We wish them success in all their future endeavors.", 20, 135);

    doc.text("For Company Name", 20, 165);
    doc.text("Authorized Signatory", 20, 180);
    doc.text("HR Department", 20, 190);

    doc.save(`${emp.name}(${emp.empId})_Relieving_Letter.pdf`);
  };

  return (
    <div className="employee-page">
      <h1 className="page-title">Exit Requests</h1>

      {/* =============================
          FILTER BAR (SAME STYLE)
      ============================= */}
      <div className="leave-filter-bar">
        <div className="filter-item">
          <label>Select Date</label>
          <input type="date" />
        </div>

        <input
          type="text"
          className="filter-search"
          placeholder="Search Employee Name..."
        />

        <select className="filter-select">
          <option>All Departments</option>
          <option>Engineering</option>
          <option>Finance</option>
          <option>HR</option>
        </select>

        <select className="filter-select">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Completed</option>
        </select>
      </div>

      {/* ACTIVE EXIT REQUESTS */}
      <div className="employee-table-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0 }}>Active Exit Requests</h2>
          
          <button 
            className="btn-danger" 
            style={{ 
              padding: '10px 20px', 
              borderRadius: '6px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={() => setShowInitiateModal(true)} // OPEN CUSTOM MODAL
          >
            <span style={{ fontSize: '18px' }}>+</span> Initiate Exit
          </button>
        </div>

        <Table
          columns={[
            "Employee",
            "Department",
            "Exit Type",
            "Last Working Day",
            "Status",
            "Action",
          ]}
        >
          {requests.map((req) => (
            <tr key={req.id}>
              <td>
                <strong>{req.name}</strong>
                <br />
                <span className="muted-text">{req.empId}</span>
              </td>
              <td>{req.department}</td>
              <td>{req.exitType}</td>
              <td>{req.lastWorkingDay}</td>
              <td>
                <StatusBadge status={req.status} />
              </td>
              <td>
                <button
                  className="btn-outline"
                  onClick={() => setSelected(req)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* EXIT HISTORY */}
      <div className="employee-table-card" style={{ marginTop: "32px" }}>
        <h2>Exit History</h2>

        {history.length === 0 ? (
          <p className="muted-text">No completed exits</p>
        ) : (
          <Table
            columns={[
              "Employee",
              "Department",
              "Exit Type",
              "Last Working Day",
              "Status",
            ]}
          >
            {history.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <strong>{emp.name}</strong>
                  <br />
                  <span className="muted-text">{emp.empId}</span>
                </td>
                <td>{emp.department}</td>
                <td>{emp.exitType}</td>
                <td>{emp.lastWorkingDay}</td>
                <td>
                  <StatusBadge status="Completed" />
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {/* =========================================
           NEW INITIATE EXIT MODAL (DASHBOARD STYLE)
      ========================================= */}
      {showInitiateModal && (
        <>
          <div className="dashboard-overlay" onClick={() => setShowInitiateModal(false)} />
          <div className="dashboard-modal" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 style={{ color: '#1a3353' }}>Initiate Exit</h3>
              <button className="modal-close" onClick={() => setShowInitiateModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <h4 style={{ color: '#d9534f', marginTop: 0 }}>Initiate Exit</h4>
              <p style={{ fontSize: '13px', color: '#666' }}>This action cannot be undone</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
                <input style={modalInputStyle} placeholder="Employee ID" />
                <input style={modalInputStyle} placeholder="Employee Full Name" />
                <input style={modalInputStyle} placeholder="Designation / Position" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', color: '#666' }}>Joining Date</label>
                  <input type="date" style={modalInputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '12px', color: '#666' }}>Last Working Date</label>
                  <input type="date" style={modalInputStyle} />
                </div>
                <select style={modalInputStyle}>
                  <option value="">Exit Reason</option>
                  <option value="Resignation">Resignation</option>
                  <option value="Termination">Termination</option>
                  <option value="Retirement">Retirement</option>
                </select>
              </div>

              <div className="form-footer" style={{ marginTop: '30px', justifyContent: 'space-between' }}>
                <button className="btn-outline" onClick={() => setShowInitiateModal(false)}>Close</button>
                <button 
                   className="btn-danger" 
                   style={{ padding: '10px 25px' }} 
                   onClick={() => { alert("Exit process initiated successfully!"); setShowInitiateModal(false); }}
                >
                  Confirm Exit
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* VIEW MODAL (UNCHANGED) */}
      {selected && (
        <>
          <div
            className="dashboard-overlay"
            onClick={() => setSelected(null)}
          />

          <div className="dashboard-modal">
            <div className="modal-header">
              <h3>Exit Details</h3>
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Designation:</strong> {selected.designation}</p>
              <p><strong>Exit Type:</strong> {selected.exitType}</p>
              <p><strong>Reason:</strong> {selected.reason}</p>

              <div className="info-box">
                <p><strong>Exit Checklist</strong></p>

                {Object.keys(selected.checklist).map((item) => (
                  <label key={item} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      checked={selected.checklist[item]}
                      onChange={() => toggleChecklist(item)}
                    />{" "}
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                ))}
              </div>

              <div className="form-footer">
                {selected.status === "Pending" && (
                  <>
                    <button
                      className="btn-primary"
                      onClick={() => approveExit(selected.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => rejectExit(selected.id)}
                    >
                      Reject
                    </button>
                  </>
                )}

                {selected.status === "Approved" && (
                  <>
                    <button
                      className="btn-outline"
                      onClick={() => generateRelievingLetter(selected)}
                    >
                      Download Relieving Letter
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => completeExit(selected)}
                    >
                      Mark Exit Completed
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// HELPER STYLE FOR MODAL INPUTS
const modalInputStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  width: '100%',
  fontSize: '14px'
};

export default ExitRequests;