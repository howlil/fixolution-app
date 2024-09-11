import Navbar from "../../components/navbar";
import img from "../../images/ban.png";
import api from "../../utils/axios";
import Loading from "../../components/ui/Loading";
import { showToast } from "../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getUserData } from "../../utils/getUserData";
import CardStg from "./others/CardStg";

export default function ServiceToGoPage() {
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
        showToast("error fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Define the click handler function
  const handleStg = (id) => {
    if (!isLogin) {
      showToast("Anda harus login terlebih dahulu", "error");
      window.location.href = `/login`;
      return;
    }
    // Navigate to the service page of the clicked bengkel
    window.location.href = `/service/${id}`;
  };

  if (isLoading) return <Loading />;

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

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <h1 className="text-2xl text-center mb-16 border-b pb-8 font-semibold text-white">
          Silahkan Pilih Bengkel 
        </h1>
        {/* Pass handleStg to CardStg */}
        <CardStg data={bengkel} onClick={handleStg} />
      </div>
    </div>
  );
}
