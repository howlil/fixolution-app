import FormStg from "./others/FormStg";
import DescStg from "./others/DescStg";
import Navbar from "../../components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import { showToast } from "../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import api from "../../utils/axios";

export default function DetailStg() {
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
        showToast("Terjadi kesalahan", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) return <Loading />;
  return (
    <div>
      <Navbar />
      <Toaster />
      <section className="bg-neutral-900 h-screen  gap-8 px-12 grid grid-cols-2">
        <div >
          <DescStg data={data} />
        </div>
        <div className=" border-l">
          <FormStg />
        </div>
      </section>
    </div>
  );
}
