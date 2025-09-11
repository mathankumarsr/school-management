import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Admission from "./components/Admission";
import Billing from "./components/Billing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingsPage from "./components/Settings";
import Students from "./components/Students";
import StudentProfile from "./components/StudentProfile";
import SettingHome from "./components/Settings/SettingHome";

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
          <Route path="settingHome" element={<SettingHome />} />
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
