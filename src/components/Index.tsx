import React from 'react'
import Home from './Home';
import Footer from './Footer';
import Features from './Features';

const Index: React.FC = () => {
  return (
    <div className='overflow-hidden'>
      <Home />
      <Features />
      <Footer />
    </div>
  )
}

export default Index