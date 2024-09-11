import Navbar from "../../components/navbar";
import CardBooking from "../../components/sections/booking/CardBooking";
import img from "../../images/ban.png";
import api from "../../utils/axios";
import Loading from "../../components/ui/Loading";
import { showToast } from "../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getUserData } from "../../utils/getUserData";

export default function BookingBengkel() {
  const [bengkel, setBengkel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const data = getUserData();
  const isLogin = data


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data: data } = await api.get(`/admin/getAllBengkel`);
        setBengkel(data.data);
      } catch (error) {
        showToast("error fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  const handleBooking = (id) => {
    if (!isLogin) {
      showToast("Anda harus login terlebih dahulu", "error");
      window.location.href = `/login`;
      return;
    }
    window.location.href = `/booking-bengkel/${id}`; // Gunakan ID di URL
  };
  

  return (
    <div
      className="relative py-36 bg-black bg-opacity-95"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toaster />
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Konten */}
      <div className="relative z-10">
        <Navbar />
        <h1 className="text-2xl text-center mb-16 border-b  pb-8  font-semibold text-white">
          Silahkan Pilih Bengkel Yang Ingin Kamu Booking
        </h1>
        <CardBooking onClick={handleBooking} data={bengkel} />
      </div>
    </div>
  );
}
