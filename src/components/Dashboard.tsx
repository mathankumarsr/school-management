import React, { useEffect, useState, type ReactNode } from 'react';
import {
    DollarSign,
    Users,
    UserCheck,
    Bell,
    MessageSquare,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import type { IconType } from 'react-icons';


const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('September 2021');

    const messages = [
        { name: 'Jane Cooper', message: 'Can we get the results...', time: '12:34pm', avatar: '👩‍🦰' },
        { name: 'Kristin Watson', message: 'Those need to see results...', time: '12:34pm', avatar: '👩‍🦱' },
        { name: 'Jenny Wilson', message: '', time: '12:34pm', avatar: '👩‍🦳' },
        { name: 'Brooklyn Sim', message: '', time: '12:34pm', avatar: '👨‍🦲' },
        { name: 'Darrell Steward', message: 'Can we do for a minute...', time: '12:34pm', avatar: '👨‍🦱' },
        { name: 'Darrell Steward', message: 'Can we get for a minute...', time: '12:34pm', avatar: '👨‍🦱' },
        { name: 'Darrell Steward', message: '', time: '12:34pm', avatar: '👨‍🦱' },
        { name: 'Darrell Steward', message: 'Can we do for a minute...', time: '12:34pm', avatar: '👨‍🦱' },
        { name: 'Darrell Steward', message: '', time: '12:43pm', avatar: '👨‍🦱' }
    ];

    const calendarDays = [
        [null, null, null, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, null, null]
    ];

    useEffect(() => {
        setSelectedMonth("September 2025")
    })

    interface StatCardProps {
        title: string;
        value: string | number;
        icon: IconType;
        bgColor?: string;
        textColor?: string;
    }

    const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, bgColor }) => (
        <div className={`${bgColor} rounded-2xl p-6 text-white relative overflow-hidden`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/80 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold mt-1">{value}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );


    interface ChartCardProps {
        title: string;
        children: ReactNode;   // 👈 better than `any`
        className?: string;
    }
    const ChartCard: React.FC<ChartCardProps> = ({ title, children, className = "" }) => (
        <div className={`bg-white rounded-2xl p-6 shadow-md border border-gray-100 ${className}`}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 whitespace-nowrap">{title}</h3>
            {children}
        </div>
    );

    return (
        <div className="w-full">
            {/* Sidebar */}


            {/* Main Content */}
            {/* <div className="flex-1 flex flex-col overflow-hidden"> */}


            <div className="flex-1 overflow-auto scrollbar-hide">
                <div className="p-6">
                    <div className="grid grid-cols-12 gap-6">
                        {/* Stats Cards */}
                        <div className="col-span-8">
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <StatCard
                                    title="Students"
                                    value="500"
                                    icon={Users}
                                    bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
                                />
                                <StatCard
                                    title="Staff"
                                    value="500"
                                    icon={UserCheck}
                                    bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
                                />
                                <StatCard
                                    title="Students"
                                    value="500"
                                    icon={Users}
                                    bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
                                />
                                <StatCard
                                    title="Students"
                                    value="500"
                                    icon={Users}
                                    bgColor="bg-gradient-to-br from-blue-400 to-blue-500"
                                />
                            </div>

                            {/* Attendance and Revenue Row */}
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <ChartCard title="Student attendance">
                                    <div className="space-y-3">
                                        <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                                            <DollarSign className="text-white" size={24} />
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Total</span>
                                            <span className="font-semibold">500</span>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Present</span>
                                                <span>450</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Absent</span>
                                                <span>50</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-300 h-2 rounded-full" style={{ width: '10%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </ChartCard>

                                <ChartCard title="Staff attendance">
                                    <div className="space-y-3">
                                        <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                                            <DollarSign className="text-white" size={24} />
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Total</span>
                                            <span className="font-semibold">500</span>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Present</span>
                                                <span>450</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Absent</span>
                                                <span>50</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-300 h-2 rounded-full" style={{ width: '10%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </ChartCard>

                                <ChartCard title="Revenue Estimate">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                                            <DollarSign className="text-white" size={24} />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Total Fees</span>
                                                <span className="font-semibold">500</span>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>Paid</span>
                                                    <span>450</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>Pending</span>
                                                    <span>50</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-blue-300 h-2 rounded-full" style={{ width: '10%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ChartCard>
                            </div>

                            {/* Charts Row 2 */}
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <ChartCard title="Academic Growth">
                                    <div className="h-40 relative">
                                        <svg className="w-full h-full" viewBox="0 0 300 120">
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M 20,100 L 50,80 L 80,60 L 110,40 L 140,30 L 170,25 L 200,20 L 230,15 L 260,10 L 280,20"
                                                stroke="#3B82F6"
                                                strokeWidth="3"
                                                fill="none"
                                            />
                                            <path
                                                d="M 20,100 L 50,80 L 80,60 L 110,40 L 140,30 L 170,25 L 200,20 L 230,15 L 260,10 L 280,20 L 280,120 L 20,120 Z"
                                                fill="url(#gradient)"
                                            />
                                        </svg>
                                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
                                            <span>2016</span>
                                            <span>2017</span>
                                            <span>2018</span>
                                            <span>2019</span>
                                            <span>2020</span>
                                            <span>2021</span>
                                            <span>2022</span>
                                        </div>
                                    </div>
                                </ChartCard>

                                <ChartCard title="Admission">
                                    <div className="h-40 relative">
                                        <svg className="w-full h-full" viewBox="0 0 200 100">
                                            <path
                                                d="M 20,80 L 40,70 L 60,65 L 80,55 L 100,50 L 120,45 L 140,35 L 160,25 L 180,20"
                                                stroke="#3B82F6"
                                                strokeWidth="2"
                                                fill="none"
                                            />
                                            <circle cx="160" cy="25" r="3" fill="#3B82F6" />
                                        </svg>
                                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                                            <span>2010</span>
                                            <span>2011</span>
                                            <span>2012</span>
                                            <span>2013</span>
                                            <span>2014</span>
                                            <span>2015</span>
                                        </div>
                                    </div>
                                </ChartCard>

                            </div>

                            {/* Bottom Charts */}
                            <div className="grid grid-cols-2 gap-6">
                                <ChartCard title="Budget">
                                    <div className="h-40 relative">
                                        {/* Y-axis labels */}
                                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                                            <span>75</span>
                                            <span>50</span>
                                            <span>25</span>
                                            <span>0</span>
                                        </div>

                                        {/* Chart area */}
                                        <div className="ml-8 h-full flex items-end justify-between space-x-3 pb-6">
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="w-12 h-16 bg-cyan-400 rounded-t-lg flex items-end justify-center pb-1">
                                                    <span className="text-xs text-white font-medium">45</span>
                                                </div>
                                                <span className="text-xs text-gray-600">Revenue</span>
                                            </div>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="w-12 h-20 bg-cyan-500 rounded-t-lg flex items-end justify-center pb-1">
                                                    <span className="text-xs text-white font-medium">60</span>
                                                </div>
                                                <span className="text-xs text-gray-600">Expense</span>
                                            </div>
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="w-12 h-12 bg-cyan-300 rounded-t-lg flex items-end justify-center pb-1">
                                                    <span className="text-xs text-white font-medium">35</span>
                                                </div>
                                                <span className="text-xs text-gray-600">Profit</span>
                                            </div>
                                        </div>
                                    </div>
                                </ChartCard>

                                <ChartCard title="Students Strength">
                                    <div className="h-40 relative">
                                        {/* Y-axis labels */}
                                        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                                            <span>100</span>
                                            <span>75</span>
                                            <span>50</span>
                                            <span>25</span>
                                            <span>0</span>
                                        </div>

                                        {/* Chart area */}
                                        <div className="ml-8 h-full flex items-end justify-between space-x-1 pb-6">
                                            {[60, 85, 70, 80, 45, 75].map((height, i) => (
                                                <div key={i} className="flex flex-col items-center space-y-2">
                                                    <div
                                                        className="bg-green-400 rounded-t-lg w-8 transition-all duration-300 hover:bg-green-500 flex items-end justify-center pb-1"
                                                        style={{ height: `${(height / 100) * 120}px` }}
                                                    >
                                                        <span className="text-xs text-white font-medium">{height}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-600">
                                                        {['1st', '2nd', '3rd', '4th', '5th', '6th'][i]}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ChartCard>
                            </div>

                            {/* Pie Charts */}
                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <ChartCard title="Revenue">
                                    <div className="flex items-center justify-between">
                                        <div className="relative w-32 h-32">
                                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#10B981"
                                                    strokeWidth="10"
                                                    strokeDasharray={`${46 * 2.51} ${100 * 2.51}`}
                                                    strokeDashoffset="0"
                                                    transform="rotate(-90 50 50)"
                                                />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#3B82F6"
                                                    strokeWidth="10"
                                                    strokeDasharray={`${25 * 2.51} ${100 * 2.51}`}
                                                    strokeDashoffset={`-${46 * 2.51}`}
                                                    transform="rotate(-90 50 50)"
                                                />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#06B6D4"
                                                    strokeWidth="10"
                                                    strokeDasharray={`${16 * 2.51} ${100 * 2.51}`}
                                                    strokeDashoffset={`-${71 * 2.51}`}
                                                    transform="rotate(-90 50 50)"
                                                />
                                            </svg>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                <span>Admission</span>
                                                <span className="font-semibold">46%</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                                                <span>Donation</span>
                                                <span className="font-semibold">25%</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                <span>Others</span>
                                                <span className="font-semibold">16%</span>
                                            </div>
                                        </div>
                                    </div>
                                </ChartCard>

                                <ChartCard title="Expense">
                                    <div className="flex items-center justify-between">
                                        <div className="relative w-32 h-32">
                                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#10B981"
                                                    strokeWidth="10"
                                                    strokeDasharray={`${46 * 2.51} ${100 * 2.51}`}
                                                    strokeDashoffset="0"
                                                    transform="rotate(-90 50 50)"
                                                />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#3B82F6"
                                                    strokeWidth="10"
                                                    strokeDasharray={`${25 * 2.51} ${100 * 2.51}`}
                                                    strokeDashoffset={`-${46 * 2.51}`}
                                                    transform="rotate(-90 50 50)"
                                                />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="40"
                                                    fill="none"
                                                    stroke="#06B6D4"
                                                    strokeWidth="10"
                                                    strokeDasharray={`${16 * 2.51} ${100 * 2.51}`}
                                                    strokeDashoffset={`-${71 * 2.51}`}
                                                    transform="rotate(-90 50 50)"
                                                />
                                            </svg>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                <span>Salary</span>
                                                <span className="font-semibold">46%</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                                                <span>Maintance</span>
                                                <span className="font-semibold">25%</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                <span>Others</span>
                                                <span className="font-semibold">16%</span>
                                            </div>
                                        </div>
                                    </div>
                                </ChartCard>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-span-4 space-y-6">
                            {/* Calendar */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-800">{selectedMonth}</h3>
                                    <div className="flex items-center space-x-1">
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <ChevronLeft size={16} className="text-gray-600" />
                                        </button>
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <ChevronRight size={16} className="text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                        <div key={day} className="text-xs text-gray-500 text-center py-1 font-medium">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-1">
                                    {calendarDays.flat().map((day, index) => (
                                        <div
                                            key={index}
                                            className={`text-center py-2 text-sm cursor-pointer rounded-lg transition-colors ${day === 19
                                                ? 'bg-blue-600 text-white'
                                                : day
                                                    ? 'hover:bg-gray-100 text-gray-700'
                                                    : 'text-gray-300'
                                                }`}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Notice Board */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-800">Notice Board</h3>
                                    <span className="text-sm text-blue-600 cursor-pointer hover:underline">View all</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Bell size={16} className="text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 text-sm">Sports Day Announcement</p>
                                            <p className="text-xs text-gray-600 mt-1">The school's Annual Sports Day will be held on Sep 7, 2022. They can showcase...</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Bell size={16} className="text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 text-sm">Sports Day Announcement</p>
                                            <p className="text-xs text-gray-600 mt-1">The school's Annual Sports Day will be held on Sep 7, 2022. They can showcase...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-800">Messages</h3>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MessageSquare size={20} />
                                    </button>
                                </div>

                                <div className="space-y-3 max-h-[76vh] overflow-y-auto scrollbar-hide">
                                    {messages.map((msg, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                                                {msg.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-800 text-sm truncate">{msg.name}</p>
                                                {msg.message && (
                                                    <p className="text-xs text-gray-600 truncate">{msg.message}</p>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-500 flex-shrink-0">{msg.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;