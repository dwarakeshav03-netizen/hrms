import { useState } from "react";

const Step6Review = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSubmit = () => {
    setShowPopup(true);
    setFadeOut(false);

    // Start fade after 3 seconds
    setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Fully remove popup after fade animation
    setTimeout(() => {
      setShowPopup(false);
      setFadeOut(false);
    }, 3800); // 3s + fade duration
  };

  return (
    <>
      <h2>Review & Submit</h2>
      <p className="subtitle">Step 6 of 6</p>

      {/* Info box */}
      <div
        style={{
          background: "#e0f2fe",
          padding: "16px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <strong>Review Your Information</strong>
        <p style={{ fontSize: "14px" }}>
          Please review all the information before submitting.
          Once submitted, changes require HR approval.
        </p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Personal Information</label>
          <p>Name, Email, Phone, Gender</p>
        </div>

        <div className="form-group">
          <label>Employment Details</label>
          <p>Employee ID, Department, Designation</p>
        </div>
      </div>

      {/* Next steps */}
      <div
        style={{
          background: "#e5f0fb",
          padding: "16px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <strong>Next Steps</strong>
        <ul style={{ fontSize: "14px" }}>
          <li>HR will review within 2–3 business days</li>
          <li>Email confirmation after approval</li>
          <li>Account activated on joining date</li>
        </ul>
      </div>

      {/* Submit Button */}
      <div style={{ marginTop: "24px", textAlign: "right" }}>
        <button className="btn-primary" onClick={handleSubmit}>
          Submit Application
        </button>
      </div>

      {/* ✅ SUCCESS POPUP */}
      {showPopup && (
        <div className={`success-popup ${fadeOut ? "fade-out" : ""}`}>
          ✅ Application Submitted Successfully
        </div>
      )}
    </>
  );
};

export default Step6Review;
