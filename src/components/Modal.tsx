import React, { useState, useEffect } from 'react';
import type { ClassData, CreateClassRequest, ClassSection } from '../utils/types';

interface ClassFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateClassRequest) => void;
  editData?: ClassData | null;
  isLoading: boolean;
}

export const ClassFormModal: React.FC<ClassFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editData,
  isLoading,
}) => {
  const [formData, setFormData] = useState<CreateClassRequest>({
    grade: '',
    gradeName: '',
    sections: [{ name: 'A', capacity: 30, currentStudents: 0 }],
    academicYear: new Date().getFullYear().toString(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editData) {
      setFormData({
        grade: editData.grade,
        gradeName: editData.gradeName,
        sections: editData.sections.map(({ id, ...section }) => section),
        academicYear: editData.academicYear,
      });
    } else {
      setFormData({
        grade: '',
        gradeName: '',
        sections: [{ name: 'A', capacity: 30, currentStudents: 0 }],
        academicYear: new Date().getFullYear().toString(),
      });
    }
    setErrors({});
  }, [editData, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.grade.trim()) {
      newErrors.grade = 'Grade is required';
    }

    if (!formData.gradeName.trim()) {
      newErrors.gradeName = 'Grade name is required';
    }

    if (!formData.academicYear.trim()) {
      newErrors.academicYear = 'Academic year is required';
    }

    if (formData.sections.length === 0) {
      newErrors.sections = 'At least one section is required';
    }

    formData.sections.forEach((section, index) => {
      if (!section.name.trim()) {
        newErrors[`section_${index}_name`] = 'Section name is required';
      }
      if (section.capacity <= 0) {
        newErrors[`section_${index}_capacity`] = 'Capacity must be greater than 0';
      }
      if (section.currentStudents < 0) {
        newErrors[`section_${index}_students`] = 'Current students cannot be negative';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { name: '', capacity: 30, currentStudents: 0 }],
    }));
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const updateSection = (index: number, field: keyof ClassSection, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm shadow-2xl bg-black flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editData ? 'Edit Class' : 'Create New Class'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class *
              </label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.grade ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 1, 2, 3..."
                disabled={isLoading}
              />
              {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Name *
              </label>
              <input
                type="text"
                value={formData.gradeName}
                onChange={(e) => setFormData(prev => ({ ...prev, gradeName: e.target.value }))}
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.gradeName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Grade 1, First Grade..."
                disabled={isLoading}
              />
              {errors.gradeName && <p className="text-red-500 text-xs mt-1">{errors.gradeName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Academic Year *
            </label>
            <input
              type="text"
              value={formData.academicYear}
              onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
              className={`w-full border rounded-md px-3 py-2 ${
                errors.academicYear ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 2024-2025"
              disabled={isLoading}
            />
            {errors.academicYear && <p className="text-red-500 text-xs mt-1">{errors.academicYear}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Sections *
              </label>
              <button
                type="button"
                onClick={addSection}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                disabled={isLoading}
              >
                + Add Section
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Section {index + 1}</span>
                    {formData.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => updateSection(index, 'name', e.target.value)}
                        placeholder="Section name (A, B, C...)"
                        className={`w-full border rounded px-2 py-1 text-sm ${
                          errors[`section_${index}_name`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isLoading}
                      />
                      {errors[`section_${index}_name`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`section_${index}_name`]}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="number"
                        value={section.capacity}
                        onChange={(e) => updateSection(index, 'capacity', parseInt(e.target.value) || 0)}
                        placeholder="Capacity"
                        min="1"
                        className={`w-full border rounded px-2 py-1 text-sm ${
                          errors[`section_${index}_capacity`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isLoading}
                      />
                      {errors[`section_${index}_capacity`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`section_${index}_capacity`]}</p>
                      )}
                    </div>
                    
                    <div>
                      <input
                        type="number"
                        value={section.currentStudents}
                        onChange={(e) => updateSection(index, 'currentStudents', parseInt(e.target.value) || 0)}
                        placeholder="Current students"
                        min="0"
                        className={`w-full border rounded px-2 py-1 text-sm ${
                          errors[`section_${index}_students`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isLoading}
                      />
                      {errors[`section_${index}_students`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`section_${index}_students`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.sections && <p className="text-red-500 text-xs mt-1">{errors.sections}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (editData ? 'Update Class' : 'Create Class')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};