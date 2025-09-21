import React, { useState } from 'react';
import { Users, UserCheck, Award, Filter, Plus, Edit, Trash2, Printer, MoreHorizontal, X, Search, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types and Interfaces
interface Student {
  id: string;
  name: string;
  profileImage?: string;
  standard: string;
  rollNumber: string;
  admissionNumber: string;
  gender: 'male' | 'female';
  dateOfBirth: string;
  age: number;
  community: string;
  religion: string;
  area: string;
  address: string;
  transport: 'bus' | 'auto' | 'cycle' | 'van' | 'none';
  busRoute?: string;
  hostel: boolean;
  studentType: 'regular' | 'leader' | 'topper' | 'weak';
  extracurricular: string[];
  attendancePercentage: number;
  feeStatus: 'paid' | 'unpaid' | 'partial';
  classTeacher: string;
  parent: {
    name: string;
    phoneNumber: string;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface StudentStats {
  totalStudents: number;
  totalBoys: number;
  totalGirls: number;
  totalLeaders: number;
}

interface FilterCriteria {
  toppers?: boolean;
  weakStudents?: boolean;
  gender?: string;
  community?: string;
  religion?: string;
  dateOfBirth?: string;
  feePaidStudents?: boolean;
  feeUnpaidStudents?: boolean;
  age?: string;
  extracurricular?: string;
  area?: string;
  transport?: string;
  transportMethods?: string[];
  hostel?: boolean;
  busRoute?: string;
  classTeachers?: string;
  studentType?: string;
  attendancePercentage?: string;
}

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Arjun Kumar',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    standard: '10th',
    rollNumber: '001',
    admissionNumber: 'ADM001',
    gender: 'male',
    dateOfBirth: '2008-05-15',
    age: 15,
    community: 'General',
    religion: 'Hindu',
    area: 'Coimbatore',
    address: '123 Main St, Coimbatore',
    transport: 'bus',
    busRoute: 'Route A',
    hostel: false,
    studentType: 'topper',
    extracurricular: ['Cricket', 'Debate'],
    attendancePercentage: 95,
    feeStatus: 'paid',
    classTeacher: 'Mrs. Priya',
    parent: {
      name: 'Raj Kumar',
      phoneNumber: '+91 98765 43210',
      address: '123 Main St, Coimbatore'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    standard: '9th',
    rollNumber: '002',
    admissionNumber: 'ADM002',
    gender: 'female',
    dateOfBirth: '2009-08-22',
    age: 14,
    community: 'OBC',
    religion: 'Hindu',
    area: 'Coimbatore',
    address: '456 Oak Ave, Coimbatore',
    transport: 'auto',
    hostel: true,
    studentType: 'leader',
    extracurricular: ['Dance', 'Art'],
    attendancePercentage: 92,
    feeStatus: 'paid',
    classTeacher: 'Mr. Ravi',
    parent: {
      name: 'Suresh Sharma',
      phoneNumber: '+91 98765 43211',
      address: '456 Oak Ave, Coimbatore'
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  }
];

const mockStats: StudentStats = {
  totalStudents: 1250,
  totalBoys: 680,
  totalGirls: 570,
  totalLeaders: 45
};

// Main Component
const Students: React.FC = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [stats] = useState<StudentStats>(mockStats);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [filters, setFilters] = useState<FilterCriteria>({});
  const navigate = useNavigate()
  // Class options from LKG to 12th
  const classOptions = [
    'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', 
    '7th', '8th', '9th', '10th', '11th', '12th'
  ];

  const sectionOptions = ['A', 'B', 'C', 'D', 'E'];
  const groupOptions = ['Science', 'Commerce', 'Arts', 'Vocational'];

  // Stats Cards Component
  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Girls</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalGirls}</p>
          </div>
          <div className="p-3 bg-pink-100 rounded-full">
            <Users className="w-6 h-6 text-pink-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Boys</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalBoys}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Leaders</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalLeaders}</p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-full">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );

  // Controls Row Component
  const ControlsRow = () => (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => navigate("/admission/new")}>
          <Plus className="w-4 h-4" />
          Create Admission
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Class</option>
            {classOptions.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          
          <select 
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Section</option>
            {sectionOptions.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
          
          <select 
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Group</option>
            {groupOptions.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
      </div>
      
      <button 
        onClick={() => setIsFilterOpen(true)}
        className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <Filter className="w-4 h-4" />
        Filter
      </button>
    </div>
  );

  // Filter Drawer Component
  const FilterDrawer = () => {
    const [localFilters, setLocalFilters] = useState<FilterCriteria>(filters);
    const [transportMethods, setTransportMethods] = useState<string[]>([]);

    const handleTransportMethodChange = (method: string, checked: boolean) => {
      if (checked) {
        setTransportMethods(prev => [...prev, method]);
      } else {
        setTransportMethods(prev => prev.filter(m => m !== method));
      }
    };

    const handleClear = () => {
      setLocalFilters({});
      setTransportMethods([]);
    };

    const handleSearch = () => {
      setFilters({ ...localFilters, transportMethods });
      setIsFilterOpen(false);
    };

    if (!isFilterOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
        <div className="ml-auto w-full max-w-md bg-white h-full overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Filter Students</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Row 1 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Toppers</label>
                  <select 
                    value={localFilters.toppers ? 'yes' : 'no'}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, toppers: e.target.value === 'yes' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select 
                    value={localFilters.gender || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                  <select 
                    value={localFilters.religion || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, religion: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee Paid Students</label>
                  <select 
                    value={localFilters.feePaidStudents ? 'yes' : 'no'}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, feePaidStudents: e.target.value === 'yes' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="yes">Paid</option>
                    <option value="no">Unpaid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Extracurricular</label>
                  <input 
                    type="text"
                    value={localFilters.extracurricular || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, extracurricular: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter activity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transport</label>
                  <select 
                    value={localFilters.transport || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, transport: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="bus">Bus</option>
                    <option value="auto">Auto</option>
                    <option value="cycle">Cycle</option>
                    <option value="van">Van</option>
                    <option value="none">None</option>
                  </select>
                  
                  <div className="mt-2 space-y-2">
                    <label className="text-xs font-medium text-gray-600">Transport Methods:</label>
                    {['Bus', 'Auto', 'Cycle', 'Van'].map(method => (
                      <label key={method} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={transportMethods.includes(method.toLowerCase())}
                          onChange={(e) => handleTransportMethodChange(method.toLowerCase(), e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bus Route</label>
                  <input 
                    type="text"
                    value={localFilters.busRoute || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, busRoute: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter route"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Type</label>
                  <select 
                    value={localFilters.studentType || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, studentType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="regular">Regular</option>
                    <option value="leader">Leader</option>
                    <option value="topper">Topper</option>
                    <option value="weak">Weak</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weak Students</label>
                  <select 
                    value={localFilters.weakStudents ? 'yes' : 'no'}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, weakStudents: e.target.value === 'yes' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Community</label>
                  <select 
                    value={localFilters.community || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, community: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input 
                    type="date"
                    value={localFilters.dateOfBirth || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fee Unpaid Students</label>
                  <select 
                    value={localFilters.feeUnpaidStudents ? 'yes' : 'no'}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, feeUnpaidStudents: e.target.value === 'yes' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="yes">Unpaid</option>
                    <option value="no">Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <input 
                    type="text"
                    value={localFilters.area || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, area: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
                  <select 
                    value={localFilters.hostel ? 'yes' : 'no'}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, hostel: e.target.value === 'yes' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Teachers</label>
                  <input 
                    type="text"
                    value={localFilters.classTeachers || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, classTeachers: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter teacher name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attendance Percentage</label>
                  <input 
                    type="text"
                    value={localFilters.attendancePercentage || ''}
                    onChange={(e) => setLocalFilters(prev => ({ ...prev, attendancePercentage: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 90, >85, <70"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t mt-6">
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Clear
              </button>
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Student Table Component
  const StudentTable = () => {
    const handleEdit = (studentId: string) => {
      console.log('Edit student:', studentId);
    };

    const handleDelete = (studentId: string) => {
      if (window.confirm('Are you sure you want to delete this student?')) {
        console.log('Delete student:', studentId);
      }
    };

    const handlePrint = (studentId: string) => {
      console.log('Print student details:', studentId);
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Standard
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('profile')}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={student.profileImage || `https://ui-avatars.com/api/?name=${student.name}&background=random`}
                          alt={student.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.standard}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.admissionNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{student.parent.name}</div>
                      <div className="text-gray-500">{student.parent.phoneNumber}</div>
                      <div className="text-gray-400 text-xs">{student.parent.address}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.studentType === 'topper' 
                        ? 'bg-green-100 text-green-800'
                        : student.studentType === 'leader'
                        ? 'bg-blue-100 text-blue-800'
                        : student.studentType === 'weak'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.studentType.charAt(0).toUpperCase() + student.studentType.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(student.id)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrint(student.id)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Print"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        title="More options"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">

        <StatsCards />
        <ControlsRow />
        <StudentTable />
      </div>
      
      {/* Filter Drawer - Rendered outside main content to overlay properly */}
      <FilterDrawer />
    </div>
  );
};

export default Students;