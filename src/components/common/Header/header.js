import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaChevronDown, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../store/slice/authSlice";
import "../../../assets/header/header.css";


const Topbar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ GET USER FROM REDUX
  const user = useSelector((state) => state.auth?.user);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const handleProfile = () => {
    setOpen(false);
    navigate("/my-profile");
  };

  const getTitle = () => {
    const path = location.pathname;
    if (path.startsWith("/employee")) return "Employee";
    if (path.startsWith("/onboarding")) return "Onboarding Form";
    if (path.startsWith("/attendance")) return "Attendance";
    if (path.startsWith("/leave")) return "Leave Management";
    if (path.startsWith("/exit")) return "Exit Formality";

    if (path.startsWith("/payrolll/dashboard")) return "Payroll Dashboard";
    if (path.startsWith("/payrolll/process")) return "Payroll Process";
    if (path.startsWith("/payrolll/approvals")) return "Payroll Approvals";
    if (path.startsWith("/payrolll/payslips")) return "Payroll Payslips";
    if (path.startsWith("/payrolll/release")) return "Payroll Release";
    if (path.startsWith("/payrolll/reports")) return "Payroll Reports";
    if (path.startsWith("/payrolll/salarystructure")) return "Payroll Salary Structure";

    if (path.startsWith("/assets/master")) return "Asset Master";
    if (path.startsWith("/assets/assign")) return "Asset Assignment";
    if (path.startsWith("/assets/return")) return "Asset Return";
    if (path.startsWith("/assets/maintenance")) return "AssetMaintenance";
    if (path.startsWith("/assets/disposal")) return "Asset Disposal";
    
    if (path.startsWith("/expense")) return "Expense & Finance";
    return "Profile";
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="topbar">
      <div className="topbar-left">{getTitle()}</div>

      <div className="topbar-center">
        <div className="search-box">
          <input type="text" placeholder="       Search employee, ID..." />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <div className="topbar-right">
        <FaBell className="bell-icon" />

        <div className="profile-area" ref={ref}>
          <div
            className="profile-trigger"
            onClick={() => setOpen(!open)}
          >
            {/* ✅ SAME IMAGE AS PROFILE PAGE */}
            <img
              src={user.profileImage}
              alt="profile"
              className="profile-img"
            />

            <div className="profile-info">
              <span className="profile-name">{user.name}</span>
              <span className="profile-email">{user.email}</span>
            </div>

            <FaChevronDown className="chevron" />
          </div>

          {open && (
            <div className="simple-dropdown">
              <div className="dropdown-item" onClick={handleProfile}>
                My Profile
              </div>
              <div className="dropdown-item">Settings</div>
              <div className="dropdown-item logout" onClick={handleLogout}>
                Log out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
