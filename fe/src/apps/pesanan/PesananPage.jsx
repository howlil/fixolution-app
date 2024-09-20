import { getUserData } from "../../utils/getUserData";
import Navbar from "../../components/navbar";
import { ShoppingBag } from "lucide-react";
import Selesai from "./component/Selesai";
import Berlangsung from "./component/Berlangsung";
import { Link, useLocation } from "react-router-dom";
import api from "../../utils/axios";
import Loading from "../../components/ui/Loading";
import { showToast } from "../../components/ui/Toaster";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function PesananPage() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const path = location.pathname;
  const data = getUserData();
  const [dataBooking, setDataBooking] = useState([]);
  const [dataSTG, setDataSTG] = useState([]);
  const [dataSuku, setDataSuku] = useState([]);

  const navItems = [
    {
      label: "Berlangsung",
      to: "/pesanan/berlangsung",
      isActive: path === "/pesanan/berlangsung",
    },
    {
      label: "Selesai",
      to: "/pesanan/selesai",
      isActive: path === "/pesanan/selesai",
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const { data: response } = await api.get("/bookings");
        const { data: responseSTG } = await api.get("/allRequests");
        const {data: responseSuku} = await api.get("/pesanan");
        if (!response.success) {
          showToast("Gagal mengambil data pesanan", "error");
        }
        setDataBooking(response);
        setDataSTG(responseSTG);
        setDataSuku(responseSuku);
      } catch (error) {
        showToast("Terjadi kesalahan saat mengambil data pesanan", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="mx-12 mt-36">
        <div className="flex gap-3">
          <ShoppingBag size={28} />
          <h1 className="text-2xl font-semibold text-black">Pesanan Saya</h1>
        </div>

        <div className="mt-6 space-x-6 py-2 border-b-2 border-neutral-300">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`text-lg ${
                item.isActive
                  ? "font-semibold text-base border-b-4 border-base pb-2"
                  : "font-normal"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          {path === "/pesanan/berlangsung" && <Berlangsung dataSTG={dataSTG} dataSuku={dataSuku} data={dataBooking} />}
          {path === "/pesanan/selesai" && <Selesai dataSTG={dataSTG} dataSuku={dataSuku} data={dataBooking} />}
        </div>
      </div>

      {!data && (
        <div className="py-36">
          <h1 className="text-center text-2xl text-black">Anda belum login</h1>
        </div>
      )}
    </>
  );
}
