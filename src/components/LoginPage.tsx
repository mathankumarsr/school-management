import { useState } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/authApi';
import { setCredentials } from '../features/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const [currentView, setCurrentView] = useState('login'); // 'login', 'forgot', 'otp', 'reset'
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        contactInfo: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        hasNumber: false,
        hasCapital: false,
        hasMinLength: false
    });
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactAdminData, setContactAdminData] = useState({
        contactInfo: '',
        message: ''
    });
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});


    const handleContactAdminChange = (e: any) => {
        const { name, value } = e.target;
        setContactAdminData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSendContactRequest = () => {
        if (contactAdminData.contactInfo) {
            console.log('Contact Request:', contactAdminData);
            setShowContactModal(false);
            setContactAdminData({
                contactInfo: '',
                message: ''
            });
            toast.success('Your request has been sent to the administrator.');
        }
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors({ ...errors, [e.target.name]: "" });


        // Password validation for new password
        if (name === 'newPassword') {
            setPasswordValidation({
                hasNumber: /\d/.test(value),
                hasCapital: /[A-Z]/.test(value),
                hasMinLength: value.length >= 8
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = { username: formData.username, password: formData.password };
            const result = await login(payload).unwrap(); // call API
            dispatch(setCredentials(result)); // save token + user
            navigate("/");
        } catch (err) {
            toast.error("Invalid credentials");
        }
    };

    const validateForm = () => {
        const newErrors: { username?: string; password?: string } = {};
        if (!formData.username.trim()) newErrors.username = "Username is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        handleSubmit(e); // send data to parent login handler
    };

    const handleForgotPassword = () => {
        setCurrentView('forgot');
    };

    const handleSendOTP = () => {
        if (formData.username && formData.contactInfo) {
            console.log('Sending OTP to:', formData.contactInfo);
            setCurrentView('otp');
        }
    };

    const handleVerifyOTP = () => {
        if (formData.otp) {
            console.log('Verifying OTP:', formData.otp);
            setCurrentView('reset');
        }
    };

    const handleResetPassword = () => {
        const { hasNumber, hasCapital, hasMinLength } = passwordValidation;

        if (hasNumber && hasCapital && hasMinLength && formData.newPassword === formData.confirmPassword) {
            console.log('Password reset successful');
            // Reset form and go back to login
            setFormData({
                username: '',
                password: '',
                contactInfo: '',
                otp: '',
                newPassword: '',
                confirmPassword: ''
            });
            setCurrentView('login');
            toast.success('Password reset successfully! Please login with your new password.');
        } else {
            toast.error('Please ensure all password requirements are met and passwords match.');
        }
    };

    const backToLogin = () => {
        setCurrentView('login');
        setFormData({
            username: '',
            password: '',
            contactInfo: '',
            otp: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 flex items-center justify-center p-4">
            <div className="w-full max-w-full md:max-w-[80%] bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Illustration */}
                    <div className="lg:w-1/2 bg-[#CDD5E9] p-8 lg:p-10 hidden lg:flex items-center justify-center relative">
                        <img src='/loginBg.svg' alt='login' className='w-full' />
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="lg:w-1/2 p-8 lg:p-10 flex items-center justify-center relative">
                        {/* MAP button */}
                        <div className="absolute top-6 right-6">
                            <button className="w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg">
                                MAP
                            </button>
                        </div>

                        <div className="w-full max-w-md">
                            {/* Login View */}
                            {currentView === 'login' && (
                                <>
                                    <div className="text-center mb-8">
                                        <h1 className="text-3xl font-bold text-gray-800 mb-2">WELCOME !</h1>
                                    </div>

                                    <div className="space-y-6">
                                        <form onSubmit={onSubmit} className="space-y-6">

                                            {/* Username Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    User Name
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        value={formData.username}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors pl-10"
                                                        placeholder="Enter your username"
                                                        required
                                                    />
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                </div>
                                                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}

                                            </div>

                                            {/* Password Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors pl-10 pr-10"
                                                        placeholder="Enter your password"
                                                        required
                                                    />
                                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                                            </div>

                                            {/* Forgot Password */}
                                            <div className="text-left">
                                                <button
                                                    type="button"
                                                    onClick={handleForgotPassword}
                                                    className="text-sm text-gray-600 hover:text-blue-600 underline"
                                                >
                                                    Forgot Password ?
                                                </button>
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                            >
                                                {isLoading ? "Logging in..." : "Login"}
                                            </button>
                                        </form>
                                    </div>

                                    {/* Additional Options */}
                                    <div className="mt-8 text-center">
                                        <p className="text-sm text-gray-600 mb-4">
                                            Don't have an account?
                                        </p>
                                        <button
                                            onClick={() => setShowContactModal(true)}
                                            className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                            Contact Administrator
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Forgot Password View */}
                            {currentView === 'forgot' && (
                                <>
                                    <div className="text-center mb-8">
                                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h1>
                                        <p className="text-gray-600">Enter your details to reset your password</p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Username Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                User Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors pl-10"
                                                    placeholder="Enter your username"
                                                    required
                                                />
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            </div>
                                        </div>

                                        {/* Mobile/Email Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mobile No / Email ID
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="contactInfo"
                                                    value={formData.contactInfo}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                                    placeholder="Enter mobile number or email"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Send OTP Button */}
                                        <button
                                            onClick={handleSendOTP}
                                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                        >
                                            Send OTP
                                        </button>

                                        {/* Back to Login */}
                                        <div className="text-center">
                                            <button
                                                onClick={backToLogin}
                                                className="text-sm text-gray-600 hover:text-blue-600 underline"
                                            >
                                                Back to Login
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* OTP Verification View */}
                            {currentView === 'otp' && (
                                <>
                                    <div className="text-center mb-8">
                                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Enter OTP</h1>
                                        <p className="text-gray-600">We've sent an OTP to your registered contact</p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* OTP Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Enter OTP
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="otp"
                                                    value={formData.otp}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-center text-xl tracking-widest"
                                                    placeholder="000000"
                                                    maxLength={6}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Verify OTP Button */}
                                        <button
                                            onClick={handleVerifyOTP}
                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                        >
                                            Verify OTP
                                        </button>

                                        {/* Resend OTP */}
                                        <div className="text-center">
                                            <button
                                                onClick={() => console.log('Resending OTP...')}
                                                className="text-sm text-blue-600 hover:text-blue-700 underline"
                                            >
                                                Resend OTP
                                            </button>
                                        </div>

                                        {/* Back to Login */}
                                        <div className="text-center">
                                            <button
                                                onClick={backToLogin}
                                                className="text-sm text-gray-600 hover:text-blue-600 underline"
                                            >
                                                Back to Login
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Reset Password View */}
                            {currentView === 'reset' && (
                                <>
                                    <div className="text-center mb-8">
                                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
                                        <p className="text-gray-600">Create a new secure password</p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* New Password Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showNewPassword ? "text" : "password"}
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors pl-10 pr-10"
                                                    placeholder="Enter new password"
                                                    required
                                                />
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Password Requirements */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                                            <ul className="space-y-1 text-sm">
                                                <li className={`flex items-center gap-2 ${passwordValidation.hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                                                    <span className={`w-4 h-4 rounded-full ${passwordValidation.hasMinLength ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                                    Minimum 8 characters
                                                </li>
                                                <li className={`flex items-center gap-2 ${passwordValidation.hasCapital ? 'text-green-600' : 'text-gray-500'}`}>
                                                    <span className={`w-4 h-4 rounded-full ${passwordValidation.hasCapital ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                                    One uppercase letter
                                                </li>
                                                <li className={`flex items-center gap-2 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                                                    <span className={`w-4 h-4 rounded-full ${passwordValidation.hasNumber ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                                    One number
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Confirm Password Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors pl-10 pr-10"
                                                    placeholder="Confirm new password"
                                                    required
                                                />
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                                                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                                            )}
                                        </div>

                                        {/* Reset Password Button */}
                                        <button
                                            onClick={handleResetPassword}
                                            disabled={!passwordValidation.hasNumber || !passwordValidation.hasCapital || !passwordValidation.hasMinLength || formData.newPassword !== formData.confirmPassword}
                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            Reset Password
                                        </button>

                                        {/* Back to Login */}
                                        <div className="text-center">
                                            <button
                                                onClick={backToLogin}
                                                className="text-sm text-gray-600 hover:text-blue-600 underline"
                                            >
                                                Back to Login
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {showContactModal && (
                                <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
                                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                                        <div className="p-6">
                                            <div className="text-center mb-6">
                                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Administrator</h2>
                                                <p className="text-gray-600">Send a message to the school administrator</p>
                                            </div>

                                            <div className="space-y-4">
                                                {/* Contact Info Field */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email ID / Mobile Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="contactInfo"
                                                        value={contactAdminData.contactInfo}
                                                        onChange={handleContactAdminChange}
                                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                                        placeholder="Enter your email or mobile number"
                                                        required
                                                    />
                                                </div>

                                                {/* Message Field */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Message (Optional)
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        value={contactAdminData.message}
                                                        onChange={handleContactAdminChange}
                                                        rows={3}
                                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                                        placeholder="Describe your issue or request..."
                                                    />
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-3 pt-4">
                                                    <button
                                                        onClick={() => setShowContactModal(false)}
                                                        className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={handleSendContactRequest}
                                                        disabled={!contactAdminData.contactInfo}
                                                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                                    >
                                                        Send
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;