import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import Loading from "../../components/ui/Loading";
import { showToast } from "../../components/ui/Toaster";
import { Toaster } from "react-hot-toast";
import InformasiKontakAlamat from "./InformasiKontakAlamat";
import UploadBuktiPembayaran from "./UploadBuktiPembayaran";
import DetailPesanan from "./DetailPesanan";
import RingkasanPesanan from "./RingkasanPesanan";
import { useParams } from "react-router-dom";
import HowToPay from "./HowToPay";
import Navbar from "../../components/navbar";

export default function BayarIndex() {
  const { id_pesanan } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [dataPesanan, setDataPesanan] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/pesanan/${id_pesanan}`);
        setDataPesanan(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileUpload = (file) => {
    setFile(file);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!file) {
      showToast("Silakan unggah bukti pembayaran", "error");
      return;
    }

    const formData = new FormData();
    formData.append("bukti_pembayaran", file); // memastikan file terunggah ke formData

    try {
      const response = await api.put(`/bayar/${id_pesanan}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // memastikan header ini sesuai
        },
      });
      showToast("Bukti pembayaran berhasil diunggah", "success");
      window.location.href("/pesanan/berlangsung");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="md:my-28 my-20 mx-4 md:mx-12">
        {dataPesanan ? (
          <>
            <h1 className="md:text-3xl text-xl font-semibold mb-8">Pesanan</h1>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Section */}
              <div className="space-y-8">
                <InformasiKontakAlamat
                  data={dataPesanan.kontak}
                  alamat={dataPesanan.alamat}
                />
                <UploadBuktiPembayaran
                  handleSubmit={handleSubmit}
                  onFileUpload={handleFileUpload}
                />
              </div>

              {/* Right Section */}
              <div className="space-y-8">
                <HowToPay />
                <DetailPesanan detailPesanan={dataPesanan.detail_pesanan} />
                <RingkasanPesanan ringkasan={dataPesanan.ringkasan_pesanan} />
              </div>
            </div>
          </>
        ) : (
          <p>Data pesanan tidak ditemukan.</p> // Optional: Pesan jika data tidak tersedia
        )}
      </div>
    </>
  );
}
