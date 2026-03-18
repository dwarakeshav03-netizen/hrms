import { useState, useEffect } from "react";
// --- ADDED: useOutletContext for the wrapper logic ---
import { NavLink, useLocation, useOutletContext } from "react-router-dom"; 
import {
  FaThLarge,
  FaUsers,
  FaMoneyBill,
  FaChartBar,
  FaChevronDown,
  FaUserAlt
} from "react-icons/fa";
import "./hrSidebar.css";

const HRSidebar = () => {
  const location = useLocation();
  
  // --- ADDED: Accessing the Wrapper Data ---
  // Inga neenga layout-la irunthu anupuna 'hrContext' data kedaikum
  // const [hrContext] = useOutletContext() || [{}]; 

  const isEmployeeActive =
    location.pathname.startsWith("/hr/employees") ||
    location.pathname.startsWith("/hr/onboarding") ||
    location.pathname.startsWith("/hr/attendance") ||
    location.pathname.startsWith("/hr/leave") ||
    location.pathname.startsWith("/hr/tasks") ||
    location.pathname.startsWith("/hr/exit");

  const [empOpen, setEmpOpen] = useState(isEmployeeActive);

  useEffect(() => {
    setEmpOpen(isEmployeeActive);
  }, [isEmployeeActive]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">Crest Climbers</div>

      <div className="sidebar-menu">
        {/* DASHBOARD */}
        <NavLink
          to="/hr/dashboard"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <FaThLarge className="icon" />
          Dashboard
        </NavLink>

        {/* EMPLOYEE MANAGEMENT */}
        <div
          className={`sidebar-item dropdown ${
            isEmployeeActive ? "active" : ""
          }`}
          onClick={() => setEmpOpen((prev) => !prev)}
        >
          <div className="dropdown-title">
            <FaUsers className="icon" />
            Employee Management
          </div>

          <FaChevronDown className={`chevron ${empOpen ? "open" : ""}`} />
        </div>

        {/* SUBMENU */}
        <div className={`submenu ${empOpen ? "open" : ""}`}>
          <NavLink
            to="/hr/employees"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            Employee Directory
          </NavLink>

          <NavLink
            to="/hr/onboarding"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            Add / Onboard Employee
          </NavLink>

          <NavLink
            to="/hr/attendance"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            Attendance
          </NavLink>

          <NavLink
            to="/hr/leave"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            Leave Management
          </NavLink>

          <NavLink
            to="/hr/tasks"
            className={({ isActive }) =>
                `submenu-item ${isActive ? "active" : ""}`
             }
          >
            Task Management
          </NavLink>

          <NavLink
            to="/hr/exit"
            className={({ isActive }) =>
              `submenu-item ${isActive ? "active" : ""}`
            }
          >
            Exit Management
          </NavLink>
        </div>

        {/* PAYROLL */}
        <NavLink
          to="/hr/payroll"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <FaMoneyBill className="icon" />
          Payroll
        </NavLink>

        {/* REPORTS */}
        <NavLink
          to="/hr/reports"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <FaChartBar className="icon" />
          Reports
        </NavLink>

        {/* NEW ESS PORTAL SECTION */}
        <NavLink
          to="/hr/ess-portal"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <FaUserAlt className="icon" />
          My Portal
        </NavLink>
      </div>
    </div>
  );
};

export default HRSidebar;