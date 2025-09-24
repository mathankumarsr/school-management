import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Filter, 
  Edit2, 
  Trash2, 
  Printer, 
  MoreHorizontal, 
  X,
  Users,
  UserCheck,
  UserX,
  ChevronDown
} from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  salary: number;
  standard: string;
  attendance: number;
  staffId: string;
  address: string;
  bloodGroup: string;
  mobile: string;
  email: string;
  experience: string;
  subject: string;
  gender: 'Male' | 'Female';
  age: number;
  location: string;
  status: 'Active' | 'Inactive';
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'John Smith',
      category: 'Teaching Staff',
      subCategory: 'Teacher',
      salary: 45000,
      standard: '10th',
      attendance: 95,
      staffId: 'EMP001',
      address: '123 Main St, City',
      bloodGroup: 'A+',
      mobile: '9876543210',
      email: 'john@school.com',
      experience: '3-5',
      subject: 'Mathematics',
      gender: 'Male',
      age: 32,
      location: 'Chennai',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      category: 'Teaching Staff',
      subCategory: 'Teacher',
      salary: 42000,
      standard: '8th',
      attendance: 92,
      staffId: 'EMP002',
      address: '456 Oak Ave, City',
      bloodGroup: 'B+',
      mobile: '9876543211',
      email: 'sarah@school.com',
      experience: '1-3',
      subject: 'English',
      gender: 'Female',
      age: 28,
      location: 'Mumbai',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      category: 'Non Teaching Staff',
      subCategory: 'Driver',
      salary: 25000,
      standard: '-',
      attendance: 88,
      staffId: 'EMP003',
      address: '789 Pine St, City',
      bloodGroup: 'O+',
      mobile: '9876543212',
      email: 'mike@school.com',
      experience: '5-10',
      subject: '-',
      gender: 'Male',
      age: 45,
      location: 'Delhi',
      status: 'Active'
    }
  ]);

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Filter states
  const [filters, setFilters] = useState({
    experience: '',
    name: '',
    subject: '',
    age: '',
    gender: '',
    salary: '',
    location: '',
    status: ''
  });

  // Dropdown states
  const [dropdowns, setDropdowns] = useState({
    subject: false,
    class: false,
    category: false,
    section: false,
    group: false,
    teaching: false,
    nonTeaching: false
  });

  const subjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Physics', 'Chemistry', 'Biology'];
  const classes = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const sections = ['A', 'B', 'C', 'D'];
  const groups = ['Science', 'Commerce', 'Arts'];
  const experienceRanges = ['0-1', '1-3', '3-5', '5-10', '10+'];
  const locations = ['Chennai', 'Mumbai', 'Delhi', 'Bangalore', 'Kolkata'];
  const nonTeachingStaff = ['Driver', 'Librarian', 'House Keeping', 'Admin', 'Security', 'Accountant'];

  useEffect(() => {
    applyFilters();
  }, [filters, employees]);

  const applyFilters = () => {
    let filtered = employees.filter(emp => {
      return (
        (!filters.experience || emp.experience === filters.experience) &&
        (!filters.name || emp.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.subject || emp.subject === filters.subject) &&
        (!filters.age || emp.age.toString() === filters.age) &&
        (!filters.gender || emp.gender === filters.gender) &&
        (!filters.salary || emp.salary.toString().includes(filters.salary)) &&
        (!filters.location || emp.location === filters.location) &&
        (!filters.status || emp.status === filters.status)
      );
    });
    setFilteredEmployees(filtered);
  };

  const clearFilters = () => {
    setFilters({
      experience: '',
      name: '',
      subject: '',
      age: '',
      gender: '',
      salary: '',
      location: '',
      status: ''
    });
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    console.log(editingEmployee,"editingEmployee")
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handlePrint = (employee: Employee) => {
    // Print functionality
    console.log('Printing employee:', employee.name);
  };

  const toggleDropdown = (dropdown: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const totalEmployees = employees.length;
  const maleEmployees = employees.filter(emp => emp.gender === 'Male').length;
  const femaleEmployees = employees.filter(emp => emp.gender === 'Female').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900">{totalEmployees}</p>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Male Employees</p>
              <p className="text-3xl font-bold text-gray-900">{maleEmployees}</p>
            </div>
            <UserCheck className="w-10 h-10 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Female Employees</p>
              <p className="text-3xl font-bold text-gray-900">{femaleEmployees}</p>
            </div>
            <UserX className="w-10 h-10 text-pink-500" />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <Plus className="w-4 h-4" />
              Create Teacher
            </button>

            {/* Dropdowns */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('subject')}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Subject <ChevronDown className="w-4 h-4" />
              </button>
              {dropdowns.subject && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {subjects.map(subject => (
                    <div key={subject} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {subject}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => toggleDropdown('class')}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Class <ChevronDown className="w-4 h-4" />
              </button>
              {dropdowns.class && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {classes.map(cls => (
                    <div key={cls} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {cls}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => toggleDropdown('category')}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Category <ChevronDown className="w-4 h-4" />
              </button>
              {dropdowns.category && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="relative">
                    <button 
                      onClick={() => toggleDropdown('teaching')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                    >
                      Teaching Staff <ChevronDown className="w-4 h-4" />
                    </button>
                    {dropdowns.teaching && (
                      <div className="absolute left-full top-0 ml-1 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Teacher</div>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => toggleDropdown('nonTeaching')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                    >
                      Non Teaching Staff <ChevronDown className="w-4 h-4" />
                    </button>
                    {dropdowns.nonTeaching && (
                      <div className="absolute left-full top-0 ml-1 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                        {nonTeachingStaff.map(staff => (
                          <div key={staff} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {staff}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => toggleDropdown('section')}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Section <ChevronDown className="w-4 h-4" />
              </button>
              {dropdowns.section && (
                <div className="absolute z-10 mt-1 w-32 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {sections.map(section => (
                    <div key={section} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {section}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => toggleDropdown('group')}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Group <ChevronDown className="w-4 h-4" />
              </button>
              {dropdowns.group && (
                <div className="absolute z-10 mt-1 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {groups.map(group => (
                    <div key={group} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {group}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filter Icon - Right Corner */}
          <button 
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 ml-auto"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee, index) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{employee.salary.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.standard}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.attendance}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.staffId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">{employee.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.bloodGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.experience} years</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEdit(employee)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handlePrint(employee)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
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

      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsFilterDrawerOpen(false)}></div>
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          onClick={() => setIsFilterDrawerOpen(false)}
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Experience</label>
                        <select 
                          value={filters.experience} 
                          onChange={(e) => setFilters({...filters, experience: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="">All</option>
                          {experienceRanges.map(range => (
                            <option key={range} value={range}>{range} years</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Name</label>
                        <input 
                          type="text" 
                          value={filters.name}
                          onChange={(e) => setFilters({...filters, name: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="Enter name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Subject</label>
                        <select 
                          value={filters.subject} 
                          onChange={(e) => setFilters({...filters, subject: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="">All</option>
                          {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Age</label>
                        <input 
                          type="number" 
                          value={filters.age}
                          onChange={(e) => setFilters({...filters, age: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="Enter age"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Gender</label>
                        <select 
                          value={filters.gender} 
                          onChange={(e) => setFilters({...filters, gender: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="">All</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Salary</label>
                        <input 
                          type="number" 
                          value={filters.salary}
                          onChange={(e) => setFilters({...filters, salary: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="Enter salary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
                        <select 
                          value={filters.location} 
                          onChange={(e) => setFilters({...filters, location: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="">All</option>
                          {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
                        <select 
                          value={filters.status} 
                          onChange={(e) => setFilters({...filters, status: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="">All</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 px-4 py-4 flex justify-between border-t border-gray-200">
                    <button 
                      onClick={clearFilters}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Clear
                    </button>
                    <button 
                      onClick={() => setIsFilterDrawerOpen(false)}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;