import React from 'react';

import Logo from '../assets/img/logo.png';
const Header: React.FC = () => {
  return (
    <header
      className='mb-12 lg:mb-0 z-20 relative px-4 lg:px-0'
      data-aos='fade-down'
      data-aos-delay='1200'
      data-aos-duration='1000'
    >
      <div className='container mx-auto'>
        <div className='flex items-center justify-between relative'>
          <div className='flex items-center gap-x-[120px]'>
            <a href='/'>
              <img src={Logo} alt='' />
            </a>
          </div>

          <button className='btn btn-primary flex items-center gap-x-[20px] group'>
            Sign in
          </button>
          
        </div>
      </div>
    </header>
  );
};

export default Header;

