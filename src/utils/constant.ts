import {
    Settings, School, Users, GraduationCap, DollarSign,
    Calendar, BookOpen, Award, Activity, FileText,
    Bell, Shield, Palette, Globe, Database, Mail,
    Building2,
    Book,
    UserPlus,
    MapPin,
    MessageSquare,
    Building
} from 'lucide-react';

export const SchoolConfigList = [
    {
        id: 'school-config',
        label: 'School Configuration',
        icon: Building2,
        pathname: "/settings/school-config"
    },
    {
        id: 'classes',
        label: 'Class Configuration',
        icon: Users,
        pathname: "/settings/class-config"
    },
    {
        id: 'employees',
        label: 'Empolyee Configuration',
        icon: GraduationCap,
        pathname: "/settings/employee-config"
    },
    {
        id: 'subjects',
        label: 'Subject Configuration',
        icon: Book,
        pathname: "/settings/subject-config"
    },
    {
        id: 'referral',
        label: 'Referral Configuration',
        icon: UserPlus,
        pathname: "/settings/referral-config"
    },
    {
        id: 'classroom',
        label: 'Classroom Configuration',
        icon: MapPin,
        pathname: "/settings/classroom-config"
    },
    {
        id: 'message',
        label: 'Message Configuration',
        icon: MessageSquare,
        pathname: "/settings/message-config"
    },
];

export const AdmissionConfigList = [
    {
        id: 'fee-config',
        label: 'Fees Configuration',
        icon: DollarSign,
        pathname: "/settings/fees-config"
    },
    // {
    //     id: 'admission-config',
    //     label: 'Admission Configuration',
    //     icon: UserPlus,
    //     pathname: "/settings/admission-config"
    // },
]
export const UserConfigList = [
    {
        id: 'user-details',
        label: 'User Details',
        icon: Users,
        pathname: "/settings/user-details"
    },
    {
        id: 'user-details',
        label: 'Module Access',
        icon: Building2,
        pathname: "/settings/module-access"
    },
    {
        id: 'user-details',
        label: 'Screen Permission',
        icon: Building,
        pathname: "/settings/screen-access"
    },
]