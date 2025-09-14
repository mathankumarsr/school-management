
import { useState, useRef, useEffect } from 'react';
import { Upload, Save, Loader2, X, Building2, Camera, Phone, Mail, Globe, User, Calendar, MapPin } from 'lucide-react';
import SettingsTabs from './SettingsTabs';

// Import your RTK Query hooks (replace with actual imports)
// import {
//   useGetSchoolConfigQuery,
//   useUpdateSchoolConfigMutation,
//   useUploadLogoMutation
// } from '../api/schoolApi';

const SchoolConfig = () => {
  const fileInputRef = useRef(null);
  
  // State for form data
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolCode: '',
    address: '',
    phoneNumber: '',
    email: '',
    academicYear: '2024-2025',
    website: '',
    principalName: '',
    establishedYear: '',
    affiliationBoard: '',
    schoolType: 'private',
    description: ''
  });
  
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock RTK Query hooks - Replace with actual imports
  const mockApi = {
    data: null,
    isLoading: false,
    error: null,
    refetch: () => {}
  };
  
  const mockMutation = [
    async (data) => {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('API Call:', data);
      setIsSubmitting(false);
      return { data: { success: true } };
    },
    {
      isLoading: false,
      error: null
    }
  ];
  
  // Replace these with actual RTK Query hooks
  const { data: schoolConfig, isLoading: isLoadingConfig, error: configError } = mockApi;
  const [updateSchoolConfig, { isLoading: isUpdating, error: updateError }] = mockMutation;
  const [uploadLogo, { isLoading: isUploadingLogo, error: uploadError }] = mockMutation;
  
  // Load existing configuration on component mount
  useEffect(() => {
    if (schoolConfig) {
      setFormData(schoolConfig);
      if (schoolConfig.logoUrl) {
        setLogoPreview(schoolConfig.logoUrl);
      }
    }
  }, [schoolConfig]);
  
  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    }
    
    if (!formData.schoolCode.trim()) {
      newErrors.schoolCode = 'School code is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Website must start with http:// or https://';
    }
    
    if (formData.establishedYear && (formData.establishedYear < 1800 || formData.establishedYear > new Date().getFullYear())) {
      newErrors.establishedYear = 'Invalid establishment year';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          logo: 'Please select an image file'
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          logo: 'File size must be less than 5MB'
        }));
        return;
      }
      
      setLogoFile(file);
      setErrors(prev => ({
        ...prev,
        logo: ''
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Remove logo
  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrors(prev => ({
      ...prev,
      logo: ''
    }));
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      let logoUrl = logoPreview;
      
      // Upload logo if new file is selected
      if (logoFile) {
        const logoFormData = new FormData();
        logoFormData.append('logo', logoFile);
        logoFormData.append('schoolCode', formData.schoolCode);
        
        const logoResponse = await uploadLogo(logoFormData);
        if (logoResponse.data && logoResponse.data.logoUrl) {
          logoUrl = logoResponse.data.logoUrl;
        }
      }
      
      // Prepare configuration data
      const configData = {
        ...formData,
        logoUrl,
        updatedAt: new Date().toISOString()
      };
      
      // Update school configuration
      const response = await updateSchoolConfig(configData);
      
      if (response.data && response.data.success) {
        // Success notification
        alert('School configuration updated successfully!');
        
        // Reset logo file state
        setLogoFile(null);
      } else {
        throw new Error('Failed to update configuration');
      }
      
    } catch (error) {
      console.error('Error updating school config:', error);
      alert('Failed to update school configuration. Please try again.');
    }
  };
  
  // Reset form
  const handleReset = () => {
    setFormData({
      schoolName: '',
      schoolCode: '',
      address: '',
      phoneNumber: '',
      email: '',
      academicYear: '2024-2025',
      website: '',
      principalName: '',
      establishedYear: '',
      affiliationBoard: '',
      schoolType: 'private',
      description: ''
    });
    setLogoPreview(null);
    setLogoFile(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  if (isLoadingConfig) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading school configuration...</span>
        </div>
      </div>
    );
  }
  
  if (configError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600">Error loading configuration: {configError.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className=" bg-blue-50 py-3 px-4 lg:px-6">
      <div className="mb-3">
        <SettingsTabs />
      </div>
      
      <div className="space-y-8 h-[74vh] xl:h-[80vh] overflow-auto scrollbar-hide">
        {/* Logo Upload Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Camera className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">School Logo</h2>
          </div>
          
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white relative overflow-hidden shadow-sm">
                {logoPreview ? (
                  <>
                    <img 
                      src={logoPreview} 
                      alt="School logo preview" 
                      className="w-full h-full object-contain p-2"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                      title="Remove logo"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <span className="text-sm text-gray-500 font-medium">Upload School Logo</span>
                    <p className="text-xs text-gray-400 mt-1">Click to browse</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="inline-flex items-center px-6 py-3 border border-blue-300 rounded-lg shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {logoFile ? 'Change Logo' : 'Upload Logo'}
                </label>
                
                {isUploadingLogo && (
                  <div className="inline-flex items-center ml-3 text-blue-600">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                )}
                
                {logoFile && (
                  <div className="ml-3 inline-block">
                    <span className="text-sm text-green-600 font-medium">
                      ✓ {logoFile.name} selected
                    </span>
                  </div>
                )}
              </div>
              
              {/* <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Upload Guidelines:</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• <strong>Formats:</strong> JPG, PNG, SVG supported</p>
                  <p>• <strong>Size:</strong> Maximum 5MB</p>
                  <p>• <strong>Dimensions:</strong> Recommended 300x300px or square ratio</p>
                  <p>• <strong>Quality:</strong> High resolution for best results</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        
        {/* Main Configuration Form */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <span>School Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.schoolName 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter school name"
                />
                {errors.schoolName && (
                  <p className="text-red-500 text-sm mt-1">{errors.schoolName}</p>
                )}
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <span>School Code</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="schoolCode"
                  value={formData.schoolCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.schoolCode 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter unique school code"
                />
                {errors.schoolCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.schoolCode}</p>
                )}
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-1" />
                  <span>Principal Name</span>
                </label>
                <input
                  type="text"
                  name="principalName"
                  value={formData.principalName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter principal's full name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Established Year</span>
                  </label>
                  <input
                    type="number"
                    name="establishedYear"
                    value={formData.establishedYear}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.establishedYear 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="e.g., 1995"
                    min="1800"
                    max={new Date().getFullYear()}
                  />
                  {errors.establishedYear && (
                    <p className="text-red-500 text-sm mt-1">{errors.establishedYear}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Type
                  </label>
                  <select
                    name="schoolType"
                    value={formData.schoolType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                    <option value="charter">Charter</option>
                    <option value="international">International</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affiliation/Board
                </label>
                <input
                  type="text"
                  name="affiliationBoard"
                  value={formData.affiliationBoard}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g., CBSE, ICSE, State Board"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>School Address</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.address 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  rows={4}
                  placeholder="Enter complete school address including city, state, and postal code"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Contact & Academic Information */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Phone className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 mr-1" />
                    <span>Phone Number</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.phoneNumber 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Enter phone number with country code"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>Email Address</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.email 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Enter official email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>Website</span>
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.website 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="https://www.yourschool.com"
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Academic Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Academic Information</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <span>Current Academic Year</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                    <option value="2027-2028">2027-2028</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    rows={4}
                    placeholder="Brief description about your school, mission, vision, and values..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="bg-white border-t border-gray-200 sticky bottom-0 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>* Required fields</span>
            <span className="text-gray-300">|</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            >
              Reset Form
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || isUpdating || isUploadingLogo}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center shadow-lg"
            >
              {isSubmitting || isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving Configuration...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolConfig;