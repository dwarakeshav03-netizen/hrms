import React from "react";
import { FaPlus, FaEye, FaEdit } from "react-icons/fa";
import "./assetManagement.css";

const AssetDisposal = () => {
  const disposals = [
    {
      id: "AST001",
      asset: "Dell Laptop - Inspiron 15",
      category: "IT Equipment",
      method: "Sale",
      original: 1200,
      current: 300,
      recovery: 250,
      date: "2024-02-01",
      status: "Pending",
      requestedBy: "John Smith",
      requestDate: "2024-01-15",
      reason: "End of useful life",
    },
    {
      id: "AST015",
      asset: "Office Chair - Ergonomic",
      category: "Furniture",
      method: "Donation",
      original: 450,
      current: 100,
      recovery: 0,
      date: "2024-01-25",
      status: "Completed",
      requestedBy: "Mike Wilson",
      requestDate: "2024-01-10",
      reason: "Damaged beyond repair",
    },
  ];

  return (
    <div className="disposal-page">

      {/* HEADER */}
      <div className="disposal-header">
        <div>
          <h1>Asset Disposal</h1>
          <p>Manage asset disposal and retirement</p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="disposal-summary">
        <div className="summary-card">
          <span>Total Disposals</span>
          <h2>2</h2>
        </div>

        <div className="summary-card">
          <span>Pending</span>
          <h2 className="orange">1</h2>
        </div>

        <div className="summary-card">
          <span>Completed</span>
          <h2 className="green">1</h2>
        </div>

        <div className="summary-card">
          <span>Recovery Value</span>
          <h2 className="blue">₹250</h2>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="disposal-filters">
        <input placeholder="Search assets..." />

        <select>
          <option>All Status</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Request</option>

        </select>

        <select>
          <option>All Methods</option>
          <option>Sale</option>
          <option>Donation</option>
        </select>

        <button className="primary-btn">
          <FaPlus /> Request Disposal
        </button>
      </div>

      {/* TABLE */}
      <div className="disposal-table-card">
        <h2>Asset Disposals (2)</h2>

        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Method</th>
              <th>Values</th>
              <th>Disposal Date</th>
              <th>Status</th>
              <th>Requested By</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {disposals.map((item) => (
              <tr key={item.id}>

                <td>
                  <strong>{item.asset}</strong>
                  <div className="sub-text">
                    {item.id} • {item.category}
                  </div>
                </td>

                <td>
                  <span className={`badge method ${item.method.toLowerCase()}`}>
                    {item.method}
                  </span>
                </td>

                <td>
                  <div>Original: ₹{item.original}</div>
                  <div>Current: ₹{item.current}</div>
                  <div className="recovery">
                    Recovery: ₹{item.recovery}
                  </div>
                </td>

                <td>{item.date}</td>

                <td>
                  <span className={`badge status ₹{item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>

                <td>
                  <strong>{item.requestedBy}</strong>
                  <div className="sub-text">
                    {item.requestDate}
                  </div>
                </td>

                <td>{item.reason}</td>

                <td className="action-buttons">
                  <button className="icon-btn">
                    <FaEye />
                  </button>
                  <button className="icon-btn">
                    <FaEdit />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AssetDisposal;