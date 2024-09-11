import React from "react";

export default function CardService({ service, tipe }) {
  const { bengkel, deskripsi, status, gmaps_link, user } = service;

  return (
    <div className="border-b-2 pb-4 flex justify-between items-center mb-4 w-full bg-white p-4">
      {/* Gambar */}
      <div className="flex gap-6">
        <img
          className="w-36 h-36 object-cover rounded-lg"
          src={`${import.meta.env.VITE_API_BASE_URL}/fotoBengkel/${
            bengkel?.foto?.[0]?.foto
          }`}
          alt={bengkel?.nama_bengkel}
        />

        {/* Detail Service */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-medium text-neutral-400">{tipe}</span>
            <h1 className="text-lg font-semibold">{bengkel?.nama_bengkel}</h1>
            <p className="text-sm text-gray-500">{deskripsi}</p>
          </div>
          <div className="mt-8">
            <p className="text-sm text-gray-500">
              <strong>Gmaps User: </strong>
              <a
                href={gmaps_link}
                className="text-blue-500 cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat Lokasi User
              </a>
            </p>
            <p className="text-sm text-gray-500">
              <strong>Gmaps Bengkel: </strong>
              <a
                href={bengkel?.gmaps_link}
                className="text-blue-500  cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat Lokasi Bengkel
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Status dan Pesan */}
      <div className="flex flex-col items-end">
        <span
          className={`px-4 py-2 rounded-md font-medium text-white ${
            status === "PENDING"
              ? "bg-orange-500"
              : status === "APPROVED"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {status === "PENDING" && "Menunggu Konfirmasi"}
          {status === "APPROVED" && "Disetujui"}
          {status === "REJECTED" && "Ditolak"}
        </span>
        <p className="mt-2 text-sm text-gray-500">
          {service?.pesan_bengkel || "Belum ada pesan dari bengkel"}
        </p>
      </div>
    </div>
  );
}
