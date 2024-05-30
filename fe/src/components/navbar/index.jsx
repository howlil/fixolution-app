import logo1 from 'public/logo2.svg';
import Nav from './Nav';
export default function Navbar() {
  return (
    <nav className='bg-base absolute top-0 z-50 w-full  px-12 py-4 '>
      <header className='flex justify-between items-center'>
        <img src={logo1} className='w-60' alt="logo"/>
        <Nav/>
      </header>        
    </nav>
  )
}
