import { useState, useMemo } from 'react';
import { Search, Download, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import SettingsTabs from './SettingsTabs';

const SettingClass = () => {
  const [classes, setClasses] = useState([
    { id: 1, class: '1st Grade', section: 'A', capacity: 30 },
    { id: 2, class: '1st Grade', section: 'B', capacity: 28 },
    { id: 3, class: '2nd Grade', section: 'A', capacity: 32 },
    { id: 4, class: '2nd Grade', section: 'B', capacity: 30 },
    { id: 5, class: '3rd Grade', section: 'A', capacity: 25 },
    { id: 6, class: '3rd Grade', section: 'B', capacity: 27 },
    { id: 7, class: '4th Grade', section: 'A', capacity: 29 },
    { id: 8, class: '4th Grade', section: 'B', capacity: 31 },
    { id: 9, class: '5th Grade', section: 'A', capacity: 26 },
    { id: 10, class: '5th Grade', section: 'B', capacity: 24 },
    { id: 11, class: '6th Grade', section: 'A', capacity: 35 },
    { id: 12, class: '6th Grade', section: 'B', capacity: 33 },
  ]);

  const [formData, setFormData] = useState({
    class: '',
    section: '',
    capacity: ''
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

  const sectionOptions = ['A', 'B', 'C', 'D', 'E', 'F'];

  // Filter and paginate data
  const filteredClasses = useMemo(() => {
    return classes.filter(item =>
      item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.capacity.toString().includes(searchTerm)
    );
  }, [classes, searchTerm]);

  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClasses = filteredClasses.slice(startIndex, startIndex + itemsPerPage);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData({ class: '', section: '', capacity: '' });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.class || !formData.section || !formData.capacity) {
      alert('Please fill all fields');
      return;
    }

    if (editingId) {
      // Edit existing class
      setClasses(prev => prev.map(item =>
        item.id === editingId
          ? { ...item, class: formData.class, section: formData.section, capacity: parseInt(formData.capacity) }
          : item
      ));
      setEditingId(null);
    } else {
      // Add new class
      const newClass = {
        id: Date.now(),
        class: formData.class,
        section: formData.section,
        capacity: parseInt(formData.capacity)
      };
      setClasses(prev => [...prev, newClass]);
    }

    handleClear();
  };

  const handleEdit = (item: any) => {
    setFormData({
      class: item.class,
      section: item.section,
      capacity: item.capacity.toString()
    });
    setEditingId(item.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleDownload = () => {
    const csvContent = [
      ['S.No', 'Class', 'Section', 'Capacity'],
      ...filteredClasses.map((item, index) => [
        index + 1,
        item.class,
        item.section,
        item.capacity
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'class_configurations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className=" bg-blue-50 py-3 px-4 lg:px-6 h-full w-full">
      <div className="mb-3">
        <SettingsTabs />
        <div className="flex flex-col-reverse xl:flex-row gap-3 w-full mt-3">
          {/* Left Side - Table */}
          <div className=" bg-white rounded-lg shadow-md w-full xl:w-[65%]">
            {/* Table Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className='hidden md:block font-semibold text-lg'>Class List</div>
                <div className='flex gap-2 items-center'>
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // reset pagination when searching
                      }}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-4">
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
            </div>

            {/* Table */}
            <div className="overflow-auto h-auto md:h-[47.5vh] 2xl:h-[64vh] scrollbar-hide">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">S.No</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Class</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Section</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Capacity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedClasses.map((item, index) => (
                    <tr key={item.id} className="hover:bg-blue-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{startIndex + index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.class}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.section}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.capacity}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Rows per page: {itemsPerPage}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredClasses.length)} of {filteredClasses.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 cursor-pointer hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 cursor-pointer hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-lg shadow-md p-6 w-full xl:w-[35%] flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              {editingId ? 'Edit Class' : 'Add New Class'}
            </h2>

            <div className="space-y-4">
              {/* Class Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => handleInputChange('class', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Class</option>
                  {classOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Section Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.section}
                  onChange={(e) => handleInputChange('section', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Section</option>
                  {sectionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Capacity Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="Enter capacity"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 mt-auto">
              <button
                onClick={handleClear}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

export default SettingClass;