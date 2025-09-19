import React, { useState } from 'react';
import { Users, Settings, BookOpen, GraduationCap, DollarSign, Calendar, FileText, BarChart, Bell, Shield, Eye, Edit, Plus, Save, X } from 'lucide-react';

const UserAccess = () => {
  const [activeTab, setActiveTab] = useState('moduleAccess');
  const [selectedModule, setSelectedModule] = useState('');
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    role: 'Teacher',
    username: '',
    password: '',
    school: 'Rajesh International School',
    notes: ''
  });

  const [moduleAccess, setModuleAccess] = useState({
    'Student Management': { view: true, edit: false },
    'Teacher Management': { view: true, edit: true },
    'Academic Management': { view: true, edit: false },
    'Fee Management': { view: false, edit: false },
    'Attendance': { view: true, edit: true },
    'Examination': { view: true, edit: false },
    'Library Management': { view: false, edit: false },
    'Transport': { view: true, edit: false },
    'Reports': { view: true, edit: false },
    'Communication': { view: true, edit: true },
    'Inventory': { view: false, edit: false },
    'HR Management': { view: false, edit: false }
  });

  const modules = [
    { name: 'Student Management', icon: GraduationCap, screens: ['Student List', 'Student Profile', 'Admission', 'Student Documents', 'Student History'] },
    { name: 'Teacher Management', icon: Users, screens: ['Teacher List', 'Teacher Profile', 'Staff Directory', 'Teacher Schedule', 'Performance'] },
    { name: 'Academic Management', icon: BookOpen, screens: ['Class Management', 'Subject Management', 'Curriculum', 'Lesson Plans', 'Academic Calendar'] },
    { name: 'Fee Management', icon: DollarSign, screens: ['Fee Structure', 'Fee Collection', 'Payment History', 'Fee Reports', 'Outstanding Dues'] },
    { name: 'Attendance', icon: Calendar, screens: ['Daily Attendance', 'Attendance Reports', 'Leave Management', 'Attendance Analytics'] },
    { name: 'Examination', icon: FileText, screens: ['Exam Schedule', 'Grade Management', 'Result Generation', 'Report Cards', 'Exam Analytics'] },
    { name: 'Library Management', icon: BookOpen, screens: ['Book Inventory', 'Issue/Return', 'Member Management', 'Fine Management', 'Library Reports'] },
    { name: 'Transport', icon: Calendar, screens: ['Route Management', 'Vehicle Management', 'Driver Management', 'Student Transport', 'Transport Fee'] },
    { name: 'Reports', icon: BarChart, screens: ['Academic Reports', 'Financial Reports', 'Attendance Reports', 'Custom Reports', 'Analytics Dashboard'] },
    { name: 'Communication', icon: Bell, screens: ['Announcements', 'SMS Gateway', 'Email Management', 'Parent Communication', 'Notice Board'] },
    { name: 'Inventory', icon: Settings, screens: ['Asset Management', 'Stock Management', 'Purchase Orders', 'Supplier Management', 'Maintenance'] },
    { name: 'HR Management', icon: Shield, screens: ['Staff Records', 'Payroll', 'Leave Management', 'Performance Review', 'Staff Reports'] }
  ];

  const roles = ['Principal', 'Vice Principal', 'Teacher', 'Admin Staff', 'Accountant', 'Librarian', 'Transport Manager', 'Student', 'Parent'];

  const handleModuleAccessChange = (moduleName, accessType) => {
    setModuleAccess(prev => ({
      ...prev,
      [moduleName]: {
        ...prev[moduleName],
        [accessType]: !prev[moduleName][accessType]
      }
    }));
  };

  const handleInputChange = (field, value) => {
    setUserForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving user:', userForm);
    console.log('Module access:', moduleAccess);
    alert('User access settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm">
              
              {/* Navigation Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('userDetails')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === 'userDetails'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    User Details
                  </button>
                  <button
                    onClick={() => setActiveTab('moduleAccess')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === 'moduleAccess'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Module Access
                  </button>
                  <button
                    onClick={() => setActiveTab('permissions')}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === 'permissions'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Screen Permissions
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* User Details Tab */}
                {activeTab === 'userDetails' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Form */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                            <input
                              type="text"
                              value={userForm.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                            <input
                              type="text"
                              value={userForm.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile No *</label>
                            <input
                              type="tel"
                              value={userForm.mobile}
                              onChange={(e) => handleInputChange('mobile', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email ID *</label>
                            <input
                              type="email"
                              value={userForm.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                          <select
                            value={userForm.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {roles.map(role => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                            <input
                              type="text"
                              value={userForm.username}
                              onChange={(e) => handleInputChange('username', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                            <div className="relative">
                              <input
                                type="password"
                                value={userForm.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button className="absolute right-3 top-2 text-blue-600 text-sm hover:underline">
                                Generate
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                          <select
                            value={userForm.school}
                            onChange={(e) => handleInputChange('school', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>Rajesh International School</option>
                            <option>St. Mary's High School</option>
                            <option>Delhi Public School</option>
                          </select>
                        </div>
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                          <textarea
                            rows="3"
                            value={userForm.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter additional notes about the user..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    {/* User Avatar */}
                    <div className="lg:col-span-1">
                      <div className="text-center">
                        <div className="relative inline-block">
                          <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <Users className="w-16 h-16 text-blue-600" />
                          </div>
                          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">Upload Profile Picture</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Module Access Tab */}
                {activeTab === 'moduleAccess' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Module Access Control</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {modules.map((module) => {
                        const IconComponent = module.icon;
                        return (
                          <div key={module.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-3">
                              <IconComponent className="w-6 h-6 text-blue-600 mr-3" />
                              <h4 className="font-medium text-gray-900">{module.name}</h4>
                            </div>
                            <div className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={moduleAccess[module.name]?.view || false}
                                  onChange={() => handleModuleAccessChange(module.name, 'view')}
                                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <Eye className="w-4 h-4 mr-1 text-gray-500" />
                                <span className="text-sm">View Access</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={moduleAccess[module.name]?.edit || false}
                                  onChange={() => handleModuleAccessChange(module.name, 'edit')}
                                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <Edit className="w-4 h-4 mr-1 text-gray-500" />
                                <span className="text-sm">Edit Access</span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Screen Permissions Tab */}
                {activeTab === 'permissions' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Screen-Level Permissions</h3>
                      <select
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Module</option>
                        {modules.map(module => (
                          <option key={module.name} value={module.name}>{module.name}</option>
                        ))}
                      </select>
                    </div>

                    {selectedModule ? (
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-4">
                          {selectedModule} - Screen Permissions
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {modules.find(m => m.name === selectedModule)?.screens.map(screen => (
                            <div key={screen} className="bg-white p-4 rounded border border-gray-200">
                              <h5 className="font-medium text-gray-800 mb-2">{screen}</h5>
                              <div className="flex space-x-4">
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <Eye className="w-4 h-4 mr-1 text-gray-500" />
                                  <span className="text-sm">View</span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <Edit className="w-4 h-4 mr-1 text-gray-500" />
                                  <span className="text-sm">Edit</span>
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Select a module to configure screen-level permissions</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save User Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-600 text-white p-4 text-center">
        <div className="flex justify-center items-center space-x-8 text-sm">
          <span>📧 www.schoolmanagement.com</span>
          <span>v-4.2.1</span>
          <span>📞 Call us: 7397757434, 9500468385</span>
          <span>💬 Customer Support</span>
        </div>
      </div>
    </div>
  );
};

export default UserAccess;