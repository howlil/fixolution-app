import img from 'public/logo2.svg';
import SidebarNav from './SideNav';
import { Link,useNavigate } from 'react-router-dom';
import { PanelRightOpen } from 'lucide-react';


export default function SidebarIndex() {

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  const navigate = useNavigate();
  return (
    <section className='flex flex-col h-full  justify-between'>
      <section>
      <section className='flex justify-center'>
      <img src={img} className='w-48 my-6'/>
    </section>
      <SidebarNav />
      </section>
    <Link className='flex m-10' onClick={handleLogout}>
      <PanelRightOpen size={24}  color='white'/>
       <p className='text-white pl-3'>Logout</p>
    </Link>
      
    </section>
  )
}