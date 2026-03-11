import React, { useState } from "react";
import "./EssPortal.css"; 
import { 
  FaUserCircle, FaCalendarCheck, FaWallet, FaClock, 
  FaFileAlt, FaBullhorn, FaSearch, FaTasks, 
  FaUmbrellaBeach, FaDownload 
} from "react-icons/fa";

const EssPortal = () => {
  const employeeDataStore = {
    "EMP030": { name: "Divya", salary: "61,000", attendance: "22 / 24 Days", leaves: "12 Days", finance: "PENDING", tasks: [{ title: "Submit Report", priority: "High" }], holidays: [{ name: "Holi", date: "March 14" }], updates: [{ title: "Payroll Processed", time: "2h ago", desc: "Approved." }] },
    "EMP123": { name: "Arjun", salary: "55,000", attendance: "24 / 24 Days", leaves: "08 Days", finance: "APPROVED", tasks: [{ title: "Sync", priority: "Medium" }], holidays: [{ name: "Holi", date: "March 14" }], updates: [{ title: "Bonus Credited", time: "5h ago", desc: "Added." }] }
  };

  const [searchId, setSearchId] = useState("");
  const [currentEmp, setCurrentEmp] = useState(employeeDataStore["EMP030"]);

  const handleSearch = () => {
    const emp = employeeDataStore[searchId.toUpperCase()];
    if (emp) setCurrentEmp(emp);
    else alert("ID not found!");
  };

  return (
    <div className="p-6 bg-[#f4f7fe] min-h-screen font-sans space-y-6">
      
      {/* LINE 1: Identity Card with FIXED One-Line Actions */}
      <div className="ess-card p-6 flex flex-col lg:flex-row justify-between items-center bg-white rounded-2xl shadow-sm w-full gap-4 border border-slate-100">
        
        <div className="flex items-center gap-4">
          <div className="p-1 bg-slate-50 rounded-full border border-slate-100 shadow-inner">
            <FaUserCircle size={50} className="text-[#2563eb]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Hello, {currentEmp?.name}</h1>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">FMP ID: {searchId || "EMP030"}</p>
          </div>
        </div>

        {/* Action buttons and search in one line */}
        <div className="action-button-group">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search ID..."
              className="search-input"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>

          <button onClick={handleSearch} className="btn-royal px-4">GO</button>
          <button className="btn-royal-outline">Apply Leave</button>
          <button className="btn-royal">Clock Out</button>
        </div>
      </div>

      {/* LINE 2: Horizontal Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <StatCard label="Attendance" value={currentEmp?.attendance} color="border-green-500" icon={<FaClock color="#22c55e" size={20}/>} />
        <StatCard label="Leaves Left" value={currentEmp?.leaves} color="border-blue-500" icon={<FaCalendarCheck color="#3b82f6" size={20}/>} />
        <StatCard label="Net Salary" value={`₹${currentEmp?.salary}`} color="border-purple-500" icon={<FaWallet color="#8b5cf6" size={20}/>} />
        <StatCard label="Expenses" value={currentEmp?.finance} color="border-orange-500" icon={<FaFileAlt color="#f59e0b" size={20}/>} />
      </div>

      {/* LINE 3: Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="ess-card p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-black mb-6 flex items-center gap-2 uppercase text-[11px] tracking-widest text-slate-400"><FaTasks color="#3b82f6"/> My Tasks</h3>
          {(currentEmp?.tasks || []).map((t, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-3">
              <span className="text-xs font-bold text-slate-700">{t.title}</span>
              <span className="text-[9px] px-2.5 py-1 bg-red-500 text-white rounded-full font-black uppercase">{t.priority}</span>
            </div>
          ))}
        </div>

        <div className="ess-card p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2 uppercase text-xs text-slate-400"><FaBullhorn color="#94a3b8" /> Recent Updates</h3>
          <div className="space-y-4">
            {(currentEmp?.updates || []).map((u, i) => (
              <div key={i} className="border-l-4 border-green-500 pl-3">
                <h4 className="text-xs font-bold">{u.title}</h4>
                <p className="text-[10px] text-slate-500 italic">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ess-card p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2 uppercase text-xs text-slate-400"><FaUmbrellaBeach color="#f59e0b"/> Holidays</h3>
          <div className="space-y-4">
            {(currentEmp?.holidays || []).map((h, i) => (
              <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                <span className="text-xs font-bold text-slate-700">{h.name}</span>
                <span className="text-xs font-bold text-[#2563eb] bg-blue-50 px-3 py-1 rounded-lg">{h.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LINE 4: Employee Documents */}
      <div className="ess-card p-6 bg-white rounded-2xl border border-slate-100 shadow-sm w-full">
        <h3 className="font-black mb-6 flex items-center gap-2 uppercase text-[11px] tracking-widest text-slate-400"><FaFileAlt color="#8b5cf6"/> Employee Documents</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <DocBtn label="Payslip Feb 26" /> 
          <DocBtn label="Offer Letter" /> 
          <DocBtn label="Form 16" /> 
          <DocBtn label="HR Policy" />
        </div>
      </div>

      {/* SINGLE CLEAN FOOTER */}
      <div className="text-center opacity-50 py-10">
        <p className="text-[10px] font-bold uppercase tracking-widest">© 2025 HRMS | All Rights Reserved</p>
      </div>
      
    </div>
  );
};

const StatCard = ({ label, value, color, icon }) => (
  <div className={`ess-card p-6 rounded-2xl border-t-4 ${color} bg-white shadow-sm`}>
    <div className="flex justify-between items-center mb-4">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="bg-slate-50 p-2 rounded-lg">{icon}</div>
    </div>
    <p className="text-2xl font-black text-slate-800 tracking-tighter">{value}</p>
  </div>
);

const DocBtn = ({ label }) => (
  <button className="doc-blue-tile">
    <div className="flex items-center gap-3">
      <FaFileAlt size={14} className="text-white" />
      <span className="text-[10px] font-black text-white uppercase tracking-wide">{label}</span>
    </div>
    <FaDownload className="text-white" size={12} />
  </button>
);

export default EssPortal;