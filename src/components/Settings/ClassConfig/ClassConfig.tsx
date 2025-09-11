
// const ClassConfig = () => {
//     return (
//         <div className="space-y-6">
//             <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-medium">Class Management</h3>
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
//                     Add New Class
//                 </button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'].map((grade, index) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4">
//                         <h4 className="font-medium mb-2">{grade}</h4>
//                         <p className="text-sm text-gray-600 mb-3">Sections: A, B, C</p>
//                         <div className="flex space-x-2">
//                             <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
//                             <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default ClassConfig
import React, { useState } from 'react';
import { ClassCard } from './ClassCard';
import { ClassFormModal } from './ClassFormModal';
import { ClassViewModal } from './ClassViewModal';
import {
  useGetClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} from '../../../api/classApi';
import type { ClassData, CreateClassRequest, ApiError } from '../../../utils/types';
import SettingsTabs from '../SettingsTabs';

export const ClassConfig: React.FC = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassData | null>(null);
  const [viewingClass, setViewingClass] = useState<ClassData | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // RTK Query hooks
  const {
    data: classesResponse,
    error: fetchError,  
    isLoading: isFetchingClasses,
    refetch,
  } = useGetClassesQuery();

  const [createClass, { isLoading: isCreating }] = useCreateClassMutation();
  const [updateClass, { isLoading: isUpdating }] = useUpdateClassMutation();
  const [deleteClass, { isLoading: isDeleting }] = useDeleteClassMutation();

  const classes = classesResponse?.data || [];

  // Error handling utility
  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'data' in error) {
      const apiError = error as ApiError;
      return apiError.data?.message || 'An error occurred';
    }
    return 'An unexpected error occurred';
  };

  // Handle create/edit form submission
  const handleFormSubmit = async (formData: CreateClassRequest) => {
    try {
      if (editingClass) {
        await updateClass({
          id: editingClass.id,
          ...formData,
        }).unwrap();
      } else {
        await createClass(formData).unwrap();
      }
      setIsFormModalOpen(false);
      setEditingClass(null);
    } catch (error) {
      console.error('Failed to save class:', error);
      alert(getErrorMessage(error));
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this class?')) {
      return;
    }

    try {
      await deleteClass(id).unwrap();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete class:', error);
      alert(getErrorMessage(error));
    }
  };

  // Modal handlers
  const handleEdit = (classData: ClassData) => {
    setEditingClass(classData);
    setIsFormModalOpen(true);
  };

  const handleView = (classData: ClassData) => {
    setViewingClass(classData);
    setIsViewModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingClass(null);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEditingClass(null);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingClass(null);
  };

  // Loading state
  if (isFetchingClasses) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Class Management</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading classes...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (fetchError) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Class Management</h3>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="text-red-800">
              <h4 className="font-medium">Error loading classes</h4>
              <p className="mt-1 text-sm">{getErrorMessage(fetchError)}</p>
              <button
                onClick={() => refetch()}
                className="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
       <SettingsTabs />
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={isCreating || isUpdating || isDeleting}
        >
          Add New Class
        </button>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📚</div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No classes yet</h4>
          <p className="text-gray-600 mb-4">Get started by creating your first class</p>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create First Class
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((classData) => (
            <ClassCard
              key={classData.id}
              classData={classData}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      <ClassFormModal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        onSubmit={handleFormSubmit}
        editData={editingClass}
        isLoading={isCreating || isUpdating}
      />

      {/* View Modal */}
      <ClassViewModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        classData={viewingClass}
      />
    </div>
  );
};

export default ClassConfig;