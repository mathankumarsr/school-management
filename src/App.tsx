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
import SubjectConfig from "./components/Settings/SubjectConfig";
import ReferralConfig from "./components/Settings/ReferralConfig";
import ClassroomConfig from "./components/Settings/ClassRoomCongif";
import MessageConfig from "./components/Settings/MessageConfig";
import UserAccess from "./components/Settings/UserAccess";

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
          {/* <Route path="settings" element={<SettingsPage />} /> */}
          <Route path="students" element={<Students />} />
          <Route path="students/profile" element={<StudentProfile />} />
          <Route path="settings" element={<SettingHome />} />
          <Route path="settings/school-config" element={<SchoolConfig />} />
          {/* <Route path="class-config" element={<ClassConfig />} /> */}
                    <Route path="settings/class-config" element={<SettingClass />} />
          <Route path="settings/employee-config" element={<EmployeeConfig />} />
          <Route path="settings/fees-config" element={<FeesConfig />} />
          <Route path="settings/subject-config" element={<SubjectConfig />} />
          <Route path="settings/referral-config" element={<ReferralConfig />} />
          <Route path="settings/classroom-config" element={<ClassroomConfig />} />
          <Route path="settings/message-config" element={<MessageConfig />} />
          <Route path="settings/user-config" element={<UserAccess />} />
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
