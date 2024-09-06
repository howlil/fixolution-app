import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import logo1 from 'public/logo2.svg';
import Nav from './Nav';
import NavMobile from './NavMobile';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-base fixed top-0 z-50 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4'>
      <header className='flex justify-between items-center'>
        <img onClick={()=>navigate("/")} src={logo1} className='w-24 cursor-pointer sm:w-32 md:w-48 lg:w-60' alt="logo" />
        {isMobile ? (
          <>
             <div className='cursor-pointer' onClick={handleMenuClick}>
              <Menu color='white' size={32} />
             </div>
             {isOpen && <NavMobile isOpen={isOpen} setIsOpen={setIsOpen} />}
          </>
        ) : (
          <Nav />
        )}
      </header>
    </nav>
  );
}
