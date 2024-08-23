import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/img/logo.png'; // Ensure this path is correct based on your project structure

interface SigninProps {
  onLogin: () => void;
}

const Signin: React.FC<SigninProps> = ({ onLogin }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api-test-web.agiletech.vn/auth/login', {
        token,
      });

      const { accessToken, refreshToken } = response.data;

      // Save tokens to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Invoke callback to handle successful login
      onLogin();

      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid token');
    }
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-8 left-10">
        <img
          src={Logo}
          alt="Logo"
          className="w-12 h-12 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>
      <div className="p-10 max-w-sm w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Sign In</h2>
        </div>
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Sign In
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Signin;
