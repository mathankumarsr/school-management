import { useState } from 'react'
import {
    LayoutDashboard,
    GraduationCap,
    DollarSign,
    Users,
    UserCheck,
    BookOpen,
    Clock,
    FileText,
    Award,
    Activity,
    BarChart3,
    Settings,
    Ticket,
    Search,
    Bell,
    MessageSquare,
    X,
    Menu
} from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';


const Layout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const notifications = [
        { id: 1, title: 'New Student Registration', message: 'John Doe has completed admission process', time: '2 min ago', unread: true },
        { id: 2, title: 'Fee Payment Received', message: 'Payment of $500 received from Class 10A', time: '15 min ago', unread: true },
        { id: 3, title: 'Staff Meeting', message: 'Monthly staff meeting scheduled for tomorrow', time: '1 hour ago', unread: false },
        { id: 4, title: 'Exam Results', message: 'Class 12 exam results are ready for review', time: '2 hours ago', unread: false },
    ];
    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true, path: '/' },
        { icon: GraduationCap, label: 'Admission', path: '/admission' },
        { icon: DollarSign, label: 'Fees', path: '/fees' },
        { icon: Users, label: 'Students', path: '/students' },
        { icon: UserCheck, label: 'Employees', path: '/employees' },
        { icon: BookOpen, label: 'Exams', path: '/exams' },
        { icon: Clock, label: 'Time Table', path: '/timeTable' },
        { icon: FileText, label: 'Syllabus', path: '/syllabus' },
        { icon: Award, label: 'Certificates', path: '/certificate' },
        { icon: Activity, label: 'Activities', path: '/activities' },
        { icon: BarChart3, label: 'Reports', path: '/reports' },
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: Ticket, label: 'Tickets', path: '/tickets' }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="hidden md:block bg-blue-600 text-white p-6 overflow-auto scrollbar-hide w-auto 2xl:w-[250px]">
                <div className="flex items-center mb-8">
                    <div className="w-8 h-8 bg-white rounded-full mr-3"></div>
                    <span className="text-xl font-bold">SV SCHOOL</span>
                </div>

                <nav className="space-y-2 h-[80vh] overflow-y-auto scrollbar-hide">
                    {sidebarItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-3 px-4 2xl:px-8 py-3 rounded-xl cursor-pointer transition-colors ${location.pathname === item.path || (location.pathname?.includes(item.path) && item.path !== "/") ? 'bg-white text-blue-600' : 'hover:bg-blue-500'
                                }`}
                            onClick={() => navigate(item.path)}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </div>
                    ))}
                </nav>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/40"
                        onClick={() => setIsOpen(false)}
                    />
                    {/* Drawer content */}
                    <div className="relative bg-blue-600 text-white w-64 p-6 z-50">
                        <button
                            className="absolute top-4 right-4"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center mb-8">
                            <div className="w-8 h-8 bg-white rounded-full mr-3"></div>
                            <span className="text-xl font-bold">SV SCHOOL</span>
                        </div>

                        <nav className="space-y-2">
                            {sidebarItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${location.pathname === item.path ||
                                        (location.pathname?.includes(item.path) &&
                                            item.path !== "/")
                                        ? "bg-white text-blue-600"
                                        : "hover:bg-blue-500"
                                        }`}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsOpen(false);
                                    }}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-auto">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                                            <button className='block md:hidden' onClick={() => setIsOpen(true)}>
                        <Menu size={24} />
                    </button>
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors w-80"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="hidden lg:block text-gray-600 font-medium">Welcome Back</span>
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                                >
                                    <Bell size={20} />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                        2
                                    </span>
                                </button>

                                {/* Notification Popup */}
                                {showNotifications && (
                                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-800">Notifications</h3>
                                                <button
                                                    onClick={() => setShowNotifications(false)}
                                                    className="text-gray-400 hover:text-gray-600"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <div key={notification.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${notification.unread ? 'bg-blue-50' : ''}`}>
                                                    <div className="flex items-start space-x-3">
                                                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-800 text-sm">{notification.title}</p>
                                                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 border-t border-gray-100">
                                            <button className="text-blue-600 text-sm font-medium hover:underline w-full text-center">
                                                View all notifications
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <MessageSquare className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                            <Settings className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
                            <div className="w-8 h-8 bg-amber-400 rounded-full"></div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto scrollbar-hide">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default Layout