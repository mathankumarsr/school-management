import { useState, useMemo } from 'react';
import { Search, Download, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import SettingsTabs from './SettingsTabs';

const ReferralConfig = () => {
    const [fees, setFees] = useState<any[]>([
        { id: 1, class: '1st Grade', employee_name: 'Tuition Fee', student_name: 'Term', term: '1', amount: 5000, reg_no: 'A001', roll_no: '10', concession: '20%' },
        { id: 2, class: '1st Grade', employee_name: 'Library Fee', student_name: 'Monthly', month: 'January', amount: 200, reg_no: 'A001', roll_no: '10', concession: '20%' },
        { id: 3, class: '2nd Grade', employee_name: 'Lab Fee', student_name: 'Yearly', year: '2024', amount: 1500, reg_no: 'A001', roll_no: '10', concession: '20%' },
        { id: 4, class: '2nd Grade', employee_name: 'Sports Fee', student_name: 'Term', term: '2', amount: 800, reg_no: 'A001', roll_no: '10', concession: '20%' },
        { id: 5, class: '3rd Grade', employee_name: 'Transport Fee', student_name: 'Monthly', month: 'February', amount: 1200, reg_no: 'A001', roll_no: '10', concession: '20%' },
        { id: 6, class: '3rd Grade', employee_name: 'Exam Fee', student_name: 'Term', term: '1', amount: 300, reg_no: 'A001', roll_no: '10', concession: '20%' },
        { id: 7, class: '4th Grade', employee_name: 'Activity Fee', student_name: 'Yearly', year: '2024', amount: 2000, reg_no: 'A001', roll_no: '10', concession: '20%' },
        { id: 8, class: '4th Grade', employee_name: 'Uniform Fee', student_name: 'Yearly', year: '2024', amount: 1800, reg_no: 'A001', roll_no: '10', concession: '20%' },
        { id: 9, class: '5th Grade', employee_name: 'Computer Fee', student_name: 'Monthly', month: 'March', amount: 500, reg_no: 'A001', roll_no: '10', concession: '20%' },
        { id: 10, class: '5th Grade', employee_name: 'Development Fee', student_name: 'Term', term: '3', amount: 2500, reg_no: 'A001', roll_no: '10', concession: '20%' },
        { id: 11, class: '6th Grade', employee_name: 'Music Fee', student_name: 'Monthly', month: 'April', amount: 400, reg_no: 'A001', roll_no: '10', concession: '20%' },
    ]);

    const [formData, setFormData] = useState({
        class: '',
        feeName: '',
        feeType: '',
        term: '',
        month: '',
        year: '',
        amount: ''
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

    // Filter and paginate data
    const filteredFees = useMemo(() => {
        return fees.filter(item =>
            item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.feeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.feeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.amount.toString().includes(searchTerm)
        );
    }, [fees, searchTerm]);

    const totalPages = Math.ceil(filteredFees.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFees = filteredFees.slice(startIndex, startIndex + itemsPerPage);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => {
            const newData = { ...prev, [field]: value };

            // Clear dependent fields when fee type changes
            if (field === 'feeType') {
                newData.term = '';
                newData.month = '';
                newData.year = '';
            }

            return newData;
        });
    };

    const handleClear = () => {
        setFormData({
            class: '',
            feeName: '',
            feeType: '',
            term: '',
            month: '',
            year: '',
            amount: ''
        });
        setEditingId(null);
    };

    const handleSubmit = () => {
        if (!formData.class || !formData.feeName || !formData.feeType || !formData.amount) {
            alert('Please fill all required fields');
            return;
        }

        // Validate specific type fields
        if (formData.feeType === 'Term' && !formData.term) {
            alert('Please select a term');
            return;
        }
        if (formData.feeType === 'Monthly' && !formData.month) {
            alert('Please select a month');
            return;
        }
        if (formData.feeType === 'Yearly' && !formData.year) {
            alert('Please select a year');
            return;
        }

        if (editingId) {
            // Edit existing fee
            setFees(prev => prev.map(item =>
                item.id === editingId
                    ? {
                        ...item,
                        class: formData.class,
                        feeName: formData.feeName,
                        feeType: formData.feeType,
                        term: formData.term,
                        month: formData.month,
                        year: formData.year,
                        amount: parseInt(formData.amount)
                    }
                    : item
            ));
            setEditingId(null);
        } else {
            // Add new fee
            const newFee = {
                id: Date.now(),
                class: formData.class,
                feeName: formData.feeName,
                feeType: formData.feeType,
                term: formData.term,
                month: formData.month,
                year: formData.year,
                amount: parseInt(formData.amount)
            };
            setFees(prev => [...prev, newFee]);
        }

        handleClear();
    };

    const handleEdit = (item: any) => {
        setFormData({
            class: item.class,
            feeName: item.feeName,
            feeType: item.feeType,
            term: item.term || '',
            month: item.month || '',
            year: item.year || '',
            amount: item.amount.toString()
        });
        setEditingId(item.id);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this fee configuration?')) {
            setFees(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleDownload = () => {
        const csvContent = [
            ['S.No', 'Class', 'Fee Name', 'Fee Type', 'Period', 'Amount'],
            ...filteredFees.map((item, index) => [
                index + 1,
                item.class,
                item.feeName,
                item.feeType,
                item.term || item.month || item.year || '',
                item.amount
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fees_configurations.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className=" bg-gray-50 py-3 px-4 lg:px-6">
            <div className="mb-3">
                <SettingsTabs />

                <div className="flex flex-col-reverse xl:flex-row gap-2 w-full mt-3">
                    <div className=" bg-white rounded-lg shadow-md w-full xl:w-[65%]">
                        {/* Table Header */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center gap-3">
                                <div className="font-semibold">Referral List</div>
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
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[120px]">Employee Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[120px]">Student Name</th>
                                        {/* <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[120px]">Class</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[120px]">Roll No</th> */}
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[120px]">Concession</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-black min-w-[100px]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {paginatedFees.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-blue-50">
                                            <td className="px-4 py-3 text-sm text-gray-900 min-w-[60px]">{startIndex + index + 1}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 min-w-[120px]">{
                                                <div className='flex flex-col'>
                                                    <span className='text-[13px]'>{item.employee_name}</span>
                                                    <span className='text-[10px]'>{item.reg_no}</span>
                                                </div>
                                            }</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 min-w-[150px]">
                                                {
                                                    <div className='flex flex-col'>
                                                        <span className='text-[13px]'>{item.student_name}</span>
                                                        <span className='text-[10px]'>{`${item.roll_no} & ${item.class}`}</span>
                                                    </div>
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 min-w-[100px]">{item.concession}</td>
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
                                    ))}
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
                                    {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredFees.length)} of {filteredFees.length}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
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
                            {editingId ? 'Edit Referral' : 'Referral Configuration'}
                        </h2>

                        <div className="flex flex-row xl:flex-col flex-wrap xl:flex-nowrap gap-4 xl:gap-3 h-auto xl:h-[47vh] overflow-y-auto scrollbar-hide">
                            {/* Class Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Employee Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.feeName}
                                    onChange={(e) => handleInputChange('feeName', e.target.value)}
                                    placeholder="Enter employee name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Employee Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.feeName}
                                    onChange={(e) => handleInputChange('feeName', e.target.value)}
                                    placeholder="Enter employee code"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Student Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.feeName}
                                    onChange={(e) => handleInputChange('feeName', e.target.value)}
                                    placeholder="Enter student name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Roll No <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.feeName}
                                    onChange={(e) => handleInputChange('feeName', e.target.value)}
                                    placeholder="Enter roll no"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.feeName}
                                    onChange={(e) => handleInputChange('feeName', e.target.value)}
                                    placeholder="Enter mobile number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                            </div>
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

export default ReferralConfig;