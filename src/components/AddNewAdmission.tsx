import { useState } from 'react';
import {
    ArrowLeft,
    Save,
    X
} from 'lucide-react';
import { useAddAdmissionMutation, useUpdateAdmissionMutation } from '../api/admissionsApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from './common/Button';
import Input from './common/Input';
import Select from './common/Select';
const AddNewAdmission = () => {
    const [addAdmission, { isLoading }] = useAddAdmissionMutation();
    const navigate = useNavigate()
    const [updateAdmission] = useUpdateAdmissionMutation();

    const [formData, setFormData] = useState({
        id: null,
        // Student Basic Info
        studentName: '',
        dob: '',
        gender: '',
        bloodGroup: '',
        aadharNumber: '',
        religion: '',
        community: '',
        motherTongue: '',
        nationality: '',

        // Academic Info
        previousSchool: '',
        previousClass: '',
        prevMarkPercentage: '',
        admissionClass: '',

        // Parent/Guardian Info
        fatherName: '',
        fatherOccupation: '',
        fatherPhone: '',
        fatherEmail: '',
        motherName: '',
        motherOccupation: '',
        motherPhone: '',
        motherEmail: '',

        // Address
        address: '',
        city: '',
        state: '',
        pincode: '',

        // Emergency Contact
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: ''
    });

    const genderOption = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
    ]

    const bloodGroupOption = [
        { label: "A+", value: "A+" },
        { label: "A-", value: "A-" },
        { label: "B+", value: "B+" },
        { label: "B-", value: "B-" },
        { label: "AB+", value: "AB+" },
        { label: "AB-", value: "AB-" },
        { label: "O+", value: "O+" },
        { label: "O-", value: "O-" },
    ]

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const payload = {
            student_name: formData.studentName,
            dob: formData.dob,
            gender: formData.gender,
            blood_group: formData.bloodGroup,
            aadhar_number: formData.aadharNumber,
            religion: formData.religion,
            community: formData.community,
            mother_tongue: formData.motherTongue,
            nationality: formData.nationality,
            previous_school: formData.previousSchool,
            previous_class: formData.previousClass,
            prev_mark_percentage: formData.prevMarkPercentage,
            admission_class: formData.admissionClass,
            father_name: formData.fatherName,
            father_occupation: formData.fatherOccupation,
            father_phone: formData.fatherPhone,
            father_email: formData.fatherEmail,
            mother_name: formData.motherName,
            mother_occupation: formData.motherOccupation,
            mother_phone: formData.motherPhone,
            mother_email: formData.motherEmail,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            emergency_contact_name: formData.emergencyContactName,
            emergency_contact_phone: formData.emergencyContactPhone,
            emergency_contact_relation: formData.emergencyContactRelation,
        };

        try {
            let response;
            if (formData.id) {
                response = await updateAdmission({ id: formData.id, data: payload }).unwrap();
            } else {
                response = await addAdmission(payload).unwrap();
            }
            toast.success(response?.message || "Student added successfully");
            setFormData({
                id: null,
                studentName: '',
                dob: '',
                gender: '',
                bloodGroup: '',
                aadharNumber: '',
                religion: '',
                community: '',
                motherTongue: '',
                nationality: '',
                previousSchool: '',
                previousClass: '',
                prevMarkPercentage: '',
                admissionClass: '',
                fatherName: '',
                fatherOccupation: '',
                fatherPhone: '',
                fatherEmail: '',
                motherName: '',
                motherOccupation: '',
                motherPhone: '',
                motherEmail: '',
                address: '',
                city: '',
                state: '',
                pincode: '',
                emergencyContactName: '',
                emergencyContactPhone: '',
                emergencyContactRelation: ''
            });
            navigate("/admission")
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to add student");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md m-4">
            <div className="p-6 sticky bg-white top-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/admission")}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800">Create New Admission</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 pt-0">
                {/* Student Basic Information */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Student Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
                            <Input
                                type="text"
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                            <Input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                            <Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                options={genderOption}
                                required
                            />
                            
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                            <Select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleInputChange}
                                options={bloodGroupOption}
                            />
            
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                            <Input
                                type="text"
                                name="aadharNumber"
                                value={formData.aadharNumber}
                                onChange={handleInputChange}
                                placeholder="xxxx-xxxx-xxxx"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                            <Input
                                type="text"
                                name="religion"
                                value={formData.religion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Community *</label>
                            <select
                                name="community"
                                value={formData.community}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Community</option>
                                <option value="General">General</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mother Tongue</label>
                            <Input
                                type="text"
                                name="motherTongue"
                                value={formData.motherTongue}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                            <Input
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                                defaultValue="Indian"
                            />
                        </div>
                    </div>
                </div>

                {/* Academic Information */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Academic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Previous School</label>
                            <Input
                                type="text"
                                name="previousSchool"
                                value={formData.previousSchool}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Previous Class</label>
                            <select
                                name="previousClass"
                                value={formData.previousClass}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Class</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Previous Mark % *</label>
                            <Input
                                type="text"
                                name="prevMarkPercentage"
                                value={formData.prevMarkPercentage}
                                onChange={handleInputChange}
                                placeholder="85%"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Admission for Class *</label>
                            <select
                                name="admissionClass"
                                value={formData.admissionClass}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Class</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i} value={`Class ${i + 1}`}>Class {i + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Father's Information */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Father's Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name *</label>
                            <Input
                                type="text"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                            <Input
                                type="text"
                                name="fatherOccupation"
                                value={formData.fatherOccupation}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                            <Input
                                type="tel"
                                name="fatherPhone"
                                value={formData.fatherPhone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input
                                type="email"
                                name="fatherEmail"
                                value={formData.fatherEmail}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Mother's Information */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Mother's Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name *</label>
                            <Input
                                type="text"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                            <Input
                                type="text"
                                name="motherOccupation"
                                value={formData.motherOccupation}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <Input
                                type="tel"
                                name="motherPhone"
                                value={formData.motherPhone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input
                                type="email"
                                name="motherEmail"
                                value={formData.motherEmail}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                            <Input
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows={3}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                            <Input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                            <Input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                            <Input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                            <Input
                                type="text"
                                name="emergencyContactName"
                                value={formData.emergencyContactName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <Input
                                type="tel"
                                name="emergencyContactPhone"
                                value={formData.emergencyContactPhone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                            <Input
                                type="text"
                                name="emergencyContactRelation"
                                value={formData.emergencyContactRelation}
                                onChange={handleInputChange}
                                placeholder="Uncle, Aunt, etc."
                            />
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-4 sticky bottom-0 pb-[10px] bg-white">
                    <Button
                        variant='outline'
                        type="button"
                        onClick={() => navigate("/admission")}
                        icon={X}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='primary'
                        type="submit"
                        icon={Save}
                    >
                        {isLoading ? "Loading" : "Save Admission"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddNewAdmission