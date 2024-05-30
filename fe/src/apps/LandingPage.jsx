import Hero from '../components/sections/hero'
import Navbar from '../components/navbar'
import About from '../components/sections/about'
import Footer from '../components/sections/footer'
import Produk from '../components/sections/product'
import Profile from '../components/sections/profile'
import Service from '../components/sections/service'
import { Element } from 'react-scroll'

export default function LandingPage() {
  return (
    <>
      <Navbar/>
      <Element name="home">
        <Hero/>
      </Element>
      <Element name="about">
        <About/>
      </Element>
      <Element name="product">
        <Produk/>
      </Element>
      <Element name="profile">
        <Profile/>
      </Element>
      <Element name="services">
        <Service/>
      </Element>
      <Footer/>
    </>
  )
}
