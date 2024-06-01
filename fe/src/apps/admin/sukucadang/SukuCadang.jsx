import Button from "../../../components/ui/Button";
import Layout from "../../../components/admin/layout";
import { useNavigate } from "react-router-dom";

export default function SukuCadang() {
  const navigate = useNavigate();
  const columns = [
    { header: "Nama Suku Cadang", accessor: "nama" },
    { header: "Harga", accessor: "harga" },
    { header: "Stok", accessor: "stok" },
  ];

  return (
    <Layout>
        <div className="flex justify-between items-center">
        <h1 className="font-semibold text-3xl">Suku Cadang</h1>
      <Button onClick={()=> navigate("/manajemenSukuCadang/AddSukuCadang")} variant="primary" custom="px-8 py-1.5">Tambah Data</Button>
        </div>
        <section className="mt-8">
         test
      </section>
    </Layout>
  )
}
