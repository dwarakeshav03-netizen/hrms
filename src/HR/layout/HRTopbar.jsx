import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaChevronDown, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slice/authSlice";
import "./hrTopbar.css";

const HRTopbar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ SAME USER FROM REDUX
  const user = useSelector((state) => state.auth?.user);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const handleProfile = () => {
    setOpen(false);
    navigate("/hr/my-profile");
  };

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("/hr/dashboard")) return "HR Dashboard";
    if (path.includes("/hr/employees")) return "Employee Management";
    if (path.includes("/hr/leave")) return "Leave Management";
    if (path.includes("/hr/attendance")) return "Attendance";
    if (path.includes("/hr/onboarding")) return "Onboarding";
    if (path.includes("/hr/exit")) return "Exit Management";
    if (path.includes("/hr/tasks")) return "Task Management";
    if (path.includes("/hr/payroll")) return "Payroll";
    if (path.includes("/hr/reports")) return "Reports";
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
    <header className="hr-topbar">
      <div className="hr-topbar-left">{getTitle()}</div>

      <div className="hr-topbar-center">
        <div className="hr-search-box">
          <input type="text" placeholder="Search employee, ID..." />
          <FaSearch className="hr-search-icon" />
        </div>
      </div>

      <div className="hr-topbar-right">
        <FaBell className="hr-bell" />

        <div className="hr-profile" ref={ref}>
          <div
            className="hr-profile-trigger"
            onClick={() => setOpen(!open)}
          >
            <img
              src={user.profileImage}
              alt="profile"
              className="hr-profile-img"
            />

            <div className="hr-profile-info">
              <span className="hr-name">{user.name}</span>
              <span className="hr-email">{user.email}</span>
            </div>

            <FaChevronDown />
          </div>

          {open && (
            <div className="hr-dropdown">
              <div className="hr-dropdown-item" onClick={handleProfile}>
                My Profile
              </div>
              <div className="hr-dropdown-item">Settings</div>
              <div
                className="hr-dropdown-item logout"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HRTopbar;
