import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

import Signin from './components/Signin';
import Index from './components/Index';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Animate on scroll initialization
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 0,
    });
  }, []);

  useEffect(() => {
    // Check if the user is logged in by checking the accessToken in localStorage
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLogout = () => {
    // Clear the tokens from localStorage and update the login state
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Index isLoggedIn={isLoggedIn} onLogout={handleLogout} />} 
        />
        <Route 
          path="/login" 
          element={<Signin onLogin={() => setIsLoggedIn(true)} />} 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
