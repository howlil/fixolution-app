import our from "public/our.png";
import CardService from "./CardService";
export default function About() {
  return (
    <section >
      <section>
        <CardService />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-5 ">
        <div className="p-4 md:col-span-3 md:px-8 lg:p-16">
          <h1 className="text-base md:text-lg font-semibold text-[20px] md:text-[28px]">WELCOME</h1>
          <h1 className="text-neutral-700 font-semibold text-3xl md:text-5xl" >WHO WE ARE?</h1>
          <p className="text-neutral-600 mt-8 text-sm md:text-md">
            FiXolution merupakan layanan website bisnis perbengkelan yang
            bertujuan untuk memberikan solusi cepat dan terpercaya bagi pemilik
            kendaraan yang membutuhkan layanan perbaikan, kapanpunAnda
            membutuhkan. FiXolution merupakan website yang menyediakan layanan
            atau jasa perbengkelan untuk berbagai kendaraan. Bengkelin aja
            beroperasi selama 24 jam setiap harinya sehingga mampu memberikan
            layanan yang fleksibel dan responsif terhadap kebutuhan pelanggan.
          </p>
        </div>
        <div className="md:col-span-2 md:h-full w-full object-cover ">
          <img src={our} alt="our" className="w-full h-auto" />
        </div>
      </section>
    </section>
  );
}