import React, { useState } from 'react';
import { Check, Menu } from 'lucide-react';

const LayoutConfig = () => {
  const [mandatoryFields, setMandatoryFields] = useState({
    'Mobile no': true,
    'Student Name': true,
    'Date of Birth': true,
    'Gender': true,
    'Blood Group': true,
    'Aadhar Number': false,
    'Religion': false,
    'Community': false,
    'Mother Tongue': false,
    'Nationality': false,
    'Previous School': false,
    'Previous Class': false,
    'Previous Mark %': false,
    'Admission for Class': false,
    'Father\'s Name': false,
    'Father\'s Occupation': false,
    'Father\'s Phone Number': false,
    'Father\'s Email': false,
    'Mother\'s Name': false,
    'Mother\'s Occupation': false,
    'Mother\'s Phone Number': false,
    'Mother\'s Email': false,
    'Address': false,
    'City': false,
    'State': false,
    'Pincode': false,
    'Contact Name': false,
    'Contact Phone Number': false,
    'Relation': false
  });

  const [mandatoryCount, setMandatoryCount] = useState(5);

  const toggleField = (fieldName) => {
    const newFields = { ...mandatoryFields };
    const currentlyChecked = Object.values(newFields).filter(val => val).length;
    
    if (newFields[fieldName] && currentlyChecked <= 1) {
      // Don't allow unchecking if it's the last checked item
      return;
    }
    
    newFields[fieldName] = !newFields[fieldName];
    setMandatoryFields(newFields);
    
    const newCount = Object.values(newFields).filter(val => val).length;
    setMandatoryCount(newCount);
  };

  const handleCountChange = (e) => {
    const newCount = parseInt(e.target.value);
    setMandatoryCount(newCount);
    
    // Auto-select first N fields when count changes
    const fieldNames = Object.keys(mandatoryFields);
    const newFields = {};
    fieldNames.forEach((field, index) => {
      newFields[field] = index < newCount;
    });
    setMandatoryFields(newFields);
  };

  const mandatoryFieldsList = [
    'Mobile no', 'Student Name', 'Date of Birth', 'Gender'
  ];

  const nonMandatoryFieldsList = [
    'Blood Group', 'Aadhar Number', 'Religion', 'Community', 
    'Mother Tongue', 'Nationality', 'Previous School', 'Previous Class',
    'Previous Mark %', 'Admission for Class', 'Father\'s Name', 
    'Father\'s Occupation', 'Father\'s Phone Number', 'Father\'s Email',
    'Mother\'s Name', 'Mother\'s Occupation', 'Mother\'s Phone Number', 
    'Mother\'s Email', 'Address', 'City', 'State', 'Pincode',
    'Contact Name', 'Contact Phone Number', 'Relation'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 p-8">
        {/* Mandatory Demographics Fields */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-800">Mandatory Demographics Fields</h2>
            <span className="text-sm text-gray-500">Preview</span>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mandatoryFieldsList.map((field, index) => (
                <div key={field} className="flex flex-col">
                  <input
                    type="text"
                    placeholder={`${field}*`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Non Mandatory Demographics Fields */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-800">Non Mandatory Demographics Fields</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {nonMandatoryFieldsList.map((field) => (
                <div key={field} className="flex flex-col">
                  <input
                    type="text"
                    placeholder={field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Configuration Panel */}
      <div className="w-96 bg-white shadow-lg border-l border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-6">Demographics</h3>
          
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-medium text-gray-700">Mandatory Fields</span>
              <select 
                value={mandatoryCount.toString().padStart(2, '0')} 
                onChange={handleCountChange}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
                    {(i + 1).toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              (System will take the first {mandatoryCount} fields as mandatory fields)
            </p>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {Object.entries(mandatoryFields).map(([field, isChecked]) => (
              <div key={field} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <Menu className="w-4 h-4 text-gray-400" />
                <div 
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer ${
                    isChecked 
                      ? 'bg-teal-500 border-teal-500' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => toggleField(field)}
                >
                  {isChecked && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-gray-700 flex-1">
                  {field}{field.includes('Mobile no') || field.includes('Student Name') || field.includes('Date of Birth') || field.includes('Gender') ? '*' : ''}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              RESET
            </button>
            <button className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutConfig;