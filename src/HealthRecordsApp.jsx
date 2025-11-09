import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';

const HealthRecordsApp = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    userType: 'patient'
  });

  const handleLogin = (loginData) => {
    setUser({
      name: loginData.name || 'User',
      email: loginData.email,
      userType: loginData.userType || 'patient'
    });
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleRegister = (registerData) => {
    setUser({
      name: registerData.name,
      email: registerData.email,
      userType: registerData.userType
    });
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
    setUser({ name: '', email: '', userType: 'patient' });
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'landing' && (
        <LandingPage onNavigate={navigateTo} />
      )}
      {currentPage === 'login' && (
        <LoginPage 
          onLogin={handleLogin} 
          onNavigate={navigateTo} 
        />
      )}
      {currentPage === 'register' && (
        <RegisterPage 
          onRegister={handleRegister} 
          onNavigate={navigateTo} 
        />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard 
          user={user}
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
};

export default HealthRecordsApp;