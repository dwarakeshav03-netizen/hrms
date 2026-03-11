import EmployeeNavbar from "./EmployeeNavbar";
import EmployeeSidebar from "./EmployeeSidebar";
import { Outlet } from "react-router-dom";
import "./EmployeeLayout.css";

const EmployeeMainLayout = () => {
  return (
    <div className="employee-layout">
      {/* LEFT SIDEBAR */}
      <EmployeeSidebar />

      {/* RIGHT SIDE */}
      <div className="employee-right">
        <EmployeeNavbar />
        <div className="employee-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeMainLayout;
