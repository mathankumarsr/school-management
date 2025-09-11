import React, { useState } from 'react';
import { Settings, Building2, GraduationCap, Users, Book, UserPlus, MapPin, FileText, Award, Activity, Calendar, MessageSquare, DollarSign, Shield, User, Globe, ChevronRight, Save, X, Home } from 'lucide-react';

type ModalType = 'school-config' | 'teacher-config' | 'class-config' | 'subject-config' | 'referral-config' | 'classroom-config' | 'exam-config' | 'certificates-config' | 'activities-config' | 'attendance-config' | 'message-config' | 'fees-config' | 'admission-config' | 'staff-config' | 'security-config' | 'api-config';

interface ConfigCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  onClick: () => void;
}

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
}

const SettingHome = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const ConfigCard: React.FC<ConfigCardProps> = ({ icon: Icon, title, onClick }) => (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 min-h-[140px] flex flex-col items-center justify-center text-center"
    >
      <div className="bg-gray-100 p-4 rounded-lg mb-3">
        <Icon className="w-8 h-8 text-gray-600" />
      </div>
      <h3 className="text-sm font-medium text-gray-800 leading-tight">{title}</h3>
    </div>
  );

  const Modal: React.FC<ModalProps> = ({ title, children }) => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={closeModal}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button 
              onClick={closeModal}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-2xl border-t">
          <div className="flex justify-end space-x-3">
            <button 
              onClick={closeModal}
              className="px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FormField: React.FC<FormFieldProps> = ({ label, type = "text", placeholder = "", options = [] }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {type === "select" ? (
        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Select {label}</option>
          {options.map((option: string, index: number) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
          placeholder={placeholder}
        />
      ) : (
        <input 
          type={type}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  const renderModalContent = () => {
    switch(activeModal) {
      case 'school-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="School Name" placeholder="Enter school name" />
            <FormField label="School Code" placeholder="Enter school code" />
            <FormField label="Address" type="textarea" placeholder="Enter complete address" />
            <FormField label="Phone Number" type="tel" placeholder="Enter phone number" />
            <FormField label="Email Address" type="email" placeholder="Enter email" />
            <FormField label="Website" type="url" placeholder="Enter website URL" />
            <FormField label="Academic Year" type="select" options={["2024-2025", "2025-2026", "2026-2027"]} />
            <FormField label="School Type" type="select" options={["Public", "Private", "Charter", "International"]} />
          </div>
        );

      case 'teacher-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Teacher ID Format" placeholder="e.g., TCH-001" />
            <FormField label="Qualification Required" type="select" options={["Bachelor's", "Master's", "PhD", "Diploma"]} />
            <FormField label="Experience Required" type="select" options={["0-2 years", "2-5 years", "5+ years", "No requirement"]} />
            <FormField label="Department" type="select" options={["Mathematics", "Science", "English", "Social Studies", "Arts"]} />
            <FormField label="Maximum Classes Per Day" type="number" placeholder="e.g., 6" />
            <FormField label="Working Hours" placeholder="e.g., 8:00 AM - 4:00 PM" />
            <FormField label="Leave Policy" type="textarea" placeholder="Define leave policy" />
            <FormField label="Evaluation Frequency" type="select" options={["Monthly", "Quarterly", "Annually"]} />
          </div>
        );

      case 'class-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Class Name" placeholder="e.g., Grade 1, Class 10" />
            <FormField label="Section" type="select" options={["A", "B", "C", "D", "E"]} />
            <FormField label="Maximum Students" type="number" placeholder="e.g., 40" />
            <FormField label="Class Teacher" type="select" options={["John Doe", "Jane Smith", "Mike Johnson"]} />
            <FormField label="Academic Stream" type="select" options={["Science", "Commerce", "Arts", "General"]} />
            <FormField label="Medium of Instruction" type="select" options={["English", "Hindi", "Regional Language"]} />
            <FormField label="Class Duration" placeholder="e.g., 45 minutes" />
            <FormField label="Room Assignment" placeholder="e.g., Room 101" />
          </div>
        );

      case 'subject-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Subject Name" placeholder="e.g., Mathematics" />
            <FormField label="Subject Code" placeholder="e.g., MATH101" />
            <FormField label="Subject Type" type="select" options={["Core", "Elective", "Optional", "Extra-curricular"]} />
            <FormField label="Credits" type="number" placeholder="e.g., 4" />
            <FormField label="Assigned Teacher" type="select" options={["Dr. Smith", "Prof. Johnson", "Ms. Davis"]} />
            <FormField label="Class Schedule" type="select" options={["Daily", "Alternate Days", "Weekly"]} />
            <FormField label="Practical Hours" type="number" placeholder="Hours per week" />
            <FormField label="Theory Hours" type="number" placeholder="Hours per week" />
          </div>
        );

      case 'referral-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Referral Program Name" placeholder="Enter program name" />
            <FormField label="Referral Reward Type" type="select" options={["Fee Discount", "Cash Reward", "Scholarship", "Gift Voucher"]} />
            <FormField label="Reward Amount" type="number" placeholder="Enter reward amount" />
            <FormField label="Minimum Referrals" type="number" placeholder="Minimum referrals required" />
            <FormField label="Program Duration" type="select" options={["Academic Year", "6 Months", "1 Year", "Ongoing"]} />
            <FormField label="Eligibility Criteria" type="textarea" placeholder="Define eligibility criteria" />
            <FormField label="Terms and Conditions" type="textarea" placeholder="Enter terms and conditions" />
            <FormField label="Program Status" type="select" options={["Active", "Inactive", "Draft"]} />
          </div>
        );

      case 'classroom-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Classroom Number" placeholder="e.g., Room 101" />
            <FormField label="Classroom Type" type="select" options={["Regular Classroom", "Science Lab", "Computer Lab", "Library", "Auditorium"]} />
            <FormField label="Capacity" type="number" placeholder="Maximum students" />
            <FormField label="Floor" type="select" options={["Ground Floor", "First Floor", "Second Floor", "Third Floor"]} />
            <FormField label="Building" type="select" options={["Main Building", "Science Block", "Arts Block", "Sports Complex"]} />
            <FormField label="Equipment Available" type="textarea" placeholder="List available equipment" />
            <FormField label="Maintenance Schedule" type="select" options={["Daily", "Weekly", "Monthly"]} />
            <FormField label="Availability Status" type="select" options={["Available", "Occupied", "Under Maintenance"]} />
          </div>
        );

      case 'exam-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Exam Name" placeholder="e.g., Mid-term Exam" />
            <FormField label="Exam Type" type="select" options={["Unit Test", "Mid-term", "Final", "Annual", "Board Exam"]} />
            <FormField label="Start Date" type="date" />
            <FormField label="End Date" type="date" />
            <FormField label="Total Marks" type="number" placeholder="e.g., 100" />
            <FormField label="Passing Marks" type="number" placeholder="e.g., 40" />
            <FormField label="Grade System" type="select" options={["A+ to F", "Percentage", "CGPA", "Pass/Fail"]} />
            <FormField label="Result Publication Date" type="date" />
          </div>
        );

      case 'certificates-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Certificate Type" type="select" options={["Academic Achievement", "Sports", "Cultural", "Participation", "Merit"]} />
            <FormField label="Certificate Name" placeholder="e.g., Excellence in Mathematics" />
            <FormField label="Template Design" type="select" options={["Modern", "Classic", "Elegant", "Colorful"]} />
            <FormField label="Issuing Authority" placeholder="e.g., School Principal" />
            <FormField label="Validity Period" type="select" options={["Lifetime", "Academic Year", "5 Years"]} />
            <FormField label="Digital Signature" type="select" options={["Enabled", "Disabled"]} />
            <FormField label="Verification Code" type="select" options={["Auto-generate", "Manual", "QR Code"]} />
            <FormField label="Certificate Status" type="select" options={["Active", "Draft", "Archived"]} />
          </div>
        );

      case 'activities-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Activity Name" placeholder="e.g., Science Fair" />
            <FormField label="Activity Type" type="select" options={["Academic", "Sports", "Cultural", "Social Service", "Field Trip"]} />
            <FormField label="Duration" placeholder="e.g., 2 hours" />
            <FormField label="Venue" placeholder="e.g., School Auditorium" />
            <FormField label="Coordinator" type="select" options={["Teacher 1", "Teacher 2", "External Expert"]} />
            <FormField label="Maximum Participants" type="number" placeholder="e.g., 50" />
            <FormField label="Registration Fee" type="number" placeholder="Amount (if applicable)" />
            <FormField label="Activity Status" type="select" options={["Upcoming", "Ongoing", "Completed", "Cancelled"]} />
          </div>
        );

      case 'attendance-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Attendance Method" type="select" options={["Manual", "Biometric", "RFID", "Mobile App", "QR Code"]} />
            <FormField label="Minimum Attendance %" type="number" placeholder="e.g., 75" />
            <FormField label="Grace Period" type="number" placeholder="Minutes" />
            <FormField label="Late Arrival Action" type="select" options={["Mark Late", "Mark Absent", "Half Day"]} />
            <FormField label="Report Generation" type="select" options={["Daily", "Weekly", "Monthly", "Custom"]} />
            <FormField label="Parent Notification" type="select" options={["Immediate SMS", "Daily Summary", "Weekly Report"]} />
            <FormField label="Holiday Calendar" type="select" options={["Academic Calendar", "Government Holidays", "Custom"]} />
            <FormField label="Leave Types" type="textarea" placeholder="Sick Leave, Casual Leave, etc." />
          </div>
        );

      case 'message-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Messaging Platform" type="select" options={["Internal System", "SMS Gateway", "Email", "WhatsApp", "All"]} />
            <FormField label="Auto-reply" type="select" options={["Enabled", "Disabled"]} />
            <FormField label="Message Priority" type="select" options={["High, Medium, Low", "Urgent, Normal", "Emergency, Regular"]} />
            <FormField label="File Attachment Limit" type="number" placeholder="MB" />
            <FormField label="Message Retention" type="select" options={["30 days", "90 days", "Academic Year", "Permanent"]} />
            <FormField label="Broadcast Permissions" type="select" options={["Admin Only", "Teachers", "All Staff"]} />
            <FormField label="Parent Communication" type="select" options={["Enabled", "Restricted", "Disabled"]} />
            <FormField label="Emergency Alerts" type="select" options={["Enabled", "Admin Only", "Disabled"]} />
          </div>
        );

      case 'fees-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Fee Structure Name" placeholder="e.g., Annual Fees 2024-25" />
            <FormField label="Tuition Fee" type="number" placeholder="Amount" />
            <FormField label="Development Fee" type="number" placeholder="Amount" />
            <FormField label="Transport Fee" type="number" placeholder="Amount" />
            <FormField label="Library Fee" type="number" placeholder="Amount" />
            <FormField label="Sports Fee" type="number" placeholder="Amount" />
            <FormField label="Late Fee Penalty" type="number" placeholder="Penalty amount" />
            <FormField label="Payment Due Date" type="date" />
            <FormField label="Payment Methods" type="select" options={["Online", "Cash", "Bank Transfer", "Cheque", "All"]} />
          </div>
        );

      case 'admission-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Admission Session" type="select" options={["2024-2025", "2025-2026", "2026-2027"]} />
            <FormField label="Application Start Date" type="date" />
            <FormField label="Application End Date" type="date" />
            <FormField label="Admission Fee" type="number" placeholder="Amount" />
            <FormField label="Age Criteria" placeholder="e.g., 5-6 years for Grade 1" />
            <FormField label="Required Documents" type="textarea" placeholder="Birth Certificate, Previous School Records, etc." />
            <FormField label="Entrance Test Required" type="select" options={["Yes", "No", "For certain grades"]} />
            <FormField label="Interview Required" type="select" options={["Yes", "No", "Parent Interview Only"]} />
          </div>
        );

      case 'staff-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Staff Category" type="select" options={["Teaching", "Administrative", "Support", "Technical", "Security"]} />
            <FormField label="Employee ID Format" placeholder="e.g., EMP-001" />
            <FormField label="Designation" placeholder="e.g., Principal, Vice Principal, Teacher" />
            <FormField label="Department" type="select" options={["Administration", "Academics", "Finance", "HR", "Maintenance"]} />
            <FormField label="Salary Structure" type="select" options={["Monthly", "Per Hour", "Contract Based"]} />
            <FormField label="Working Days" type="select" options={["Monday-Friday", "Monday-Saturday", "Custom Schedule"]} />
            <FormField label="Reporting Manager" type="select" options={["Principal", "Vice Principal", "HOD", "Admin Manager"]} />
            <FormField label="Probation Period" placeholder="e.g., 6 months" />
          </div>
        );

      case 'security-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Password Policy" type="select" options={["Strong (12+ chars)", "Medium (8+ chars)", "Basic (6+ chars)"]} />
            <FormField label="Session Timeout" type="select" options={["15 minutes", "30 minutes", "1 hour", "2 hours"]} />
            <FormField label="Two-Factor Authentication" type="select" options={["Required", "Optional", "Disabled"]} />
            <FormField label="Data Backup Frequency" type="select" options={["Daily", "Weekly", "Monthly"]} />
            <FormField label="User Access Levels" type="select" options={["Admin", "Teacher", "Staff", "Student", "Parent"]} />
            <FormField label="Login Attempt Limit" type="number" placeholder="e.g., 3 attempts" />
            <FormField label="Data Retention Policy" type="textarea" placeholder="Define data retention rules" />
            <FormField label="Privacy Settings" type="textarea" placeholder="Define privacy policies" />
          </div>
        );

      case 'api-config':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="API Base URL" placeholder="https://api.schoolmanagement.com" />
            <FormField label="API Version" type="select" options={["v1", "v2", "v3"]} />
            <FormField label="Authentication Type" type="select" options={["JWT Token", "OAuth 2.0", "API Key", "Basic Auth"]} />
            <FormField label="Rate Limiting" type="select" options={["100/hour", "1000/hour", "10000/hour", "Unlimited"]} />
            <FormField label="Response Format" type="select" options={["JSON", "XML", "Both"]} />
            <FormField label="Webhook URL" placeholder="https://your-system.com/webhook" />
            <FormField label="SSL Certificate" type="select" options={["Required", "Optional", "Not Required"]} />
            <FormField label="API Documentation URL" placeholder="https://docs.schoolapi.com" />
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Configuration details will be displayed here.</p>
          </div>
        );
    }
  };

  const formatModalTitle = (modalType: ModalType | null): string => {
    if (!modalType) return '';
    return modalType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-white" />
              <h1 className="text-xl font-semibold text-white">School Management Settings</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-400 bg-opacity-30 px-4 py-2 rounded-lg">
                <div className="text-white text-sm font-medium">Greenwood Academy</div>
                <div className="text-blue-100 text-xs">Administrator</div>
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex">
        <div className="w-16 bg-white border-r border-gray-200 min-h-screen">
          <div className="flex flex-col items-center py-4 space-y-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="w-5 h-5 text-blue-600" />
            </div>
            <div className="p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="p-2 rounded-lg">
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <div className="p-2 bg-blue-600 rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div className="p-2 rounded-lg">
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 py-8">
          {/* School Configuration Section */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">School Configuration</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <ConfigCard
                icon={Building2}
                title="School Configuration"
                onClick={() => openModal('school-config')}
              />
              <ConfigCard
                icon={GraduationCap}
                title="Teacher Configuration"
                onClick={() => openModal('teacher-config')}
              />
              <ConfigCard
                icon={Users}
                title="Class Configuration"
                onClick={() => openModal('class-config')}
              />
              <ConfigCard
                icon={Book}
                title="Subject Configuration"
                onClick={() => openModal('subject-config')}
              />
              <ConfigCard
                icon={UserPlus}
                title="Referral Configuration"
                onClick={() => openModal('referral-config')}
              />
              <ConfigCard
                icon={MapPin}
                title="Classroom Configuration"
                onClick={() => openModal('classroom-config')}
              />
              <ConfigCard
                icon={FileText}
                title="Exam Configuration"
                onClick={() => openModal('exam-config')}
              />
              <ConfigCard
                icon={Award}
                title="Certificates Configuration"
                onClick={() => openModal('certificates-config')}
              />
              <ConfigCard
                icon={Activity}
                title="Activities Configuration"
                onClick={() => openModal('activities-config')}
              />
              <ConfigCard
                icon={Calendar}
                title="Attendance Configuration"
                onClick={() => openModal('attendance-config')}
              />
              <ConfigCard
                icon={MessageSquare}
                title="Message Configuration"
                onClick={() => openModal('message-config')}
              />
            </div>
          </section>

          {/* Fees and Admission Configuration */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Fees and Admission Configuration</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <ConfigCard
                icon={DollarSign}
                title="Fees Configuration"
                onClick={() => openModal('fees-config')}
              />
              <ConfigCard
                icon={UserPlus}
                title="Admission Configuration"
                onClick={() => openModal('admission-config')}
              />
            </div>
          </section>

          {/* Employee Configuration */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Employee Configuration</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <ConfigCard
                icon={Users}
                title="Staff Configuration"
                onClick={() => openModal('staff-config')}
              />
            </div>
          </section>

          {/* Security and Privacy Configuration */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Security and Privacy Configuration</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <ConfigCard
                icon={Shield}
                title="Security Configuration"
                onClick={() => openModal('security-config')}
              />
              <ConfigCard
                icon={Globe}
                title="API Configuration"
                onClick={() => openModal('api-config')}
              />
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-500 text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span>www.schoolmanagement.com</span>
            <span>v-2.1.4</span>
            <span>Support: support@schoolmanagement.com</span>
          </div>
          <div>
            Technical Support
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <Modal title={formatModalTitle(activeModal)}>
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
};

export default SettingHome;