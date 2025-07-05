import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import login from './login'; 
import './login.css';

const App = () => <login />;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

const login = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkTheme);
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email || !email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const form = document.getElementById('loginForm');
      form.classList.add('success');
      setTimeout(() => {
        alert('Login successful!');
        form.classList.remove('success');
        setEmail('');
        setPassword('');
        setErrors({});
      }, 500);
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome Back</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkTheme ? '☀' : '🌙'}
      </button>

      <form id="loginForm" onSubmit={handleSubmit}>
        <div className={`form-group fade-in ${errors.email ? 'error' : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="error-message">{errors.email}</div>
        </div>

        <div className={`form-group fade-in ${errors.password ? 'error' : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="error-message">{errors.password}</div>
        </div>

        <div className="form-actions fade-in">
          <div className="form-check">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="submit-btn fade-in">Sign In</button>
      </form>

      <div className="sign-up fade-in">
        Don't have an account? <a href="signup.html">Sign up</a>
      </div>
    </div>
  );
};

export default login;
