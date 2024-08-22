import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SigninProps {
  onLogin: () => void;
}

const Signin: React.FC<SigninProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api-test-web.agiletech.vn/auth/login', {
        username,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      onLogin();
      navigate('/');
    } catch (err) {
        console.log(err);
      setError('Invalid username');
    }
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 max-w-sm w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Sign In</h2>
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
