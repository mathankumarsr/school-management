import React, { useState } from 'react';
import { Search, Calendar, User, DollarSign, Clock, FileText, GraduationCap, BookOpen } from 'lucide-react';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  position: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  religion: string;
  address: string;
  joiningDate: string;
  email: string;
  phone: string;
  emergencyContact: string;
}

interface SalaryDetails {
  fixedSalary: number;
  variablePay: number;
  pf: number;
  esi: number;
  totalSalary: number;
}

const EmployeeProfile1: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');

  const employee: Employee = {
    id: 'EMP001',
    firstName: 'John',
    lastName: 'Smith',
    employeeId: 'EMP001',
    department: 'Computer Science',
    position: 'Senior Developer',
    dateOfBirth: '15-05-1985',
    gender: 'Male',
    bloodGroup: 'A+',
    religion: 'Christian',
    address: '123 Main St, City',
    joiningDate: '01-01-2020',
    email: 'john.smith@company.com',
    phone: '+1 234 567 8900',
    emergencyContact: '+1 234 567 8901'
  };

  const salaryDetails: SalaryDetails = {
    fixedSalary: 50000,
    variablePay: 10000,
    pf: 6000,
    esi: 750,
    totalSalary: 60000
  };

  const tabs = [
    { id: 'general', label: 'General Info', icon: User },
    { id: 'salary', label: 'Salary', icon: DollarSign },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'class', label: 'Class', icon: GraduationCap },
    { id: 'timetable', label: 'Timetable', icon: BookOpen }
  ];

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const renderGeneralInfo = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
          <input
            type="text"
            value={employee.firstName}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
          <input
            type="text"
            value={employee.lastName}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
          <div className="relative">
            <input
              type="text"
              value={employee.dateOfBirth}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value={employee.gender}>{employee.gender}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Blood Group</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value={employee.bloodGroup}>{employee.bloodGroup}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Religion</label>
          <input
            type="text"
            value={employee.religion}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
          <input
            type="email"
            value={employee.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
          <input
            type="text"
            value={employee.phone}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Emergency Contact</label>
          <input
            type="text"
            value={employee.emergencyContact}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
      </div>
    </div>
  );

  const renderSalary = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Salary Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3">Earnings</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-green-700">Fixed Salary:</span>
              <span className="font-semibold text-green-800">₹{salaryDetails.fixedSalary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Variable Pay:</span>
              <span className="font-semibold text-green-800">₹{salaryDetails.variablePay.toLocaleString()}</span>
            </div>
            <div className="border-t border-green-300 pt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-green-800">Total Earnings:</span>
                <span className="font-bold text-green-800">₹{salaryDetails.totalSalary.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="font-semibold text-red-800 mb-3">Deductions</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-red-700">PF Contribution:</span>
              <span className="font-semibold text-red-800">₹{salaryDetails.pf.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">ESI Contribution:</span>
              <span className="font-semibold text-red-800">₹{salaryDetails.esi.toLocaleString()}</span>
            </div>
            <div className="border-t border-red-300 pt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-red-800">Total Deductions:</span>
                <span className="font-bold text-red-800">₹{(salaryDetails.pf + salaryDetails.esi).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-blue-800">Net Salary:</span>
            <span className="text-2xl font-bold text-blue-800">
              ₹{(salaryDetails.totalSalary - salaryDetails.pf - salaryDetails.esi).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaceholderContent = (title: string, description: string) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="text-center py-12">
        <div className="text-gray-400 text-5xl mb-4">📄</div>
        <p className="text-gray-600">{description}</p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Add {title}
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralInfo();
      case 'salary':
        return renderSalary();
      case 'attendance':
        return renderPlaceholderContent('Attendance Records', 'No attendance records found. Add attendance data to get started.');
      case 'documents':
        return renderPlaceholderContent('Documents', 'No documents uploaded. Upload employee documents here.');
      case 'class':
        return renderPlaceholderContent('Class Information', 'No class assignments found. Assign classes to this employee.');
      case 'timetable':
        return renderPlaceholderContent('Timetable', 'No timetable configured. Set up the employee timetable.');
      default:
        return renderGeneralInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search by Employee ID, Name, or Department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Employee Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {getInitials(employee.firstName, employee.lastName)}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {employee.firstName} {employee.lastName}
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Department:</span>
                  <span className="text-sm font-medium text-blue-600">{employee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Employee ID:</span>
                  <span className="text-sm font-medium text-gray-900">{employee.employeeId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Position:</span>
                  <span className="text-sm font-medium text-gray-900">{employee.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Joining Date:</span>
                  <span className="text-sm font-medium text-gray-900">{employee.joiningDate}</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-sm text-gray-600">Address:</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">{employee.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
              <div className="flex border-b min-w-full">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile1;