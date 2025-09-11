import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Employee {
  id: number;
  sno: number;
  registerNumber: string;
  name: string;
  role: string;
  qualification: string;
  status: 'active' | 'inactive';
  salary: number;
  pfEnabled: boolean;
  splitType?: 'percentage' | 'rupees';
  fixed?: number;
  variable?: number;
  pf?: number;
  esi?: number;
}

interface EmployeeFormData {
  name: string;
  role: string;
  registerNumber: string;
  qualification: string;
  status: 'active' | 'inactive';
  salary: string;
  pfEnabled: boolean;
  splitType: 'percentage' | 'rupees';
  fixed: string;
  variable: string;
  pf: string;
  esi: string;
}

const EmployeeConfig: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      sno: 1,
      registerNumber: 'EMP001',
      name: 'John Smith',
      role: 'Mathematics Teacher',
      qualification: 'M.Sc Mathematics',
      status: 'active',
      salary: 50000,
      pfEnabled: true,
      splitType: 'percentage',
      fixed: 40000,
      variable: 10000,
      pf: 6000,
      esi: 1750
    },
    {
      id: 2,
      sno: 2,
      registerNumber: 'EMP002',
      name: 'Sarah Johnson',
      role: 'English Teacher',
      qualification: 'M.A English',
      status: 'active',
      salary: 45000,
      pfEnabled: false
    }
  ]);

  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    role: 'Mathematics Teacher',
    registerNumber: '',
    qualification: '',
    status: 'active',
    salary: '',
    pfEnabled: false,
    splitType: 'percentage',
    fixed: '',
    variable: '',
    pf: '',
    esi: ''
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const roles = [
    'Mathematics Teacher',
    'English Teacher',
    'Science Teacher',
    'History Teacher',
    'Geography Teacher',
    'Physics Teacher',
    'Chemistry Teacher',
    'Biology Teacher',
    'Computer Science Teacher',
    'Physical Education Teacher',
    'Principal',
    'Vice Principal',
    'Administrative Staff'
  ];

  const handleInputChange = (field: keyof EmployeeFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.registerNumber || !formData.qualification || !formData.salary) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newEmployee: Employee = {
      id: editingId || Date.now(),
      sno: editingId ? employees.find(emp => emp.id === editingId)?.sno || 0 : employees.length + 1,
      name: formData.name,
      role: formData.role,
      registerNumber: formData.registerNumber,
      qualification: formData.qualification,
      status: formData.status,
      salary: parseFloat(formData.salary),
      pfEnabled: formData.pfEnabled,
      splitType: formData.pfEnabled ? formData.splitType : undefined,
      fixed: formData.pfEnabled && formData.fixed ? parseFloat(formData.fixed) : undefined,
      variable: formData.pfEnabled && formData.variable ? parseFloat(formData.variable) : undefined,
      pf: formData.pfEnabled && formData.pf ? parseFloat(formData.pf) : undefined,
      esi: formData.pfEnabled && formData.esi ? parseFloat(formData.esi) : undefined
    };

    if (editingId) {
      setEmployees(prev => prev.map(emp => emp.id === editingId ? newEmployee : emp));
      setEditingId(null);
    } else {
      setEmployees(prev => [...prev, newEmployee]);
    }

    // Reset form
    setFormData({
      name: '',
      role: 'Mathematics Teacher',
      registerNumber: '',
      qualification: '',
      status: 'active',
      salary: '',
      pfEnabled: false,
      splitType: 'percentage',
      fixed: '',
      variable: '',
      pf: '',
      esi: ''
    });
  };

  const handleEdit = (employee: Employee) => {
    setFormData({
      name: employee.name,
      role: employee.role,
      registerNumber: employee.registerNumber,
      qualification: employee.qualification,
      status: employee.status,
      salary: employee.salary.toString(),
      pfEnabled: employee.pfEnabled,
      splitType: employee.splitType || 'percentage',
      fixed: employee.fixed?.toString() || '',
      variable: employee.variable?.toString() || '',
      pf: employee.pf?.toString() || '',
      esi: employee.esi?.toString() || ''
    });
    setEditingId(employee.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: 'Mathematics Teacher',
      registerNumber: '',
      qualification: '',
      status: 'active',
      salary: '',
      pfEnabled: false,
      splitType: 'percentage',
      fixed: '',
      variable: '',
      pf: '',
      esi: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">

        <div className="flex gap-2 w-full">
          {/* Left Side - Employee Table */}
          <div className="bg-white rounded-lg shadow-md p-6 w-[65%]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Employee List</h3>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {employees.length} Employees
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-3 font-medium text-gray-700">S.No</th>
                    <th className="text-left p-3 font-medium text-gray-700">Reg. No</th>
                    <th className="text-left p-3 font-medium text-gray-700">Name</th>
                    <th className="text-left p-3 font-medium text-gray-700">Role</th>
                    <th className="text-left p-3 font-medium text-gray-700">Salary</th>
                    <th className="text-left p-3 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-gray-800">{employee.sno}</td>
                      <td className="p-3 text-gray-800">{employee.registerNumber}</td>
                      <td className="p-3">
                        <div>
                          <div className="font-medium text-gray-800">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.qualification}</div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-800">{employee.role}</td>
                      <td className="p-3">
                        <div className="font-medium text-gray-800">₹{employee.salary.toLocaleString()}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            employee.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {employee.status}
                          </span>
                          {employee.pfEnabled && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              PF
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(employee)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {employees.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Plus className="mx-auto mb-4 text-gray-400" size={48} />
                  <p>No employees found. Add your first employee using the form.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Employee Form */}
          <div className="bg-white rounded-lg shadow-md p-6 w-[35%]">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingId ? 'Edit Employee' : 'Add New Employee'}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Fill in the details to {editingId ? 'update' : 'add'} an employee
              </p>
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter employee name"
                />
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Register Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Register Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.registerNumber}
                  onChange={(e) => handleInputChange('registerNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter register number"
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter qualification"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Salary with PF Switch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter salary amount"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">PF</span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.pfEnabled}
                        onChange={(e) => handleInputChange('pfEnabled', e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        onClick={() => handleInputChange('pfEnabled', !formData.pfEnabled)}
                        className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
                          formData.pfEnabled ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform transform ${
                            formData.pfEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          } mt-0.5`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PF Split Up Section */}
              {formData.pfEnabled && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Split Up
                    </label>
                    <select
                      value={formData.splitType}
                      onChange={(e) => handleInputChange('splitType', e.target.value as 'percentage' | 'rupees')}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="percentage">%</option>
                      <option value="rupees">Rupees</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fixed
                      </label>
                      <input
                        type="number"
                        value={formData.fixed}
                        onChange={(e) => handleInputChange('fixed', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder={formData.splitType === 'percentage' ? '80%' : '40000'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Variable
                      </label>
                      <input
                        type="number"
                        value={formData.variable}
                        onChange={(e) => handleInputChange('variable', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder={formData.splitType === 'percentage' ? '20%' : '10000'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PF
                      </label>
                      <input
                        type="number"
                        value={formData.pf}
                        onChange={(e) => handleInputChange('pf', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder={formData.splitType === 'percentage' ? '12%' : '6000'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ESI
                      </label>
                      <input
                        type="number"
                        value={formData.esi}
                        onChange={(e) => handleInputChange('esi', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder={formData.splitType === 'percentage' ? '3.5%' : '1750'}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingId ? 'Update Employee' : 'Add Employee'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeConfig;