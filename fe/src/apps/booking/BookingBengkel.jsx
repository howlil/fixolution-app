import Navbar from "../../components/navbar";
import CardBooking from "../../components/sections/booking/CardBooking";
import img from "../../images/ban.png";

export default function BookingBengkel() {
  const data = [
    {
      img: img,
      title: "Ban",
      no_hp: "08123456789",
      alamat: "Jl. Kaliurang KM 5, Sleman, Yogyakarta",
      link_maps: "https://goo.gl/maps/5Q8q9YzJY8K2",
    },
    {
      img: img,
      title: "Ban",
      no_hp: "08123456789",
      alamat: "Jl. Kaliurang KM 5, Sleman, Yogyakarta",
      link_maps: "https://goo.gl/maps/5Q8q9YzJY8K2",
    },
    {
      img: img,
      title: "Ban",
      no_hp: "08123456789",
      alamat: "Jl. Kaliurang KM 5, Sleman, Yogyakarta",
      link_maps: "https://goo.gl/maps/5Q8q9YzJY8K2",
    },
    {
      img: img,
      title: "Ban",
      no_hp: "08123456789",
      alamat: "Jl. Kaliurang KM 5, Sleman, Yogyakarta",
      link_maps: "https://goo.gl/maps/5Q8q9YzJY8K2",
    },
  ];
  
  return (
    <div
      className="relative py-36 bg-black bg-opacity-95"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Konten */}
      <div className="relative z-10">
        <Navbar />
        <h1
        className="text-2xl text-center mb-16 border-b  pb-8  font-semibold text-white"
        >Silahkan Pilih Bengkel Yang Ingin Kamu Booking</h1>
        <CardBooking data={data} />
      </div>
    </div>
  );
}
