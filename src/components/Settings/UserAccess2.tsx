import React, { useState } from 'react';
import { Home, Users, BookOpen, GraduationCap, Calendar, FileText, Settings, CreditCard, Bell, Eye, EyeOff, Save, ArrowLeft, User, Plus, Edit, Trash2 } from 'lucide-react';

interface UserPermission {
  module: string;
  icon: React.ReactNode;
  enabled: boolean;
  subPermissions?: {
    name: string;
    enabled: boolean;
  }[];
}

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  mobileNo: string;
  mailId: string;
  role: string;
  username: string;
  password: string;
  clinicName: string;
  registrationNo: string;
  notes: string;
  moduleAccess: string[];
  permissions: UserPermission[];
}

const UserAccess: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'moduleAccess' | 'permissions'>('moduleAccess');
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState<UserData[]>([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      mobileNo: '9876543210',
      mailId: 'john.doe@school.edu',
      role: 'Admin',
      username: 'john_admin',
      password: 'admin123',
      clinicName: 'Greenwood High School',
      registrationNo: 'REG001',
      notes: 'System Administrator with full access',
      moduleAccess: ['Greenwood High School', 'Branch Office'],
              permissions: [
        {
          module: 'Home',
          icon: <Home size={16} />,
          enabled: true,
          subPermissions: [
            { name: 'Dashboard View', enabled: true },
            { name: 'Analytics', enabled: true }
          ]
        },
        {
          module: 'Student Management',
          icon: <Users size={16} />,
          enabled: true,
          subPermissions: [
            { name: 'View Students', enabled: true },
            { name: 'Add Student', enabled: true },
            { name: 'Edit Student', enabled: true },
            { name: 'Delete Student', enabled: false }
          ]
        },
        {
          module: 'Academics',
          icon: <BookOpen size={16} />,
          enabled: true,
          subPermissions: [
            { name: 'View Timetable', enabled: true },
            { name: 'Create Timetable', enabled: true },
            { name: 'View Syllabus', enabled: true },
            { name: 'Manage Syllabus', enabled: true },
            { name: 'View Teachers', enabled: true },
            { name: 'Assign Teachers', enabled: true }
          ]
        },
        {
          module: 'Admissions',
          icon: <GraduationCap size={16} />,
          enabled: true,
          subPermissions: [
            { name: 'View Applications', enabled: true },
            { name: 'Edit Applications', enabled: true }
          ]
        },
        {
          module: 'Attendance',
          icon: <Calendar size={16} />,
          enabled: true,
          subPermissions: [
            { name: 'View Attendance', enabled: true },
            { name: 'Edit Attendance', enabled: true }
          ]
        },
        {
          module: 'Fee Management',
          icon: <CreditCard size={16} />,
          enabled: true,
          subPermissions: [
            { name: 'View Fee Structure', enabled: true },
            { name: 'Create Fee Structure', enabled: true },
            { name: 'View Fee Collection', enabled: true },
            { name: 'Collect Fees', enabled: true },
            { name: 'View Receipts', enabled: true },
            { name: 'Generate Receipts', enabled: true },
            { name: 'View Fee Reports', enabled: true },
            { name: 'Edit Fee Reports', enabled: true }
          ]
        },
        {
          module: 'Reports',
          icon: <FileText size={16} />,
          enabled: true,
          subPermissions: [
            { name: 'View Reports', enabled: true },
            { name: 'Edit Reports', enabled: true }
          ]
        },
        {
          module: 'Notifications',
          icon: <Bell size={16} />,
          enabled: false,
          subPermissions: [
            { name: 'View Notifications', enabled: false },
            { name: 'Edit Notifications', enabled: false }
          ]
        },
        {
          module: 'Settings',
          icon: <Settings size={16} />,
          enabled: true,
          subPermissions: [
            { name: 'View Settings', enabled: true },
            { name: 'Edit Settings', enabled: true }
          ]
        }
      ]
    }
  ]);

  const [currentUser, setCurrentUser] = useState<UserData>(users[0]);
  const [isEditing, setIsEditing] = useState(false);

  const roles = ['Admin', 'Principal', 'Teacher', 'Accountant', 'Librarian', 'Receptionist'];
  const moduleAccessOptions = ['Greenwood High School', 'Branch Office', 'Primary Section', 'Secondary Section'];

  const handleInputChange = (field: keyof UserData, value: string) => {
    setCurrentUser(prev => ({ ...prev, [field]: value }));
  };

  const handleModuleAccessChange = (module: string) => {
    setCurrentUser(prev => ({
      ...prev,
      moduleAccess: prev.moduleAccess.includes(module)
        ? prev.moduleAccess.filter(m => m !== module)
        : [...prev.moduleAccess, module]
    }));
  };

  const handlePermissionToggle = (moduleIndex: number, subPermissionIndex?: number) => {
    setCurrentUser(prev => ({
      ...prev,
      permissions: prev.permissions.map((perm, index) => {
        if (index === moduleIndex) {
          if (subPermissionIndex !== undefined && perm.subPermissions) {
            return {
              ...perm,
              subPermissions: perm.subPermissions.map((subPerm, subIndex) =>
                subIndex === subPermissionIndex
                  ? { ...subPerm, enabled: !subPerm.enabled }
                  : subPerm
              )
            };
          } else {
            return { ...perm, enabled: !perm.enabled };
          }
        }
        return perm;
      })
    }));
  };

  const handleSave = () => {
    setUsers(prev => prev.map(user => user.id === currentUser.id ? currentUser : user));
    setIsEditing(false);
    alert('User details saved successfully!');
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    handleInputChange('password', password);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-blue-200">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold">User Access</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="font-medium">Greenwood High School</div>
              <div className="text-sm text-blue-100">Main Campus</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 text-blue-600 bg-blue-50 rounded-lg">
                <Home size={18} />
                <span className="font-medium">Home</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Users size={18} />
                <span>Student Management</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <BookOpen size={18} />
                <span>Academics</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <GraduationCap size={18} />
                <span>Admissions</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <CreditCard size={18} />
                <span>Fee Management</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <FileText size={18} />
                <span>Reports</span>
              </div>
              <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Settings size={18} />
                <span>Settings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - User Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">User Details:</h3>
                
                {/* User Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                      <User size={48} className="text-white" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <div className="text-gray-900">{currentUser.firstName} {currentUser.lastName}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reg.No</label>
                    <div className="text-gray-900">{currentUser.registrationNo}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter Notes</label>
                    <textarea
                      value={currentUser.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Enter notes about the user..."
                    />
                  </div>
                </div>

                {/* Personal Details */}
                <div className="mt-8">
                  <h4 className="font-medium text-gray-800 mb-4">Personal Details:</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={currentUser.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={currentUser.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile No <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={currentUser.mobileNo}
                          onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mail ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={currentUser.mailId}
                          onChange={(e) => handleInputChange('mailId', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select
                        value={currentUser.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="mt-8">
                  <h4 className="font-medium text-gray-800 mb-4">Account Details:</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Username <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={currentUser.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={currentUser.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button
                        onClick={generatePassword}
                        className="text-blue-500 text-sm hover:text-blue-600"
                      >
                        Generate Password
                      </button>
                      <button className="text-blue-500 text-sm hover:text-blue-600">
                        Password Reset
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                      <select
                        value={currentUser.clinicName}
                        onChange={(e) => handleInputChange('clinicName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="Greenwood High School">Greenwood High School</option>
                        <option value="Riverside Academy">Riverside Academy</option>
                        <option value="Sunrise International">Sunrise International</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Module Access Checkboxes */}
                <div className="mt-8">
                  <h4 className="font-medium text-gray-800 mb-4">Module Access:</h4>
                  <div className="space-y-3">
                    {moduleAccessOptions.map(option => (
                      <label key={option} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={currentUser.moduleAccess.includes(option)}
                          onChange={() => handleModuleAccessChange(option)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Permissions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex space-x-8 mb-6">
                  <button
                    onClick={() => setActiveTab('moduleAccess')}
                    className={`pb-2 border-b-2 font-medium ${
                      activeTab === 'moduleAccess'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Module Access
                  </button>
                  <button
                    onClick={() => setActiveTab('permissions')}
                    className={`pb-2 border-b-2 font-medium ${
                      activeTab === 'permissions'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Permissions
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Module</label>
                  <select className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="Greenwood High School">Greenwood High School</option>
                    <option value="Branch Office">Branch Office</option>
                  </select>
                </div>

                {activeTab === 'moduleAccess' && (
                  <div className="space-y-4">
                    {currentUser.permissions.map((permission, index) => (
                      <div key={permission.module} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={permission.enabled}
                                onChange={() => handlePermissionToggle(index)}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <div className="flex items-center space-x-2">
                                {permission.icon}
                                <span className="font-medium text-gray-800">{permission.module}</span>
                              </div>
                            </label>
                          </div>
                          <div className="text-gray-400 cursor-pointer hover:text-gray-600">
                            ✕
                          </div>
                        </div>

                        {permission.subPermissions && permission.enabled && (
                          <div className="mt-4 pl-8 space-y-2">
                            {permission.subPermissions.map((subPerm, subIndex) => (
                              <label key={subIndex} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={subPerm.enabled}
                                  onChange={() => handlePermissionToggle(index, subIndex)}
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-700">{subPerm.name}</span>
                                <div className="text-gray-400 cursor-pointer hover:text-gray-600 ml-auto">
                                  ✕
                                </div>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'permissions' && (
                  <div className="space-y-4">
                    <p className="text-gray-600">Detailed permissions configuration will be displayed here. You can set specific permissions for each module and sub-module.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Read Permissions</h4>
                        <p className="text-sm text-gray-600">Configure read access for various modules</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Write Permissions</h4>
                        <p className="text-sm text-gray-600">Configure write access for various modules</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Delete Permissions</h4>
                        <p className="text-sm text-gray-600">Configure delete access for various modules</p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Admin Permissions</h4>
                        <p className="text-sm text-gray-600">Configure administrative access</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex justify-between">
                  <button className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-600 text-white px-6 py-4 mt-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>📧 www.schoolmanager.edu</span>
            <span>v-2.1.0</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Call us: 9876543210, 9876543211</span>
            <button className="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors">
              📞 Support Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccess;