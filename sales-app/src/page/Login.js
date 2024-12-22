import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('sales-officer');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Define valid credentials based on role
    const validCredentials = {
      'sales-officer': { username: 'manoj', password: 'manoj@coke' },
      'merchant': { username: 'jaihomeneeds', password: 'jaihome@123' },
      'asm': { username: 'harishasm', password: 'harishasm@coke' },
    };

    // Get valid credentials for the selected role
    const { username: validUsername, password: validPassword } = validCredentials[role];
    
    // Check if the entered credentials match the valid ones
    console.log('Attempting to login with:', { username, password, role });
    if (username === validUsername && password === validPassword) {
      // Navigate based on role
      if (role === 'sales-officer') {
        navigate('/sales-officer'); // Change to desired path for sales officer
      } else if (role === 'merchant') {
        navigate('/merchant'); // Change to desired path for merchant
      } else {
        navigate('/asm'); // Change to desired path for ASM
      }
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <select
          className="login-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="sales-officer">Sales Officer</option>
          <option value="merchant">Merchant</option>
          <option value="asm">Area Sales Manager</option>
        </select>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <a href="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </a>
      </div>
    </div>
  );
}

export default Login;
