import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'

import Aos from 'aos';
import 'aos/dist/aos.css';


import Index from './components/Index';

const App: React.FC = () => {
  // animate on scroll initialization
  Aos.init({
    duration: 1800,
    offset: 0,
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
