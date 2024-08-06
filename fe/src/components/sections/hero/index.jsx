import Button from '../../ui/Button'
import Slideshow from './SlideShow'
import { slides } from '../../../data/data'

export default function Hero() {
  const whatsappLink = "https://wa.me/6282169492825";

  return (
    <section className="relative w-full h-screen">
      <Slideshow slides={slides} />
      <div className="absolute bottom-28  w-full flex justify-center">
       <Button 
       onClick={() => window.open(whatsappLink, "_blank")}
       custom="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-1" variant="primary">
       Booking Sekarang!
        </Button>
      </div>

    </section>
  )
}
