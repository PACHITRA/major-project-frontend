import React, { useState } from 'react';
import { Heart, User, Building, Stethoscope } from 'lucide-react';

const LoginPage = ({ onLogin, onNavigate }) => {
  const [loginForm, setLoginForm] = useState({ 
    email: '', 
    password: '',
    userType: 'patient' // Default to patient
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock user database - In real app, this would be API calls
  const mockUsers = {
    // Patients
    'patient@example.com': {
      password: '123456',
      userType: 'patient',
      name: 'John Smith',
      id: 'P001',
      hospitalId: 'H001'
    },
    'jane@example.com': {
      password: '123456',
      userType: 'patient',
      name: 'Jane Doe',
      id: 'P002',
      hospitalId: 'H001'
    },
    
    // Doctors
    'doctor@example.com': {
      password: '123456',
      userType: 'doctor',
      name: 'Dr. Sarah Chen',
      id: 'D001',
      specialty: 'Cardiology',
      hospitalId: 'H001',
      patients: ['P001', 'P002'] // Patient IDs this doctor has access to
    },
    'dr.wilson@example.com': {
      password: '123456',
      userType: 'doctor',
      name: 'Dr. Michael Wilson',
      id: 'D002',
      specialty: 'Internal Medicine',
      hospitalId: 'H002',
      patients: ['P003']
    },
    
    // Hospitals
    'admin@cityhospital.com': {
      password: '123456',
      userType: 'hospital',
      name: 'City Hospital',
      id: 'H001',
      adminName: 'Admin Johnson',
      patients: ['P001', 'P002'], // All patients under this hospital
      doctors: ['D001']
    },
    'admin@regionalhospital.com': {
      password: '123456',
      userType: 'hospital',
      name: 'Regional Medical Center',
      id: 'H002',
      adminName: 'Admin Williams',
      patients: ['P003'],
      doctors: ['D002']
    }
  };

  const userTypeOptions = [
    { value: 'patient', label: 'Patient', icon: User, description: 'Access your medical records' },
    { value: 'doctor', label: 'Doctor', icon: Stethoscope, description: 'View patient records you have access to' },
    { value: 'hospital', label: 'Hospital Admin', icon: Building, description: 'Manage patients and doctors' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!loginForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!loginForm.password) {
      newErrors.password = 'Password is required';
    } else if (loginForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!loginForm.userType) {
      newErrors.userType = 'Please select user type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const authenticateUser = (email, password, userType) => {
    const user = mockUsers[email.toLowerCase()];
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    if (user.password !== password) {
      return { success: false, error: 'Invalid password' };
    }
    
    if (user.userType !== userType) {
      return { success: false, error: `This email is not registered as a ${userType}` };
    }
    
    return { success: true, user };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const authResult = authenticateUser(loginForm.email, loginForm.password, loginForm.userType);
      
      if (authResult.success) {
        // Pass user data to parent component with role-specific information
        onLogin({
          ...authResult.user,
          email: loginForm.email
        });
      } else {
        setErrors({ general: authResult.error });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setLoginForm({ ...loginForm, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    // Clear general error
    if (errors.general) {
      setErrors({ ...errors, general: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900">Welcome Back</h2>
            <p className="text-blue-700 mt-2">Sign in to your HealthChain account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-blue-900 font-medium mb-3">I am a:</label>
              <div className="space-y-3">
                {userTypeOptions.map((option) => (
                  <label key={option.value} className="flex items-center p-3 border border-blue-200 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors">
                    <input
                      type="radio"
                      name="userType"
                      value={option.value}
                      checked={loginForm.userType === option.value}
                      onChange={(e) => handleInputChange('userType', e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3 flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <option.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{option.label}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.userType && (
                <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-blue-900 font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-blue-200'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            {/* Password Input */}
            <div>
              <label className="block text-blue-900 font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-blue-200'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* General Error Message */}
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">{errors.general}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded border-blue-300 text-blue-600 focus:ring-blue-500" 
                />
                <span className="ml-2 text-blue-700">Remember me</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-800 transition-colors">
                Forgot password?
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
              } text-white`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          {/* Demo Credentials */}
          {/* <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Patient:</strong> patient@example.com / 123456</p>
              <p><strong>Doctor:</strong> doctor@example.com / 123456</p>
              <p><strong>Hospital:</strong> admin@cityhospital.com / 123456</p>
            </div>
          </div> */}
          
          <div className="mt-8 text-center">
            <p className="text-blue-700">
              Need an account?{' '}
              <button 
                type="button"
                onClick={() => onNavigate('register')}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Contact your hospital
              </button>
            </p>
            <button 
              type="button"
              onClick={() => onNavigate('landing')}
              className="text-blue-600 hover:text-blue-800 mt-4 inline-block transition-colors"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;