// src/pages/ResetPassword.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.userEmail;
  const token = location.state?.token;

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, token, newPassword: password }),
      });

      const data = await response.json();
      
      // FIX: Only navigate if the response is successful
      if (response.ok) {
        alert("Your password has been reset successfully!");
        navigate('/login'); 
      } else {
          // Display the error message from the backend
          setMessage(data.msg || 'Failed to reset password.');
      }

    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #c8e6c9 0%, #81d4fa 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "#fff",
        padding: "32px 28px",
        borderRadius: "16px",
        boxShadow: "0 8px 32px 0 rgba(31, 120, 112, 0.15)",
        minWidth: "320px"
      }}>
        <h2 style={{ color: "#26a69a", marginBottom: 12, fontFamily: "sans-serif" }}>Reset Password</h2>
        <p style={{ color: "#7097aaff", marginBottom: 20 }}>Set a new password for *{userEmail}*.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            required
            value={password}
            onChange={handlePasswordChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "16px",
              border: "1px solid #73aba6ff",
              borderRadius: "8px",
              fontSize: "1rem",
              outline: "none"
            }}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "16px",
              border: "1px solid #73aba6ff",
              borderRadius: "8px",
              fontSize: "1rem",
              outline: "none"
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              background: "#26a69a",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: "0 2px 8px rgba(38,166,154,0.10)",
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {message && (
          <div style={{ marginTop: '16px', textAlign: 'center', color: '#ff6b6b' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
