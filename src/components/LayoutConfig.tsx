import { useState } from "react";
import { Check, Menu } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SettingsTabs from "./Settings/SettingsTabs";

const LayoutConfig = () => {
  const [fields, setFields] = useState([
    { name: "Mobile no", mandatory: true },
    { name: "Student Name", mandatory: true },
    { name: "Date of Birth", mandatory: true },
    { name: "Gender", mandatory: true },
    { name: "Blood Group", mandatory: false },
    { name: "Aadhar Number", mandatory: false },
    { name: "Religion", mandatory: false },
    { name: "Community", mandatory: false },
    { name: "Mother Tongue", mandatory: false },
    { name: "Nationality", mandatory: false },
    { name: "Previous School", mandatory: false },
    { name: "Previous Class", mandatory: false },
    { name: "Previous Mark %", mandatory: false },
    { name: "Admission for Class", mandatory: false },
    { name: "Father's Name", mandatory: false },
    { name: "Father's Occupation", mandatory: false },
    { name: "Father's Phone Number", mandatory: false },
    { name: "Father's Email", mandatory: false },
    { name: "Mother's Name", mandatory: false },
    { name: "Mother's Occupation", mandatory: false },
    { name: "Mother's Phone Number", mandatory: false },
    { name: "Mother's Email", mandatory: false },
    { name: "Address", mandatory: false },
    { name: "City", mandatory: false },
    { name: "State", mandatory: false },
    { name: "Pincode", mandatory: false },
    { name: "Contact Name", mandatory: false },
    { name: "Contact Phone Number", mandatory: false },
    { name: "Relation", mandatory: false },
  ]);

  // Reorder handler
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updated = Array.from(fields);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);

    setFields(updated);
  };

  // Toggle mandatory
  const toggleMandatory = (index: number) => {
    const updated = [...fields];
    updated[index].mandatory = !updated[index].mandatory;
    setFields(updated);
  };

  return (
    <div className="bg-blue-50 py-3 px-4 lg:px-6 relative">
      <div className="mb-3 sticky top-0">
        <SettingsTabs />
      </div>
      <div className="flex flex-col md:flex-row w-full gap-2 h-[71vh] overflow-auto scrollbar-hide">
        {/* Left Side Preview */}
        <div className="flex-1 w-[65%]">
          {/* Mandatory Fields Preview */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-2">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Mandatory Demographics Fields
              </h2>
              <span className="text-sm text-gray-500">Preview</span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fields
                  .filter((f) => f.mandatory)
                  .map((field) => (
                    <input
                      key={field.name}
                      type="text"
                      placeholder={`${field.name}*`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* Non-Mandatory Fields Preview */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Non Mandatory Demographics Fields
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fields
                  .filter((f) => !f.mandatory)
                  .map((field) => (
                    <input
                      key={field.name}
                      type="text"
                      placeholder={field.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Config Panel */}
        <div className="w-[35%] bg-white border-l border-gray-200 h-max shadow-md rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-800">
              Admission Layout
            </h3>
            <p className="mb-3 text-[13px]">Choose fields to mark as mandatory</p>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="fields">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2 max-h-[85vh] overflow-y-auto scrollbar-hide"
                  >
                    {fields.map((field, index) => (
                      <Draggable
                        key={field.name}
                        draggableId={field.name}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                          >
                            <Menu className="w-4 h-4 text-gray-400" />
                            <div
                              className={`w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer ${
                                field.mandatory
                                  ? "bg-[#2563EB] border-[#2563EB]"
                                  : "border-gray-300 hover:border-gray-400"
                              }`}
                              onClick={() => toggleMandatory(index)}
                            >
                              {field.mandatory && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span className="text-sm text-gray-700 flex-1">
                              {field.name}
                              {field.mandatory ? "*" : ""}
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* Buttons */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() =>
                  setFields(
                    fields.map((f) => ({
                      ...f,
                      mandatory: ["Mobile no", "Student Name", "Date of Birth", "Gender"].includes(f.name),
                    }))
                  )
                }
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                RESET
              </button>
              <button className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-md focus:outline-none focus:ring-2 ">
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutConfig;
