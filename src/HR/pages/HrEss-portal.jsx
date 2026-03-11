import React, { useState, useEffect } from "react";
import "../../pages/EssPortal.css"; 
import { 
  FaUserCircle, FaCalendarCheck, FaWallet, FaClock, 
  FaFileAlt, FaBullhorn, FaTasks, 
  FaUmbrellaBeach, FaDownload 
} from "react-icons/fa";

const HrEssPortal = () => {
  const [currentEmp, setCurrentEmp] = useState(null);

  // Initializing with HR user data (Simulating data from your PostgreSQL fetch_portal_profile)
  useEffect(() => {
    setCurrentEmp({
      name: "Divya",
      id: "EMP030",
      salary: "61,000",
      attendance: "22 / 24 Days",
      leaves: "12 Days",
      finance: "PENDING",
      tasks: [{ title: "Submit Monthly HR Report", priority: "High" }],
      holidays: [{ name: "Holi", date: "March 14" }],
      updates: [{ title: "Payroll Processed", time: "2h ago", desc: "Your salary has been credited." }]
    });
  }, []);

  if (!currentEmp) return <div className="p-6 text-center font-bold">Loading...</div>;

  return (
    <div className="p-6 bg-[#f4f7fe] min-h-screen font-sans space-y-6">
      
      {/* IDENTITY CARD */}
      <div className="ess-card p-6 flex flex-col lg:flex-row justify-between items-center bg-white rounded-2xl shadow-sm w-full gap-4 border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="p-1 bg-slate-50 rounded-full border border-slate-100 shadow-inner">
            <FaUserCircle size={50} className="text-[#2563eb]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Welcome, {currentEmp.name}</h1>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Employee ID: {currentEmp.id}</p>
          </div>
        </div>

        {/* ONE-LINE ACTION GROUP */}
        <div className="action-button-group">
          <button className="btn-royal-outline">Apply Leave</button>
          <button className="btn-royal">Clock Out</button>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <StatCard label="My Attendance" value={currentEmp.attendance} color="border-green-500" icon={<FaClock color="#22c55e" size={20}/>} />
        <StatCard label="Leaves Left" value={currentEmp.leaves} color="border-blue-500" icon={<FaCalendarCheck color="#3b82f6" size={20}/>} />
        <StatCard label="My Net Salary" value={`₹${currentEmp.salary}`} color="border-purple-500" icon={<FaWallet color="#8b5cf6" size={20}/>} />
        <StatCard label="Expense Status" value={currentEmp.finance} color="border-orange-500" icon={<FaFileAlt color="#f59e0b" size={20}/>} />
      </div>

      {/* DASHBOARD SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="ess-card p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-black mb-6 flex items-center gap-2 uppercase text-[11px] tracking-widest text-slate-400"><FaTasks color="#3b82f6"/> My Tasks</h3>
          {currentEmp.tasks.map((t, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-3">
              <span className="text-xs font-bold text-slate-700">{t.title}</span>
              <span className="text-[9px] px-2.5 py-1 bg-red-500 text-white rounded-full font-black uppercase">{t.priority}</span>
            </div>
          ))}
        </div>

        <div className="ess-card p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2 uppercase text-xs text-slate-400"><FaBullhorn color="#94a3b8" /> Recent Updates</h3>
          <div className="space-y-4">
            {currentEmp.updates.map((u, i) => (
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
            {currentEmp.holidays.map((h, i) => (
              <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                <span className="text-xs font-bold text-slate-700">{h.name}</span>
                <span className="text-xs font-bold text-[#2563eb] bg-blue-50 px-3 py-1 rounded-lg">{h.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DOCUMENTS */}
      <div className="ess-card p-6 bg-white rounded-2xl border border-slate-100 shadow-sm w-full">
        <h3 className="font-black mb-6 flex items-center gap-2 uppercase text-[11px] tracking-widest text-slate-400"><FaFileAlt color="#8b5cf6"/> My Documents</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <DocBtn label="My Payslip" /> 
          <DocBtn label="Offer Letter" /> 
          <DocBtn label="Form 16" /> 
          <DocBtn label="HR Policy" />
        </div>
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

export default HrEssPortal;