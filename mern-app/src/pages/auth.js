import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  // Use Auth Context
  const { login, signup, loading, error, clearError } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login
        const response = await login({
          email: formData.email,
          password: formData.password
        });
        console.log('Login successful:', response);
        navigate('/profile'); // Redirect to profile page
      } else {
        // Signup
        const response = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        console.log('Signup successful:', response);
        navigate('/profile'); // Redirect to profile page
      }
    } catch (err) {
      console.error('Auth error:', err);
      // Error is handled by the context
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="login-container">
      {/* Header */}
   

      {/* Main Login Content */}
      <main className="login-main">
        <div className="login-wrapper">
          {/* Left Side - Welcome Message */}
          <div className="login-welcome">
            <div className="welcome-content">
              <h1>{isLogin ? 'Welcome Back!' : 'Join Us Today!'}</h1>
              <p>
                {isLogin 
                  ? "We're excited to see you again. Sign in to access your account and continue your journey with us."
                  : "Create your account and start your journey with us. Join thousands of users who trust our platform."
                }
              </p>
              <div className="welcome-features">
                <div className="feature-item">
                  <span className="feature-icon">🚀</span>
                  <span>Fast & Secure Access</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💼</span>
                  <span>Manage Your Profile</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <span>Track Your Progress</span>
                </div>
              </div>
            </div>
            <div className="welcome-graphic">
              <div className="floating-shape shape-1"></div>
              <div className="floating-shape shape-2"></div>
              <div className="floating-shape shape-3"></div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="login-form-section">
            <div className="form-container">
              <div className="form-header">
                <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
                <p>{isLogin ? 'Enter your credentials to access your account' : 'Create your account to get started'}</p>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                {!isLogin && (
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="form-options">
                    <label className="checkbox-wrapper">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      Remember me
                    </label>
                    <Link to="/forgot-password" className="forgot-link">
                      Forgot Password?
                    </Link>
                  </div>
                )}

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? (isLogin ? 'Signing In...' : 'Signing Up...') : (isLogin ? 'Sign In' : 'Sign Up')}
                  <span className="btn-icon">→</span>
                </button>
              </form>

              <div className="form-footer">
                <p>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button type="button" onClick={toggleAuthMode} className="register-link">
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

   
    </div>
  );
};

export default Auth;
