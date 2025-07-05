import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

import Header from './../layout/header';

import './profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated, getUserInfo, logout } = useAuth();
  const user = getUserInfo();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Full-stack developer passionate about creating innovative web solutions using MERN stack.',
    joinDate: user?.signupTime ? new Date(user.signupTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'January 2024',
    profileImage: null
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log('Profile updated:', profileData);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Don't render if not authenticated
  if (!isAuthenticated()) {
    return null;
  }

  const stats = [
    { label: 'Projects', value: '12', icon: '📁' },
    { label: 'Tasks Completed', value: '48', icon: '✅' },
    { label: 'Hours Logged', value: '156', icon: '⏰' },
    { label: 'Team Members', value: '8', icon: '👥' }
  ];

  const recentActivity = [
    { action: 'Completed project "E-commerce App"', time: '2 hours ago', icon: '🎉' },
    { action: 'Updated profile information', time: '1 day ago', icon: '✏️' },
    { action: 'Joined team "Frontend Developers"', time: '3 days ago', icon: '👥' },
    { action: 'Created new task "API Integration"', time: '1 week ago', icon: '📝' }
  ];

  return (
    <div className="profile-container">
      {/* Header */}
    <Header/>

      {/* Main Content */}
      <main className="profile-main">
        <div className="profile-wrapper">
          {/* Profile Hero Section */}
          <div className="profile-hero">
            <div className="hero-background"></div>
            <div className="profile-info">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {profileData.profileImage ? (
                    <img src={profileData.profileImage} alt="Profile" />
                  ) : (
                    <span className="avatar-initials">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <button className="avatar-edit-btn">📷</button>
              </div>
              <div className="profile-details">
                <h1>{profileData.name}</h1>
                <p className="profile-title">Full Stack Developer</p>
                <p className="profile-location">📍 {profileData.location}</p>
                <p className="join-date">Member since {profileData.joinDate}</p>
              </div>
              <div className="profile-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button className="btn btn-secondary">Share Profile</button>
              </div>
            </div>
          </div>

        

       
        </div>
      </main>

     
      <section className="features" >
        <h2 className="section-title">What We Offer</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3 className="feature-title">Symptom Based Medicine Recommendation</h3>
            <p className="feature-description">
              Easily log and monitor your symptoms over time to identify patterns and triggers.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Symptom based Diet Recommendation</h3>
            <p className="feature-description">
              Get tailored recommendations based on your unique health profile and symptom history.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3 className="feature-title">Ai Assitant</h3>
            <p className="feature-description">
              Never miss a medication or appointment with our smart reminder system.
            </p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Profile;
