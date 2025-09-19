import React, { useState, useMemo } from 'react';
import { Search, Download, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import SettingsTabs from './SettingsTabs';

const ClassroomConfig = () => {
  const [classrooms, setClassrooms] = useState([
    { id: 1, class: '1st Grade', classNumber: '101', block: 'A', floor: 'Ground Floor' },
    { id: 2, class: '1st Grade', classNumber: '102', block: 'A', floor: 'Ground Floor' },
    { id: 3, class: '2nd Grade', classNumber: '201', block: 'A', floor: 'First Floor' },
    { id: 4, class: '2nd Grade', classNumber: '202', block: 'A', floor: 'First Floor' },
    { id: 5, class: '3rd Grade', classNumber: '301', block: 'B', floor: 'Ground Floor' },
    { id: 6, class: '3rd Grade', classNumber: '302', block: 'B', floor: 'Ground Floor' },
    { id: 7, class: '4th Grade', classNumber: '401', block: 'B', floor: 'First Floor' },
    { id: 8, class: '4th Grade', classNumber: '402', block: 'B', floor: 'First Floor' },
    { id: 9, class: '5th Grade', classNumber: '501', block: 'C', floor: 'Second Floor' },
    { id: 10, class: '5th Grade', classNumber: '502', block: 'C', floor: 'Second Floor' },
    { id: 11, class: '6th Grade', classNumber: '601', block: 'C', floor: 'Third Floor' },
    { id: 12, class: '6th Grade', classNumber: '602', block: 'C', floor: 'Third Floor' },
    { id: 13, class: '7th Grade', classNumber: '701', block: 'D', floor: 'Ground Floor' },
    { id: 14, class: '8th Grade', classNumber: '801', block: 'D', floor: 'First Floor' },
  ]);

  const [formData, setFormData] = useState({
    class: '',
    classNumber: '',
    block: '',
    floor: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const classOptions = [
    '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
    '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
    '11th Grade', '12th Grade'
  ];

  const blockOptions = ['A', 'B', 'C', 'D', 'E', 'F'];

  const floorOptions = [
    'Ground Floor', 'First Floor', 'Second Floor', 'Third Floor',
    'Fourth Floor', 'Fifth Floor'
  ];

  // Filter and paginate data
  const filteredClassrooms = useMemo(() => {
    return classrooms.filter(item =>
      item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.classNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.floor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [classrooms, searchTerm]);

  const totalPages = Math.ceil(filteredClassrooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClassrooms = filteredClassrooms.slice(startIndex, startIndex + itemsPerPage);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData({
      class: '',
      classNumber: '',
      block: '',
      floor: ''
    });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.class || !formData.classNumber || !formData.block || !formData.floor) {
      alert('Please fill all fields');
      return;
    }

    // Check for duplicate class number in same block
    const existingClassroom = classrooms.find(item =>
      item.classNumber === formData.classNumber &&
      item.block === formData.block &&
      item.id !== editingId
    );

    if (existingClassroom) {
      alert('A classroom with this number already exists in the same block');
      return;
    }

    if (editingId) {
      // Edit existing classroom
      setClassrooms(prev => prev.map(item =>
        item.id === editingId
          ? {
            ...item,
            class: formData.class,
            classNumber: formData.classNumber,
            block: formData.block,
            floor: formData.floor
          }
          : item
      ));
      setEditingId(null);
    } else {
      // Add new classroom
      const newClassroom = {
        id: Date.now(),
        class: formData.class,
        classNumber: formData.classNumber,
        block: formData.block,
        floor: formData.floor
      };
      setClassrooms(prev => [...prev, newClassroom]);
    }

    handleClear();
  };

  const handleEdit = (item) => {
    setFormData({
      class: item.class,
      classNumber: item.classNumber,
      block: item.block,
      floor: item.floor
    });
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this classroom configuration?')) {
      setClassrooms(prev => prev.filter(item => item.id !== id));
      // Reset to page 1 if current page becomes empty
      const remainingItems = classrooms.filter(item => item.id !== id).length;
      const newTotalPages = Math.ceil(remainingItems / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleDownload = () => {
    const csvContent = [
      ['S.No', 'Class', 'Class Number', 'Block', 'Floor'],
      ...filteredClassrooms.map((item, index) => [
        index + 1,
        item.class,
        item.classNumber,
        item.block,
        item.floor
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'classroom_configurations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className=" bg-gray-50 py-3 px-4 lg:px-6">
      <div className="mb-3">
        <SettingsTabs />

        <div className="flex flex-col-reverse xl:flex-row gap-2 w-full mt-3">
          <div className=" bg-white rounded-lg shadow-md w-full xl:w-[65%]">
            {/* Table Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center gap-3">
                <div className="font-semibold">Classroom Configuration</div>
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={16} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                    title="Download"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto scrollbar-hide h-[47.5vh]">
              <table className="w-full">
                <thead className="bg-blue-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[60px]">S.No</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[120px]">Class</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[120px]">Class Number</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[80px]">Block</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[120px]">Floor</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[100px]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedClassrooms.length > 0 ? (
                    paginatedClassrooms.map((item, index) => (
                      <tr key={item.id} className="hover:bg-blue-50">
                        <td className="px-4 py-3 text-sm text-gray-900 min-w-[60px]">{startIndex + index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 min-w-[120px]">{item.class}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 min-w-[120px]">{item.classNumber}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 min-w-[80px]">{item.block}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 min-w-[120px]">{item.floor}</td>
                        <td className="px-4 py-3 text-sm min-w-[100px]">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No classrooms found
                      </td>
                    </tr>
                  )}
                  {/* Fill empty rows to maintain table height */}
                  {paginatedClassrooms.length < itemsPerPage &&
                    Array.from({ length: itemsPerPage - paginatedClassrooms.length }, (_, index) => (
                      <tr key={`empty-${index}`} className="h-12">
                        <td colSpan={6} className="px-4 py-3"></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center bg-white">
              <div className="text-sm text-gray-500">
                Rows per page: 10
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {filteredClassrooms.length > 0
                    ? `${startIndex + 1}-${Math.min(startIndex + paginatedClassrooms.length, filteredClassrooms.length)} of ${filteredClassrooms.length}`
                    : '0 of 0'
                  }
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || filteredClassrooms.length === 0}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || filteredClassrooms.length === 0}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-lg shadow-md p-6 w-full xl:w-[35%]">
            <h2 className="text-xl font-semibold text-black mb-3">
              {editingId ? 'Edit Classroom' : 'Classroom Configuration'}
            </h2>

            <div className="flex flex-row xl:flex-col flex-wrap xl:flex-nowrap gap-4 xl:gap-3 h-auto xl:h-[47vh] overflow-y-auto scrollbar-hide">
              {/* Class Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => handleInputChange('class', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select Class</option>
                  {classOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Class Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.classNumber}
                  onChange={(e) => handleInputChange('classNumber', e.target.value)}
                  placeholder="Enter class number (e.g., 101, 202)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Block Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Block <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.block}
                  onChange={(e) => handleInputChange('block', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select Block</option>
                  {blockOptions.map(option => (
                    <option key={option} value={option}>Block {option}</option>
                  ))}
                </select>
              </div>

              {/* Floor Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.floor}
                  onChange={(e) => handleInputChange('floor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select Floor</option>
                  {floorOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}

            </div>
                          <div className="flex gap-3 pt-4">
                <button
                  onClick={handleClear}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm"
                >
                  Clear
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomConfig;