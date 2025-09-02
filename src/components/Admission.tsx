import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  CreditCard, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Printer, 
  Eye,
  ArrowLeft,
  Save,
  X
} from 'lucide-react';

const Admission = () => {
  const [activeTab, setActiveTab] = useState('preadmission');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [students, setStudents] = useState([
    {
      id: 1,
      admissionNumber: 'ADM001',
      studentName: 'Rajesh Kumar',
      dob: '2010-05-15',
      prevMarkPercentage: '85%',
      community: 'OBC',
      parentsName: 'Suresh Kumar'
    },
    {
      id: 2,
      admissionNumber: 'ADM002',
      studentName: 'Priya Sharma',
      dob: '2011-08-22',
      prevMarkPercentage: '92%',
      community: 'General',
      parentsName: 'Amit Sharma'
    },
    {
      id: 3,
      admissionNumber: 'ADM003',
      studentName: 'Karthik Reddy',
      dob: '2010-12-10',
      prevMarkPercentage: '78%',
      community: 'SC',
      parentsName: 'Venkat Reddy'
    }
  ]);

  const [formData, setFormData] = useState({
    // Student Basic Info
    studentName: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    aadharNumber: '',
    religion: '',
    community: '',
    motherTongue: '',
    nationality: '',
    
    // Academic Info
    previousSchool: '',
    previousClass: '',
    prevMarkPercentage: '',
    admissionClass: '',
    
    // Parent/Guardian Info
    fatherName: '',
    fatherOccupation: '',
    fatherPhone: '',
    fatherEmail: '',
    motherName: '',
    motherOccupation: '',
    motherPhone: '',
    motherEmail: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      admissionNumber: `ADM${String(students.length + 1).padStart(3, '0')}`,
      studentName: formData.studentName,
      dob: formData.dob,
      prevMarkPercentage: formData.prevMarkPercentage,
      community: formData.community,
      parentsName: formData.fatherName
    };
    
    setStudents(prev => [...prev, newStudent]);
    setFormData({
      studentName: '',
      dob: '',
      gender: '',
      bloodGroup: '',
      aadharNumber: '',
      religion: '',
      community: '',
      motherTongue: '',
      nationality: '',
      previousSchool: '',
      previousClass: '',
      prevMarkPercentage: '',
      admissionClass: '',
      fatherName: '',
      fatherOccupation: '',
      fatherPhone: '',
      fatherEmail: '',
      motherName: '',
      motherOccupation: '',
      motherPhone: '',
      motherEmail: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelation: ''
    });
    setShowCreateForm(false);
  };

  const handleDropdownAction = (action, studentId) => {
    setShowDropdown(null);
    
    switch(action) {
      case 'edit':
        console.log('Edit student:', studentId);
        break;
      case 'delete':
        setStudents(prev => prev.filter(student => student.id !== studentId));
        break;
      case 'print':
        console.log('Print student:', studentId);
        break;
      case 'view':
        console.log('View student:', studentId);
        break;
      default:
        break;
    }
  };

  const renderAdmissionTable = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prev Mark %</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Community</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parents Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student, index) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.admissionNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.studentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.dob}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.prevMarkPercentage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.community}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.parentsName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <button 
                      className="text-green-600 hover:text-green-800 p-1 rounded"
                      title="Create Admission"
                    >
                      <FileText size={16} />
                    </button>
                    <button 
                      className="text-blue-600 hover:text-blue-800 p-1 rounded"
                      title="Billing"
                    >
                      <CreditCard size={16} />
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setShowDropdown(showDropdown === student.id ? null : student.id)}
                        className="text-gray-600 hover:text-gray-800 p-1 rounded"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {showDropdown === student.id && (
                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border z-10">
                          <div className="py-1">
                            <button 
                              onClick={() => handleDropdownAction('edit', student.id)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Edit size={14} />
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDropdownAction('view', student.id)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Eye size={14} />
                              View
                            </button>
                            <button 
                              onClick={() => handleDropdownAction('print', student.id)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Printer size={14} />
                              Print
                            </button>
                            <button 
                              onClick={() => handleDropdownAction('delete', student.id)}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCreateForm = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowCreateForm(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">Create New Admission</h2>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {/* Student Basic Information */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Student Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                placeholder="xxxx-xxxx-xxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Community *</label>
              <select
                name="community"
                value={formData.community}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Community</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mother Tongue</label>
              <input
                type="text"
                name="motherTongue"
                value={formData.motherTongue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                defaultValue="Indian"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous School</label>
              <input
                type="text"
                name="previousSchool"
                value={formData.previousSchool}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous Class</label>
              <select
                name="previousClass"
                value={formData.previousClass}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Class</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous Mark % *</label>
              <input
                type="text"
                name="prevMarkPercentage"
                value={formData.prevMarkPercentage}
                onChange={handleInputChange}
                placeholder="85%"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admission for Class *</label>
              <select
                name="admissionClass"
                value={formData.admissionClass}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Class</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Father's Information */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Father's Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
              <input
                type="text"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="fatherPhone"
                value={formData.fatherPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="fatherEmail"
                value={formData.fatherEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Mother's Information */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Mother's Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name *</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
              <input
                type="text"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="motherPhone"
                value={formData.motherPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="motherEmail"
                value={formData.motherEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
              <input
                type="text"
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={handleInputChange}
                placeholder="Uncle, Aunt, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => setShowCreateForm(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2"
          >
            <X size={16} />
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={16} />
            Save Admission
          </button>
        </div>
      </form>
    </div>
  );

  const renderTabContent = () => {
    if (showCreateForm) {
      return renderCreateForm();
    }

    switch(activeTab) {
      case 'preadmission':
        return renderAdmissionTable();
      case 'admission-enquiry':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Admission Enquiry</h2>
            <p className="text-gray-600">Admission enquiry management will be implemented here.</p>
          </div>
        );
      case 'online-enquiry':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Online Enquiry</h2>
            <p className="text-gray-600">Online enquiry management will be implemented here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Tab Navigation */}
      {!showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('preadmission')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'preadmission'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pre-Admission
              </button>
              <button
                onClick={() => setActiveTab('admission-enquiry')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'admission-enquiry'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Admission Enquiry
              </button>
              <button
                onClick={() => setActiveTab('online-enquiry')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'online-enquiry'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Online Enquiry
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Add New Admission Button */}
      {!showCreateForm && (
        <div className="mb-6">
          <button 
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add New Admission
          </button>
        </div>
      )}

      {/* Tab Content */}
      <div className="mb-6">
        {renderTabContent()}
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowDropdown(null)}
        />
      )}
    </div>
  );
};

export default Admission;