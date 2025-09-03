// src/pages/ForgotPassword.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // New state for messages
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(''); // Clear previous messages

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.msg); // Display the message from the backend

      if (response.ok) {
        // Navigate to the OTP verification page after successful request
        navigate('/verify-otp', { state: { userEmail: email } });
      }

    } catch (error) {
      console.error('Error sending password reset request:', error);
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
        <h2 style={{ color: "#26a69a", marginBottom: 12, fontFamily: "sans-serif" }}>Forgot Password</h2>
        <p style={{ color: "#7097aaff", marginBottom: 20 }}>Enter your email to receive an OTP.</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={handleEmailChange}
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
            disabled={isLoading} // Disable button while loading
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
            {isLoading ? 'Sending...' : 'Send OTP'}
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

export default ForgotPassword;
