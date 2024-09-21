import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import api from "../../../utils/axios";
import Loading from "../../../components/ui/Loading";
import { showToast } from "../../../components/ui/Toaster";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function FormStg() {
  const [isLoading, setIsLoading] = useState(false);
  const [gmapsLink, setGmapsLink] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!gmapsLink || !deskripsi || !id) {
        showToast("Semua field wajib diisi", "error");
        setIsLoading(false);
        return;
      }

      await api.post("/request", {
        gmaps_link: gmapsLink,
        deskripsi: deskripsi,
        bengkel_id: id, // Assuming bengkel_id is pre-selected or known
      });

      showToast("Form berhasil dikirim", "success");
      setGmapsLink("");
      setDeskripsi("");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="pl-12 mt-36">
      <Toaster />
      <h1 className="text-2xl font-semibold text-white">Lengkapi Data</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Input
          customLabel={"text-white"}
          customClass="bg-transparent text-white"
          label={"Google Maps Link"}
          value={gmapsLink}
          onChange={(e) => setGmapsLink(e.target.value)}
          placeholder="Masukkan link Google Maps"
        />
        <Input
          customLabel={"text-white"}
          customClass="bg-transparent text-white"
          label={"Deskripsi Masalah Kendaraan"}
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Deskripsikan masalah kendaraan"
        />
        <div className="pt-6">
          <Button
            custom="py-1.5 w-full rounded-xl"
            type="submit"
            disabled={isLoading} // Disable button while loading
          >
            Pesan
          </Button>
        </div>
      </form>
    </div>
  );
}
