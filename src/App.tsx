import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

import Signin from './components/Signin';
import Index from './components/Index';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 0,
    });
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLogout = () => {
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
          path="/profile" 
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} 
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
