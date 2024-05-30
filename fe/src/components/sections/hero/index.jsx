import Button from '../../ui/Button'
import Slideshow from './SlideShow'
import { slides } from '../../../data/data'

export default function Hero() {

  return (
    <section className="relative w-full h-screen">
      <Slideshow slides={slides} />
      <div className="absolute bottom-28  w-full flex justify-center">
        <Button costum ="px-16 py-1" variant="primary">
          Cari Sekarang!
        </Button>
      </div>

    </section>
  )
}
