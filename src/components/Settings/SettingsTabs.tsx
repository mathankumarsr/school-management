import {
    MoveLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AdmissionConfigList, LayoutConfigList, SchoolConfigList, UserConfigList } from '../../utils/constant';
import { useSelector } from 'react-redux';

const SettingsTabs = () => {
    const navigate = useNavigate()
    const { selectedSettingSection } = useSelector((state: any) => state.settings);
    const tabsList = selectedSettingSection === "admissionConfig" ? AdmissionConfigList : selectedSettingSection === "userConfig" ? UserConfigList : selectedSettingSection === "layoutConfig" ? LayoutConfigList : SchoolConfigList

    return (
        <div className="sticky top-0">
            <div className="">
                <div className="bg-white rounded-lg shadow-md">
                    {/* Header */}
                    <div className="flex flex-col">
                        <div className="border-b border-gray-200 flex items-center px-4">
                            <MoveLeft className='w-6 h-6 cursor-pointer' onClick={() => navigate("/settings")}/>
                            <nav className="flex space-x-6 overflow-x-auto scrollbar-hide px-4">
                                {tabsList.map((tab) => {
                                    const IconComponent = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => navigate(tab.pathname)}
                                            className={`flex whitespace-nowrap cursor-pointer items-center space-x-2 py-3 text-sm font-medium transition-colors border-b-2 ${window.location.pathname === tab.pathname
                                                ? 'border-blue-600 text-blue-600'
                                                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                                }`}
                                        >
                                            <IconComponent className="w-4 h-4" />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsTabs;