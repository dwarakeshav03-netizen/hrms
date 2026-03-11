import React, { useState } from "react";
import "./EssPortal.css"; 
import { 
  FaUserCircle, FaCalendarCheck, FaWallet, FaClock, 
  FaFileAlt, FaBullhorn, FaSearch, FaTasks, 
  FaUmbrellaBeach, FaDownload, FaSignOutAlt 
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
      
      {/* IDENTITY CARD - ALL IN ONE LINE CONTAINER */}
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

        {/* BUTTON GROUP: SEARCH + ACTIONS IN ONE LINE */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex items-center bg-slate-50 rounded-xl px-4 h-[38px] border border-slate-200 w-64">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search ID..." 
              className="w-full bg-transparent border-none focus:ring-0 text-xs outline-none font-bold text-slate-600" 
              value={searchId} 
              onChange={(e) => setSearchId(e.target.value)} 
            />
            <button onClick={handleSearch} className="btn-royal h-7 px-3 rounded-lg ml-1 !text-[9px]">GO</button>
          </div>

          <button className="btn-royal-outline">
            Apply Leave
          </button>
          
          <button className="btn-royal">
            Clock Out
          </button>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <StatCard label="Attendance" value={currentEmp?.attendance} color="border-green-500" icon={<FaClock color="#22c55e" size={20}/>} />
        <StatCard label="Leaves Left" value={currentEmp?.leaves} color="border-blue-500" icon={<FaCalendarCheck color="#3b82f6" size={20}/>} />
        <StatCard label="Net Salary" value={`₹${currentEmp?.salary}`} color="border-purple-500" icon={<FaWallet color="#8b5cf6" size={20}/>} />
        <StatCard label="Expenses" value={currentEmp?.finance} color="border-orange-500" icon={<FaFileAlt color="#f59e0b" size={20}/>} />
      </div>

      {/* DOCUMENT TILES WITH WHITE TEXT FIX */}
      <div className="ess-card p-6 bg-white rounded-2xl border border-slate-100 shadow-sm w-full">
        <h3 className="font-black mb-6 flex items-center gap-2 uppercase text-[11px] tracking-widest text-slate-400"><FaFileAlt color="#8b5cf6"/> Employee Documents</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <DocBtn label="Payslip Feb 26" /> 
          <DocBtn label="Offer Letter" /> 
          <DocBtn label="Form 16" /> 
          <DocBtn label="HR Policy" />
        </div>
      </div>

      <div className="text-center opacity-50 py-4">
        <p className="text-[10px] font-bold">© 2025 HRMS | All Rights Reserved</p>
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
  <button className="doc-blue-tile group transition-all duration-300">
    <div className="flex items-center gap-3">
      <FaFileAlt size={14} className="text-white" />
      <span className="text-[10px] font-black text-white uppercase tracking-wide">{label}</span>
    </div>
    <FaDownload className="text-white" size={12} />
  </button>
);

export default EssPortal;