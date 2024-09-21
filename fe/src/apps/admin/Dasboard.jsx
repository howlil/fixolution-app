import Layout from "../../components/admin/layout";
import CardDashboard from "../../components/admin/card/CardDashboard";
import Loading from "../../components/ui/Loading";
import api from "../../utils/axios";
import { useEffect, useState } from "react";
import { showToast } from "../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      icon: "Package",
      name: "Suku Cadang",
      data: null,
    },
    {
      icon: "Warehouse",
      name: "Bengkel",
      data: null,
    },
    {
      icon: "ScrollText",
      name: "Transaksi",
      data: null,
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fungsi untuk mengambil data dari masing-masing endpoint
  const fetchData = async () => {
    try {
      setLoading(true);

      // Panggil API untuk total suku cadang
      const { data: sukuCadangRes } = await api.get("/admin/totalSukuCadang");
      const sukuCadangCount = sukuCadangRes.data || 0;

      // Panggil API untuk total bengkel
      const { data: bengkelRes } = await api.get("/admin/totalBengkel");
      const bengkelCount = bengkelRes.data || 0;

      // Panggil API untuk total transaksi suku cadang
      const { data: transaksiRes } = await api.get("/admin/totalTransaksiSukuCadang");
      const transaksiCount = transaksiRes.data || 0;

      // Update state data untuk CardDashboard
      setData([
        {
          icon: "Package",
          name: "Suku Cadang",
          data: sukuCadangCount,
        },
        {
          icon: "Warehouse",
          name: "Bengkel",
          data: bengkelCount,
        },
        {
          icon: "ScrollText",
          name: "Transaksi",
          data: transaksiCount,
        },
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <Layout>
      <Toaster />
      <section className="grid grid-cols-3 gap-3">
        {data.map((item, index) => (
          <CardDashboard key={index} icon={item.icon} name={item.name} data={item.data} />
        ))}
      </section>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </Layout>
  );
}
