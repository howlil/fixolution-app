import React from "react";
import { Timer } from "lucide-react";

export default function CardBooking({ pesanan, tipe }) {
  const { bengkel, layanan, status, tanggal, jam_mulai, pesan_bengkel } =
    pesanan;

  return (
    <div className="border-b-2 pb-4 mb-4 w-full bg-white p-2 md:p-4">
      <div className="flex gap-6">
        {bengkel?.foto?.[0]?.foto && (
          <img
            className="h-24 w-24 md:w-36 md:h-36 object-cover rounded-lg"
            src={`${import.meta.env.VITE_API_BASE_URL}/fotoBengkel/${
              bengkel?.foto?.[0]?.foto
            }`}
            alt={bengkel?.nama_bengkel}
          />
        )}

        {/* Detail pesanan */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-neutral-400">{tipe}</span>
            <h1 className="text-xl font-semibold md:mt-1">
              {bengkel?.nama_bengkel}
            </h1>
            <p className="text-sm text-gray-600 md:mt-8">
              Layanan: {layanan?.nama_layanan}
            </p>
            <div className="flex items-center">
              <Timer size={16} className="inline mr-1" />
              <p className="text-[0.75rem] text-gray-600">
                {new Date(tanggal * 1000).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                ,{" "}
                {new Date(jam_mulai * 1000).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="md:flex hidden flex-col justify-between items-end">
          <h1 className="text-lg font-semibold text-gray-800">
            Rp{layanan.harga.toLocaleString("id-ID")}
          </h1>
          <div className="mb-4 text-end space-y-3">
            <div
              className={`px-4 py-2 rounded-md font-medium text-white ${
                status === "PENDING"
                  ? "bg-orange-500"
                  : status === "APPROVED"
                  ? "bg-green-500"
                  : status === "REJECTED"
                  ? "bg-red-500"
                  : ""
              }`}
            >
              {status === "PENDING" && "Menunggu Konfirmasi"}
              {status === "APPROVED" && "Telah Dikonfirmasi"}
              {status === "REJECTED" && "Ditolak"}
            </div>
            <p>
              Pesan Bengkel:{" "}
              <span className="font-semibold">
                {pesan_bengkel || "belum ada pesan"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="md:hidden flex mt-4 flex-col  justify-between ">
        <h1 className="text-lg font-semibold mb-2 text-gray-800">
          Rp{layanan.harga.toLocaleString("id-ID")}
        </h1>
        <div className="mb-4 md:text-end space-y-3">
          <div
            className={`text-center px-4 py-2  rounded-md font-medium text-white ${
              status === "PENDING"
                ? "bg-orange-500"
                : status === "APPROVED"
                ? "bg-green-500"
                : status === "REJECTED"
                ? "bg-red-500"
                : ""
            }`}
          >
            {status === "PENDING" && "Menunggu Konfirmasi"}
            {status === "APPROVED" && "Telah Dikonfirmasi"}
            {status === "REJECTED" && "Ditolak"}
          </div>
          <p>
            Pesan Bengkel:{" "}
            <span className="font-semibold">
              {pesan_bengkel || "belum ada pesan"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
