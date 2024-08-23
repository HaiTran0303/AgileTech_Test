import React from 'react'
import Home from './Home';
import Footer from './Footer';
import Features from './Features';
import Testimonials from './Testimonials';

interface IndexProps {
    isLoggedIn: boolean;
    onLogout: () => void;
  }
const Index: React.FC<IndexProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <div className='overflow-hidden'>
      <Home isLoggedIn={isLoggedIn} onLogout={onLogout}/>
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Index