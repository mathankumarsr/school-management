import React, { useState } from 'react';
import {
    Settings, School, Users, GraduationCap, DollarSign,
    Calendar, BookOpen, Award, Activity, FileText,
    Bell, Shield, Palette, Globe, Database, Mail,
    ArrowLeftIcon,
    MoveLeft
} from 'lucide-react';
import SchoolConfig from './SchoolConfig';
import ClassConfig from './ClassConfig/ClassConfig';
import { useNavigate } from 'react-router-dom';
import { AdmissionConfigList, SchoolConfigList, UserConfigList } from '../../utils/constant';
import { useSelector } from 'react-redux';

const SettingsTabs = () => {
    const [activeTab, setActiveTab] = useState('school-config');
    const navigate = useNavigate()
    const { selectedSettingSection } = useSelector((state: any) => state.settings);
    const tabsList = selectedSettingSection === "admissionConfig" ? AdmissionConfigList : selectedSettingSection === "userConfig" ? UserConfigList : SchoolConfigList
    console.log(selectedSettingSection,"sele")
    const settingsTabs = [
        {
            id: 'school-config',
            label: 'School Configuration',
            icon: School,
            pathname: "/settings/school-config"
        },
        {
            id: 'classes',
            label: 'Classes & Sections',
            icon: Users,
            pathname: "/settings/class-config"
        },
        {
            id: 'employees',
            label: 'Employees',
            icon: Users,
            pathname: "/settings/employee-config"
        },
        {
            id: 'admission',
            label: 'Admission',
            icon: GraduationCap,
            pathname: "/settings/employee-config"
        },
        {
            id: 'fees',
            label: 'Fees',
            icon: DollarSign,
            pathname: "/settings/employee-config"
        },
        {
            id: 'students',
            label: 'Students',
            icon: Users,
            pathname: "/settings/employee-config"
        },
        {
            id: 'exams',
            label: 'Exams',
            icon: FileText,
            pathname: "/settings/employee-config"
        },
        {
            id: 'timetable',
            label: 'Time Table',
            icon: Calendar,
            description: 'Schedule and timetable configurations'
        },
        {
            id: 'syllabus',
            label: 'Syllabus',
            icon: BookOpen,
            description: 'Curriculum and syllabus management'
        },
        {
            id: 'certificates',
            label: 'Certificates',
            icon: Award,
            description: 'Certificate templates and settings'
        },
        {
            id: 'activities',
            label: 'Activities',
            icon: Activity,
            description: 'Extracurricular activities configuration'
        },
        {
            id: 'reports',
            label: 'Reports',
            icon: FileText,
            description: 'Report generation and template settings'
        },
        {
            id: 'notifications',
            label: 'Notifications',
            icon: Bell,
            description: 'Notification and communication settings'
        },
        {
            id: 'security',
            label: 'Security',
            icon: Shield,
            description: 'Security and access control settings'
        }
    ];

    const renderTabContent = () => {
        const currentTab = settingsTabs.find(tab => tab.id === activeTab);
        const IconComponent = currentTab?.icon || Settings;

        switch (activeTab) {
            case 'school-config':
                return (
                    <SchoolConfig />
                );

            case 'classes':
                return (
                    <ClassConfig />
                );

            case 'admission':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Admission Settings</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Admission Start Date</label>
                                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Admission End Date</label>
                                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Fee</label>
                                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter application fee" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Required Documents</h3>
                                <div className="space-y-2">
                                    {['Birth Certificate', 'Previous School Records', 'Medical Records', 'Photo ID'].map((doc, index) => (
                                        <label key={index} className="flex items-center space-x-2">
                                            <input type="checkbox" className="rounded" defaultChecked />
                                            <span className="text-sm">{doc}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'fees':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Fee Structure</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                Add Fee Type
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        { type: 'Tuition Fee', amount: '$500', dueDate: '1st of every month' },
                                        { type: 'Laboratory Fee', amount: '$100', dueDate: 'Start of semester' },
                                        { type: 'Library Fee', amount: '$50', dueDate: 'Start of semester' }
                                    ].map((fee, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{fee.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{fee.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{fee.dueDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                                                <button className="text-red-600 hover:text-red-800">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'students':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Student Profile Settings</h3>
                                <div className="space-y-2">
                                    {['Student ID Format', 'Profile Photo Required', 'Emergency Contact Required', 'Medical Info Required'].map((setting, index) => (
                                        <label key={index} className="flex items-center space-x-2">
                                            <input type="checkbox" className="rounded" defaultChecked={index < 2} />
                                            <span className="text-sm">{setting}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Enrollment Settings</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Students per Class</label>
                                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter maximum capacity" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Age Criteria</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Strict Age Requirements</option>
                                        <option>Flexible Age Requirements</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'employees':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Employee Categories</h3>
                                <div className="space-y-2">
                                    {['Teaching Staff', 'Administrative Staff', 'Support Staff', 'Management'].map((category, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                                            <span className="text-sm">{category}</span>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm">Configure</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Working Hours</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">School Start Time</label>
                                    <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">School End Time</label>
                                    <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                                            <label key={index} className="flex items-center space-x-1">
                                                <input type="checkbox" className="rounded" defaultChecked={index < 5} />
                                                <span className="text-sm">{day}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'exams':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Grading System</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Grading Type</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Letter Grades (A, B, C, D, F)</option>
                                        <option>Percentage (0-100%)</option>
                                        <option>Points (0-100)</option>
                                        <option>Pass/Fail</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Passing Grade</label>
                                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., C or 60%" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Exam Types</h3>
                                <div className="space-y-2">
                                    {['Mid-term Exam', 'Final Exam', 'Quiz', 'Assignment', 'Project'].map((type, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                                            <span className="text-sm">{type}</span>
                                            <input type="number" className="w-16 px-2 py-1 border rounded text-sm" placeholder="%" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <IconComponent className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{currentTab?.label} Settings</h3>
                        <p className="text-gray-500 max-w-md">
                            {currentTab?.description || 'Configure settings for this module to customize how it works in your school management system.'}
                        </p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Configure Settings
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="sticky top-0">
            <div className="">
                <div className="bg-white rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col">
                        <div className="border-b border-gray-200 flex items-center px-4">
                            <MoveLeft className='w-6 h-6 cursor-pointer' onClick={() => navigate("/settings")}/>
                            <nav className="flex space-x-6 overflow-x-auto scrollbar-hide px-4">
                                {tabsList.map((tab) => {
                                    const IconComponent = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => navigate(tab.pathname)}
                                            className={`flex whitespace-nowrap cursor-pointer items-center space-x-2 py-3 text-sm font-medium transition-colors border-b-2 ${window.location.pathname === tab.pathname
                                                ? 'border-blue-600 text-blue-600'
                                                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                                }`}
                                        >
                                            <IconComponent className="w-4 h-4" />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTabs;