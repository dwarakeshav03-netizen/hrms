import { useState, useMemo, useEffect } from "react";
import "./assetManagement.css";

const EMPLOYEES = ["EMP001", "EMP002", "EMP014", "EMP021"];

const AssetManagement = () => {
  const [assets, setAssets] = useState([
    {
      id: "LAP-001",
      name: "Dell Latitude 5420",
      category: "Laptop",
      status: "ASSIGNED",
      assignedTo: "EMP001",
      condition: "Good",
      remarks: "",
    },
    {
      id: "LAP-002",
      name: "HP ProBook",
      category: "Laptop",
      status: "AVAILABLE",
      assignedTo: null,
      condition: "Good",
      remarks: "",
    },
    {
      id: "MOB-010",
      name: "iPhone 13",
      category: "Mobile",
      status: "MAINTENANCE",
      assignedTo: null,
      condition: "Under Repair",
      remarks: "Screen issue",
    },
  ]);

  const [showAddAsset, setShowAddAsset] = useState(false);

  const [newAsset, setNewAsset] = useState({
    id: "",
    name: "",
    category: "Laptop",
    status: "AVAILABLE",
    assignedTo: null,
    condition: "Good",
    remarks: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  /* =============================
     FILTER STATES
  ============================= */
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  /* =============================
     PAGINATION STATE (NEW)
  ============================= */
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, categoryFilter, statusFilter]);

  /* SUMMARY */
  const summary = useMemo(
    () => ({
      total: assets.length,
      assigned: assets.filter((a) => a.status === "ASSIGNED").length,
      available: assets.filter((a) => a.status === "AVAILABLE").length,
      maintenance: assets.filter((a) => a.status === "MAINTENANCE").length,
    }),
    [assets]
  );

  /* FILTERED DATA */
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchSearch =
        asset.name.toLowerCase().includes(searchText.toLowerCase()) ||
        asset.id.toLowerCase().includes(searchText.toLowerCase());

      const matchCategory =
        categoryFilter === "ALL" || asset.category === categoryFilter;

      const matchStatus =
        statusFilter === "ALL" || asset.status === statusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [assets, searchText, categoryFilter, statusFilter]);

  /* =============================
     PAGINATED DATA (NEW)
  ============================= */
  const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);

  const paginatedAssets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAssets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAssets, currentPage]);

  /* HELPERS */
  const updateAsset = (id, changes) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...changes } : a))
    );
  };

  const updateStatus = (id, status) => {
    if (status === "AVAILABLE") {
      updateAsset(id, { status, assignedTo: null, condition: "Good" });
    }
    if (status === "ASSIGNED") {
      updateAsset(id, {
        status,
        assignedTo: EMPLOYEES[0],
        condition: "Good",
      });
    }
    if (status === "MAINTENANCE") {
      updateAsset(id, {
        status,
        assignedTo: null,
        condition: "Under Repair",
      });
    }
    if (status === "DAMAGED") {
      updateAsset(id, {
        status,
        assignedTo: null,
        condition: "Damaged",
      });
    }
  };

  const saveAsset = () => {
    setSuccessMsg("Asset updated successfully!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const addAsset = () => {
    if (!newAsset.id || !newAsset.name) return;

    setAssets((prev) => [...prev, newAsset]);

    setNewAsset({
      id: "",
      name: "",
      category: "Laptop",
      status: "AVAILABLE",
      assignedTo: null,
      condition: "Good",
      remarks: "",
    });

    setShowAddAsset(false);
    setSuccessMsg("Asset added successfully!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  return (
    <div className="asset-page">
      {successMsg && (
        <div className="success-banner floating">
          <span className="success-icon">✓</span>
          <span className="success-text">{successMsg}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="asset-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1>Asset Management</h1>
            <p>Track and manage company assets</p>
          </div>

          <button className="add-btn" onClick={() => setShowAddAsset(true)}>
            + Add Asset
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="asset-filter-bar">
        <div className="asset-filter-item">
          <label>Select Date</label>
          <input type="date" />
        </div>

        <input
          type="text"
          className="asset-filter-search"
          placeholder="Search Asset"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="Monitor">Monitor</option>
          <option value="Accessory">Accessory</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
          <option value="DAMAGED">DAMAGED</option>
        </select>
      </div>
{/* ADD MODAL */}
{showAddAsset && (
  <div className="modal-backdrop">
    <div className="modal">
      <h3>Add Asset</h3>

      <div className="form-group">
        <label>Asset ID</label>
        <input
          value={newAsset.id}
          onChange={e =>
            setNewAsset({ ...newAsset, id: e.target.value })
          }
          placeholder="e.g. LAP-023"
        />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          value={newAsset.name}
          onChange={e =>
            setNewAsset({ ...newAsset, name: e.target.value })
          }
          placeholder="Dell Latitude 5440"
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          value={newAsset.category}
          onChange={e =>
            setNewAsset({ ...newAsset, category: e.target.value })
          }
        >
          <option>Laptop</option>
          <option>Mobile</option>
          <option>Monitor</option>
          <option>Accessory</option>
        </select>
      </div>

      <div className="modal-actions">
        <button
          className="cancel-btn"
          onClick={() => setShowAddAsset(false)}
        >
          Cancel
        </button>

        <button className="save-btn" onClick={addAsset}>
          Add Asset
        </button>
      </div>
    </div>
  </div>
)}

      {/* SUMMARY */}
      <div className="asset-cards">
        <div className="asset-card">
          <span>Total Assets</span>
          <strong>{summary.total}</strong>
        </div>
        <div className="asset-card">
          <span>Assigned</span>
          <strong>{summary.assigned}</strong>
        </div>
        <div className="asset-card">
          <span>Available</span>
          <strong>{summary.available}</strong>
        </div>
        <div className="asset-card">
          <span>Maintenance</span>
          <strong>{summary.maintenance}</strong>
        </div>
      </div>

      {/* TABLE */}
      <div className="asset-table-card">
        <div className="table-header">
          <h2>Assets</h2>
          <p>Manage asset allocation and status</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>ASSET ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>STATUS</th>
              <th>ASSIGNED TO</th>
              <th>CONDITION</th>
              <th>REMARKS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {paginatedAssets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.name}</td>
                <td>{asset.category}</td>

                <td>
                  <select
                    className={`status ${asset.status}`}
                    value={asset.status}
                    onChange={(e) =>
                      updateStatus(asset.id, e.target.value)
                    }
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="DAMAGED">Damaged</option>
                  </select>
                </td>

                <td>
                  {asset.status === "ASSIGNED" ? (
                    <select
                      value={asset.assignedTo}
                      onChange={(e) =>
                        updateAsset(asset.id, {
                          assignedTo: e.target.value,
                        })
                      }
                    >
                      {EMPLOYEES.map((emp) => (
                        <option key={emp} value={emp}>
                          {emp}
                        </option>
                      ))}
                    </select>
                  ) : (
                    "-"
                  )}
                </td>

                <td>
                  <input
                    value={asset.condition}
                    onChange={(e) =>
                      updateAsset(asset.id, {
                        condition: e.target.value,
                      })
                    }
                  />
                </td>

                <td>
                  <input
                    placeholder="Remarks"
                    value={asset.remarks}
                    onChange={(e) =>
                      updateAsset(asset.id, {
                        remarks: e.target.value,
                      })
                    }
                  />
                </td>

                <td>
                  <button className="save-btn" onClick={saveAsset}>
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="asset-pagination">
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
      </div>
    </div>
  );
};

export default AssetManagement;
