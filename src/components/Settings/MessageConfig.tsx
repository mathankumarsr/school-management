import React, { useState, useMemo } from 'react';
import { Search, Download, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const MessageConfig = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      requestNo: 'REQ001', 
      requestDate: '2024-01-15', 
      requestBy: 'John Smith', 
      messageType: 'SMS', 
      messageCount: 250, 
      notes: 'Monthly fee reminder', 
      status: 'Completed' 
    },
    { 
      id: 2, 
      requestNo: 'REQ002', 
      requestDate: '2024-01-16', 
      requestBy: 'Sarah Johnson', 
      messageType: 'WhatsApp', 
      messageCount: 180, 
      notes: 'Parent-teacher meeting notification', 
      status: 'Pending' 
    },
    { 
      id: 3, 
      requestNo: 'REQ003', 
      requestDate: '2024-01-17', 
      requestBy: 'Mike Wilson', 
      messageType: 'SMS', 
      messageCount: 300, 
      notes: 'Exam schedule announcement', 
      status: 'Completed' 
    },
    { 
      id: 4, 
      requestNo: 'REQ004', 
      requestDate: '2024-01-18', 
      requestBy: 'Emily Davis', 
      messageType: 'WhatsApp', 
      messageCount: 120, 
      notes: 'Holiday notification', 
      status: 'Pending' 
    },
    { 
      id: 5, 
      requestNo: 'REQ005', 
      requestDate: '2024-01-19', 
      requestBy: 'David Brown', 
      messageType: 'SMS', 
      messageCount: 400, 
      notes: 'Emergency contact update', 
      status: 'Completed' 
    },
    { 
      id: 6, 
      requestNo: 'REQ006', 
      requestDate: '2024-01-20', 
      requestBy: 'Lisa Anderson', 
      messageType: 'WhatsApp', 
      messageCount: 90, 
      notes: 'Sports day invitation', 
      status: 'Pending' 
    },
    { 
      id: 7, 
      requestNo: 'REQ007', 
      requestDate: '2024-01-21', 
      requestBy: 'Robert Taylor', 
      messageType: 'SMS', 
      messageCount: 220, 
      notes: 'Academic progress report', 
      status: 'Completed' 
    },
    { 
      id: 8, 
      requestNo: 'REQ008', 
      requestDate: '2024-01-22', 
      requestBy: 'Jennifer White', 
      messageType: 'WhatsApp', 
      messageCount: 160, 
      notes: 'School uniform reminder', 
      status: 'Pending' 
    },
    { 
      id: 9, 
      requestNo: 'REQ009', 
      requestDate: '2024-01-23', 
      requestBy: 'Mark Garcia', 
      messageType: 'SMS', 
      messageCount: 350, 
      notes: 'Library book return notice', 
      status: 'Completed' 
    },
    { 
      id: 10, 
      requestNo: 'REQ010', 
      requestDate: '2024-01-24', 
      requestBy: 'Amanda Miller', 
      messageType: 'WhatsApp', 
      messageCount: 200, 
      notes: 'Field trip permission', 
      status: 'Pending' 
    },
    { 
      id: 11, 
      requestNo: 'REQ011', 
      requestDate: '2024-01-25', 
      requestBy: 'Chris Wilson', 
      messageType: 'SMS', 
      messageCount: 280, 
      notes: 'Vaccination reminder', 
      status: 'Completed' 
    },
    { 
      id: 12, 
      requestNo: 'REQ012', 
      requestDate: '2024-01-26', 
      requestBy: 'Maria Rodriguez', 
      messageType: 'WhatsApp', 
      messageCount: 150, 
      notes: 'Art exhibition invitation', 
      status: 'Pending' 
    },
  ]);

  const [formData, setFormData] = useState({
    requestDate: new Date().toISOString().split('T')[0], // Current date as default
    requestBy: '',
    messageType: '',
    messageCount: '',
    notes: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const messageTypeOptions = ['SMS', 'WhatsApp'];
  const statusOptions = ['Pending', 'Completed'];

  // Generate request number
  const generateRequestNo = () => {
    const lastReqNo = messages.length > 0 
      ? Math.max(...messages.map(m => parseInt(m.requestNo.replace('REQ', '')))) 
      : 0;
    return `REQ${String(lastReqNo + 1).padStart(3, '0')}`;
  };

  // Filter and paginate data
  const filteredMessages = useMemo(() => {
    return messages.filter(item => 
      item.requestNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requestBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.messageType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.requestDate.includes(searchTerm) ||
      item.messageCount.toString().includes(searchTerm)
    );
  }, [messages, searchTerm]);

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData({ 
      requestDate: new Date().toISOString().split('T')[0],
      requestBy: '',
      messageType: '',
      messageCount: '',
      notes: ''
    });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.requestBy || !formData.messageType || !formData.messageCount || !formData.notes) {
      alert('Please fill all fields');
      return;
    }

    if (parseInt(formData.messageCount) <= 0) {
      alert('Message count must be greater than 0');
      return;
    }

    if (editingId) {
      // Edit existing message
      setMessages(prev => prev.map(item => 
        item.id === editingId 
          ? { 
              ...item, 
              requestDate: formData.requestDate,
              requestBy: formData.requestBy,
              messageType: formData.messageType,
              messageCount: parseInt(formData.messageCount),
              notes: formData.notes
            }
          : item
      ));
      setEditingId(null);
    } else {
      // Add new message
      const newMessage = {
        id: Date.now(),
        requestNo: generateRequestNo(),
        requestDate: formData.requestDate,
        requestBy: formData.requestBy,
        messageType: formData.messageType,
        messageCount: parseInt(formData.messageCount),
        notes: formData.notes,
        status: 'Pending' // New requests start as pending
      };
      setMessages(prev => [...prev, newMessage]);
    }
    
    handleClear();
  };

  const handleEdit = (item) => {
    setFormData({
      requestDate: item.requestDate,
      requestBy: item.requestBy,
      messageType: item.messageType,
      messageCount: item.messageCount.toString(),
      notes: item.notes
    });
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message request?')) {
      setMessages(prev => prev.filter(item => item.id !== id));
      // Reset to page 1 if current page becomes empty
      const remainingItems = messages.filter(item => item.id !== id).length;
      const newTotalPages = Math.ceil(remainingItems / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleDownload = () => {
    const csvContent = [
      ['S.No', 'Request No', 'Request Date', 'Request By', 'Message Type', 'Message Count', 'Notes', 'Status'],
      ...filteredMessages.map((item, index) => [
        index + 1,
        item.requestNo,
        item.requestDate,
        item.requestBy,
        item.messageType,
        item.messageCount,
        item.notes,
        item.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'message_configurations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  };

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        status === 'Completed' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Message Configuration Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Table */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
            {/* Table Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-end items-center gap-3">
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
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                  title="Download"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="max-h-96 overflow-y-auto overflow-x-scroll" style={{scrollbarWidth: 'thin'}}>
              <table className="w-full min-w-[1000px]">
                <thead className="bg-blue-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-blue-800 min-w-[50px]">S.No</th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-blue-800 min-w-[90px]">Request No</th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-blue-800 min-w-[100px]">Request Date</th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-blue-800 min-w-[120px]">Request By</th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-blue-800 min-w-[100px]">Message Type</th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-blue-800 min-w-[90px]">Message Count</th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-blue-800 min-w-[150px]">Notes</th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-blue-800 min-w-[90px]">Status</th>
                    <th className="px-3 py-3 text-left text-sm font-semibold text-blue-800 min-w-[80px]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedMessages.length > 0 ? (
                    paginatedMessages.map((item, index) => (
                      <tr key={item.id} className="hover:bg-blue-50">
                        <td className="px-3 py-3 text-sm text-gray-900">{startIndex + index + 1}</td>
                        <td className="px-3 py-3 text-sm font-medium text-blue-600">{item.requestNo}</td>
                        <td className="px-3 py-3 text-sm text-gray-900">{formatDate(item.requestDate)}</td>
                        <td className="px-3 py-3 text-sm text-gray-900">{item.requestBy}</td>
                        <td className="px-3 py-3 text-sm text-gray-900">{item.messageType}</td>
                        <td className="px-3 py-3 text-sm text-gray-900">{item.messageCount}</td>
                        <td className="px-3 py-3 text-sm text-gray-900 max-w-[150px] truncate" title={item.notes}>
                          {item.notes}
                        </td>
                        <td className="px-3 py-3 text-sm">{getStatusBadge(item.status)}</td>
                        <td className="px-3 py-3 text-sm">
                          <div className="flex items-center gap-1">
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
                      <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                        No message requests found
                      </td>
                    </tr>
                  )}
                  {/* Fill empty rows to maintain table height */}
                  {paginatedMessages.length < itemsPerPage && 
                    Array.from({ length: itemsPerPage - paginatedMessages.length }, (_, index) => (
                      <tr key={`empty-${index}`} className="h-12">
                        <td colSpan={9} className="px-3 py-3"></td>
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
                  {filteredMessages.length > 0 
                    ? `${startIndex + 1}-${Math.min(startIndex + paginatedMessages.length, filteredMessages.length)} of ${filteredMessages.length}`
                    : '0 of 0'
                  }
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || filteredMessages.length === 0}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || filteredMessages.length === 0}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold text-blue-800 mb-6">
              {editingId ? 'Edit Message Request' : 'Message Configuration'}
            </h2>
            
            <div className="space-y-4">
              {/* Request Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.requestDate}
                  onChange={(e) => handleInputChange('requestDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Request By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request By <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.requestBy}
                  onChange={(e) => handleInputChange('requestBy', e.target.value)}
                  placeholder="Enter name of requester"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Message Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.messageType}
                  onChange={(e) => handleInputChange('messageType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select Message Type</option>
                  {messageTypeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Message Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Count <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.messageCount}
                  onChange={(e) => handleInputChange('messageCount', e.target.value)}
                  placeholder="Enter number of messages"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Enter notes or description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                />
              </div>

              {/* Action Buttons */}
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
    </div>
  );
};

export default MessageConfig;