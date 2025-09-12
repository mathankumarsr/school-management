import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Admission from "./components/Admission";
import Billing from "./components/Billing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingsPage from "./components/Settings/SettingsTabs";
import Students from "./components/Students";
import StudentProfile from "./components/StudentProfile";
import SettingHome from "./components/Settings/SettingHome";
import SettingsTabs from "./components/Settings/SettingsTabs";
import EmployeeConfig from "./components/Settings/EmployeeConfig";
import SchoolConfig from "./components/Settings/SchoolConfig";
import ClassConfig from "./components/Settings/ClassConfig/ClassConfig";
import SettingClass from "./components/Settings/SettingClass";
import FeesConfig from "./components/Settings/Feesconfig";

function App() {
  return (
    <>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <Layout />
            // </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="admission" element={<Admission />} />
          <Route path="fees" element={<Billing />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="students" element={<Students />} />
          <Route path="students/profile" element={<StudentProfile />} />
          <Route path="settings-home" element={<SettingHome />} />
          <Route path="school-config" element={<SchoolConfig />} />
          <Route path="class-config" element={<ClassConfig />} />
          <Route path="employee-config" element={<EmployeeConfig />} />
          <Route path="setting-class" element={<SettingClass />} />
          <Route path="fees-config" element={<FeesConfig />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored" // can be "light", "dark", or "colored"
      />
    </>
  );
}

export default App;
