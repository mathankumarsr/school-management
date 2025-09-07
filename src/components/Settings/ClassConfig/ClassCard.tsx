import React from 'react';
import type { ClassData } from '../../../utils/types';

interface ClassCardProps {
  classData: ClassData;
  onEdit: (classData: ClassData) => void;
  onView: (classData: ClassData) => void;
  onDelete: (id: string) => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({
  classData,
  onEdit,
  onView,
  onDelete,
}) => {
  const totalCapacity = classData.sections.reduce((sum, section) => sum + section.capacity, 0);
  const totalStudents = classData.sections.reduce((sum, section) => sum + section.currentStudents, 0);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-lg">{classData.gradeName}</h4>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            classData.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {classData.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="space-y-2 mb-3">
        <p className="text-sm text-gray-600">
          Sections: {classData.sections.map(s => s.name).join(', ')}
        </p>
        <p className="text-sm text-gray-600">
          Students: {totalStudents}/{totalCapacity}
        </p>
        <p className="text-sm text-gray-600">
          Academic Year: {classData.academicYear}
        </p>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onView(classData)}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          View
        </button>
        <button
          onClick={() => onEdit(classData)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(classData.id)}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
