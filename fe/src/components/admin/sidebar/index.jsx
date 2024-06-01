import img from 'public/logo2.svg';
import SidebarNav from './SideNav';

export default function SidebarIndex() {
  return (
    <>
    <section className='flex justify-center'>
      <img src={img} className='w-48 my-6'/>
      
    </section>
      <SidebarNav />
    </>
  )
}