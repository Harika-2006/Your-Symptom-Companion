// pages/auth.js


import React, { useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/authContext';

import ReCAPTCHA from 'react-google-recaptcha';

import './auth.css';


const Auth = () => {

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({

    name: '',

    email: '',

    password: '',

    dob: ''

  });

  const [showPassword, setShowPassword] = useState(false);

  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const recaptchaRef = useRef(null);

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


  // Handler for reCAPTCHA change

  const onRecaptchaChange = (value) => {

    setRecaptchaValue(value); // Store the reCAPTCHA token

    console.log("reCAPTCHA value:", value);

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    // reCAPTCHA validation for signup

    if (!isLogin && !recaptchaValue) {

      alert('Please complete the reCAPTCHA verification.');

      return; // Stop form submission

    }


    try {

      if (isLogin) {

        // Login

        const response = await login({

          email: formData.email,

          password: formData.password

        });

        console.log('Login successful:', response);

        alert('Login successful!');

        navigate('/profile');

      } else {

        // Signup

        const response = await signup({

          name: formData.name,

          email: formData.email,

          password: formData.password,

          dob: formData.dob,

          recaptchaToken: recaptchaValue // Pass reCAPTCHA token to signup function

        });

        console.log('Signup successful:', response);

        alert('Signup successful!');

        navigate('/profile');


        // Reset reCAPTCHA after successful signup (optional)

        if (recaptchaRef.current) {

          recaptchaRef.current.reset();

        }

        setRecaptchaValue(null);

      }

    } catch (err) {

      console.error('Auth error:', err);

      // Reset reCAPTCHA on error (optional)

      if (recaptchaRef.current) {

        recaptchaRef.current.reset();

      }

      setRecaptchaValue(null);

      // Error is handled by the context

    }

  };


  const toggleAuthMode = () => {

    setIsLogin(!isLogin);

    clearError();

    setFormData({

      name: '',

      email: '',

      password: '',

      dob: ''

    });

    // Reset reCAPTCHA when switching modes

    if (recaptchaRef.current) {

      recaptchaRef.current.reset();

    }

    setRecaptchaValue(null);

  };


  return (

    <div className="login-container">

      <main className="login-main">

        <div className="login-wrapper">

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

                  <span>Manage Your Symptoms</span>

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

                {/* These fields (Name, DOB) only appear for Signup */}

                {!isLogin && (

                  <>

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

                    <div className="form-group">

                      <label htmlFor="dob">Date of Birth</label>

                      <div className="input-wrapper">

                        <input

                          type="date"

                          id="dob"

                          name="dob"

                          value={formData.dob}

                          onChange={handleChange}

                          required

                        />

                      </div>

                    </div>

                  </>

                )}


                {/* Email Address field */}

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


                {/* Password field */}

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

                      {showPassword ? '👁' : '👁‍🗨'}

                    </button>

                  </div>

                </div>


                {/* RECAPTCHA COMPONENT MOVED HERE - ONLY FOR SIGNUP */}

                {!isLogin && (

                  <div className="form-group recaptcha-container">

                    <ReCAPTCHA

                      ref={recaptchaRef}

                      sitekey="6LdFN5MrAAAAAHrZzarL1O7X5Yn4QNDTas6zmMKG"

                      onChange={onRecaptchaChange}

                      onExpired={() => setRecaptchaValue(null)}

                      onErrored={() => setRecaptchaValue(null)}

                    />

                  </div>

                )}


                {/* Form options (Remember me, Forgot Password) only for Login */}

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


                {/* Submit button */}

                <button type="submit" className="login-btn" disabled={loading}>

                  {loading ? (isLogin ? 'Signing In...' : 'Signing Up...') : (isLogin ? 'Sign In' : 'Sign Up')}

                  <span className="btn-icon">→</span>

                </button>

              </form>


              {/* Form footer */}

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
