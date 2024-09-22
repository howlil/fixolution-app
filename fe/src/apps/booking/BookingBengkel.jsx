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
  const isLogin = data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data: data } = await api.get(`/admin/getAllBengkel`);
        setBengkel(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      className={`relative py-36 bg-black bg-opacity-95 ${
        bengkel?.length === 0 ? "h-screen" : ""
      }`}
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
        {bengkel.length > 0 ? (
          <div className="container mx-auto px-4">
            <h1 className="text-2xl text-center mb-16 border-b  pb-8  font-semibold text-white">
              Silahkan Pilih Bengkel Yang Ingin Kamu Booking
            </h1>
            <CardBooking onClick={handleBooking} data={bengkel} />
          </div>
        ) : (
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold">
              Maaf, belum ada bengkel yang tersedia
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
