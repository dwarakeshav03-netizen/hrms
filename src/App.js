import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store/store";

/* ================= LAYOUTS ================= */
import MainLayout from "./components/layout/mainlayout";
import HRLayout from "./HR/layout/HRLayout";

/* ================= AUTH ================= */
import Login from "./pages/auth/login";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AuthLayout from "../src/components/layout/AuthLayout";

/* ================= COMMON ================= */
import MyProfile from "./components/MyProfile/MyProfile";

/* ================= EMPLOYEE ================= */
import EmployeeMainLayout from "./employee/layout/EmployeeMainLayout";
import EmployeeDashboard from "./employee/dashboard/EmployeeDashboard";
import EmployeeAttendance from "./employee/attendance/EmployeeAttendance";
import EmployeeLeave from "./employee/leave/EmployeeLeave";
import EmployeePayroll from "./employee/payroll/EmployeePayroll";
import EmployeeProfile from "./employee/profile/EmployeeProfile";

/* ================= ADMIN PAGES ================= */
import EssPortal from "./pages/EssPortal";

/* ================= ADMIN PAYROLL MODULES ================= */
import AdminPayrollDashboard from "./pages/payroll-admin/Dashboard/AdminPayrollDashboard";
import AdminProcessPayroll from "./pages/payroll-admin/Process/AdminProcessPayroll";
import AdminPayrollApprovals from "./pages/payroll-admin/Approvals/AdminPayrollApprovals";
import AdminSalaryRelease from "./pages/payroll-admin/Release/AdminSalaryRelease";
import AdminPayrollReports from "./pages/payroll-admin/Reports/AdminPayrollReports";

// FIXED: Using only ONE import for the Salary Structure component from the Payslips folder
import AdminSalaryStructure from "./pages/payroll-admin/Payslips/AdminPayslips";

import AssetMaster from "./pages/AssetManagement/AssetMaster";
import AssignAsset from "./pages/AssetManagement/AssignAsset";
import ReturnAsset from "./pages/AssetManagement/ReturnAsset";
import MaintenanceSchedule from "./pages/AssetManagement/MaintenanceSchedule";
import AssetDisposal from "./pages/AssetManagement/AssetDisposal";

import AdminExpenseFinance from "./pages/ExpenseFinance/AdminExpenseFinance";
import EmployeeDirectory from "./pages/employees/EmployeeDirectory";
import Attendance from "./pages/attendance/attendance";
import LeaveList from "./pages/leave/leavelist";
import OnboardingForm from "./pages/employees/OnboardingForm";
import ExitFormality from "./pages/employees/exit/ExitFormalities";

/* ================= HR ================= */
import HRDashboard from "./HR/pages/Dashboard/HRDashboard";
import EmployeeListHR from "./HR/pages/EmployeeManagement/EmployeeList";
import LeaveDashboard from "./HR/pages/LeaveManagement/LeaveDashboard";
import AttendanceHR from "./HR/pages/Attendence/Attendence";
import TaskManagement from "./HR/pages/TaskManagement/TaskManagement";
import ExitRequests from "./HR/pages/ExitManagement/ExitRequests";
import Payroll from "./HR/pages/Payroll/Payroll";
import Reports from "./HR/pages/Reports/Reports";
import HrEssPortal from "./HR/pages/HrEss-portal"; 

const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* ============ LOGIN ============ */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* ============ ADMIN PROFILE ============ */}
            <Route
              path="/my-profile"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <MyProfile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* ============ ADMIN DASHBOARD ============ */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/employees"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <EmployeeDirectory />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/attendance"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <Attendance />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/leave"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <LeaveList />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* ADMIN ONBOARDING */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <OnboardingForm />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/exit"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <ExitFormality />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* ============ ADMIN PAYROLL ============ */}
            <Route
              path="/payrolll/process"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AdminProcessPayroll />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/payrolll/approvals"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AdminPayrollApprovals />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/payrolll/release"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AdminSalaryRelease />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/payrolll/reports"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AdminPayrollReports />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/payrolll/salarystructure"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AdminSalaryStructure />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* ================= ASSET MANAGEMENT ================= */}
            <Route
              path="/assets/master"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AssetMaster />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/assets/assign"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AssignAsset />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/assets/return"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <ReturnAsset />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/assets/maintenance"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <MaintenanceSchedule />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/assets/disposal"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AssetDisposal />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* ============ EXPENSE & FINANCE ============ */}
            <Route
              path="/expense"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <AdminExpenseFinance />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* ============ ESS PORTAL ============ */}
            <Route
              path="/ess-portal"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <MainLayout>
                    <EssPortal />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* ============ HR PORTAL ============ */}
            <Route
              path="/hr"
              element={
                <ProtectedRoute allowedRoles={["HR"]}>
                  <HRLayout />
                </ProtectedRoute>
              }
            >
              {/* ADDED: Necessary index redirect so /hr shows Dashboard by default */}
              <Route index element={<Navigate to="dashboard" replace />} />
              
              <Route path="dashboard" element={<HRDashboard />} />
              <Route path="employees" element={<EmployeeListHR />} />
              <Route path="leave" element={<LeaveDashboard />} />
              <Route path="attendance" element={<AttendanceHR />} />
              <Route path="onboarding" element={<OnboardingForm />} />
              <Route path="exit" element={<ExitRequests />} />
              <Route path="tasks" element={<TaskManagement />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="reports" element={<Reports />} />
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="ess-portal" element={<HrEssPortal />} /> 

              {/* PAYROLL MODULE REPLICATION FOR HR PORTAL */}
              <Route path="payroll/process" element={<AdminProcessPayroll />} />
              <Route path="payroll/approvals" element={<AdminPayrollApprovals />} />
              <Route path="payroll/release" element={<AdminSalaryRelease />} />
              <Route path="payroll/reports" element={<AdminPayrollReports />} />
              <Route path="payroll/salarystructure" element={<AdminSalaryStructure />} />
            </Route>

            {/* ============ EMPLOYEE PORTAL ============ */}
            <Route
              path="/employee"
              element={
                <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                  <EmployeeMainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="attendance" element={<EmployeeAttendance />} />
              <Route path="leave" element={<EmployeeLeave />} />
              <Route path="payroll" element={<EmployeePayroll />} />
              <Route path="profile" element={<EmployeeProfile />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;