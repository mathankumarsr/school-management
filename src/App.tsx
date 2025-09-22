import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Admission from "./components/Admission";
import Billing from "./components/Billing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Students from "./components/Students";
import StudentProfile from "./components/StudentProfile";
import SettingHome from "./components/Settings/SettingHome";
import EmployeeConfig from "./components/Settings/EmployeeConfig";
import SchoolConfig from "./components/Settings/SchoolConfig";
import SettingClass from "./components/Settings/ClassConfig.tsx";
import SubjectConfig from "./components/Settings/SubjectConfig";
import ReferralConfig from "./components/Settings/ReferralConfig";
import MessageConfig from "./components/Settings/MessageConfig";
import UserAccess from "./components/Settings/UserAccess";
import FeesConfig from "./components/Settings/FeesConfig";
import ClassroomConfig from "./components/Settings/ClassroomConfig";
import AddNewAdmission from "./components/AddNewAdmission";
import LayoutConfig from "./components/LayoutConfig.tsx";
import Employees from "./components/Employees";
import EmployeeProfile1 from "./components/EmployeeProfile1.tsx";
import EmployeeProfile2 from "./components/EmployeeProfile2.tsx";

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
          <Route path="admission/new" element={<AddNewAdmission />} />
          <Route path="fees" element={<Billing />} />
          <Route path="students" element={<Students />} />
          <Route path="students/profile" element={<StudentProfile />} />
          <Route path="settings" element={<SettingHome />} />
          <Route path="settings/school-config" element={<SchoolConfig />} />
          <Route path="settings/class-config" element={<SettingClass />} />
          <Route path="settings/employee-config" element={<EmployeeConfig />} />
          <Route path="settings/fees-config" element={<FeesConfig />} />
          <Route path="settings/subject-config" element={<SubjectConfig />} />
          <Route path="settings/referral-config" element={<ReferralConfig />} />
          <Route path="settings/classroom-config" element={<ClassroomConfig />} />
          <Route path="settings/message-config" element={<MessageConfig />} />
          <Route path="settings/user-details" element={<UserAccess from={"userDetails"}/>} />
          <Route path="settings/module-access" element={<UserAccess from={"moduleAccess"}/>} />
          <Route path="settings/screen-access" element={<UserAccess from={"screenAccess"} />} />
          <Route path="settings/layout-config" element={<LayoutConfig />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employee-profile1" element={<EmployeeProfile1 />} />
          <Route path="employee-profile2" element={<EmployeeProfile2 />} />
          
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
