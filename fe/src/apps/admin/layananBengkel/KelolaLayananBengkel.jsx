import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../../components/admin/layout";
import Input from "../../../components/ui/Input";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import Loading from "../../../components/ui/Loading";
import api from "../../../utils/axios";
import { Toaster } from "react-hot-toast";
import { showToast } from "../../../components/ui/Toaster";

export default function KelolaLayananBengkel() {
  const { layanan_id, id } = useParams(); // To detect if it's edit or add
  const navigate = useNavigate();
  const [namaLayanan, setNamaLayanan] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [jamBuka, setJamBuka] = useState("");
  const [jamTutup, setJamTutup] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = Boolean(layanan_id);

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      api
        .get(`/${id}/getLayananBengkelById/${layanan_id}`)
        .then((response) => {
          const layanan = response.data.data;
          setNamaLayanan(layanan.nama_layanan);
          setHarga(layanan.harga);
          setDeskripsi(layanan.deskripsi);
          setJamBuka(layanan.jam_buka);
          setJamTutup(layanan.jam_tutup);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
          showToast(error.response.data.message, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, layanan_id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      nama_layanan: namaLayanan,
      harga,
      deskripsi,
      jam_buka: jamBuka,
      jam_tutup: jamTutup,
    };

    try {
      if (isEditing) {
        const response = await api.put(
          `/${id}/editLayananBengkel/${layanan_id}`,
          payload
        );
        showToast("Layanan berhasil diperbarui", "success");
      } else {
        // Create new layanan
        const response = await api.post(`/${id}/addLayananBengkel`, payload);
        showToast("Layanan berhasil ditambahkan", "success");
      }
      navigate(`/manajemenBengkel/${id}/layananBengkel`);
    } catch (error) {
      setErrorMessage(error.response.data.message)
      showToast(error.response.data.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl md:text-3xl">
          {isEditing ? "Edit" : "Tambah"} Layanan Bengkel
        </h1>
      </div>
      <section className="mt-6 md:mt-12">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Nama Layanan"
            type="text"
            customClass="border-neutral-500"
            placeholder="Nama Layanan"
            value={namaLayanan}
            onChange={(e) => setNamaLayanan(e.target.value)}
            required
          />
          <Input
            label="Kisaran Harga"
            type="number"
            customClass="border-neutral-500"
            placeholder="Kisaran Harga"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            required
          />
          <Input
            label="Jam Buka"
            type="time"
            customClass="border-neutral-500"
            placeholder="Jam Buka"
            value={jamBuka}
            onChange={(e) => setJamBuka(e.target.value)}
            required
          />
          <Input
            label="Jam Tutup"
            type="time"
            customClass="border-neutral-500"
            placeholder="Jam Tutup"
            value={jamTutup}
            onChange={(e) => setJamTutup(e.target.value)}
            required
          />
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          />
          <div className="md:flex md:justify-end ">
            <Button variant="primary" custom="md:px-8 w-full md:w-56 mt-6 py-1.5">
              {isEditing ? "Update Layanan" : "Simpan Layanan"}
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
