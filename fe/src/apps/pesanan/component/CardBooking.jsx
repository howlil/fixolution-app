import React from "react";

export default function CardBooking({ pesanan, tipe }) {
  const { bengkel, layanan, status, tanggal, jam_mulai } = pesanan;

  return (
    <div className="border-b-2 pb-4 mb-4 w-full bg-white p-4">
      <div className="flex gap-6">
        <img
          className="w-36 h-36 object-cover rounded-lg"
          src={`${import.meta.env.VITE_API_BASE_URL}/fotoBengkel/${
            bengkel?.foto?.[0]?.foto
          }`}
          alt={bengkel?.nama_bengkel}
        />

        {/* Detail pesanan */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-neutral-400">{tipe}</span>
            <h1 className="text-xl font-semibold mt-1">
              {bengkel?.nama_bengkel}
            </h1>
            <p className="text-sm text-gray-600 mt-8">
              Layanan: {layanan?.nama_layanan}
            </p>
            <p className="text-sm text-gray-600">
              Tanggal dan Jam:{" "}
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

        {/* Harga dan status */}
        <div className="flex flex-col justify-between items-end">
          <h1 className="text-lg font-semibold text-gray-800">
            Rp{layanan.harga.toLocaleString("id-ID")}
          </h1>
          <div className="mb-4">
            <span
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
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
