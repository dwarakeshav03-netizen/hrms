import { useState } from "react";
import { jsPDF } from "jspdf";
import "../AddEmployee/hrForms.css";

const InitiateExit = ({ onClose }) => {
  const [success, setSuccess] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [relievingDate, setRelievingDate] = useState("");
  const [reason, setReason] = useState("");

  const handleExit = (e) => {
    e.preventDefault();

    if (
      !employeeId ||
      !employeeName ||
      !designation ||
      !joiningDate ||
      !relievingDate ||
      !reason
    ) {
      return;
    }

    setSuccess(true);
  };

  const downloadRelievingLetter = () => {
    const doc = new jsPDF();
    let y = 30;

    doc.setFont("Times", "Bold");
    doc.setFontSize(14);
    doc.text("COMPANY NAME", 105, y, { align: "center" });

    doc.setFontSize(10);
    y += 6;
    doc.text("Company Address Line 1", 105, y, { align: "center" });
    y += 5;
    doc.text("Company Address Line 2", 105, y, { align: "center" });

    y += 8;
    doc.line(20, y, 190, y);

    doc.setFont("Times", "Normal");
    doc.setFontSize(11);
    y += 12;
    doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, 20, y);

    y += 15;
    doc.setFont("Times", "Bold");
    doc.text("To Whomsoever It May Concern,", 20, y);

    doc.setFont("Times", "Normal");
    y += 12;
    doc.text(
      `This is to certify that Mr./Ms. ${employeeName}, holding the position of`,
      20,
      y
    );

    y += 8;
    doc.text(
      `${designation}, was employed with Company Name from ${joiningDate}`,
      20,
      y
    );

    y += 8;
    doc.text(`to ${relievingDate}.`, 20, y);

    y += 12;
    doc.text(
      "During their tenure with the organization, their conduct and performance",
      20,
      y
    );

    y += 8;
    doc.text(
      "were found to be satisfactory. They have been relieved from their duties",
      20,
      y
    );

    y += 8;
    doc.text(
      "upon acceptance of their resignation and have completed all exit formalities.",
      20,
      y
    );

    y += 12;
    doc.text(
      "We wish them success in all their future endeavors.",
      20,
      y
    );

    y += 25;
    doc.text("For Company Name", 20, y);

    y += 15;
    doc.text("Authorized Signatory", 20, y);
    y += 8;
    doc.text("Name", 20, y);
    y += 8;
    doc.text("Designation", 20, y);

    y += 15;
    doc.text("Company Seal / Stamp", 20, y);

    doc.save(`${employeeName}(${employeeId}).pdf`);
  };

  return (
    <>
      <h2 className="form-title danger-text">Initiate Exit</h2>
      <p className="form-subtitle">This action cannot be undone</p>

      {success && (
        <div className="success-box">
          ✅ Employee exited successfully
        </div>
      )}

      <form className="form-grid" onSubmit={handleExit}>
        <input
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />

        <input
          placeholder="Employee Full Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />

        <input
          placeholder="Designation / Position"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        />

        {/* 👇 DATE INPUTS (CLEAR & VISIBLE) */}
        {/* JOINING DATE */}
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
  <label style={{ fontSize: "13px", fontWeight: 500 }}>
    Joining Date
  </label>
  <input
    type="date"
    value={joiningDate}
    onChange={(e) => setJoiningDate(e.target.value)}
    required
  />
</div>

{/* LAST WORKING DATE */}
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
  <label style={{ fontSize: "13px", fontWeight: 500 }}>
    Last Working Date
  </label>
  <input
    type="date"
    value={relievingDate}
    onChange={(e) => setRelievingDate(e.target.value)}
    required
  />
</div>


        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        >
          <option value="">Exit Reason</option>
          <option>Resignation</option>
          <option>Termination</option>
          <option>Absconding</option>
        </select>

        {success && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <button
              type="button"
              className="btn-primary"
              onClick={downloadRelievingLetter}
            >
              ⬇ Download Relieving Letter (PDF)
            </button>
          </div>
        )}

        <div className="form-footer">
          <button
            type="button"
            className="btn-outline"
            onClick={onClose}
          >
            Close
          </button>

          {!success && (
            <button type="submit" className="btn-danger">
              Confirm Exit
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default InitiateExit;
