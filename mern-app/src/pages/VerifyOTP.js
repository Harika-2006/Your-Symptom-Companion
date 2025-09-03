// src/pages/VerifyOtp.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState(''); // State for messages
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.userEmail;

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp) {
      // Pass the email and token to the next page without a backend call yet
      navigate('/reset-password', { state: { userEmail: userEmail, token: otp } });
    } else {
      setMessage('Please enter a valid OTP.');
    }
  };
  
  if (!userEmail) {
    return <div>No email provided. Please go back to the forgot password page.</div>;
  }

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
        <h2 style={{ color: "#26a69a", marginBottom: 12, fontFamily: "sans-serif" }}>Verify OTP</h2>
        <p style={{ color: "#7097aaff", marginBottom: 20 }}>
          An OTP has been sent to *{userEmail}*. Please enter it below.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={handleOtpChange}
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
            style={{
              width: "100%",
              background: "#26a69a",
              color: "#fff",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(38,166,154,0.10)"
            }}
          >
            Verify
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

export default VerifyOtp;
