import React, { useState } from "react";
import '../styles/StudentProfile.css'; // Move your CSS into this file

const StudentProfile: React.FC = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      alert(`Searching for: ${searchValue}`);
    }
  };

  const handleSave = (msg: string) => {
    alert(msg || "Changes saved successfully!");
  };

  return (
    <div className="container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Student ID, Name, or Roll Number..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Tabs */}
        <div className="nav-tabs">
          {[
            { id: "general", label: "General Info" },
            { id: "academic", label: "Academic" },
            { id: "exams", label: "Exams" },
            { id: "fees", label: "Fees" },
            { id: "attendance", label: "Attendance" },
            { id: "documents", label: "Documents" },
            { id: "teachers", label: "Teachers" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeSection === tab.id ? "active" : ""}`}
              onClick={() => setActiveSection(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="main-content">
        {/* Sidebar */}
        <div className="student-profile">
          <div className="profile-image">JS</div>
          <div className="profile-info">
            <h2>John Smith</h2>
            <div className="profile-detail">
              <span>Standard:</span>
              <strong>10th Grade</strong>
            </div>
            <div className="profile-detail">
              <span>Roll No:</span>
              <strong>2024001</strong>
            </div>
            <div className="profile-detail">
              <span>Student ID:</span>
              <strong>STU001</strong>
            </div>
            <div className="profile-detail">
              <span>Section:</span>
              <strong>A</strong>
            </div>
            <div className="profile-detail">
              <span>Address:</span>
              <strong>123 Main St, City</strong>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {/* General Info */}
          {activeSection === "general" && (
            <div className="section active">
              <h2 className="section-title">General Information</h2>

              <div className="subsection">
                <h3>Personal Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" defaultValue="John" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" defaultValue="Smith" />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" defaultValue="2008-05-15" />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select defaultValue="Male">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select defaultValue="A+">
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Religion</label>
                    <input type="text" defaultValue="Christian" />
                  </div>
                  <div className="form-group">
                    <label>Nationality</label>
                    <input type="text" defaultValue="American" />
                  </div>
                  <div className="form-group">
                    <label>Mother Tongue</label>
                    <input type="text" defaultValue="English" />
                  </div>
                </div>
              </div>

              {/* Example More subsections... */}
              <button
                className="save-btn"
                onClick={() => handleSave("General info saved!")}
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Academic Info */}
          {activeSection === "academic" && (
            <div className="section active">
              <h2 className="section-title">Academic Information</h2>
              <p>Academic form fields go here...</p>
              <button
                className="save-btn"
                onClick={() => handleSave("Academic info saved!")}
              >
                Save Academic Info
              </button>
            </div>
          )}

          {/* Teachers */}
          {activeSection === "teachers" && (
            <div className="section active">
              <h2 className="section-title">Teacher Details</h2>
              <p>Teacher details form goes here...</p>
              <button
                className="save-btn"
                onClick={() => handleSave("Teacher info saved!")}
              >
                Save Teacher Info
              </button>
            </div>
          )}

          {/* Exams */}
          {activeSection === "exams" && (
            <div className="section active">
              <h2 className="section-title">Examination Records</h2>
              <p>Examination records and results will be displayed here.</p>
            </div>
          )}

          {/* Fees */}
          {activeSection === "fees" && (
            <div className="section active">
              <h2 className="section-title">Fee Management</h2>
              <p>Fee payment history and pending amounts will be shown here.</p>
            </div>
          )}

          {/* Attendance */}
          {activeSection === "attendance" && (
            <div className="section active">
              <h2 className="section-title">Attendance Records</h2>
              <p>Student attendance tracking and reports will be available here.</p>
            </div>
          )}

          {/* Documents */}
          {activeSection === "documents" && (
            <div className="section active">
              <h2 className="section-title">Document Management</h2>
              <p>Student documents and certificates will be managed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
