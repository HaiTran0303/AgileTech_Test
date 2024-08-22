import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/img/logo.png';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

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
              <img src={Logo} alt='Logo' />
            </a>
          </div>
          {isLoggedIn ? (
            <div className='flex items-center gap-x-[20px]'>
              <button
                onClick={() => navigate('/profile')}
                className='btn btn-primary flex items-center gap-x-[20px] group'
              >
                Profile
              </button>
              <button
                onClick={onLogout}
                className='btn btn-secondary flex items-center gap-x-[20px] group'
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='btn btn-primary flex items-center gap-x-[20px] group'
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
