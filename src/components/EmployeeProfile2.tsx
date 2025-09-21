import React, { useState } from 'react';
import { User, DollarSign, Calendar, FileText, Users, Clock } from 'lucide-react';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  designation: string;
  department: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  religion: string;
  nationality: string;
  motherTongue: string;
  address: string;
  phone: string;
  email: string;
  joiningDate: string;
  salary: {
    basic: number;
    allowances: number;
    deductions: number;
    netSalary: number;
  };
}

const EmployeeProfile2: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('general');
  
  const [employee] = useState<Employee>({
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    employeeId: 'EMP001',
    designation: 'Senior Teacher',
    department: 'Mathematics',
    dateOfBirth: '15-05-1985',
    gender: 'Male',
    bloodGroup: 'A+',
    religion: 'Christian',
    nationality: 'American',
    motherTongue: 'English',
    address: '123 Main St, City',
    phone: '+1 234 567 8900',
    email: 'john.smith@school.edu',
    joiningDate: '01-06-2020',
    salary: {
      basic: 50000,
      allowances: 10000,
      deductions: 5000,
      netSalary: 55000
    }
  });

  const tabs = [
    { id: 'general', label: 'General Info', icon: User },
    { id: 'salary', label: 'Salary', icon: DollarSign },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'class', label: 'Class', icon: Users },
    { id: 'timetable', label: 'Timetable', icon: Clock }
  ];

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const renderGeneralInfo = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b-2 border-blue-500 pb-2 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">General Information</h2>
      </div>
      
      <div className="space-y-8">
        <h3 className="text-lg font-medium text-blue-500 mb-6">Personal Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={employee.firstName}
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={employee.lastName}
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <div className="relative">
              <input
                type="text"
                value={employee.dateOfBirth}
                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="relative">
              <select className="w-full p-3 border border-gray-300 rounded-md bg-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" disabled>
                <option value={employee.gender}>{employee.gender}</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
            <div className="relative">
              <select className="w-full p-3 border border-gray-300 rounded-md bg-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" disabled>
                <option value={employee.bloodGroup}>{employee.bloodGroup}</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Religion</label>
            <input
              type="text"
              value={employee.religion}
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
            <input
              type="text"
              value={employee.nationality}
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mother Tongue</label>
            <input
              type="text"
              value={employee.motherTongue}
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSalary = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-blue-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Salary Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600 mb-2">Basic Salary</h3>
          <p className="text-2xl font-bold text-blue-800">${employee.salary.basic.toLocaleString()}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-600 mb-2">Allowances</h3>
          <p className="text-2xl font-bold text-green-800">${employee.salary.allowances.toLocaleString()}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-600 mb-2">Deductions</h3>
          <p className="text-2xl font-bold text-red-800">${employee.salary.deductions.toLocaleString()}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600 mb-2">Net Salary</h3>
          <p className="text-2xl font-bold text-purple-800">${employee.salary.netSalary.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Salary Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Basic Salary</span>
            <span className="font-medium">${employee.salary.basic.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>House Rent Allowance</span>
            <span className="font-medium">${(employee.salary.allowances * 0.6).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Transport Allowance</span>
            <span className="font-medium">${(employee.salary.allowances * 0.4).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Tax Deduction</span>
            <span className="font-medium">-${employee.salary.deductions.toLocaleString()}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Net Salary</span>
            <span>${employee.salary.netSalary.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-blue-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Attendance Records</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-green-600 mb-2">Present Days</h3>
          <p className="text-3xl font-bold text-green-800">22</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-red-600 mb-2">Absent Days</h3>
          <p className="text-3xl font-bold text-red-800">2</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-yellow-600 mb-2">Leave Days</h3>
          <p className="text-3xl font-bold text-yellow-800">1</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-3 text-left">Date</th>
              <th className="border border-gray-300 p-3 text-left">Status</th>
              <th className="border border-gray-300 p-3 text-left">Check In</th>
              <th className="border border-gray-300 p-3 text-left">Check Out</th>
              <th className="border border-gray-300 p-3 text-left">Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3">{new Date(2024, 8, i + 1).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    i === 2 ? 'bg-red-100 text-red-800' : 
                    i === 5 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {i === 2 ? 'Absent' : i === 5 ? 'Leave' : 'Present'}
                  </span>
                </td>
                <td className="border border-gray-300 p-3">{i === 2 ? '-' : '09:00 AM'}</td>
                <td className="border border-gray-300 p-3">{i === 2 ? '-' : '05:00 PM'}</td>
                <td className="border border-gray-300 p-3">{i === 2 ? '-' : '8.0 hrs'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-blue-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Employee Documents</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Resume.pdf', type: 'PDF', size: '2.3 MB', date: '2024-01-15' },
          { name: 'ID_Proof.pdf', type: 'PDF', size: '1.8 MB', date: '2024-01-15' },
          { name: 'Address_Proof.pdf', type: 'PDF', size: '1.2 MB', date: '2024-01-15' },
          { name: 'Educational_Certificate.pdf', type: 'PDF', size: '3.1 MB', date: '2024-01-15' },
          { name: 'Experience_Letter.pdf', type: 'PDF', size: '890 KB', date: '2024-01-15' },
          { name: 'Medical_Certificate.pdf', type: 'PDF', size: '1.5 MB', date: '2024-01-15' }
        ].map((doc, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-2">
              <FileText className="w-8 h-8 text-red-500 mr-3" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 truncate">{doc.name}</h3>
                <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-3">Uploaded: {doc.date}</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderClass = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-blue-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Assigned Classes</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { class: '10th Grade', section: 'A', subject: 'Mathematics', students: 35 },
          { class: '10th Grade', section: 'B', subject: 'Mathematics', students: 32 },
          { class: '9th Grade', section: 'A', subject: 'Mathematics', students: 38 },
          { class: '11th Grade', section: 'A', subject: 'Advanced Mathematics', students: 28 },
        ].map((classInfo, index) => (
          <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 text-lg mb-2">
              {classInfo.class} - Section {classInfo.section}
            </h3>
            <p className="text-blue-600 mb-2">Subject: {classInfo.subject}</p>
            <div className="flex items-center text-blue-600">
              <Users className="w-4 h-4 mr-1" />
              <span>{classInfo.students} Students</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTimetable = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="border-b border-blue-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Weekly Timetable</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-3">Time</th>
              <th className="border border-gray-300 p-3">Monday</th>
              <th className="border border-gray-300 p-3">Tuesday</th>
              <th className="border border-gray-300 p-3">Wednesday</th>
              <th className="border border-gray-300 p-3">Thursday</th>
              <th className="border border-gray-300 p-3">Friday</th>
            </tr>
          </thead>
          <tbody>
            {[
              { time: '09:00 - 10:00', periods: ['10A Math', '10B Math', 'Free', '9A Math', '11A Math'] },
              { time: '10:00 - 11:00', periods: ['Free', '9A Math', '10A Math', '10B Math', 'Free'] },
              { time: '11:00 - 12:00', periods: ['11A Math', 'Free', '10B Math', 'Free', '10A Math'] },
              { time: '12:00 - 01:00', periods: ['Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break', 'Lunch Break'] },
              { time: '01:00 - 02:00', periods: ['9A Math', '11A Math', 'Free', '10A Math', '10B Math'] },
              { time: '02:00 - 03:00', periods: ['Free', '10A Math', '11A Math', '9A Math', 'Free'] },
            ].map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3 font-medium bg-blue-50">{row.time}</td>
                {row.periods.map((period, i) => (
                  <td key={i} className={`border border-gray-300 p-3 text-center ${
                    period === 'Free' ? 'text-gray-500 bg-gray-50' :
                    period === 'Lunch Break' ? 'text-orange-600 bg-orange-50' :
                    'text-blue-600 bg-blue-50'
                  }`}>
                    {period}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralInfo();
      case 'salary': return renderSalary();
      case 'attendance': return renderAttendance();
      case 'documents': return renderDocuments();
      case 'class': return renderClass();
      case 'timetable': return renderTimetable();
      default: return renderGeneralInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Employee Profile</h1>
          <p className="text-gray-600">Manage employee information and records</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Employee Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {getInitials(employee.firstName, employee.lastName)}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {employee.firstName} {employee.lastName}
                </h2>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Standard:</span>
                  <span className="font-semibold text-blue-500">{employee.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Roll No:</span>
                  <span className="font-semibold text-blue-500">{employee.employeeId.replace('EMP', '2024')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Student ID:</span>
                  <span className="font-semibold text-blue-500">{employee.employeeId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Section:</span>
                  <span className="font-semibold text-blue-500">A</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Address:</span>
                    <span className="font-semibold text-blue-500 text-right max-w-40">{employee.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Navigation Tabs */}
            <div className="bg-gray-100 rounded-lg shadow-sm mb-6 p-1">
              <div className="flex flex-wrap gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all rounded-lg ${
                        activeTab === tab.id
                          ? 'text-white bg-blue-500 shadow-md'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile2;