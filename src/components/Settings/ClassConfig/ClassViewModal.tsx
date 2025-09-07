import React from 'react';
import type { ClassData } from '../../../utils/types'

interface ClassViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassData | null;
}

export const ClassViewModal: React.FC<ClassViewModalProps> = ({
  isOpen,
  onClose,
  classData,
}) => {
  if (!isOpen || !classData) return null;

  const totalCapacity = classData.sections.reduce((sum, section) => sum + section.capacity, 0);
  const totalStudents = classData.sections.reduce((sum, section) => sum + section.currentStudents, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Class Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Basic Information</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <p><span className="font-medium">Grade:</span> {classData.grade}</p>
                <p><span className="font-medium">Grade Name:</span> {classData.gradeName}</p>
                <p><span className="font-medium">Academic Year:</span> {classData.academicYear}</p>
                <p>
                  <span className="font-medium">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      classData.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {classData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Statistics</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <p><span className="font-medium">Total Sections:</span> {classData.sections.length}</p>
                <p><span className="font-medium">Total Capacity:</span> {totalCapacity}</p>
                <p><span className="font-medium">Current Students:</span> {totalStudents}</p>
                <p><span className="font-medium">Available Seats:</span> {totalCapacity - totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Sections</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Section
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Capacity
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Current Students
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Available
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Utilization
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {classData.sections.map((section) => {
                    const utilization = Math.round((section.currentStudents / section.capacity) * 100);
                    return (
                      <tr key={section.id}>
                        <td className="px-4 py-2 font-medium">{section.name}</td>
                        <td className="px-4 py-2">{section.capacity}</td>
                        <td className="px-4 py-2">{section.currentStudents}</td>
                        <td className="px-4 py-2">{section.capacity - section.currentStudents}</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  utilization >= 90
                                    ? 'bg-red-500'
                                    : utilization >= 75
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                                }`}
                                style={{ width: `${utilization}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600">{utilization}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Timestamps</h3>
            <div className="bg-gray-50 p-3 rounded-md text-sm">
              <p><span className="font-medium">Created:</span> {new Date(classData.createdAt).toLocaleString()}</p>
              <p><span className="font-medium">Last Updated:</span> {new Date(classData.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};