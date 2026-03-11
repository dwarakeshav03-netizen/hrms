import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Profile.css";

const MyProfile = () => {
  const user = useSelector((state) => state.auth?.user);
  const [jobDetails, setJobDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal trigger state

  // Editable form state
  const [formData, setFormData] = useState({
    phone: "+91 9876543210",
    address: "Salem, Tamil Nadu"
  });

  useEffect(() => {
    if (!user) return;

    // Setting Admin specific job details automatically
    if (user.role === "ADMIN") {
      setJobDetails({
        employeeId: user.id || "ADM-001",
        department: "Administration",
        accessLevel: "Full System Access",
        location: "Head Office",
        joinedDate: "01/01/2020",
      });
    }
  }, [user]);

  if (!user) {
    return <p className="loading">Loading profile…</p>;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsModalOpen(false); // Closes modal after saving
  };

  return (
    <div className="erp-profile-page">
      {/* ===== HEADER SECTION (Top Card) ===== */}
      <div className="erp-profile-header">
        <img src={user.profileImage || "https://via.placeholder.com/100"} alt="Profile" />
        <div className="erp-profile-meta">
          <h2>{user.name}</h2>
          <p>System Administrator</p>
          <p>Employee ID: {user.id || "ADM-001"}</p>
        </div>
        {/* Click handler to open the edit popup */}
        <button className="edit-profile-btn" onClick={() => setIsModalOpen(true)}>
          Edit Profile
        </button>
      </div>

      {/* ===== 3-COLUMN INFO GRID ===== */}
      <div className="info-cards-grid">
        
        {/* Personal Information Card */}
        <div className="erp-card">
          <h3>Personal Information</h3>
          <div className="card-content-layout">
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone</span>
              <span className="info-value">{formData.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Date of Birth</span>
              <span className="info-value">12 Aug 2001</span>
            </div>
            <div className="info-row">
              <span className="info-label">Gender</span>
              <span className="info-value">Male</span>
            </div>
            <div className="info-row">
              <span className="info-label">Address</span>
              <span className="info-value">{formData.address}</span>
            </div>
          </div>
        </div>

        {/* Job Details Card */}
        <div className="erp-card">
          <h3>Job Details</h3>
          {jobDetails ? (
            <div className="card-content-layout">
              <div className="info-row">
                <span className="info-label">Department</span>
                <span className="info-value">{jobDetails.department}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Access Level</span>
                <span className="info-value">{jobDetails.accessLevel}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Location</span>
                <span className="info-value">{jobDetails.location}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Joined Date</span>
                <span className="info-value">{jobDetails.joinedDate}</span>
              </div>
            </div>
          ) : <p className="muted">Loading job info...</p>}
        </div>

        {/* Bank Details Card */}
        <div className="erp-card">
          <h3>Bank Details</h3>
          <div className="card-content-layout">
            <div className="info-row">
              <span className="info-label">Bank Name</span>
              <span className="info-value">HDFC Bank</span>
            </div>
            <div className="info-row">
              <span className="info-label">Account No</span>
              <span className="info-value">XXXXXX4589</span>
            </div>
            <div className="info-row">
              <span className="info-label">IFSC Code</span>
              <span className="info-value">HDFC0001234</span>
            </div>
            <div className="info-row">
              <span className="info-label">PAN Number</span>
              <span className="info-value">ABCDE1234F</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FULL WIDTH DOCUMENTS SECTION ===== */}
      <div className="erp-card docs-card">
        <h3>Uploaded Documents</h3>
        <div className="doc-item">
          <span>PAN Card.pdf</span>
          <a href="#" className="download-btn">Download</a>
        </div>
        <div className="doc-item">
          <span>Aadhaar Card.pdf</span>
          <a href="#" className="download-btn">Download</a>
        </div>
        <div className="add-doc-bar">+ Add Document</div>
      </div>

      {/* ===== EDIT MODAL POPUP ===== */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h3>Edit Admin Profile</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  value={formData.address} 
                  onChange={(e) => setFormData({...formData, address: e.target.value})} 
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;