import React, { useState } from 'react';
import { Heart, Shield, Database, Users, Lock, FileText, Activity, UserPlus, LogIn, Menu, X, CheckCircle, ArrowRight, Stethoscope } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-900">Curanet</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-blue-700 hover:text-blue-900 font-medium">Features</a>
              <a href="#security" className="text-blue-700 hover:text-blue-900 font-medium">Security</a>
              <a href="#about" className="text-blue-700 hover:text-blue-900 font-medium">About</a>
              <button 
                onClick={() => onNavigate('login')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-blue-900" /> : <Menu className="h-6 w-6 text-blue-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-blue-700 hover:text-blue-900">Features</a>
              <a href="#security" className="block py-2 text-blue-700 hover:text-blue-900">Security</a>
              <a href="#about" className="block py-2 text-blue-700 hover:text-blue-900">About</a>
              <button 
                onClick={() => onNavigate('login')}
                className="w-full text-left py-2 text-blue-600 font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
                Secure Health Records on 
                <span className="text-blue-600"> Blockchain</span>
              </h1>
              <p className="text-xl text-blue-700 leading-relaxed">
                Revolutionary healthcare data management powered by Hyperledger technology. 
                Secure, transparent, and patient-controlled electronic health records.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('register')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-medium"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Get Started</span>
                </button>
                <button 
                  onClick={() => onNavigate('login')}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center space-x-2 text-lg font-medium"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Stethoscope className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900">Patient Dashboard</h3>
                      <p className="text-blue-700">Secure & Accessible</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-blue-800">Medical History</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-blue-800">Lab Results</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-blue-800">Prescriptions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
              Revolutionary Healthcare Technology
            </h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Built on Hyperledger blockchain technology for unprecedented security and transparency
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Blockchain Security",
                description: "Immutable records protected by advanced cryptography and distributed ledger technology"
              },
              {
                icon: Database,
                title: "Decentralized Storage",
                description: "No single point of failure with data distributed across secure network nodes"
              },
              {
                icon: Users,
                title: "Patient Control",
                description: "You own and control your health data with granular permission management"
              },
              {
                icon: Lock,
                title: "Privacy First",
                description: "HIPAA compliant with zero-knowledge proofs and end-to-end encryption"
              },
              {
                icon: FileText,
                title: "Interoperability",
                description: "Seamless integration with healthcare providers and medical institutions"
              },
              {
                icon: Activity,
                title: "Real-time Access",
                description: "Instant access to your complete medical history from anywhere, anytime"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-blue-50 rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">{feature.title}</h3>
                <p className="text-blue-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Revolutionize Your Healthcare?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers already using our secure blockchain platform
          </p>
          <button 
            onClick={() => onNavigate('register')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto text-lg font-medium"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;