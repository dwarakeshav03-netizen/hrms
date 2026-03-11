import "./EmployeeNavbar.css";
import { FaBell, FaChevronDown } from "react-icons/fa";

const EmployeeNavbar = () => {
  return (
    <div className="topbarr">
      {/* LEFT */}
      <div className="topbarr-left">
        Crest Climbers
      </div>

      {/* CENTER */}
      <div className="topbarr-center">
        <div className="search-box">
          <input placeholder="Search employee, ID..." />
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbarr-right">
        <FaBell className="bell-icon" />

        <div className="profile-trigger">
          <div className="profile-info">
            <span className="profile-name">Employee User</span>
            <span className="profile-email">emp@hrms.com</span>
          </div>
          <FaChevronDown className="chevron" />
        </div>

        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default EmployeeNavbar;
