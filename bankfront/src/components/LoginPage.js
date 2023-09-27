import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5062/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, role } = response.data; // Destructure the role from the response

        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userRole', role); // Store the user's role
        console.log(role);

        if (role === 'Admin') {
          // Redirect to admin page if user is admin
          navigate('/admin');
        } else {
          navigate('/home');
        }

        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="blinking-text">
          <h1 className="splash-text">Layermark Bank</h1>
          <p className="splash-subtext">Future of Banking</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
