import React, { useState } from 'react';
import { Heart, FileText, Users, Lock, CheckCircle, Upload, Settings, Bell, Search, Plus, Share2, Download, Eye, Shield, Clock, ArrowUpRight, ArrowDownRight, Activity, TrendingUp, UserCheck, Building2, Stethoscope, Calendar, AlertTriangle } from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(2);

  // Mock data for different user types
  const mockData = {
    // Patient data (existing)
    patient: {
      stats: [
        { title: "My Records", value: "24", icon: FileText, color: "blue", trend: "+3 this month" },
        { title: "Shared Records", value: "8", icon: Share2, color: "green", trend: "5 active shares" },
        { title: "Received Records", value: "6", icon: ArrowDownRight, color: "purple", trend: "2 pending" },
        { title: "Access Requests", value: "3", icon: Lock, color: "orange", trend: "1 new request" }
      ],
      myRecords: [
        { 
          type: "Lab Result", 
          date: "2024-01-15", 
          provider: "City Medical Lab", 
          status: "Available",
          description: "Complete Blood Count",
          shared: true,
          recipients: 2
        },
        { 
          type: "Prescription", 
          date: "2024-01-10", 
          provider: "Dr. Johnson", 
          status: "Available",
          description: "Diabetes medication prescription",
          shared: false,
          recipients: 0
        },
        { 
          type: "Diagnostic Report", 
          date: "2024-01-05", 
          provider: "Regional Hospital", 
          status: "Available",
          description: "MRI scan - Lower back",
          shared: true,
          recipients: 1
        }
      ]
    },
    
    // Doctor data
    doctor: {
      stats: [
        { title: "My Patients", value: "42", icon: Users, color: "blue", trend: "+2 new patients" },
        { title: "Records Accessed", value: "156", icon: FileText, color: "green", trend: "12 this week" },
        { title: "Pending Requests", value: "8", icon: Clock, color: "orange", trend: "3 urgent" },
        { title: "Consultations", value: "23", icon: Stethoscope, color: "purple", trend: "This month" }
      ],
      patients: [
        {
          id: "P001",
          name: "John Smith",
          lastVisit: "2024-01-15",
          condition: "Diabetes Type 2",
          status: "Active",
          recordsCount: 24,
          lastRecord: "Lab Results - Blood Sugar"
        },
        {
          id: "P002", 
          name: "Jane Doe",
          lastVisit: "2024-01-12",
          condition: "Hypertension",
          status: "Active",
          recordsCount: 18,
          lastRecord: "Prescription - Blood Pressure Medication"
        },
        {
          id: "P005",
          name: "Robert Wilson",
          lastVisit: "2024-01-08",
          condition: "Asthma",
          status: "Follow-up Required",
          recordsCount: 12,
          lastRecord: "Spirometry Test Results"
        }
      ],
      recentActivity: [
        {
          type: "Record Access",
          patient: "John Smith",
          action: "Viewed lab results",
          time: "2 hours ago",
          status: "completed"
        },
        {
          type: "Access Request",
          patient: "Jane Doe",
          action: "Requested MRI scan",
          time: "1 day ago",
          status: "pending"
        }
      ]
    },
    
    // Hospital data
    hospital: {
      stats: [
        { title: "Total Patients", value: "1,247", icon: Users, color: "blue", trend: "+45 this month" },
        { title: "Active Doctors", value: "23", icon: Stethoscope, color: "green", trend: "2 new hires" },
        { title: "Records Stored", value: "12,450", icon: FileText, color: "purple", trend: "+234 this week" },
        { title: "Data Exchanges", value: "89", icon: ArrowUpRight, color: "orange", trend: "15 today" }
      ],
      recentPatients: [
        {
          id: "P001",
          name: "John Smith",
          registeredDate: "2023-06-15",
          lastVisit: "2024-01-15",
          assignedDoctor: "Dr. Sarah Chen",
          recordsCount: 24,
          status: "Active"
        },
        {
          id: "P002",
          name: "Jane Doe", 
          registeredDate: "2023-08-22",
          lastVisit: "2024-01-12",
          assignedDoctor: "Dr. Sarah Chen",
          recordsCount: 18,
          status: "Active"
        },
        {
          id: "P003",
          name: "Michael Johnson",
          registeredDate: "2024-01-10",
          lastVisit: "2024-01-16",
          assignedDoctor: "Dr. Michael Wilson",
          recordsCount: 3,
          status: "New"
        }
      ],
      doctors: [
        {
          id: "D001",
          name: "Dr. Sarah Chen",
          specialty: "Cardiology",
          patientsCount: 35,
          status: "Active",
          lastActive: "Online now"
        },
        {
          id: "D002", 
          name: "Dr. Michael Wilson",
          specialty: "Internal Medicine",
          patientsCount: 28,
          status: "Active", 
          lastActive: "2 hours ago"
        }
      ],
      systemStats: {
        storageUsed: "78%",
        systemHealth: "Excellent",
        lastBackup: "2024-01-17 02:00 AM",
        activeConnections: 145
      }
    }
  };

  // Get current user's data
  const currentUserData = mockData[user.userType] || {};

  // Navigation tabs based on user type
  const getNavigationTabs = () => {
    switch(user.userType) {
      case 'patient':
        return [
          { id: 'overview', label: 'Overview' },
          { id: 'my-records', label: 'My Records' },
          { id: 'shared', label: 'Shared Records' },
          { id: 'received', label: 'Received Records' },
          { id: 'requests', label: 'Access Requests' }
        ];
      case 'doctor':
        return [
          { id: 'overview', label: 'Overview' },
          { id: 'patients', label: 'My Patients' },
          { id: 'records', label: 'Patient Records' },
          { id: 'requests', label: 'Access Requests' }
          // Removed 'schedule' tab as per request
        ];
      case 'hospital':
        return [
          { id: 'overview', label: 'Dashboard' },
          { id: 'patients', label: 'Patients' },
          { id: 'doctors', label: 'Doctors' },
          { id: 'records', label: 'Records Management' },
          { id: 'analytics', label: 'Analytics' }
        ];
      default:
        return [{ id: 'overview', label: 'Overview' }];
    }
  };

  // Quick actions based on user type
  const getQuickActions = () => {
    switch(user.userType) {
      case 'patient':
        return [
          { title: "Upload Record", icon: Upload, desc: "Add new medical document", color: "blue" },
          { title: "Share Records", icon: Share2, desc: "Grant access to healthcare providers", color: "green" },
          { title: "Request Records", icon: ArrowDownRight, desc: "Request records from providers", color: "purple" },
          { title: "Manage Permissions", icon: Lock, desc: "Control who can access your data", color: "orange" },
          { title: "Download Records", icon: Download, desc: "Export your health data", color: "indigo" },
          { title: "Emergency Access", icon: Shield, desc: "Set emergency data sharing", color: "red" }
        ];
      case 'doctor':
        return [
          { title: "View Patient", icon: Users, desc: "Access patient records", color: "blue" },
          { title: "Request Access", icon: Lock, desc: "Request patient record access", color: "orange" },
          { title: "Add Notes", icon: FileText, desc: "Add consultation notes", color: "green" },
          // Removed 'Schedule' quick action as per request
          { title: "Generate Report", icon: Activity, desc: "Create patient reports", color: "indigo" },
          { title: "Emergency Access", icon: AlertTriangle, desc: "Emergency record access", color: "red" }
        ];
      case 'hospital':
        return [
          { title: "Register Patient", icon: UserCheck, desc: "Add new patient to system", color: "blue" },
          { title: "Add Doctor", icon: Stethoscope, desc: "Register new doctor", color: "green" },
          { title: "Upload Records", icon: Upload, desc: "Add records to patient files", color: "purple" },
          { title: "System Analytics", icon: TrendingUp, desc: "View system performance", color: "orange" },
          { title: "Manage Permissions", icon: Lock, desc: "Control access permissions", color: "indigo" },
          { title: "Data Export", icon: Download, desc: "Export system data", color: "red" }
        ];
      default:
        return [];
    }
  };

  const renderTabContent = () => {
    if (user.userType === 'patient') {
      return renderPatientContent();
    } else if (user.userType === 'doctor') {
      return renderDoctorContent();
    } else if (user.userType === 'hospital') {
      return renderHospitalContent();
    }
  };

  const renderPatientContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Record Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Share2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Lab Result shared</p>
                      <p className="text-sm text-blue-600">Shared with Dr. Sarah Chen</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <ArrowDownRight className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">New record received</p>
                      <p className="text-sm text-green-600">From Dr. Emily Watson</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'my-records':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">My Medical Records</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Record</span>
              </button>
            </div>
            <div className="space-y-3">
              {currentUserData.myRecords?.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{record.type}</p>
                      <p className="text-sm text-gray-600">{record.description}</p>
                      <p className="text-xs text-gray-500">{record.provider} • {record.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {record.shared && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Share2 className="h-4 w-4" />
                        <span className="text-xs">{record.recipients}</span>
                      </div>
                    )}
                    <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center space-x-1">
                      <Share2 className="h-3 w-3" />
                      <span>Share</span>
                    </button>
                    <button className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                      <Eye className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  const renderDoctorContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              {/* Removed "Today's Schedule" section as per request */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Access Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">John Smith - Lab Results Viewed</p>
                      <p className="text-sm text-blue-600">Accessed blood sugar results</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Jane Doe - Notes Added</p>
                      <p className="text-sm text-green-600">Consultation notes added</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {currentUserData.recentActivity?.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Activity className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">Patient: {activity.patient}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'patients':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">My Patients</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search patients..." 
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {currentUserData.patients?.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">{patient.condition}</p>
                      <p className="text-xs text-gray-500">Last visit: {patient.lastVisit} • {patient.recordsCount} records</p>
                      <p className="text-xs text-blue-600">Latest: {patient.lastRecord}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {patient.status}
                    </span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>View Records</span> {/* Changed button text to "View Records" */}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  const renderHospitalContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">System Status</p>
                      <p className="text-lg font-bold text-green-900">{currentUserData.systemStats?.systemHealth}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Storage Used</p>
                      <p className="text-lg font-bold text-blue-900">{currentUserData.systemStats?.storageUsed}</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Last Backup</p>
                      <p className="text-lg font-bold text-purple-900">{currentUserData.systemStats?.lastBackup}</p>
                    </div>
                    <Shield className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 font-medium">Active Connections</p>
                      <p className="text-lg font-bold text-orange-900">{currentUserData.systemStats?.activeConnections}</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <UserCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">New patient registered</p>
                      <p className="text-sm text-blue-600">Michael Johnson added to system</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Records uploaded</p>
                      <p className="text-sm text-green-600">15 new records processed</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'patients':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Patient Management</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <UserCheck className="h-4 w-4" />
                <span>Register New Patient</span> {/* Button to register new patient */}
              </button>
            </div>
            <div className="space-y-3">
              {currentUserData.recentPatients?.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">Assigned to: {patient.assignedDoctor}</p>
                      <p className="text-xs text-gray-500">Registered: {patient.registeredDate} • Last visit: {patient.lastVisit}</p>
                      <p className="text-xs text-blue-600">{patient.recordsCount} records</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : patient.status === 'New'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                    <button className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center space-x-1">
                      <Upload className="h-3 w-3" />
                      <span>Add Record</span>
                    </button>
                    <button className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                      <Eye className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'doctors':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Doctor Management</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Stethoscope className="h-4 w-4" />
                <span>Add New Doctor</span> {/* Button to add new doctor */}
              </button>
            </div>
            <div className="space-y-3">
              {currentUserData.doctors?.map((doctor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Stethoscope className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      <p className="text-xs text-gray-500">{doctor.patientsCount} patients • {doctor.lastActive}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {doctor.status}
                    </span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Manage Access
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">HealthChain Exchange</h1>
                <p className="text-sm text-blue-700">
                  {user.userType === 'patient' && 'Medical Record Exchange Portal'}
                  {user.userType === 'doctor' && 'Healthcare Provider Dashboard'}
                  {user.userType === 'hospital' && 'Hospital Management System'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder={
                    user.userType === 'patient' ? 'Search records...' :
                    user.userType === 'doctor' ? 'Search patients...' :
                    'Search system...'
                  }
                  className="bg-transparent border-none outline-none text-sm w-40"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              {/* Settings */}
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Settings className="h-5 w-5" />
              </button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <span>Welcome, {user.name}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs capitalize">
                  {user.userType}
                </span>
              </div>
              
              {/* Logout */}
              <button 
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentUserData.stats?.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`bg-${stat.color}-100 p-3 rounded-xl`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
              <p className="text-sm text-gray-600">{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {getNavigationTabs().map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getQuickActions().map((action, index) => (
                    <button key={index} className="text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all group">
                      <div className="flex items-start space-x-3">
                        <div className={`bg-${action.color}-100 p-2 rounded-lg group-hover:bg-${action.color}-200 transition-colors`}>
                          <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-blue-900">{action.title}</p>
                          <p className="text-sm text-gray-600">{action.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {user.userType === 'patient' && <Users className="h-10 w-10 text-blue-600" />}
                    {user.userType === 'doctor' && <Stethoscope className="h-10 w-10 text-blue-600" />}
                    {user.userType === 'hospital' && <Building2 className="h-10 w-10 text-blue-600" />}
                  </div>
                  <h3 className="font-bold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600 capitalize">{user.userType}</p>
                  <p className="text-sm text-gray-500 mt-2">{user.email}</p>
                  {user.userType === 'doctor' && user.specialty && (
                    <p className="text-sm text-blue-600 mt-1">{user.specialty}</p>
                  )}
                  {user.userType === 'hospital' && user.adminName && (
                    <p className="text-sm text-blue-600 mt-1">Admin: {user.adminName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Security Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600">Blockchain Verified</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600">End-to-End Encrypted</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600">Access Controlled</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 font-medium">
                    {user.userType === 'patient' && 'All records secured'}
                    {user.userType === 'doctor' && 'Patient data protected'}
                    {user.userType === 'hospital' && 'System secured'}
                  </p>
                  <p className="text-xs text-green-600">Last sync: 1 minute ago</p>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {user.userType === 'patient' && 'Recent Exchange Activity'}
                  {user.userType === 'doctor' && 'Recent Patient Activity'}
                  {user.userType === 'hospital' && 'System Activity'}
                </h3>
                <div className="space-y-3">
                  {user.userType === 'patient' && (
                    <>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Record shared with clinic</span>
                        <span className="text-gray-400">2h ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">New record received</span>
                        <span className="text-gray-400">1d ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-600">Access request pending</span>
                        <span className="text-gray-400">1d ago</span>
                      </div>
                    </>
                  )}
                  
                  {user.userType === 'doctor' && (
                    <>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">Accessed John's lab results</span>
                        <span className="text-gray-400">1h ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Added consultation notes</span>
                        <span className="text-gray-400">3h ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-600">Requested MRI access</span>
                        <span className="text-gray-400">1d ago</span>
                      </div>
                    </>
                  )}
                  
                  {user.userType === 'hospital' && (
                    <>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">New patient registered</span>
                        <span className="text-gray-400">1h ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">System backup completed</span>
                        <span className="text-gray-400">2h ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600">Records batch uploaded</span>
                        <span className="text-gray-400">5h ago</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;