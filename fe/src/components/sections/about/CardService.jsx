export default function CardService() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 md:gap-0 gap-4">
      {
        [
          {
            h1 : "Servis-to-go",
            p : "Memesan melalui website dimana saja dan kapan pun. Siap sedia untuk memberikan layanan langsung tanpa harus repot ke bengkel", 
          },
          {
            h1 : "Booking Cepat",
            p : "Booking cepat dengan bantuan pencarian lokasi bengkel terdekat! Ayo daftarkan akunmu sekarang!", 
          },
          {
            h1 : "Review Customer",
            p : "Menyediakan layanan review untuk menjamin kepuasan pelanggan dari FiXolution", 
          },
        ].map((item, index) => (
            <div key={index} className={`px-4 md:px-8 py-8 md:py-16 text-center ${item.h1 === 'Booking Cepat' ? 'bg-slate-50' : 'bg-neutral-200'}`}>
                <h1 className="text-2xl md:text-3xl text-neutral-800 font-semibold">{item.h1}</h1>
                <p className="text-base md:text-lg leading-snug text-neutral-600 mt-6">{item.p}</p>
            </div>
        ))
      }  
    </section>
  )
}