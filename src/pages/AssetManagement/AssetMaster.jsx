import { useState } from "react";
import { FaPlus, FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import "./assetManagement.css";

const AssetMaster = () => {
  const [activeTab, setActiveTab] = useState("database");

  const assets = [
    {
      id: "AST001",
      name: "Dell Latitude 5420",
      category: "Laptop",
      serial: "DELL5420-001",
      purchaseDate: "15 Jan 2024",
      purchaseValue: 85000,
      currentValue: 68000,
      warranty: "15 Jan 2026",
      condition: "Good",
      status: "Active",
    },
    {
      id: "AST002",
      name: "iPhone 13",
      category: "Mobile",
      serial: "IPHN13-002",
      purchaseDate: "10 Feb 2024",
      purchaseValue: 75000,
      currentValue: 60000,
      warranty: "10 Feb 2026",
      condition: "Excellent",
      status: "Active",
    },
  ];

  return (
    <div className="asset-page">

      {/* HEADER */}
      <div className="asset-header">
        <div>
          <h1>Asset Master</h1>
          <p>Comprehensive asset database and management</p>
        </div>

        <div className="asset-header-actions">
          <button className="secondary-btn">
            <FaDownload /> Export
          </button>
          <button className="primary-btn">
            <FaPlus /> Add Asset
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="asset-summary">
        <div className="summary-card">
          <span>Total Assets</span>
          <h2>3</h2>
          <small>In master database</small>
        </div>

        <div className="summary-card">
          <span>Total Value</span>
          <h2>₹1,56,000</h2>
          <small>Current book value</small>
        </div>

        <div className="summary-card">
          <span>Active Assets</span>
          <h2>3</h2>
          <small>Currently in use</small>
        </div>

        <div className="summary-card">
          <span>Categories</span>
          <h2>6</h2>
          <small>Asset categories</small>
        </div>
      </div>

      {/* TABS */}
      <div className="asset-tabs">
        <button
          className={activeTab === "database" ? "active" : ""}
          onClick={() => setActiveTab("database")}
        >
          Asset Database
        </button>
        <button
          className={activeTab === "categories" ? "active" : ""}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
        <button
          className={activeTab === "bulk" ? "active" : ""}
          onClick={() => setActiveTab("bulk")}
        >
          Bulk Actions
        </button>
      </div>

      {/* TABLE SECTION */}
      {activeTab === "database" && (
        <div className="asset-table-card">

          <div className="table-header">
            <h2>Asset Database</h2>
            <p>Complete master list of all company assets</p>
          </div>

          {/* FILTER ROW */}
          <div className="table-filters">
            <input placeholder="Search assets..." />
            <select>
              <option>All Categories</option>
            </select>
            <select>
              <option>All Status</option>
            </select>
            <button className="secondary-btn">More Filters</button>
          </div>

          {/* TABLE */}
          <table>
            <thead>
              <tr>
                <th>Asset Details</th>
                <th>Category</th>
                <th>Serial Number</th>
                <th>Purchase Info</th>
                <th>Current Value</th>
                <th>Warranty</th>
                <th>Condition</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td>
                    <strong>{asset.name}</strong>
                    <div className="sub-text">{asset.id}</div>
                  </td>

                  <td>
                    <span className="badge category">
                      {asset.category}
                    </span>
                  </td>

                  <td>{asset.serial}</td>

                  <td>
                    ₹{asset.purchaseValue.toLocaleString()}
                    <div className="sub-text">
                      {asset.purchaseDate}
                    </div>
                  </td>

                  <td>
                    ₹{asset.currentValue.toLocaleString()}
                  </td>

                  <td>{asset.warranty}</td>

                  <td>
                    <span className={`badge condition ${asset.condition.toLowerCase()}`}>
                      {asset.condition}
                    </span>
                  </td>

                  <td>
                    <span className={`badge status ${asset.status.toLowerCase()}`}>
                      {asset.status}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <button><FaEdit /></button>
                    <button><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default AssetMaster;