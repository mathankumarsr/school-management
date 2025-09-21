import { useState } from 'react';
import {
  Plus,
  FileText,
  CreditCard,
  MoreVertical,
  Edit,
  Trash2,
  Printer,
  Eye,
} from 'lucide-react';
import {  useDeleteAdmissionMutation, useLazyGetAdmissionByIdQuery, useUpdateAdmissionMutation } from '../api/admissionsApi';
import { toast } from 'react-toastify';
import AddNewAdmission from './AddNewAdmission';
import { useNavigate } from 'react-router-dom';

const Admission = () => {
  const [activeTab, setActiveTab] = useState('preadmission');
  // const { data: studentss = [], isLoading: isGetLoadings, isErrors } = useGetAdmissionsQuery();
  const students =[]
  const isGetLoading =false
  const isError = false
  const navigate =useNavigate()
  const [deleteAdmission] = useDeleteAdmissionMutation();
  const [triggerGetAdmissionById] = useLazyGetAdmissionByIdQuery();

  const [readOnly, setReadOnly] = useState(false);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
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

  if (isGetLoading) return <p className="text-gray-500">Loading students...</p>;
  if (isError) return <p className="text-red-500">Failed to load students</p>;

  const handleDropdownAction = async (action: string, studentId: number) => {
    setShowDropdown(null);

    switch (action) {
      case "edit": {
        // fetch student by id & populate form
        const { data } = await triggerGetAdmissionById(studentId).unwrap();
        if (data) setFormData(data);
        navigate("new"); // enable editing form
        break;
      }

      case "delete": {
        try {
          await deleteAdmission(studentId).unwrap();
          toast.success("Student deleted successfully");
        } catch (err) {
          toast.error("Failed to delete student");
        }
        break;
      }

      case "view": {
        // fetch student & show in read-only mode
        const { data } = await triggerGetAdmissionById(studentId).unwrap();
        if (data) setFormData(data);
        setReadOnly(true); // disable editing in form
        setShowCreateForm(true);
        break;
      }

      case "print": {
        console.log("Print student:", studentId);
        // You can integrate with a print library
        break;
      }

      default:
        break;
    }
  };

  const renderAdmissionTable = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 ">
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
                <td className="border px-4 py-2">{student.admission_number}</td>
                <td className="border px-4 py-2">{student.student_name}</td>
                <td className="border px-4 py-2">{student.dob}</td>
                <td className="border px-4 py-2">{student.prev_mark_percentage}%</td>
                <td className="border px-4 py-2">{student.community}</td>
                <td className="border px-4 py-2">{student.father_name}</td>

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

  const renderTabContent = () => {
    if (showCreateForm) {
      navigate("new")
      return null
    }

    switch (activeTab) {
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
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'preadmission'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Pre-Admission
              </button>
              <button
                onClick={() => setActiveTab('admission-enquiry')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'admission-enquiry'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Admission Enquiry
              </button>
              <button
                onClick={() => setActiveTab('online-enquiry')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'online-enquiry'
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