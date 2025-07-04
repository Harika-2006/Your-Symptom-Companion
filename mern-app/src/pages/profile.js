import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
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
      <header className="profile-header">
        <div className="header-content">
          <Link to="/" className="logo">
            <h2>MERN App</h2>
          </Link>
          <nav className="header-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/settings" className="nav-link">Settings</Link>
          </nav>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

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

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-content">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs Section */}
          <div className="profile-tabs">
            <div className="tabs-header">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
                onClick={() => setActiveTab('activity')}
              >
                Activity
              </button>
              <button 
                className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </div>

            <div className="tabs-content">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="tab-panel">
                  <div className="overview-grid">
                    <div className="overview-card">
                      <h3>About Me</h3>
                      <p>{profileData.bio}</p>
                      <div className="skills">
                        <h4>Skills</h4>
                        <div className="skill-tags">
                          <span className="skill-tag">React</span>
                          <span className="skill-tag">Node.js</span>
                          <span className="skill-tag">MongoDB</span>
                          <span className="skill-tag">Express</span>
                          <span className="skill-tag">JavaScript</span>
                          <span className="skill-tag">CSS</span>
                        </div>
                      </div>
                    </div>
                    <div className="overview-card">
                      <h3>Recent Projects</h3>
                      <div className="project-list">
                        <div className="project-item">
                          <div className="project-icon">🛒</div>
                          <div className="project-info">
                            <h4>E-commerce Platform</h4>
                            <p>Full-stack shopping application</p>
                            <span className="project-status completed">Completed</span>
                          </div>
                        </div>
                        <div className="project-item">
                          <div className="project-icon">📱</div>
                          <div className="project-info">
                            <h4>Task Management App</h4>
                            <p>React-based productivity tool</p>
                            <span className="project-status in-progress">In Progress</span>
                          </div>
                        </div>
                        <div className="project-item">
                          <div className="project-icon">🌐</div>
                          <div className="project-info">
                            <h4>Portfolio Website</h4>
                            <p>Personal showcase website</p>
                            <span className="project-status planning">Planning</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="tab-panel">
                  <div className="activity-section">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="activity-item">
                          <div className="activity-icon">{activity.icon}</div>
                          <div className="activity-content">
                            <p>{activity.action}</p>
                            <span className="activity-time">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="tab-panel">
                  <div className="settings-section">
                    <h3>Profile Settings</h3>
                    <div className="settings-form">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Bio</label>
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          rows="4"
                        />
                      </div>
                      {isEditing && (
                        <div className="form-actions">
                          <button className="btn btn-primary" onClick={handleSave}>
                            Save Changes
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="profile-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>MERN App</h4>
            <p>Building amazing web applications with cutting-edge technology.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Account</h4>
            <ul>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/help">Help</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 MERN App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
