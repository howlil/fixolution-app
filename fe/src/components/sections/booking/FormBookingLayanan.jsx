import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import api from "../../../utils/axios";
import { showToast } from "../../ui/Toaster";
import { useState } from "react";
import Loading from "../../ui/Loading";
import { Toaster } from "react-hot-toast";

export default function FormBookingLayanan({ data }) {
  const [layananId, setLayananId] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Convert layanan to options for Select
  const layananOptions =
    data?.layanan?.map((item) => {
      return { label: item.nama_layanan, value: item.id };
    }) || [];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!layananId || !tanggal || !jamMulai) {
      showToast("Semua field wajib diisi", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/booking", {
        bengkel_id: data.id, // ID bengkel dari data
        layanan_id: layananId,
        tanggal,
        jam_mulai: jamMulai,
      });

      if (response.data.success) {
        showToast("Booking berhasil", "success");
        setLayananId("");
        setTanggal("");
        setJamMulai("");
        window.location.href("/pesanan/berlangsung");
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className=" md:py-36 py-8 md:pl-8">
      <Toaster />
      <h1 className="text-2xl font-semibold text-white">Isi Form Booking</h1>
      <form className="space-y-3 mt-8" onSubmit={handleSubmit}>
        <Select
          className="text-white font-light bg-transparent"
          label={"Pilih Layanan"}
          options={layananOptions}
          value={layananId} // Bind the value to the state
          onChange={(e) => setLayananId(e.target.value)} // Save the selected layanan ID
        />
        <Input
          customLabel={"text-white"}
          customClass="bg-transparent text-white"
          label={"Tanggal"}
          type={"date"}
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)} // Save the date value
        />
        <Input
          customLabel={"text-white"}
          customClass="bg-transparent text-white"
          label={"Jam"}
          type={"time"}
          value={jamMulai}
          onChange={(e) => setJamMulai(e.target.value)} // Save the time value
        />

        <div className="pt-6">
          <Button
            custom="py-1.5 w-full rounded-xl"
            type="submit"
            disabled={isLoading}
          >
            Booking
          </Button>
        </div>
      </form>
    </div>
  );
}
