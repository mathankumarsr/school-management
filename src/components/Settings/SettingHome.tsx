import React, { useState } from 'react';
import { Settings, Building2, GraduationCap, Users, Book, UserPlus, MapPin, FileText, Award, Activity, Calendar, MessageSquare, DollarSign, Shield, User, Globe, ChevronRight, Save, X, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ModalType = 'school-config' | 'teacher-config' | 'class-config' | 'subject-config' | 'referral-config' | 'classroom-config' | 'exam-config' | 'certificates-config' | 'activities-config' | 'attendance-config' | 'message-config' | 'fees-config' | 'admission-config' | 'staff-config' | 'security-config' | 'api-config';

interface ConfigCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  onClick: () => void;
}

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  options?: string[];
}

const SettingHome = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const navigate = useNavigate()

  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const ConfigCard: React.FC<ConfigCardProps> = ({ icon: Icon, title, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 min-h-[140px] flex flex-col items-center justify-center text-center"
    >
      <div className="bg-gray-100 p-4 rounded-lg mb-3">
        <Icon className="w-8 h-8 text-gray-600" />
      </div>
      <h3 className="text-sm font-medium text-gray-800 leading-tight">{title}</h3>
    </div>
  );

  return (
    <div className="flex-1 px-8 py-8">
      {/* School Configuration Section */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">School Configuration</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <ConfigCard
            icon={Building2}
            title="School Configuration"
            onClick={() => navigate("/school-config")}
          />
          <ConfigCard
            icon={GraduationCap}
            title="Teacher Configuration"
            onClick={() => openModal('teacher-config')}
          />
          <ConfigCard
            icon={Users}
            title="Class Configuration"
            onClick={() => openModal('class-config')}
          />
          <ConfigCard
            icon={Book}
            title="Subject Configuration"
            onClick={() => openModal('subject-config')}
          />
          <ConfigCard
            icon={UserPlus}
            title="Referral Configuration"
            onClick={() => openModal('referral-config')}
          />
          <ConfigCard
            icon={MapPin}
            title="Classroom Configuration"
            onClick={() => openModal('classroom-config')}
          />
          <ConfigCard
            icon={FileText}
            title="Exam Configuration"
            onClick={() => openModal('exam-config')}
          />
          <ConfigCard
            icon={Award}
            title="Certificates Configuration"
            onClick={() => openModal('certificates-config')}
          />
          <ConfigCard
            icon={Activity}
            title="Activities Configuration"
            onClick={() => openModal('activities-config')}
          />
          <ConfigCard
            icon={Calendar}
            title="Attendance Configuration"
            onClick={() => openModal('attendance-config')}
          />
          <ConfigCard
            icon={MessageSquare}
            title="Message Configuration"
            onClick={() => openModal('message-config')}
          />
        </div>
      </section>

      {/* Fees and Admission Configuration */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Fees and Admission Configuration</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <ConfigCard
            icon={DollarSign}
            title="Fees Configuration"
            onClick={() => openModal('fees-config')}
          />
          <ConfigCard
            icon={UserPlus}
            title="Admission Configuration"
            onClick={() => openModal('admission-config')}
          />
        </div>
      </section>

      {/* Employee Configuration */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Employee Configuration</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <ConfigCard
            icon={Users}
            title="Staff Configuration"
            onClick={() => openModal('staff-config')}
          />
        </div>
      </section>

      {/* Security and Privacy Configuration */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Security and Privacy Configuration</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <ConfigCard
            icon={Shield}
            title="Security Configuration"
            onClick={() => openModal('security-config')}
          />
          <ConfigCard
            icon={Globe}
            title="API Configuration"
            onClick={() => openModal('api-config')}
          />
        </div>
      </section>
    </div>
  );
};

export default SettingHome;