import Navbar from "../../components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import { showToast } from "../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import api from "../../utils/axios";
import DetailBengkelLayanan from "../../components/sections/booking/DetailBengkelLayanan";
import FormBookingLayanan from "../../components/sections/booking/FormBookingLayanan";

export default function DetailBookingBengkel() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const { data: data } = await api.get(`/admin/getBengkelById/${id}`);
        setData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);


  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />
      <Toaster />
      {data.layanan && data.layanan.length > 0 && (
        <section className="bg-neutral-900 md:h-screen  gap-4 md:gap-8 px-4 md:px-12 grid md:grid-cols-3">
          <div className="md:col-span-2 md:overflow-y-scroll md:no-scrollbar">
            <DetailBengkelLayanan data={data} />
          </div>
          <div className="md:col-span-1 md:border-l">
            <FormBookingLayanan data={data} />
          </div>
        </section>
      )}
      {(!data.layanan || data.layanan.length === 0) && (
        <div className="py-36">
          <h1 className="text-center text-2xl text-black">Tidak ada layanan</h1>
        </div>
      )}
    </>
  );
}
