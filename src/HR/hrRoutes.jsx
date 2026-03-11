

import HRDashboard from "./pages/Dashboard/HRDashboard";
import EmployeeList from "./pages/EmployeeManagement/EmployeeList";
import LeaveDashboard from "./pages/LeaveManagement/LeaveDashboard";
import Attendance from "./pages/Attendance/Attendance";
import ExitRequests from "./pages/ExitManagement/ExitRequests";
import Payroll from "./pages/Payroll/Payroll";
import Reports from "./pages/Reports/Reports";

const HRRoutes = {
  path: "/hr",
  element: <HRLayout />,
  children: [
    { path: "dashboard", element: <HRDashboard /> },
    { path: "employees", element: <EmployeeList /> },
    { path: "leave", element: <LeaveDashboard /> },
    { path: "attendance", element: <Attendance /> },
    { path: "exit", element: <ExitRequests /> },
    { path: "payroll", element: <Payroll /> },
    { path: "reports", element: <Reports /> }
  ],
};

export default HRRoutes;
