import React, { useState, useEffect } from 'react';
import { CheckCircle, User, X } from 'lucide-react';

const Billing = () => {
    const [selectedStandard, setSelectedStandard] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [studentDetails, setStudentDetails] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [feeData, setFeeData] = useState([]);
    const [paymentMode, setPaymentMode] = useState({
        cash: false,
        card: false,
        upi: false,
        bankTransfer: false
    });
    const [paymentDetails, setPaymentDetails] = useState({
        cashAmount: '',
        bankTransferAmount: '',
        bankTransaction: ''
    });
    const [referenceNumber, setReferenceNumber] = useState('');
    const [overallConcession, setOverallConcession] = useState(0);
    const [roundOff, setRoundOff] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    // Sample data
    const standards = ['LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];

    const studentsData = {
        'LKG': ['Aarav Kumar', 'Priya Sharma', 'Rohan Gupta'],
        'UKG': ['Ananya Patel', 'Kiran Singh', 'Meera Joshi'],
        '1st': ['Arjun Mehta', 'Kavya Reddy', 'Nikhil Agarwal'],
        '2nd': ['Sneha Verma', 'Rahul Khanna', 'Pooja Nair'],
        '3rd': ['Vikram Thakur', 'Riya Chopra', 'Amit Saxena'],
        '4th': ['Divya Malhotra', 'Suresh Kumar', 'Neha Bansal'],
        '5th': ['Rajesh Yadav', 'Priyanka Jain', 'Mohit Sharma'],
        '6th': ['Sanjana Gupta', 'Rohit Singhal', 'Anjali Mishra'],
        '7th': ['Deepak Agarwal', 'Swati Kapoor', 'Manoj Tiwari'],
        '8th': ['Shreya Pandey', 'Vishal Rastogi', 'Ritika Sood'],
        '9th': ['Harsh Vardhan', 'Nidhi Goel', 'Abhishek Tyagi'],
        '10th': ['Sakshi Bhardwaj', 'Gaurav Mittal', 'Pallavi Dixit'],
        '11th': ['Aryan Sinha', 'Shivani Arora', 'Karthik Iyer'],
        '12th': ['Ishika Rao', 'Varun Bhatia', 'Aditi Chandra']
    };

    const sampleStudentDetails = {
        totalFee: 25000,
        paid: 15000,
        pending: 10000,
        concession: 2000,
        quota: 'General',
        name: 'Mathan Kumar',
        rollNo: '23',
        parentName: 'Ramesh Kumar',
        academicYear: '2023-2024',
        gender: "Male",
        studentType: 'Day Scholar',
        mark: 'A',
        category: 'OBC',
        transport: 'Bus',
        status: 'Active',
        rank: '5'
    };

    const initialFeeData = [
        {
            id: 1,
            checked: false,
            feeType: 'Tuition Fee',
            term1: { total: 8000, pending: 3000, amount: '' },
            term2: { total: 8000, pending: 4000, amount: '' },
            term3: { total: 8000, pending: 3000, amount: '' }
        },
        {
            id: 2,
            checked: false,
            feeType: 'Transport Fee',
            term1: { total: 2000, pending: 1000, amount: '' },
            term2: { total: 2000, pending: 1500, amount: '' },
            term3: { total: 2000, pending: 500, amount: '' }
        },
        {
            id: 3,
            checked: false,
            feeType: 'Lab Fee',
            term1: { total: 1500, pending: 0, amount: '' },
            term2: { total: 1500, pending: 500, amount: '' },
            term3: { total: 1500, pending: 0, amount: '' }
        },
        {
            id: 4,
            checked: false,
            feeType: 'Library Fee',
            term1: { total: 500, pending: 0, amount: '' },
            term2: { total: 500, pending: 0, amount: '' },
            term3: { total: 500, pending: 0, amount: '' }
        }
    ];

    useEffect(() => {
        if (selectedStudent && selectedStandard) {
            setStudentDetails(sampleStudentDetails);
            setFeeData(initialFeeData);
        }
    }, [selectedStudent, selectedStandard]);

    const handleStudentChange = (student) => {
        setSelectedStudent(student);
    };

    const handleCheckboxChange = (id) => {
        setFeeData(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const handleAmountChange = (id, term, value) => {
        setFeeData(prev => prev.map(item =>
            item.id === id
                ? { ...item, [term]: { ...item[term], amount: value } }
                : item
        ));
    };


    const handleReceivePayment = async () => {
        // Mock API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };



    const calculateTotal = () => {
        return feeData.reduce((total, item) => {
            if (item.checked) {
                const term1Amount = parseFloat(item.term1.amount) || 0;
                const term2Amount = parseFloat(item.term2.amount) || 0;
                const term3Amount = parseFloat(item.term3.amount) || 0;
                return total + term1Amount + term2Amount + term3Amount;
            }
            return total;
        }, 0);
    };

    const calculateOverallTotal = () => {
        const subtotal = calculateTotal();
        return subtotal - overallConcession + roundOff;
    };

    const handleClear = () => {
        setSelectedStandard('');
        setSelectedStudent('');
        setStudentDetails(null);
        setFeeData([]);
        setPaymentMode('');
        setReferenceNumber('');
        setOverallConcession(0);
        setRoundOff(0);
    };

    const handleReceive = async () => {
        // Simulate API call
        try {
            const paymentData = {
                standard: selectedStandard,
                student: selectedStudent,
                feeData: feeData.filter(item => item.checked),
                total: calculateOverallTotal(),
                paymentMode,
                referenceNumber
            };

            console.log('Payment data:', paymentData);

            // Simulate API delay
            setTimeout(() => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            }, 1000);

        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto ">
                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Billing</h1>


                <div className="p-6 bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Line 1: Standard and Student Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Standard
                            </label>
                            <select
                                value={selectedStandard}
                                onChange={(e) => setSelectedStandard(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Standard</option>
                                {standards.map(std => (
                                    <option key={std} value={std}>{std}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Student Name
                            </label>
                            <select
                                value={selectedStudent}
                                onChange={(e) => handleStudentChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!selectedStandard}
                            >
                                <option value="">Select Student</option>
                                {selectedStandard && studentsData[selectedStandard]?.map(student => (
                                    <option key={student} value={student}>{student}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Line 2: Student Details Cards */}
                    {studentDetails && (
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center w-[70%]">
                                <div className="text-center mb-4 w-[30%] items-center">
                                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <User className="w-10 h-10 text-gray-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold">{studentDetails.name}</h3>
                                    <p className="text-gray-600">Roll No: {studentDetails.rollNo}</p>
                                </div>
                                <div className="text-sm w-[70%] flex gap-5 items-center">
                                    <div className='space-y-2 w-[50%]'>
                                        <div className="flex justify-between"><span className="font-medium">Academic Year:</span> <span>{studentDetails.academicYear}</span></div>
                                                                                <div className="flex justify-between"><span className="font-medium">Parent:</span> <span>{studentDetails.parentName}</span></div>
                                        <div className="flex justify-between"><span className="font-medium">Gender:</span> <span>{studentDetails.gender}</span></div>
                                        <div className="flex justify-between"><span className="font-medium">Student Type:</span> <span>{studentDetails.studentType}</span></div>
                                                                                <div className="flex justify-between"><span className="font-medium">Phone:</span> <span>{studentDetails.parentName}</span></div>
                                    </div>
                                    <div className='space-y-2 w-[50%]'>
                                        <div className="flex justify-between"><span className="font-medium">Mark:</span> <span>{studentDetails.mark}</span></div>
                                        <div className="flex justify-between"><span className="font-medium">Category:</span> <span>{studentDetails.category}</span></div>
                                        <div className="flex justify-between"><span className="font-medium">Transport:</span> <span>{studentDetails.transport}</span></div>
                                        <div className="flex justify-between"><span className="font-medium">Status:</span> <span>{studentDetails.status}</span></div>
                                        <div className="flex justify-between"><span className="font-medium">Rank:</span> <span>{studentDetails.rank}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg w-[30%]">
                                <h3 className="font-semibold text-blue-800 mb-2">Fee Overview</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Total Fee:</span>
                                        <span className="font-semibold">₹{studentDetails.totalFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Paid:</span>
                                        <span className="text-green-600 font-semibold">₹{studentDetails.paid.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Pending:</span>
                                        <span className="text-red-600 font-semibold">₹{studentDetails.pending.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Line 3: Fee Details Table */}
                    {feeData.length > 0 && (
                        <div className="mb-6 overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left">✓</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Fee Type</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center" colSpan="3">Term 1</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center" colSpan="3">Term 2</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center" colSpan="3">Term 3</th>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-300 px-4 py-2"></th>
                                        <th className="border border-gray-300 px-4 py-2"></th>
                                        <th className="border border-gray-300 px-2 py-1 text-xs">Total</th>
                                        <th className="border border-gray-300 px-2 py-1 text-xs">Pending</th>
                                        <th className="border border-gray-300 px-2 py-1 text-xs">Amount</th>
                                        <th className="border border-gray-300 px-2 py-1 text-xs">Total</th>
                                        <th className="border border-gray-300 px-2 py-1 text-xs">Pending</th>
                                        <th className="border border-gray-300 px-2 py-1 text-xs">Amount</th>
                                        <th className="border border-gray-300 px-2 py-1 text-xs">Total</th>
                                        <th className="border border-gray-300 px-2 py-1 text-xs">Pending</th>
                                        <th className="border border-gray-300 px-2 py-1 text-xs">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feeData.map((fee) => (
                                        <tr key={fee.id}>
                                            <td className="border border-gray-300 px-4 py-2 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={fee.checked}
                                                    onChange={() => handleCheckboxChange(fee.id)}
                                                    className="w-4 h-4"
                                                />
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 font-medium">{fee.feeType}</td>

                                            {/* Term 1 */}
                                            <td className="border border-gray-300 px-2 py-2 text-sm">₹{fee.term1.total}</td>
                                            <td className="border border-gray-300 px-2 py-2 text-sm">₹{fee.term1.pending}</td>
                                            <td className="border border-gray-300 px-2 py-2">
                                                <input
                                                    type="number"
                                                    value={fee.term1.amount}
                                                    onChange={(e) => handleAmountChange(fee.id, 'term1', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border rounded"
                                                    disabled={!fee.checked}
                                                />
                                            </td>

                                            {/* Term 2 */}
                                            <td className="border border-gray-300 px-2 py-2 text-sm">₹{fee.term2.total}</td>
                                            <td className="border border-gray-300 px-2 py-2 text-sm">₹{fee.term2.pending}</td>
                                            <td className="border border-gray-300 px-2 py-2">
                                                <input
                                                    type="number"
                                                    value={fee.term2.amount}
                                                    onChange={(e) => handleAmountChange(fee.id, 'term2', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border rounded"
                                                    disabled={!fee.checked}
                                                />
                                            </td>

                                            {/* Term 3 */}
                                            <td className="border border-gray-300 px-2 py-2 text-sm">₹{fee.term3.total}</td>
                                            <td className="border border-gray-300 px-2 py-2 text-sm">₹{fee.term3.pending}</td>
                                            <td className="border border-gray-300 px-2 py-2">
                                                <input
                                                    type="number"
                                                    value={fee.term3.amount}
                                                    onChange={(e) => handleAmountChange(fee.id, 'term3', e.target.value)}
                                                    className="w-full px-2 py-1 text-sm border rounded"
                                                    disabled={!fee.checked}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Table Total */}
                            <div className="mt-2 text-right">
                                <span className="text-lg font-semibold">
                                    Subtotal: ₹{calculateTotal().toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Line 4: Mode of Payment */}
                    {selectedStudent &&
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Mode of Payment</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                checked={paymentMode.cash}
                                                onChange={(e) => setPaymentMode({ ...paymentMode, cash: e.target.checked })}
                                            />
                                            Cash
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                checked={paymentMode.card}
                                                onChange={(e) => setPaymentMode({ ...paymentMode, card: e.target.checked })}
                                            />
                                            Card
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                checked={paymentMode.upi}
                                                onChange={(e) => setPaymentMode({ ...paymentMode, upi: e.target.checked })}
                                            />
                                            UPI
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                checked={paymentMode.bankTransfer}
                                                onChange={(e) => setPaymentMode({ ...paymentMode, bankTransfer: e.target.checked })}
                                            />
                                            Bank Transfer
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 items-end">
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">Cash Amount</label>
                                            <input
                                                type="number"
                                                className="w-full p-2 border rounded"
                                                value={paymentDetails.cashAmount}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, cashAmount: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">Bank Transfer Amount</label>
                                            <input
                                                type="number"
                                                className="w-full p-2 border rounded"
                                                value={paymentDetails.bankTransferAmount}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, bankTransferAmount: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">Bank Transaction</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded"
                                                value={paymentDetails.bankTransaction}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, bankTransaction: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between"><span>Sub Amount:</span> <span>₹{(calculateTotal()).toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span>Discount %:</span> <span>0%</span></div>
                                        <div className="flex justify-between"><span>Round Off:</span> <span>₹0.11</span></div>
                                        <div className="flex justify-between font-bold border-t pt-2"><span>Payable Amount:</span> <span>₹{calculateTotal().toFixed(2)}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                    {/* Line 5: Action Buttons */}
                    {selectedStudent &&
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleClear}
                                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleReceivePayment}
                                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Receive Payment
                            </button>
                        </div>
                    }
                </div>
            </div>

            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-sm mx-4">
                        <div className="text-center">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
                            <p className="text-gray-600 mb-4">
                                Payment of ₹{calculateOverallTotal().toLocaleString()} has been received successfully.
                            </p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Billing;